import { NgModule } from '@angular/core';

import { ClientComponent } from './client.component';
import { ClaimType } from '../Module_App/_Shared';
import { Routes, RouterModule } from '@angular/router';
import { MainLPBCComponent } from './LPBC/main-lpbc.component';
import { MainLVBCComponent } from './LVBC/main-lvbc.component';
import { MainWIBCComponent } from './WIBC/main-wibc.component';
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
      {
        path: 'lvbc',
        component: MainLVBCComponent,
        canDeactivate: []
      },
      {
        path: 'wibc',
        component: MainWIBCComponent,
        canDeactivate: []
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule, RouterModule.forChild(routes)],
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
