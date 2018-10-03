import { Component, OnInit } from '@angular/core';
import { ToastrService, UtilService, KeyValue } from '../../../Module_Core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Images } from '../../Images/image';
import { IUser } from '../../../Module_Firebase/models';
import { Observable } from 'rxjs';
import { FirebaseDataService } from '../../../Module_Firebase';
import { MetaService } from '../../meta.service';
import { StorageService } from '../../../Module_Core/services/storage.service';

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
  title = 'Edit User';

  genders: KeyValue[] = [
    { key: 1, value: 'Male' },
    { key: 2, value: 'Female' }
  ];

  constructor(
    private dbService: FirebaseDataService,
    private toastr: ToastrService,
    private storageService: StorageService,
    private utilService: UtilService,
    private metaService: MetaService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.userId = this.metaService.userId;
    this.clubId = this.metaService.clubId;
    this.getRecordById();
  }

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

  onSave() {
    const data: IUser = this.formEdit.value;
    if (this.userId) {
      this.updateRecord(data);
    }
  }

  private updateRecord(data: any) {
    this.dbService
      .updateDocument<IUser>(this.userDocPath, data)
      .then((r: boolean) => {
        this.getRecordById();
      });
  }

  //#region reactive form and field getters

  private buildForm() {
    this.formEdit = this.fb.group({
      firstName: { value: '', disabled: false },
      lastName: { value: '', disabled: false },
      email: { value: '', disabled: true },
      cellPhone: { value: '', disabled: false },
      imageUrl: { value: '', disabled: false },
      gender: { value: 1, disabled: false }
    });
  }

  get avatar() {
    let imageUrl = this.formEdit.get('imageUrl').value;
    if (!!imageUrl) {
      return this.utilService.sanitizeUrl(imageUrl);
    }
    imageUrl = this.gender.value === 1 ? Images.Male : Images.Female;
    return this.utilService.sanitizeUrl(imageUrl);
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
