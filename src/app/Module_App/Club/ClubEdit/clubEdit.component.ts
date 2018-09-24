import {
  Component,
  OnInit,
  Input,
  OnChanges,
  EventEmitter,
  Output
} from '@angular/core';
import { FirebaseDataService } from '../../../Module_Firebase';
import { CollectionPath, IClub } from '../../../Module_Firebase/models';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { DocumentReference } from '@angular/fire/firestore';
import { ToastrService } from '../../../Module_Core';
import { ClubValidator } from '../club.validator';

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

  hideEdit = false;
  club: Observable<IClub>;
  clubForm: FormGroup;
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
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}
  ngOnChanges() {}

  onSubmit() {
    this.onSaveClub();
  }

  //#region data functions

  private getClubById() {
    this.club = this.dbService
      .getDocument<IClub>(this.docPathClub)
      .valueChanges();
    this.buildForm();
    this.club.subscribe(club => {
      this.clubForm.patchValue(club);
    });
  }

  onSaveClub() {
    if (this.clubForm.invalid) {
      console.log('form is not valid, cannot save to database');
      return;
    }
    const data: IClub = this.clubForm.value;
    if (this.clubId) {
      this.updateClub(data);
    } else {
      this.addClub(data);
    }
    // const allClubs = this.dbService
    //   .getCollection<IClub>(CollectionPath.CLUBS)
    //   .subscribe((clubs: IClub[]) => {
    //     const clubWithSameCode = clubs.find(
    //       c => c._id !== this.clubId && c.clubCode === data.clubCode
    //     );
    //     if (clubWithSameCode) {
    //       this.toastr.warning(
    //         `The Code [${data.clubCode}] already exists, please verify!!`
    //       );
    //       return;
    //     }

    //     return;
    //   });
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
    this.clubForm = this.fb.group({
      clubName: ['', Validators.required],
      clubCode: [
        '',
        [Validators.pattern('^[A-Z]{4}$')],
        [ClubValidator.clubCode(this.dbService.afs, this.clubId)]
      ],
      email: ['', Validators.required],
      contactName: ['', Validators.required],
      address: [''],
      phone1: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      phone2: [''],
      isActive: [true, Validators.required]
    });
    this.hideEdit = false;
  }

  get clubName() {
    return this.clubForm.get('clubName');
  }

  get clubCode() {
    return this.clubForm.get('clubCode');
  }

  get email() {
    return this.clubForm.get('email');
  }

  get contactName() {
    return this.clubForm.get('contactName');
  }

  get phone1() {
    return this.clubForm.get('phone1');
  }

  get address() {
    return this.clubForm.get('address');
  }

  get isActive() {
    return this.clubForm.get('isActive');
  }
  //#endregion
}
