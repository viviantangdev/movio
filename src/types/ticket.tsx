import type { MovieData } from './movie';

export interface Seat {
  id: string;
  row: number;
  number: number;
}

export const TICKET_PRICE = 100;
export const TICKET_CURRENCY = '$';

export interface Showtime {
  time: string;
  isFull: boolean;
}

export interface Schedule {
  [date: string]: Showtime[]; // e.g., { "2025-10-28": [ { time: "13:00", isFull: false } ] }
}
export interface MovieWithSchedule extends MovieData {
  schedule: Schedule;
}
