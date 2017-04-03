import { Identity } from './identity';

declare interface Capabilities {
  login?: boolean;
  notifications?: boolean;
  actions?: boolean;
  friends?: boolean;
  status?: boolean;
  contacts?: boolean;
  photos?: boolean;
}

declare interface Certification {
  name?: string;
  authority?: string;
  number?: string;
  startDate?: string;
  endDate?: string;
}

declare interface Education {
  school?: string;
  schoolType?: string;
  fieldOfStudy?: string;
  degree?: string;
  startYear?: string;
  endYear?: string;
}

declare interface Favourite {
  id?: string;
  name?: string;
  category?: string;
}

declare type Gender = 'f' | 'm' | 'u';

declare interface Identities {
  [key: string]: Identity;
}

declare interface Like {
  name?: string;
  category?: string;
  id?: string;
  time?: string;
  timestamp?: number;
}

declare interface Patent {
  title?: string;
  summary?: string;
  number?: string;
  office?: string;
  status?: string;
  date?: string;
  url?: string;
}

declare interface Phone {
  type?: string;
  number?: string;
}

declare interface Publication {
  title?: string;
  summary?: string;
  publisher?: string;
  date?: string;
  url?: string;
}

declare interface Skill {
  skill?: string;
  level?: string;
  years?: string;
}

declare interface Work {
  company?: string;
  companyID?: string;
  title?: string;
  companySize?: string;
  startDate?: string;
  endDate?: string;
  industry?: string;
  isCurrent?: boolean;
}

export interface User {
  firstName?: string;
  lastName?: string;
  nickname?: string;
  address?: string;
  age?: number;
  bio?: string;
  birthDay?: number;
  birthMonth?: number;
  birthYear?: number;
  capabilities?: Capabilities;
  certifications?: Certification[];
  city?: string;
  country?: string;
  education?: Education[];
  educationLevel?: string;
  email?: string;
  favorites?: Favourite[];
  followersCount?: number;
  followingCount?: number;
  gender?: Gender;
  hometown?: string;
  honors?: string;
  identities?: Identities;
  industry?: string;
  interestedIn?: string;
  interests?: string;
  isConnected?: boolean;
  iRank?: number;
  isSiteUID?: boolean;
  isSiteUser?: boolean;
  languages?: string;
  likes?: Like[];
  locale?: string;
  loginProvider?: string;
  loginProviderUID?: string;
  name?: string;
  oldestDataAge?: number;
  oldestDataUpdatedTimestamp?: number;
  patents?: Patent[];
  phones?: Phone[];
  photoURL?: string;
  politicalView?: string;
  professionalHeadline?: string;
  profileURL?: string;
  providers?: string[];
  publications?: Publication[];
  relationshipStatus?: string;
  religion?: string;
  samlData?: {};
  signatureTimestamp?: number;
  skills?: Skill[];
  specialities?: string;
  state?: string;
  timezone?: string;
  thumbnailURL?: string;
  UID?: string;
  UIDSignature?: string;
  username?: string;
  isVerified?: boolean;
  verified?: string | boolean;
  verifiedTimestamp?: number;
  work?: Work[];
  zip?: string;
}
