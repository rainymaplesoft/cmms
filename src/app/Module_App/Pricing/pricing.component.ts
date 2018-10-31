import { Component, OnInit } from '@angular/core';
import { MetaService } from '../meta.service';
import { ClubService } from '../_shared';

@Component({
  selector: 'app-pricing',
  templateUrl: 'pricing.component.html',
  styleUrls: ['pricing.component.scss']
})
export class PricingComponent implements OnInit {
  constructor(
    private metaService: MetaService,
    private clubService: ClubService
  ) {}

  priceMember = 0;
  priceGuest = 0;

  ngOnInit() {
    const clubId = this.metaService.getUrlClubId();
    if (!clubId) {
      return;
    }
    this.clubService.getClubById(clubId).subscribe(club => {
      this.priceMember = club.priceMember;
      this.priceGuest = club.priceGuest;
    });
  }
}
