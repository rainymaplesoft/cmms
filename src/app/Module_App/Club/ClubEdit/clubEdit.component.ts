import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FirebaseDataService } from '../../../Module_Firebase';
import { CollectionPath, IClub } from '../../../Module_Firebase/models';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor(
    private dbService: FirebaseDataService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}
  ngOnChanges() {
    if (!this.clubId) {
      return;
    }
    this.club = this.dbService
      .getDocument<IClub>(`${CollectionPath.CLUBS}/${this.clubId}`)
      .valueChanges();
    this.buildForm();
  }

  onSubmit() {}

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
    this.club.subscribe(club => {
      this.clubForm.patchValue(club);
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
