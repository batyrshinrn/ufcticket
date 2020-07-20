import { UfcEvent } from '../../model'
import { EventActionTypes } from '../actions'
import { GET_EVENTS, SET_EVENTS, ERROR_EVENTS, GET_EVENT, SET_EVENT } from '../actions/event-types'

export type UfcEventsState = {
    events: UfcEvent[],
    loading: boolean

}

const initialState: UfcEventsState = {
    events: [],
    loading: false
}

export function ufcEventsReducer(state = initialState, action: EventActionTypes)
    : UfcEventsState {
    switch (action.type) {
        case GET_EVENTS:
            return {
                ...state,
                loading: true
            }

        case SET_EVENTS:
            return {
                ...state,
                loading: false,
                events: action.payload
            }

        case GET_EVENT: {
            return {
                ...state,
                loading: true
            }
        }

        case SET_EVENT: {
            let event = action.payload;
            let eventIndex = state.events.findIndex(ev => ev.Id === event.Id);
            let events = eventIndex === -1
                ? (state.events || []).concat([event])
                : [...state.events.slice(0, eventIndex - 1), event, ...state.events.slice(eventIndex + 1)];

            return {
                ...state,
                events: events
            }
        }

        default:
            return state;
    }
}