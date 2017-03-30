import { Event } from './event';

export interface ErrorEvent extends Event {
  screen: string;
  form: string;
  response: {};
}
