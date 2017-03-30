import { User } from '../socialize/user';

import { Event } from './event';

export interface BeforeScreenLoadEvent extends Event {
  currentScreen: string;
  form: string;
  profile: User;
  data: {};
  nextScreen: string;
  response: {};
}
