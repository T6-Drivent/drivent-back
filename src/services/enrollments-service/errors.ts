import { ApplicationError } from '@/protocols';

export function enrollmentNotFoundError(): ApplicationError {
  return {
    name: 'EnrollmentNotFound',
    message: 'Enrollment not found',
  };
}
