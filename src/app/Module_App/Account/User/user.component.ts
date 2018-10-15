import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../Module_Core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Images } from '../../Images/image';
import { IUser } from '../../../Module_Firebase/models';
import { Observable } from 'rxjs';
import { MetaService } from '../../meta.service';
import { Router } from '../../../../../node_modules/@angular/router';
import RouteName from 'src/app/routename';
import { take } from 'rxjs/operators';
import { AccountService } from '../../_shared/account.service';
import { Config } from '../../config';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit {
  user: Observable<IUser>;
  formEdit: FormGroup;
  clubId: string;
  userId: string;
  title = 'Edit My Account';
  themeImage = `url(assets/img/edit_01.jpg)`;

  genders = Config.Gender;

  constructor(
    private router: Router,
    private utilService: UtilService,
    private metaService: MetaService,
    private accountService: AccountService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.metaService.getLoggedInUser.subscribe(u => {
      this.userId = u._id;
      this.clubId = u.loggedInClubId;
      this.getRecordById();
    });
  }

  private getRecordById() {
    this.user = this.accountService
      .getClubUserById(this.clubId, this.userId)
      .pipe(take(1));
    this.buildForm();
    this.user.subscribe(user => {
      this.formEdit.patchValue(user);
    });
  }

  onSave() {
    const data: IUser = this.formEdit.value;
    if (this.userId) {
      this.updateRecord(data);
    }
  }

  private updateRecord(data: any) {
    this.accountService
      .updateClubUser(this.clubId, this.userId, data)
      .then((r: boolean) => {
        // this.getRecordById();
      });
  }

  onClose() {
    this.router.navigate([RouteName.Club], {
      queryParams: { clubId: this.clubId }
    });
  }

  //#region reactive form and field getters

  private buildForm() {
    this.formEdit = this.fb.group({
      firstName: [{ value: '', disabled: false }, [Validators.required]],
      lastName: { value: '', disabled: false },
      email: { value: '', disabled: true },
      cellPhone: [{ value: '', disabled: false }, [Validators.required]],
      imageUrl: { value: '', disabled: false },
      gender: { value: 1, disabled: false }
    });
  }

  getValidate(control: string) {
    const ctrl = this.formEdit.get(control);
    if (!ctrl) {
      return true;
    }
    return ctrl.invalid && ctrl.dirty;
  }

  get avatar() {
    let imageUrl = this.formEdit.get('imageUrl').value;
    if (!!imageUrl) {
      return this.utilService.sanitizeUrl(imageUrl);
    }
    const gender = this.formEdit.get('gender');
    imageUrl = gender.value === 1 ? Images.Male : Images.Female;
    return this.utilService.sanitizeUrl(imageUrl);
  }

  //#endregion
}
