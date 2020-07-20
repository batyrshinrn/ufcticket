import { createSelector } from "reselect";

import { RootState } from "../reducers";
import { getEventsSelector } from ".";
import { UfcEvent } from "../../model";

export const getSelectionSelector = (state: RootState) => state.seats.selection;
export const getSelectionPosition = (state: RootState) => state.seats.position;

export const getOrder = (state: RootState) => state.seats.order;

export const getOrderEvent = createSelector(
    getOrder,
    getEventsSelector,
    (order, events): UfcEvent => {
        if (order == null) {
            return null;
        }
        console.log("get order event");

        let [selectedEvent] = events.filter((ev) => ev.Id === order.eventId);
        return selectedEvent;
    }
);

export const getOrderData = createSelector(
    getOrderEvent,
    getOrder,
    (event, order): {
        event: UfcEvent;
        seats: { [sector: number]: string[] };
    } => {
        if (order == null) {
            return null;
        }

        console.log("get order data");

        return {
            event: event,
            seats: order.seats,
        };
    }
);
