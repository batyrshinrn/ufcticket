import * as React from 'react';
import { Athlete } from '../../../model/Athlete'
import styled from 'styled-components';
import * as moment from 'moment'
import 'moment-timezone'

//route
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux';

interface IEventEntryProps {
    id: string,
    place: string,
    arena: string,
    date: Date,
    athlete1: Athlete,
    athlete2: Athlete,
    eventTitle: string
}

const EventWrapper = styled.div`
    display: grid;
    grid-template: auto auto / 220px auto 210px;
    grid-template-areas:
        "a-title a-title e-title"
        "e-images e-info e-buttons";
    max-width: 855px;
    grid-row-gap: 35px;

    &+div {
        margin-top: 55px;
    }
`

const AthletesTitle = styled.div`
    grid-area: a-title;
    color: #e54b4b;
    font-weight: bold;
    font-size: 18px;
    >span.vs {
        color: #c8c9cc;
        margin: 0 5px;
    }
`

const AthletesImage = styled.div`
    grid-area: e-images;
    display: flex;
    justify-content: space-between;
    > div {
        border-radius: 50%;
        height: 90px;
        width: 90px;
        border: 1px solid #fbfbfb;
        padding: 3px;

        > img {
            display: block;
            height: 100%;
            width: 100%;
            border-radius: 50%;
            object-fit: cover;
        }
    }
`

const EventTitle = styled.div`
    grid-area: e-title;
    text-transform: uppercase;
    align-self: right;
    font-weight: bold;
    font-size: 19px;
`

const EventInfo = styled.div`
    margin-left: 50px;
    grid-area: e-info;
    display: grid;
    align-self: center;
    grid-template: auto auto / 1fr 1fr;
    > div {
        padding-bottom: 10px;
        > div.info-value {
            font-weight: bold;
        }
        > div.info-title {
            color: #b1b5c6;
        }
    }
`

const Buttons = styled.div`
    grid-area: e-buttons;
    display: flex;
    flex-direction: column;

    > button {
        color: #e75858;
        border: 2px solid #e75858;
        border-radius: 4px;
        background: #fff;
        font-weight: bold;
        text-transform: uppercase;
        padding: 10px;
        max-width: 170px;
        width: 100%;
        cursor: pointer;
        align-self: center;
        &+button {
            margin-top: 10px;
            font-size: 12px;
        }

        &:hover {
            background: #e75858;
            color: #fff;
        }
    }
`

const EventEntry: React.FunctionComponent<IEventEntryProps> = (props) => {
    let { athlete1, athlete2, eventTitle, place, date, arena, id } = props;

    const dispatch = useDispatch();

    return (
        <EventWrapper>
            <AthletesTitle>{athlete1.name}<span className="vs">vs</span>{athlete2.name}</AthletesTitle>
            <EventTitle>{eventTitle}</EventTitle>
            <AthletesImage>
                <div><img src={athlete1.image}></img></div>
                <div><img src={athlete2.image}></img></div>
            </AthletesImage>
            <EventInfo>
                <div>
                    <div className="info-value">{place}</div>
                    <div className="info-title">Place</div>
                </div>
                <div>
                    <div className="info-value">{moment(date).format("D MMMM")}</div>
                    <div className="info-title">Date</div>
                </div>
                <div>
                    <div className="info-value">{arena}</div>
                    <div className="info-title">Arena</div>
                </div>
                <div>
                    <div className="info-value">{moment(date).tz(moment.tz.guess()).format("hh:SS A z")}</div>
                    <div className="info-title">Time</div>
                </div>
            </EventInfo>
            <Buttons>
                <button onClick={() => {
                    dispatch(push(`/booking/${id}`))
                }}>Tickets</button>
                <button>How to watch</button>
            </Buttons>
        </EventWrapper>
    )
};

export default EventEntry;
