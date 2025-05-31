export interface Seat {
  seatNumber: number;
  status: 'disponible' | 'preferencial' | 'vip' | 'ocupado';
  price: number;
}

export interface ZoneDesign {
  id: number;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  capacity: number;
  price: number;
  normalPrice: number;
  preferencialPrice: number;
  vipPrice: number;
  seatRows: Seat[][];
}

export interface EventModel {
  id: string;
  title: string;
  location: string;
  // organizer: string;
  tags?: string[];
  date: string;
  description?: string;
  image?: string;
  organizer: {
    id: string;
    name: string;
  }
}


export interface EventToCreate {
  id?: string;
  title: string;
  location: string;
  organizer?: string;
  tags: string[];
  date: string;
  description: string;
};