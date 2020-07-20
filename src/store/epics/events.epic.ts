import { Epic, ofType } from 'redux-observable'
import * as EventActions from '../actions'
import { switchMap, filter, map } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'

//services
import { getEvents, getEvent } from '../../service/events.service'

type Action = EventActions.EventActionTypes;

import { GET_EVENTS, GET_EVENT } from '../actions/event-types'
import { RootState } from '../reducers'

export const eventsGetEpic: Epic<Action, Action, RootState> = (action$, store) =>
    action$
        .pipe(
            filter(isOfType(GET_EVENTS)),
            switchMap(() =>
                getEvents().pipe(
                    map(response => EventActions.setEvents(response))
                ))
        );

export const eventGetEpic: Epic<Action, Action, RootState> = (action$, store) =>
    action$
        .pipe(
            filter(isOfType(GET_EVENT)),
            switchMap((action) =>
                getEvent(action.payload).pipe(
                    map(response => EventActions.setEvent(response))
                )
            )
        );