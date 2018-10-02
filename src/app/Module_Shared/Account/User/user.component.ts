import { Component, OnInit } from '@angular/core';
import { ToastrService, UtilService } from '../../../Module_Core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Images } from '../../Images/image';
import { IUser } from '../../../Module_Firebase/models';
import { Observable } from 'rxjs';
import { FirebaseDataService } from '../../../Module_Firebase';
import { MetaService } from '../../meta.service';

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

  constructor(
    private dbService: FirebaseDataService,
    private toastr: ToastrService,
    private utilService: UtilService,
    private metaService: MetaService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  get userDocPath() {
    return this.metaService.getDocPathUser(this.clubId, this.userId);
  }

  private getRecordById() {
    this.user = this.dbService
      .getDocument<IUser>(this.userDocPath)
      .valueChanges();
    this.buildForm();
    this.user.subscribe(user => {
      this.formEdit.patchValue(user);
    });
  }
  //#region reactive form and field getters

  private buildForm() {
    this.formEdit = this.fb.group({
      firstName: { value: '', disabled: true },
      lastName: { value: '', disabled: true },
      email: { value: '', disabled: true },
      cellPhone: { value: '', disabled: true },
      imageUrl: { value: '', disabled: true },
      gender: { value: 1, disabled: true },
      isMember: { value: false, disabled: false },
      isAdmin: { value: false, disabled: false },
      isActive: { value: '', disabled: false }
    });
  }

  get avatar() {
    let imageUrl = this.formEdit.get('imageUrl').value;
    if (!!imageUrl) {
      return this.utilService.sanitizeUrl(imageUrl);
    }
    imageUrl = this.gender.value === 1 ? Images.Male : Images.Female;
    return this.utilService.sanitizeUrl(Images.Female);
  }

  get firstName() {
    return this.formEdit.get('firstName');
  }

  get lastName() {
    return this.formEdit.get('lastName');
  }

  get email() {
    return this.formEdit.get('email');
  }

  get gender() {
    return this.formEdit.get('gender');
  }

  get isMember() {
    return this.formEdit.get('isMember');
  }

  get isAdmin() {
    return this.formEdit.get('isAdmin');
  }

  get cellPhone() {
    return this.formEdit.get('cellPhone');
  }

  get imageUrl() {
    return this.formEdit.get('imageUrl');
  }

  get isActive() {
    return this.formEdit.get('isActive');
  }
  //#endregion
}
