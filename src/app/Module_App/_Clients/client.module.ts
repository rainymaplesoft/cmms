/*
import { NgModule } from '@angular/core';

import { ClientComponent } from './client.component';
import { Routes, RouterModule } from '@angular/router';
import { MainLPBCComponent } from './LPBC/main-lpbc.component';
import { MainLVBCComponent } from './LVBC/main-lvbc.component';
import { MainWIBCComponent } from './WIBC/main-wibc.component';

import { AppMaterialModule } from '../Module_Core';
import { CommonModule } from '@angular/common';
import { ClaimType } from '../Module_App/config';
import { SignUpComponent } from '../Module_App/SignUp/signup.component';
const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    canActivate: [],
    data: {
      claimTypes: [
        ClaimType.Supervisor,
        ClaimType.Admin,
        ClaimType.Member,
        ClaimType.Guest
      ]
    },
    children: [
      // { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'sign', component: SignUpComponent }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    RouterModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [
    ClientComponent,
    MainLPBCComponent,
    MainLVBCComponent,
    MainWIBCComponent
  ],
  entryComponents: [MainLPBCComponent, MainLVBCComponent, MainWIBCComponent],
  providers: []
})
export class ClientModule {}
*/
