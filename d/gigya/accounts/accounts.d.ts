import { Events } from '../events/events';
import { Response } from '../socialize/response';

import { CustomButton } from './customButton';
import { Identity } from '../socialize/identity';
import { User } from '../socialize/user';
import { LoginEvent } from '../events/loginEvent';

declare interface DictionaryDefinition {
  [key: string]: string;
}

export interface ShowScreenSetParams extends Events {
  screenSet: string;
  containerID?: string;
  authFlow?: string;
  cid?: string;
  context?: {};
  customButtons?: CustomButton[];
  customLang?: DictionaryDefinition[];
  dialogStyle?: string;
  deviceType?: string;
  enabledProviders?: string;
  googlePlayAppID?: string;
  lang?: string;
  mobileScreenSet?: string;
  redirectMethod?: string;
  redirectURL?: string;
  regSource?: string;
  regToken?: string;
  sessionExpiration?: number;
  startScreen?: string;
}

export interface Emails {
  verified: string[];
  unverified: string[];
}

export interface Location {
  country: string;
  state: string;
  city: string;
  coordinates: {
    lat: number,
    lon: number
  };
}

export interface LoginID {
  username: string;
  emails: string[];
  unverifiedEmails: string[];
}

export interface AccountInfo extends Response {
  UID?: string;
  UIDSignature?: string;
  signatureTimestamp?: string;
  created?: string;
  createdTimestamp?: number;
  data?: {};
  emails?: Emails;
  identities?: Identity[];
  iRank?: number;
  isActive?: boolean;
  isLockedOut?: boolean;
  isRegistered?: boolean;
  isVerified?: boolean;
  lastLogin?: string;
  lastLoginLocation?: Location;
  lastLoginTimestamp?: number;
  lastUpdated?: string;
  lastUpdatedTimestamp?: number;
  loginIDs?: LoginID[];
  loginProvider?: string;
  oldestDataUpdated?: string;
  oldestDataUpdatedTimestamp?: number;
  profile?: User;
  registered?: string;
  registeredTimestamp?: string;
  regSource?: string;
  socialProviders?: string;
  verified?: string;
  verifiedTimestamp?: string;
}

export interface GetAccountInfoParams {
  include?: string;
  extraProfileFields?: string;
  callback?: (response: AccountInfo) => void;
  cid?: string;
  context?: {};
}

export interface EventHandlers {
  onLogin?: (event: LoginEvent) => void;
  onLogout?: (event: {}) => void;
  callback?: (event: {}) => void;
  cid?: string;
  context?: {};
}

export interface LogoutParams {
  callback?: (response: Response) => void;
  cid?: string;
  forceProvidersLogout?: boolean;
  context?: {};
}

export interface Accounts {
  addEventHandlers(handlers: EventHandlers): void;
  getAccountInfo(params: GetAccountInfoParams): void;
  showScreenSet(params: ShowScreenSetParams): void;
  logout(params: LogoutParams): void;
}
