import { NgModule } from '@angular/core';

import { ClientComponent } from './client.component';
import { Routes, RouterModule } from '@angular/router';
import { MainLPBCComponent } from './LPBC/main-lpbc.component';
import { MainLVBCComponent } from './LVBC/main-lvbc.component';
import { MainWIBCComponent } from './WIBC/main-wibc.component';
import {
  ClaimType,
  SharedModule,
  SignUpComponent
} from 'src/app/Module_Shared';
import { AppMaterialModule } from '../Module_Core';
import { CommonModule } from '@angular/common';
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
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'lpbc', component: MainLPBCComponent },
      { path: 'lpbc/sign', component: SignUpComponent },
      {
        path: 'lvbc',
        component: MainLVBCComponent,
        canDeactivate: []
      },
      { path: 'lvbc/sign', component: SignUpComponent },
      {
        path: 'wibc',
        component: MainWIBCComponent,
        canDeactivate: []
      },
      { path: 'wibc/sign', component: SignUpComponent }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    SharedModule,
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
  providers: []
})
export class ClientModule {}
