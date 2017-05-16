import { SuspendOrderPayload } from '../../../../d/kundeunivers';

export class SuspendOrderModel implements SuspendOrderPayload {
  public fromdate?: string = '';
  public enddate?: string = '';
  public digital_access?: boolean = false;
}
