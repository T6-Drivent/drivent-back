import { createRegistrationSchema } from '../../src/schemas/registration-schemas';
import { generateRegistration } from '../factories/registration-factory';

describe('Create Registration Schema', () => {
  it('should return an error if input is null', () => {
    const validation = createRegistrationSchema.validate(null);

    expect(validation.error).toBeDefined();
  });

  it('should return an error if there is an invalid field on input', () => {
    const input = generateRegistration();

    const validation = createRegistrationSchema.validate({ ...input, invalid: 'invalid' });

    expect(validation.error).toBeDefined();
  });

  it('should return an error if "charge" is not defined', () => {
    const { type } = generateRegistration();

    const validation = createRegistrationSchema.validate({ type });

    expect(validation.error).toBeDefined();
  });

  it('should return an error if "charge" is inferior than zero', () => {
    const input = generateRegistration({ charge: -1 });

    const validation = createRegistrationSchema.validate(input);

    expect(validation.error).toBeDefined();
  });

  it('should return an error if "type" is not defined', () => {
    const { charge } = generateRegistration();

    const validation = createRegistrationSchema.validate({ charge });

    expect(validation.error).toBeDefined();
  });

  it('should return an error if "type" is different than "online" or "inPerson"', () => {
    const input = generateRegistration();

    const validation = createRegistrationSchema.validate({ ...input, type: 'invalid' });

    expect(validation.error).toBeDefined();
  });

  it('should successfully validate the input without returning an error', () => {
    const input = generateRegistration();

    const validation = createRegistrationSchema.validate(input);

    expect(validation.error).toBeUndefined();
  });
});
