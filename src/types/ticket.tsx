import { generateDates } from '../utils/format';
import type { MovieData } from './movie';

type Status = 'full' | 'available';

export interface TimeSlots {
  time: string;
  status: Status;
}

export interface Seat {
  id: string;
  row: number;
  number: number;
}

export const timeSlots: TimeSlots[] = [
  { time: '15:00', status: 'available' },
  { time: '18:00', status: 'full' },
  { time: '21:00', status: 'full' },
];
export const TICKET_PRICE = 100;
export const TICKET_CURRENCY = '$';

export const dates = generateDates(7);

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
