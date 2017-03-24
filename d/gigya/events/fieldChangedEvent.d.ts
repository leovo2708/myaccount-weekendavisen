import { Event } from './event';

export interface FieldChangedEvent extends Event {
  screen: string;
  form: string;
  field: string;
  isValid: boolean;
  errMsg: string;
  value: string;
}
