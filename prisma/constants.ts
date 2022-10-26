export type Rooms = Room[]
export interface Room {
    number: number,
    hotelId: number,
    size: string
}
export const roomsConstant : Rooms = [
    {
      number: 101,
      hotelId: 1,
      size: 'Single'
    },
    {
      number: 102,
      hotelId: 1,
      size: 'Single'
    },
    {
      number: 103,
      hotelId: 1,
      size: 'Single'
    },
    {
      number: 104,
      hotelId: 1,
      size: 'Single'
    },
    {
      number: 201,
      hotelId: 1,
      size: 'Double'
    },
    {
      number: 202,
      hotelId: 1,
      size: 'Double'
    },
    {
      number: 203,
      hotelId: 1,
      size: 'Double'
    },
    {
      number: 204,
      hotelId: 1,
      size: 'Double'
    },
    {
      number: 101,
      hotelId: 2,
      size: 'Double'
    },
    {
      number: 102,
      hotelId: 2,
      size: 'Double'
    },
    {
      number: 103,
      hotelId: 2,
      size: 'Double'
    },
    {
      number: 104,
      hotelId: 2,
      size: 'Double'
    },
    {
      number: 201,
      hotelId: 2,
      size: 'Double'
    },
    {
      number: 202,
      hotelId: 2,
      size: 'Double'
    },
    {
      number: 203,
      hotelId: 2,
      size: 'Double'
    },
    {
      number: 204,
      hotelId: 2,
      size: 'Double'
    },
     {
      number: 101,
      hotelId: 3,
      size: 'Single'
    },
    {
      number: 102,
      hotelId: 3,
      size: 'Single'
    },
    {
      number: 103,
      hotelId: 3,
      size: 'Double'
    },
    {
      number: 104,
      hotelId: 3,
      size: 'Double'
    },
    {
      number: 201,
      hotelId: 3,
      size: 'Triple'
    },
    {
      number: 202,
      hotelId: 3,
      size: 'Triple'
    },
    {
      number: 203,
      hotelId: 3,
      size: 'Triple'
    },
    {
      number: 204,
      hotelId: 3,
      size: 'Triple'
    },

  ]

export type Hotels = Hotel[];
export interface Hotel {
    name: string,
    image: string
}
export const hotelsConstant : Hotels = [
    {
      name: 'Driven Resort',
      image: 'https://media-magazine.trivago.com/wp-content/uploads/2020/07/14123310/resorts-em-salvador-bahia-gran-hotel-stella-maris-piscina.jpeg' 
    },
    {
      name: 'Driven Palace',
      image: 'https://carltonhoteis.com.br/wp-content/uploads/2019/08/palace-banner.jpg'
    },
    {
      name: 'Driven World',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhCRVDVUQ7eP0hYTiYhrpQjzAPtv2QhY8E-Jexqzn2hUSnSTpIlQtc5dX9NO3Fwb-v6mE&usqp=CAU'
    }
  ];