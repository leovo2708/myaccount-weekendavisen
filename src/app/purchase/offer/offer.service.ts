import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreateOrderPayload } from '../../../../d/kundeunivers';

@Injectable()
export class OfferService {
  getParsedFormValue(form: FormGroup, streets: string[]): CreateOrderPayload {
    return {
      firstname: form.controls.firstname.value,
      lastname: form.controls.lastname.value,
      zipcode: form.controls.zipcode.value,
      city: form.controls.city.value,
      email: form.controls.email.value,
      phone: form.controls.phone.value,
      terms: form.controls.terms.value,
      offer_id: form.controls.offer_id.value,
      ...this.parseAddress(form.controls.address.value, streets)
    };
  }

  parseAddress(address: string, streets: string[]): any {
    const [street, addressParts] = this.parseStreetName(address, streets);
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

  parseStreetName(address: string, streets: string[]): string[] {
    const addressTrimmed: string = address.trim();
    const foundStreetName: string = streets.find((street: string) => addressTrimmed.indexOf(street) === 0);

    if (foundStreetName) {
      return [
        foundStreetName,
        addressTrimmed.replace(foundStreetName, '').trim()
      ];
    }

    return null;
  }
}
