import { Reservation } from '@prisma/client';

export type CreateReservation = Omit<Reservation, 'id' | 'createdAt' | 'userId'>;

export type HotelWithReservation = {
  name: string;
  image: string;
  room: string;
  reservations: {
    userId: number;
  }[];
};
