import { Event } from './event';
import { User } from '../socialize/user';

export interface LoginEvent extends Event {
  loginMode?: string;
  provider?: string;
  UID?: string;
  UIDSignature?: string;
  profile?: User;
  signatureTimestamp?: string;
  fullEventName?: string;
  newUser?: boolean;
  data?: {};
  remember?: boolean;
}
