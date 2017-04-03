import { ErrorEvent } from './errorEvent';
import { BeforeSubmitEvent } from './beforeSubmitEvent';
import { AfterSubmitEvent } from './afterSubmitEvent';
import { BeforeScreenLoadEvent } from './beforeScreenLoadEvent';
import { AfterScreenLoadEvent } from './afterScreenLoadEvent';
import { FieldChangedEvent } from './fieldChangedEvent';
import { HideEvent } from './hideEvent';
import { LoginEvent } from './loginEvent';

export interface Events {
  onAfterScreenLoad?: (event: AfterScreenLoadEvent) => void;
  onAfterSubmit?: (event: AfterSubmitEvent) => void;
  onBeforeScreenLoad?: (event: BeforeScreenLoadEvent) => void;
  onBeforeSubmit?: (event: BeforeSubmitEvent) => void;
  onError?: (event: ErrorEvent) => void;
  onFieldChanged?: (event: FieldChangedEvent) => void;
  onHide?: (event: HideEvent) => void;
  onLogin?: (event: LoginEvent) => void;
}
