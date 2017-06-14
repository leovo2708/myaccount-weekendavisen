import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PurchaseService } from '../purchase.service';
import { CityResponse, CreateOrderResponse, CreateOrderPayload, Offer, OffersResponse } from '../../../../d/kundeunivers';
import { WindowRef } from '../../common/window-ref';
import { Subscription } from 'rxjs/Subscription';

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

  getParsedFormValue(form: FormGroup): CreateOrderPayload {
    return {
      firstname: form.controls.firstname.value,
      lastname: form.controls.lastname.value,
      zipcode: form.controls.zipcode.value,
      city: form.controls.city.value,
      email: form.controls.email.value,
      phone: form.controls.phone.value,
      terms: form.controls.terms.value,
      offer_id: form.controls.offer_id.value,
      ...this.parseAddress(form.controls.address.value)
    };
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

  parseAddress(address: string): any {
    const [street, addressParts] = this.parseStreetName(address);
    const addressPartsMatch: RegExpMatchArray = addressParts
      .match(/\u0020?([0-9]{0,3})\u0020?([A-Z1-9])?\u0020?([0-9]{0,2})?\u0020?([0-9]{0,4}|[A-Z]{1,4})?/i);

    return {
      street,
      number: addressPartsMatch[1],
      letter: addressPartsMatch[2],
      floor: addressPartsMatch[3],
      side: addressPartsMatch[4]
    };
  }

  parseStreetName(address: string): string[] {
    const addressTrimmed: string = address.trim();
    const foundStreetName: string = this.city.streets.find((street: string) => addressTrimmed.indexOf(street) === 0);

    if (foundStreetName) {
      return [
        foundStreetName,
        addressTrimmed.replace(foundStreetName, '').trim()
      ];
    }

    return null;
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
      this.purchaseService.createOrder(this.getParsedFormValue(form))
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
        .filter(() => this.form.controls.zipcode.valid)
        .subscribe((zipCode: string) => {
          this.purchaseService.findCity(zipCode)
            .then((cityResponse: CityResponse) => {
              this.city = cityResponse;
              this.form.controls.city.setValue(this.city.city);
            });
        })
    );
  }
}
