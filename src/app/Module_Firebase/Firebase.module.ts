import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PendingChangesGuard } from './authGuard.service';
import { FireAuthService } from './firebase.auth.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseDataService } from './firebase.data.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.cmmsFireConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence()
  ],
  exports: [],
  providers: [PendingChangesGuard, FireAuthService, FirebaseDataService],
  declarations: []
})
export class ModuleFirebase {}
