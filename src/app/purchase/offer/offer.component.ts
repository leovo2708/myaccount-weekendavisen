import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PurchaseService } from '../purchase.service';
import { CityResponse, CreateOrderResponse, Offer, OffersResponse } from '../../../../d/kundeunivers';
import { WindowRef } from '../../common/window-ref';
import { Subscription } from 'rxjs/Subscription';
import { OfferService } from './offer.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnDestroy, OnInit {
  city: CityResponse;
  form: FormGroup;
  formSubmittedInvalid: boolean = false;
  offers: Offer[];
  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder,
              private offerService: OfferService,
              private purchaseService: PurchaseService,
              private route: ActivatedRoute,
              private windowRef: WindowRef) {
  }

  get offerPreview(): Offer {
    return this.offers &&
      this.offers.length &&
      this.form.controls.offer_id.value &&
      this.offers.find((offer: Offer) => offer.offer_id === this.form.controls.offer_id.value);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.initForm();
    this.watchRouteParams();
    this.watchZipCode();
  }

  initForm(): void {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.minLength(4)]],
      city: [{value: '', disabled: true}, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      terms: [false, Validators.required],
      offer_id: ['', Validators.required]
    });
  }

  selectOffer(offerIdToSelect: string): void {
    this.form.controls.offer_id.setValue(
      this.offers
        .map((offer: Offer) => offer.offer_id)
        .find((offerId: string) => offerIdToSelect === offerId)
    );
  }

  submitForm(form: FormGroup): void {
    if (form.valid) {
      this.purchaseService.createOrder(this.offerService.getParsedFormValue(form, this.city.streets))
        .then((response: CreateOrderResponse) => {
          this.windowRef.redirectTo(response.url);
        });
    } else {
      this.formSubmittedInvalid = true;
    }
  }

  watchRouteParams(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params: Params) => {
        this.purchaseService.getOffers(params.offerIdList)
          .then((offersResponse: OffersResponse) => {
            this.offers = offersResponse.offers;

            if (this.offers && this.offers.length) {
              this.selectOffer(this.offers[0].offer_id);
            }
          });
      })
    );
  }

  watchZipCode(): void {
    this.subscriptions.push(
      this.form.controls.zipcode.valueChanges
        .debounceTime(300)
        .subscribe((zipCode: string) => {
          if (this.form.controls.zipcode.valid) {
            this.purchaseService.findCity(zipCode)
              .then((cityResponse: CityResponse) => {
                this.city = cityResponse;
                this.form.controls.city.setValue(this.city.city);
              });
          } else {
            this.form.controls.city.setValue(null);
          }
        })
    );
  }
}
