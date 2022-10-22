import { CreateRegistrationParams } from '../../src/types/registration-types';

type GenerateRegistrationInput = Partial<CreateRegistrationParams>;

export function generateRegistration(params: GenerateRegistrationInput = {}) {
  const registrationParams: CreateRegistrationParams = {
    type: 'online',
    charge: 10000,
    ...params,
  };

  return registrationParams;
}
