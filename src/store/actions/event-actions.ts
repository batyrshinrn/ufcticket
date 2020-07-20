import * as Types from './event-types'
import { UfcEvent } from '../../model/UfcEvent'

export const getEvents = () => ({
    type: Types.GET_EVENTS
} as const)

export const setEvents = (events: UfcEvent[]) => ({
    type: Types.SET_EVENTS,
    payload: events
} as const)

export const errorEvents = (error: string) => ({
    type: Types.ERROR_EVENTS,
    payload: error
} as const)

 export const getEvent = (id: string) => ({
     type: Types.GET_EVENT,
     payload: id
 } as const)

 export const setEvent = (event: UfcEvent) => ({
     type: Types.SET_EVENT,
     payload: event
 } as const)

 export const errorEvent = (error: string) => ({
    type: Types.ERROR_EVENT,
    payload: error
} as const)