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
    normalPrice: number;
    preferencialPrice: number;
    vipPrice: number;
    seatRows: Seat[][];
  }
  
  export interface EventDate {
    id: string; // e.g. "2025-05-23-barcelona"
    city: string;
    venue: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:mm
    design: ZoneDesign[];
  }
  
  export interface Event {
    id: string; // ejemplo "bad-bunny-world-tour"
    name: string;
    image: string;
    description: string;
    dates: EventDate[];
  }
  