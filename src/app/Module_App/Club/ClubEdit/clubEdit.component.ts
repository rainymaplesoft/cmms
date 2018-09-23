import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FirebaseDataService } from '../../../Module_Firebase';
import { CollectionPath, IClub } from '../../../Module_Firebase/models';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'club-edit',
  templateUrl: 'clubEdit.component.html',
  styleUrls: ['clubEdit.component.scss']
})
export class ClubEditComponent implements OnInit, OnChanges {
  @Input()
  clubId: string;

  club: Observable<IClub>;
  clubForm: FormGroup;
  get docPathClub() {
    return `${CollectionPath.CLUBS}/${this.clubId}`;
  }

  set addNewClub(p: any) {
    this.clubId = '';
    this.buildForm();
  }

  constructor(
    private dbService: FirebaseDataService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}
  ngOnChanges() {
    if (!this.clubId) {
      return;
    }
    this.getClubById();
  }

  onSubmit() {
    if (this.clubForm.status !== 'VALID') {
      console.log('form is not valid, cannot save to database');
      return;
    }
    this.saveClub();
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

  private saveClub() {
    const data = this.clubForm.value;
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

  //#endregion

  //#region reactive form and field getters

  private buildForm() {
    this.clubForm = this.fb.group({
      clubName: ['', Validators.required],
      clubCode: ['', [Validators.required, Validators.pattern('^[A-Z]{4}$')]],
      email: ['', Validators.required],
      contactName: ['', Validators.required],
      address: [''],
      phone1: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      phone2: [''],
      isActive: [true, Validators.required]
    });
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
