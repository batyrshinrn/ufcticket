import { createSelector } from 'reselect'
import { RootState } from '../reducers'

//router selectors
import { getEventId } from './router.selector'

export const getEventsSelector = (state: RootState) => state.ufcEvent.events;

export const getSelectedEvent = createSelector(
    getEventsSelector,
    getEventId,
    (events, id) => {
        if (id && (events || []).length !== 0) {
            let eventIndex = events.findIndex(ev => ev.Id === id);
            if (eventIndex !== -1) {
                return events[eventIndex];
            }
        }

        return null;
    }
)