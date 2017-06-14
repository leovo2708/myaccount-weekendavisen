import { Component, Input } from '@angular/core';

import { Offer } from '../offer/offer.model';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent {
  @Input() offer: Offer;
}
