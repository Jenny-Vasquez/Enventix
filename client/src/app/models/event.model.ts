import { Review } from './review.model';

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
  
  export interface Event {
    id: string;
    name: string;
    image: string;
    description: string;
    design: ZoneDesign[];
    reviews?: Review[];
  }
  
