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
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainLVBCComponent } from './LVBC/main-lvbc.component';
import { MainWIBCComponent } from './WIBC/main-wibc.component';
import { IUser, IClub } from '../../Module_Firebase';
import { MetaService } from '../meta.service';
import { UtilService } from '../../Module_Core/services/util.service';
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
    WIBC: MainWIBCComponent
  };
  loggedInUser: IUser;
  originUrl = '';
  showClubMain = true;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private metaService: MetaService
  ) {}

  ngOnInit() {
    /*
    this.router.events
      .pipe(
        filter(e => {
          return !!e['navigationTrigger'];
        })
      )
      .subscribe(event => {
        if (this.cmpRef && this.metaService.LoggedInUser) {
          this.cmpRef.instance['loggedInUser'] = this.metaService.LoggedInUser;
        }
      });
      */
    this.originUrl = this.router.url;
    this.clubId = this.metaService.getUrlClubId(this.router.url);
    if (
      this.clubId &&
      this.metaService.clubId &&
      this.metaService.clubId !== this.clubId
    ) {
      this.metaService.signOut();
    }
    this.chooseClubPComponent();
    this.showClubMain = true;
  }

  chooseClubPComponent() {
    this.metaService.getClubById(this.clubId).subscribe((club: IClub) => {
      this.cmpType = this.clubTypes[club.clubCode];
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
    this.cmpRef = this.target.createComponent(factory);
    // this.cmpRef.instance['loggedInUser'] = this.metaService.LoggedInUser;
  }
  onOutletActivate($event) {
    this.showClubMain = false;
    const outletComponentName = $event.constructor.name;
  }
  onOutletDeactivate($event) {
    // navigate away the club page, log out anyway
    if (this.originUrl !== this.router.url) {
      return;
    }
    this.showClubMain = true;
    this.chooseClubPComponent();
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
