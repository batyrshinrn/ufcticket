import * as React from 'react';
import EventEntry from './components/EventEntry';
import styled from 'styled-components';
import { UfcEvent } from '../../model';
import { RootState } from '../../store/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { getEvents } from '../../store/actions'
import { getEventsSelector } from '../../store/selector'

interface IEventsViewProps {
}

const EventsContainer = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    height: 100%;
    padding: 0 35px;
`

const Title = styled.div`
    height: 100px;
    display: flex;
    align-items: flex-end;
    padding: 0px 0 30px 0;
    box-sizing: border-box;
    font-size: 20px;
    font-weight: bold;
    justify-content: space-between;

    .past {
        color: #b3b7c8;
        font-size: 17px;
        margin-left: 10px;
    }
`

const Content = styled.div`
    flex: 1 1 0;
    overflow-y: auto;
`

const Centered = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .fa-spin {
        font-size: 40px;
        color: #c7c7c7;
    }
`

const EventsView: React.FunctionComponent<IEventsViewProps> = (props) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getEvents())
    }, [])

    const events: UfcEvent[] = useSelector((state: RootState) => getEventsSelector(state));
    const eventsLoading: boolean = useSelector((state: RootState) => state.ufcEvent.loading);

    let eventEntries = events.map(event =>
        <EventEntry
            id={event.Id}
            key={event.Id}
            place={event.Place}
            date={event.Date}
            arena={event.Arena}
            eventTitle={event.Title}
            athlete1={event.Athlete1}
            athlete2={event.Athlete2} />)


    return (
        eventsLoading && events.length === 0
            ? <Centered><i className="fas fa-spinner fa-spin"></i></Centered>
            : <EventsContainer>
                <Title>
                    <div className="upcoming">Upcoming Events</div>
                    <div className="past">Past Events</div>
                </Title>
                <Content>{eventEntries}</Content>
            </EventsContainer>);
};

export default EventsView;