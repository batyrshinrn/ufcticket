import { Athlete } from "./Athlete"

export interface UfcEvent {
    Id: string,
    Place: string,
    Date: Date,
    Arena: string,
    Title: string,
    Athlete1: Athlete,
    Athlete2: Athlete
}