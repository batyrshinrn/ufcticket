import { SeatsActionTypes } from "../actions"
import { SET_SELECTION, CLEAR_POSITION, SET_ORDER, CLEAR_ORDER } from "../actions/seats-types"
import { Order } from "../../model/Order";

export type SeatsState = {
    selection: { [sector: string]: string[] },
    position: { x: number, y: number },
    order: Order
}

const initialState: SeatsState = {
    selection: {},
    position: { x: 0, y: 0 },
    order: null
}

export function seatsReducer(state = initialState, action: SeatsActionTypes) {
    switch (action.type) {
        case SET_SELECTION:
            let selection = action.payload.seats;
            let updatedSelection = { ...state.selection };
            for (let sector in selection) {
                updatedSelection[sector] = selection[sector];
            }

            return {
                ...state,
                selection: updatedSelection,
                position: action.payload.position
            }
        case CLEAR_POSITION: {
            return {
                ...state,
                position: null
            }
        }
        case SET_ORDER: {
            let { selection } = state;
            console.log("set order");

            return {
                ...state,
                order: {
                    eventId: action.payload.eventId,
                    seats: selection
                }
            }
        }

        case CLEAR_ORDER: {
            return {
                ...state,
                order: null
            }
        }
        
        default: return state;
    }
}