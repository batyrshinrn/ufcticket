import * as Types from './seats-types'
import { Order } from '../../model/Order'

export const setSelection = (position: { x: number, y: number }, seats: { [sector: string]: string[] }) => ({
    type: Types.SET_SELECTION,
    payload: {
        position: position,
        seats: seats
    }
} as const)

export const clearPosition = () => ({
    type: Types.CLEAR_POSITION,
} as const)

export const setOrder = (eventId: string ) => ({
    type: Types.SET_ORDER,
    payload: {
        eventId: eventId
    }
} as const)

export const clearOrder = () => ({
    type: Types.CLEAR_ORDER
} as const)