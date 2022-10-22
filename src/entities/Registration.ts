import { CreateRegistration } from '../types/registration-types';
import { Entity } from './Entity';

export type RegistrationProps = CreateRegistration;

export class Registration extends Entity<RegistrationProps> {
  constructor(props: RegistrationProps) {
    super(props);
  }
}
