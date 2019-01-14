import {
  Component,
  OnInit,
  Type,
  ComponentRef,
  ComponentFactoryResolver,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
  AfterViewChecked,
  ComponentFactory
} from '@angular/core';
import { MainLPBCComponent } from './LPBC/main-lpbc.component';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainLVBCComponent } from './LVBC/main-lvbc.component';
import { MainWIBCComponent } from './WIBC/main-wibc.component';
import { IUser, IClub } from '../../Module_Firebase';
import { MetaService } from '../meta.service';
import { UtilService } from '../../Module_Core/services/util.service';
import { RouteName } from '../../routename';
import { filter } from 'rxjs/operators';
import { ClubService } from '../_shared';
@Component({
  selector: 'app-client',
  templateUrl: 'client.component.html',
  styleUrls: ['client.component.scss']
})
export class ClientComponent
  implements OnInit, OnChanges, OnDestroy, AfterViewInit, AfterViewChecked {
  @ViewChild('club_placehoder', { read: ViewContainerRef })
  target: ViewContainerRef;

  cmpRef: ComponentRef<any>;
  cmpFactory: ComponentFactory<Component>;
  cmpType: Type<any>;
  sub: Subscription;
  clubId: string;
  clubTypes = {
    LPBC: MainLPBCComponent,
    LVBC: MainLVBCComponent,
    WIBC: MainWIBCComponent,
    CCBC: MainWIBCComponent,
    CDBC: MainWIBCComponent,
    CEBC: MainWIBCComponent,
    CFBC: MainWIBCComponent
  };
  loggedInUser: IUser;
  url = '';
  isOutletActivated = false;
  get showClubMain() {
    return !this.isOutletActivated;
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private clubService: ClubService,
    private metaService: MetaService
  ) {}

  ngOnInit() {
    this.url = this.router.url;
    this.clubId = this.metaService.getUrlClubId(this.url);
    const loggedInClubId = this.metaService.loggedInclubId;
    if (loggedInClubId && loggedInClubId !== this.clubId) {
      this.metaService.signOut();
    }
    this.chooseClubPComponent();
  }

  chooseClubPComponent() {
    this.clubService.getClubById(this.clubId).subscribe((club: IClub) => {
      if (!club) {
        this.router.navigate([RouteName.Home]);
        return;
      }
      this.cmpType = this.clubTypes[club.clubCode];
      if (!this.cmpType) {
        this.router.navigate([RouteName.Home]);
        return;
      }
      this.loadClubComponent(this.cmpType);
    });
  }

  loadClubComponent(cmpType: Type<any>) {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }

    const factory = this.componentFactoryResolver.resolveComponentFactory(
      cmpType
    );
    if (this.target) {
      this.cmpRef = this.target.createComponent(factory);
    }
    // this.cmpRef.instance['loggedInUser'] = this.metaService.LoggedInUser;
  }
  onOutletActivate($event) {
    this.isOutletActivated = true;
    const outletComponentName = $event.constructor.name;
  }

  onOutletDeactivate($event) {
    //// navigate away the club page, log out anyway
    // if (this.originUrl !== this.router.url) {
    //   return;
    // }
    // this.isOutletActivated = false;
    // this.chooseClubPComponent();
  }

  ngOnChanges() {}
  ngAfterViewChecked() {}
  ngAfterViewInit() {}

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }
}
