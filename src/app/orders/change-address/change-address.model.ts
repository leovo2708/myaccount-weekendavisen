import { ChangeAddressPayload } from '../../../../d/kundeunivers';

export class ChangeAddressModel implements ChangeAddressPayload {
  public lastname?: string = '';
  public zipcode?: string = '';
  public city?: string = '';
  public street?: string = '';
  public number?: string = '';
  public phone?: string = '';
  public message?: string = '';
  public firstname?: string = '';
  public co?: string = '';
  public letter?: string = '';
  public floor?: string = '';
  public side?: string = '';
}
