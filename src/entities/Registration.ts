import { CreateRegistration } from '../types/registration-types';
import { Entity } from './Entity';

export type RegistrationProps = CreateRegistration;

export class Registration extends Entity<RegistrationProps> {
  private constructor(props: RegistrationProps) {
    super(props);
  }

  static create(props: RegistrationProps) {
    const registration = new Registration(props);

    return registration;
  }
}
