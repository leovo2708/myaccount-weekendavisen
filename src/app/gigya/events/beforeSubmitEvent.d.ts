import { User } from '../socialize/user';

import { Event } from './event';

export interface BeforeSubmitEvent extends Event {
  screen: string;
  form: string;
  profile: User;
  formData: {};
  nextScreen: string;
}
