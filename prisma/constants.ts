export type Rooms = Room[]
export interface Room {
    number: number,
    hotelId: number,
    size: number
}
export const roomsConstant : Rooms = [
    {
      number: 101,
      hotelId: 1,
      size: 1
    },
    {
      number: 102,
      hotelId: 1,
      size: 1
    },
    {
      number: 103,
      hotelId: 1,
      size: 1
    },
    {
      number: 104,
      hotelId: 1,
      size: 1
    },
    {
      number: 201,
      hotelId: 1,
      size: 2
    },
    {
      number: 202,
      hotelId: 1,
      size: 2
    },
    {
      number: 203,
      hotelId: 1,
      size: 2
    },
    {
      number: 204,
      hotelId: 1,
      size: 2
    },
    {
      number: 101,
      hotelId: 2,
      size: 1
    },
    {
      number: 102,
      hotelId: 2,
      size: 1
    },
    {
      number: 103,
      hotelId: 2,
      size: 1
    },
    {
      number: 104,
      hotelId: 2,
      size: 2
    },
    {
      number: 201,
      hotelId: 2,
      size: 2
    },
    {
      number: 202,
      hotelId: 2,
      size: 2
    },
    {
      number: 203,
      hotelId: 2,
      size: 3
    },
    {
      number: 204,
      hotelId: 2,
      size: 3
    },
     {
      number: 101,
      hotelId: 3,
      size: 2
    },
    {
      number: 102,
      hotelId: 3,
      size: 2
    },
    {
      number: 103,
      hotelId: 3,
      size: 2
    },
    {
      number: 104,
      hotelId: 3,
      size: 2
    },
    {
      number: 201,
      hotelId: 3,
      size: 3
    },
    {
      number: 202,
      hotelId: 3,
      size: 3
    },
    {
      number: 203,
      hotelId: 3,
      size: 3
    },
    {
      number: 204,
      hotelId: 3,
      size: 3
    },

  ]

export type Hotels = Hotel[];
export interface Hotel {
    name: string,
    image: string
    commodations: string
}
export const hotelsConstant : Hotels = [
    {
      name: 'Driven Resort',
      image: 'https://media-magazine.trivago.com/wp-content/uploads/2020/07/14123310/resorts-em-salvador-bahia-gran-hotel-stella-maris-piscina.jpeg',
      commodations: 'Single e Double'
    },
    {
      name: 'Driven Palace',
      image: 'https://carltonhoteis.com.br/wp-content/uploads/2019/08/palace-banner.jpg',
      commodations: 'Single, Double e Triple'
    },
    {
      name: 'Driven World',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhCRVDVUQ7eP0hYTiYhrpQjzAPtv2QhY8E-Jexqzn2hUSnSTpIlQtc5dX9NO3Fwb-v6mE&usqp=CAU',
      commodations: 'Double e Triple'
    }
  ];