import { generateDates } from "../utils/format";

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

export   const dates = generateDates(7);
