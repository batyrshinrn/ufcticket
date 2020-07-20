import { ufcEventsReducer, UfcEventsState } from './events.reducer'
import { combineReducers } from 'redux'
import { History } from 'history'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { seatsReducer } from './seats.reducer'

type GetReturnType<original extends Function> = original extends (...args:any[]) => infer returnType ? returnType : never;

export type RootState = ReturnType<GetReturnType<typeof rootReducer>>;

export const rootReducer = (history: History) => {
    return combineReducers({
        router: connectRouter(history),
        seats:  seatsReducer,
        ufcEvent: ufcEventsReducer
    });
}