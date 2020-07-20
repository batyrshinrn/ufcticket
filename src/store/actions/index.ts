import * as eventActions from './event-actions';
import * as seatsActions from './seats-actions';

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type EventActionTypes = ReturnType<InferValueTypes<typeof eventActions>>;
export type SeatsActionTypes = ReturnType<InferValueTypes<typeof seatsActions>>;

export * from './event-actions';
export * from './seats-actions';

