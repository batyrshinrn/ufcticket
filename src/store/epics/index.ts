import { combineEpics } from "redux-observable";
import { eventsGetEpic, eventGetEpic } from './events.epic'

export const rootEpic = combineEpics(eventsGetEpic, eventGetEpic)