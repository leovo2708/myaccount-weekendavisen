import { User } from '../socialize/user';

import { Event } from './event';

export interface AfterSubmitEvent extends Event {
  screen: string;
  form: string;
  profile: User;
  data: {};
  response: {};
}
