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
import { Subscriber, Subscription } from 'rxjs';
import { RouteName } from '../routename';
import { MetaService } from '../Module_Shared/meta.service';
import { IClub, IUser } from '../Module_Firebase/models';
import { MainLVBCComponent } from './LVBC/main-lvbc.component';
import { MainWIBCComponent } from './WIBC/main-wibc.component';
import { EventService } from '../Module_Core/services/pubsub.service';
import { OnEvent } from '../Module_Shared';
import { switchMap } from 'rxjs/operators';

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
    private route: ActivatedRoute,
    private metaService: MetaService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.originUrl = this.router.url;
    this.sub = this.route.queryParams.subscribe(params => {
      this.clubId = params['clubId'];
      this.chooseClubPComponent();
    });
    this.showClubMain = true;
    this.metaService.authState
      .pipe(switchMap(_ => this.metaService.LoggedInUser))
      .subscribe(user => {
        if (!user) {
          return;
        }
        this.loggedInUser = user[0];
        if (this.cmpRef) {
          this.cmpRef.instance['loggedInUser'] = this.loggedInUser;
        }
      });
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
    // to access the created instance use
    // this.compRef.instance.someProperty = 'someValue';
    // this.compRef.instance.someOutput.subscribe(val => doSomething());
  }
  onOutletActivate($event) {
    // console.log($event);
    this.showClubMain = false;
    const outletComponentName = $event.constructor.name;
  }
  onOutletDeactivate($event) {
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
    this.sub.unsubscribe();
  }
}
