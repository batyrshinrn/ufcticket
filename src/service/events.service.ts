import { Athlete } from "../model/Athlete";
import { UfcEvent } from "../model/UfcEvent";
import { Observable, of, observable } from 'rxjs'
import { delay } from "rxjs/operators";

const data = [
    {
        Id: "1",
        Place: "Moscow / Russia",
        Date: new Date("2020/11/09 20:00"),
        Arena: "CSKA Arena",
        Title: "Ufc fight night 163",
        Athlete1: {
            name: "Randy Costa",
            image: "http://dmxg5wxfqgb4u.cloudfront.net/styles/event_results_athlete_headshot/s3/2019-04/COSTA_RANDY.png"
        } as Athlete,
        Athlete2: {
            name: "Jones",
            image: "http://dmxg5wxfqgb4u.cloudfront.net/styles/event_results_athlete_headshot/s3/2019-11/JONES_JON.png"
        } as Athlete
    },
    {
        Id: "2",
        Place: "Brooklyn, NY United States",
        Date: new Date("2020/04/19 20:00"),
        Arena: "Barclays Center",
        Title: "Ufc fight night 163",
        Athlete1: {
            name: "Khabib",
            image: "http://dmxg5wxfqgb4u.cloudfront.net/styles/event_results_athlete_headshot/s3/2019-11/NURMAGOMEDOV_KHABIB_BELT.png"
        } as Athlete,
        Athlete2: {
            name: "Ferguson",
            image: "http://dmxg5wxfqgb4u.cloudfront.net/styles/event_results_athlete_headshot/s3/2019-11/JONES_JON.png"
        } as Athlete
    },
    {
        Id: "3",
        Place: "Moscow / Russia",
        Date: new Date("2020/11/09 20:00"),
        Arena: "CSKA Arena",
        Title: "Ufc fight night 163",
        Athlete1: {
            name: "Randy Costa",
            image: "http://dmxg5wxfqgb4u.cloudfront.net/styles/event_results_athlete_headshot/s3/2019-04/COSTA_RANDY.png"
        } as Athlete,
        Athlete2: {
            name: "Jones",
            image: "http://dmxg5wxfqgb4u.cloudfront.net/styles/event_results_athlete_headshot/s3/2019-11/JONES_JON.png"
        } as Athlete
    },
    {
        Id: "4",
        Place: "Brooklyn, NY United States",
        Date: new Date("2020/04/19 20:00"),
        Arena: "Barclays Center",
        Title: "Ufc fight night 163",
        Athlete1: {
            name: "Khabib",
            image: "http://dmxg5wxfqgb4u.cloudfront.net/styles/event_results_athlete_headshot/s3/2019-11/NURMAGOMEDOV_KHABIB_BELT.png"
        } as Athlete,
        Athlete2: {
            name: "Ferguson",
            image: "http://dmxg5wxfqgb4u.cloudfront.net/styles/event_results_athlete_headshot/s3/2019-11/JONES_JON.png"
        } as Athlete
    }
];

export function getEvents(): Observable<UfcEvent[]> {
    let observable = of(data)
        .pipe(
            delay(1000)
        );

    return observable;
}

export function getEvent(id: string): Observable<UfcEvent> {
    let eventIndex = data.findIndex(ev => ev.Id === id);
    let observable = eventIndex !== -1
        ? of(data[eventIndex]) 
        : of(null);

    return observable.pipe(
        delay(500)
    );
}