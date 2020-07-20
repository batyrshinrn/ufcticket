import * as React from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectedEvent } from '../../store/selector';
import { RootState } from '../../store/reducers';
import { getEvent } from '../../store/actions';
import styled from 'styled-components';
import DefaultArena from './components/arena/DefaultArena';
import { CSSTransition } from 'react-transition-group';
import './styles/index.scss'
import Seats from './components/sector/Seats';
import Sector from './components/sector/Sector';
import Selection from './components/sector/Selection';

const Title = styled.div`
  height: 100px;
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: flex-end;
  flex-direction: column;
  display: flex;

  .arena {
    font-size: 18px;
    font-weight: bold;
    padding: 0 0 10px 0;
  }

  .note {
    color: #b6bbca;
    grid-area: description;
    font-size: 14px;
  }
  
`

const Container = styled.div`
  display: flex;
  position: absolute;
  height: 100%;
  width: 100%;
  max-width: 800px;
  flex-direction: column;
`

const ArenaTitle = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  margin: 0 0 15px 0;
`

const ArenaAnimationContatiner = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 750px;
  > svg {
    margin: 20px 0 0 0;  
  }
`

const BackLinkAnimationContainer = styled.div`
  margin: 65px 0 0 0;
  visibility:hidden;
  max-width: 750px;
`

const BackLink = styled.div`
    color: #e54b4b;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.8em;

    > span {
        color: #e54b4b;
        font-weight: bold;
        margin: 7px 0 0 0;
        text-transform: uppercase;
        cursor: pointer;
    }    
`


interface IBookingViewProps {
}

const BookingView: React.FunctionComponent<IBookingViewProps> = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [event, setEvent] = React.useState(null);
  const [sector, setSector] = React.useState(null);

  const selectedEvent = useSelector((state: RootState) => getSelectedEvent(state));
  if (selectedEvent && selectedEvent != event) {
    setEvent(selectedEvent);
  }

  React.useEffect(() => {
    if (selectedEvent == null) {
      dispatch(getEvent(id));
    }
  }, [])

  return (event &&
    <Container>
      {/* arena animation container */}
      <CSSTransition
        in={sector !== null}
        timeout={500}
        classNames="arena"
      >
        <ArenaAnimationContatiner>
          <Title>
            <ArenaTitle className="name">{event.Arena} Booking</ArenaTitle>
            <div className="note">Choose sector which you would like to preview</div>
          </Title>
          <DefaultArena onSectorSelect={(sectorNumber: number) => {
            setSector(sectorNumber);
          }}></DefaultArena>
        </ArenaAnimationContatiner>
      </CSSTransition>

      {/* back link animation container */}
      <CSSTransition
        in={sector !== null}
        timeout={500}
        classNames="backlink"
      >
        <BackLinkAnimationContainer>
          <BackLink>
            <i className="fa fa-arrow-up"></i>
            <span onClick={() => {
              setSector(null);
            }}>Back to sector selection</span>
          </BackLink>
        </BackLinkAnimationContainer>
      </CSSTransition>   

      <Sector sector={sector}></Sector>

      
    </Container> || null);
};

export default BookingView;
