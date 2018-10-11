import {
  Component,
  OnInit,
  Input,
  OnChanges,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { FirebaseDataService } from '../../../Module_Firebase';
import { CollectionPath, IClub } from '../../../Module_Firebase/models';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentReference } from '@angular/fire/firestore';
import { ToastrService, UtilService } from '../../../Module_Core';
import { tap } from 'rxjs/operators';
import { KeyValue } from '../../../Module_Core/enums';
import {
  DaySelectorComponent,
  CustomValidator
} from 'src/app/Module_App/_shared';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'club-edit',
  templateUrl: 'clubEdit.component.html',
  styleUrls: ['clubEdit.component.scss']
})
export class ClubEditComponent implements OnInit, OnChanges {
  @Input()
  clubId: string;
  @Output()
  showList = new EventEmitter<boolean>();
  @ViewChild(DaySelectorComponent)
  daySelector: DaySelectorComponent;

  hideEdit = false;
  disableCode = false;
  club: Observable<IClub>;
  formEdit: FormGroup;
  selectedDays = '';
  dayChanged = false;

  get docPathClub() {
    return `${CollectionPath.CLUBS}/${this.clubId}`;
  }

  set addNewClub(p: any) {
    this.clubId = '';
    this.buildForm();
  }

  set selectClub(clubId: string) {
    this.clubId = clubId;
    this.getClubById();
  }

  constructor(
    private dbService: FirebaseDataService,
    private fb: FormBuilder,
    private util: UtilService
  ) {}

  ngOnInit() {}
  ngOnChanges() {}

  onDayChanged(e) {
    this.dayChanged = true;
  }

  onSubmit() {
    this.onSaveClub();
  }

  //#region data functions

  private getClubById() {
    this.club = this.dbService
      .getSimpleDocument<IClub>(this.docPathClub)
      .valueChanges()
      .pipe(
        tap((club: IClub) => {
          this.disableCode = club && club.clubCode.length === 4;
        })
      );
    this.buildForm();
    this.club.subscribe(club => {
      this.formEdit.patchValue(club);
      if (this.disableCode) {
        this.clubCode.disable();
      }
      this.selectedDays = !!this.openDays.value ? this.openDays.value : '';
    });
  }

  onSaveClub() {
    if (this.formEdit.invalid) {
      console.log('form is not valid, cannot save to database');
      return;
    }
    const selectedDays = this.daySelector.selectedDays;
    this.openDays.setValue(selectedDays);
    const data: IClub = this.formEdit.value;
    if (this.clubId) {
      this.updateClub(data);
    } else {
      this.addClub(data);
    }
  }

  private updateClub(data: any) {
    this.dbService
      .updateDocument<IClub>(this.docPathClub, data)
      .then((r: boolean) => {
        this.getClubById();
      });
  }

  private addClub(data: any) {
    const newClub$ = this.dbService.addDocument(
      `${CollectionPath.CLUBS}`,
      data
    );
    newClub$.then((club: DocumentReference) => {
      this.clubId = club.id;
      this.getClubById();
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
      clubName: ['', Validators.required],
      clubCode: [
        '',
        [Validators.pattern('^[A-Z]{4}$')],
        [CustomValidator.clubCode(this.dbService.afs, this.clubId)]
      ],
      maxPlayers: [20, Validators.required],
      email: ['', Validators.required],
      contactName: ['', Validators.required],
      address: [''],
      phone1: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      phone2: [''],
      mapLink: [''],
      openDays: [''],
      isActive: [true, Validators.required]
    });
    this.hideEdit = false;
  }

  getValidate(control: string) {
    const ctrl = this.formEdit.get(control);
    if (!ctrl) {
      return true;
    }
    return ctrl.invalid && ctrl.dirty;
  }

  get openDays() {
    return this.formEdit.get('openDays');
  }

  get clubCode() {
    return this.formEdit.get('clubCode');
  }
  //#endregion
}
