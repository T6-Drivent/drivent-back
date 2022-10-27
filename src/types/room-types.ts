export type RoomsWithReservations = {
  number: number;
  Reservation: {
    id: number;
    userId: number;
  }[];
  id: number;
  hotelId: number;
  size: number;
}[];
