import { Event } from './event';

export interface HideEvent extends Event {
  reason: 'canceled' | 'finished';
}
