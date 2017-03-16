import { User } from '../socialize/user';

import { Event } from './event';

export interface AfterScreenLoadEvent extends Event {
  currentScreen: string;
  form: string;
  profile: User;
  data: {};
  response: {};
}
