export interface Order {
  eventId: string;
  seats: { [sector: number]: string[] };
}
