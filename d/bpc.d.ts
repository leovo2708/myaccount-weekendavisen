export interface BaseTicket {
  algorithm: string;
  app?: string;
  id: string;
  key: string;
}

export interface NewPassword {
  email: string;
  newPassword: string;
}

export interface Ticket extends BaseTicket {
  exp: number;
  ext: any;
  grant: string;
  scope: string[];
  user: string;
  statusCode: number;
  error: string;
  message: string;
}
