import { Lot } from './Lot';
import { SocialNetwork } from './SocialNetwork';
import { Speaker } from './Speaker';

export class Event {

  constructor() { }

  id: number;
  place: string;
  dateEvent: Date;
  theme: string;
  qtdPerson: number;
  imageUrl: string;
  phone: string;
  email: string;
  lots: Lot[];
  socialNetworks: SocialNetwork[];
  speakerEvents: Speaker[];
}
