import {
  Component,
  OnInit,
  Input,
  OnChanges,
  EventEmitter,
  Output
} from '@angular/core';
import { IUser } from '../../../Module_Firebase/models';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Images } from '../../Images/image';
import { UtilService } from '../../../Module_Core/services/util.service';
import { AccountService } from '../../_shared/account.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'account-edit',
  templateUrl: './accountEdit.component.html',
  styleUrls: ['accountEdit.component.scss']
})
export class AccountEditComponent implements OnInit, OnChanges {
  @Input()
  clubId: string;
  @Input()
  showSuperOption: boolean;
  @Output()
  showList = new EventEmitter<boolean>();

  userId: string;
  hideEdit = false;
  disableCode = false;
  user: Observable<IUser>;
  formEdit: FormGroup;

  constructor(
    private utilService: UtilService,
    private accountService: AccountService,
    private fb: FormBuilder
  ) {}

  set selectRecordId(recordId: string) {
    if (!recordId) {
      // hide the form
      this.formEdit = null;
      return;
    }
    this.userId = recordId;
    this.getRecordById();
  }

  ngOnInit() {}
  ngOnChanges() {}

  onSubmit() {
    this.onSave();
  }

  //#region data functions

  private getRecordById() {
    this.user = this.accountService.getClubUserById(this.clubId, this.userId);
    this.buildForm();
    this.user.subscribe(user => {
      this.formEdit.patchValue(user);
    });
  }

  onSave() {
    if (this.formEdit.invalid) {
      console.log('form is not valid, cannot save to database');
      return;
    }
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

  backToList() {
    this.showList.emit(true);
    this.hideEdit = true;
  }
  //#endregion

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
      isActive: { value: false, disabled: false }
    });
    this.hideEdit = false;
  }

  get avatar() {
    let imageUrl = this.formEdit.get('imageUrl').value;
    if (!!imageUrl) {
      return this.utilService.sanitizeUrl(imageUrl);
    }
    const gen = this.formEdit.get('gender');
    imageUrl = gen.value === 1 ? Images.Male : Images.Female;
    return this.utilService.sanitizeUrl(imageUrl);
  }
  //#endregion
}
