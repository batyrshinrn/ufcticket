import { RootState } from "../reducers";
import { createMatchSelector } from "connected-react-router";

export const getEventId = (state: RootState) => {
    const match = createMatchSelector<RootState, { id: string }>('/booking/:id')(state);
    return match && match.params && match.params.id;
};