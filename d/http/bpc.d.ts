export interface UserTicket {
  algorithm: string;
  app?: string;
  exp?: number;
  ext?: any;
  grant?: string;
  id: string;
  key: string;
  scope?: string[];
  user?: string;
}

export interface RsvpPayload {
  app?: string;
  provider?: string;
  UID: string;
  UIDSignature: string;
  signatureTimestamp: string;
  email: string;
}
