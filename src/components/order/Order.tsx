import * as React from 'react';
import styled from 'styled-components';
import { OrderContainer } from './OrderContainer';
import { RootState } from '../../store/reducers';
import { getOrderData } from '../../store/selector/seats.selector';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import './styles/Order.scss'
import { clearOrder } from '../../store/actions';
import { push } from 'connected-react-router';
import * as moment from 'moment'

interface IOrderProps {
}


const Order: React.FunctionComponent<IOrderProps> = (props) => {
  let dispatch = useDispatch();
  let orderData = useSelector((state: RootState) => getOrderData(state));
  let seatsCount = 0;
  let selectionRows = [];
  if (orderData) {
    seatsCount = Object.keys(orderData.seats).reduce((count, key) => count + orderData.seats[parseInt(key)].length, 0);

    for (let sector in orderData.seats) {
      let sectorSeats = orderData.seats[sector];
      for (let seat of sectorSeats) {
        selectionRows.push(
          <div key={`${sector}${seat}`} className="selection-row">
            <div className="selection-row-item">
              <span className="selection-row-item-value">{seat.slice(1)}</span>
              <span className="selection-row-item-title">Seat</span>
            </div>
            <div className="selection-row-item">
              <span className="selection-row-item-value">{seat[0]}</span>
              <span className="selection-row-item-title">Row</span>
            </div>
            <div className="selection-row-item">
              <span className="selection-row-item-value">{sector}</span>
              <span className="selection-row-item-title">Sector</span>
            </div>
          </div>
        )
      }
    }
  }

  return (
    <CSSTransition
      in={orderData !== null}
      timeout={700}
      classNames="order"
      appear={true}
      unmountOnExit>
      <OrderContainer>
        <div className="title">
          Your Ticket
      </div>
        {orderData &&
          <div className="order">
            <div className="order-content">
              <div className="order-content-title">
                <div className="event">{orderData && orderData.event.Arena || ""}</div>
                <div className="descr">{seatsCount} SEAT(S)</div>
              </div>
              <div className="order-content-info">
                <div>
                  <div className="info-value">{orderData.event.Place}</div>
                  <div className="info-title">Place</div>
                </div>
                <div>
                  <div className="info-value">{moment(orderData.event.Date).format("D MMMM")}</div>
                  <div className="info-title">Date</div>
                </div>
                <div>
                  <div className="info-value">{orderData.event.Arena}</div>
                  <div className="info-title">Arena</div>
                </div>
                <div>
                  <div className="info-value">{moment(orderData.event.Date).tz(moment.tz.guess()).format("hh:SS A z")}</div>
                  <div className="info-title">Time</div>
                </div>
              </div>
              <div className="order-content-seats">
                <div className="seats-owner">
                  <span className="seats-owner-name">Andrew Simmons</span>
                  <span className="seats-owner-label">Ticket Owner</span>
                </div>
                <div className="seats-edit">
                  <button><i className="fa fa-pen"></i></button>
                </div>
                <div className="selection">
                  {selectionRows}
                </div>
                <div className="seats-add">
                  <button><i className="fa fa-plus"></i></button>
                </div>
              </div>
            </div>
          </div> || null}
        <div className="footer">
          <div className="price">Ticket Price $89,99</div>
          <div className="button-container">
            <button onClick={() => {
              dispatch(clearOrder());
              dispatch(push("/"));
            }}>Next</button>
          </div>
        </div>
      </OrderContainer>
    </CSSTransition>);
};

export default Order;
