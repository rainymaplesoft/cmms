import {
  Component,
  OnInit,
  Input,
  OnChanges,
  EventEmitter,
  Output
} from '@angular/core';
import { FirebaseDataService } from '../../../Module_Firebase';
import { CollectionPath, IUser } from '../../../Module_Firebase/models';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Images } from '../../Images/image';
import { UtilService } from '../../../Module_Core/services/util.service';
import { MetaService } from '../../meta.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'account-edit',
  templateUrl: './accountEdit.component.html',
  styleUrls: ['accountEdit.component.scss']
})
export class AccountEditComponent implements OnInit, OnChanges {
  @Input()
  clubId: string;
  @Output()
  showList = new EventEmitter<boolean>();

  userId: string;
  hideEdit = false;
  disableCode = false;
  user: Observable<IUser>;
  formEdit: FormGroup;

  constructor(
    private dbService: FirebaseDataService,
    private utilService: UtilService,
    private metaService: MetaService,
    private fb: FormBuilder
  ) {}

  get userDocPath() {
    return this.metaService.getDocPathUser(this.clubId, this.userId);
  }

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
    this.user = this.dbService
      .getSimpleDocument<IUser>(this.userDocPath)
      .valueChanges();
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
    this.dbService
      .updateDocument<IUser>(this.userDocPath, data)
      .then((r: boolean) => {
        this.getRecordById();
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
      isActive: { value: '', disabled: false }
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
