import { ApplicationError } from '@/protocols';

export function duplicatedEmailError(): ApplicationError {
  return {
    name: 'DuplicatedEmailError',
    message: 'There is already an user with given email',
  };
}

export function userNotFoundError(): ApplicationError {
  return {
    name: 'UserNotFoundError',
    message: 'User not found',
  };
}
