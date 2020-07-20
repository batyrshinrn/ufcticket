import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import Seats from './Seats';
import Selection from './Selection'
import { useDispatch, useSelector } from 'react-redux';
import { setSelection, setOrder } from '../../../../store/actions';
import { getEventId } from '../../../../store/selector';
import { RootState } from '../../../../store/reducers';

const SeatsAnimationContainer = styled.div`
  flex: 1;
  overflow: hidden;
  margin: 65px 0 0 0;
`

const SeatsInnerContainer = styled.div`
  position: relative;

  > .seats-container-header{
    margin: 0 0 40px 0;
    display: flex;
    justify-content: space-between;


    > .seats-container-header-title{
      > .seats-container-header-note {
        color: #b6bbca;
        font-size: 14px;
      }
    }

    > .seats-container-header-zoom {
      display: flex;
      flex-direction: column;

      > button {
          background: #fff;
          border: 2px solid #e54b4b;
          height: 35px;
          width: 35px;
          color: #e54b4b;
          font-size: 1.4em;
          border-radius: 5px;
          cursor: pointer;

          &:active {
            color: #fff;
            background: #e54b4b;
          }

          &:focus {
            outline: none;
          }

          & + button {
            margin: 10px 0 0 0;
          }
      }
    }
  }
`

interface ISectorProps {
    sector: number
}

export interface ISelection {
    position: { x: number, y: number },
    seats: string[]
}

const Sector: React.FunctionComponent<ISectorProps> = (props) => {
    let dispatch = useDispatch();

    let { sector } = props;
    let [scale, setScale] = React.useState(1);
    let eventId = useSelector((state: RootState) => getEventId(state));
    

    let setScaleInternal = (s: number) => {
        if (s >= 1 && s <= 2) {
            setScale(s);
        }
    }
    return (
        <CSSTransition
            in={sector !== null}
            timeout={1000}
            classNames="seats"
            unmountOnExit
        >
            <SeatsAnimationContainer>
                <SeatsInnerContainer className="seats-inner">
                    <div className="seats-container-header">
                        <div className="seats-container-header-title">
                            <h3>Sector {sector}</h3>
                            <div className="seats-container-header-note">choose which seats would you like to occupy</div>
                        </div>

                        <div className="seats-container-header-zoom">
                            <button onClick={() => setScaleInternal(scale + 0.2)}>{"+"}</button>
                            <button onClick={() => setScaleInternal(scale - 0.2)}>{"-"}</button>
                        </div>
                    </div>
                    <Seats seats={GetSeatsMap()}
                        reserved={GetReserved()}
                        scale={scale}
                        onSelectionDone={(position, seats) => {
                            console.log(position);
                            dispatch(setSelection(position, { [sector]: seats }));
                        }}
                    ></Seats>
                </SeatsInnerContainer>
                <Selection onCreateOrder={() => {
                    console.log("on create order")
                    dispatch(setOrder(eventId))
                }}></Selection>
            </SeatsAnimationContainer>
        </CSSTransition>
    );
}


function GetSeatsMap(): number[][] {
    return [
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
}

function GetReserved(): Set<string> {
    return new Set(
        ['A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12', 'A13', 'A14', 'A15', 'A16', 'A17', 'A18', 'A19', 'A20', 'A21', 'A22', 'A23', 'A24', 'A25', 'A26', 'A27', 'A28',
            'B5', 'B6', 'B7', 'B9', 'B10', 'B11', 'B15', 'B16', 'B17', 'B18', 'B21', 'B22', 'B23', 'B24', 'B25', 'B26', 'B27', 'B28', 'B29', 'B30', 'B31',
            'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'C13', 'C14', 'C15', 'C16', 'C17', 'C18', 'C19', 'C20', 'C21', 'C22', 'C23', 'C24', 'C25', 'C26', 'C27', 'C28', 'C29', 'C30', 'C31',
            'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'D14', 'D15', 'D16', 'D17', 'D18', 'D19', 'D20', 'D21', 'D22', 'D23', 'D24', 'D25', 'D26', 'D27', 'D28', 'D29',
            'E6', 'E8', 'E10', 'E11', 'E12', 'E13', 'E14', 'E15', 'E16', 'E17', 'E18', 'E19', 'E20', 'E21', 'E22', 'E23', 'E24', 'E25', 'E26', 'E27', 'E28', 'E29', 'E30', 'E31', 'E32',
            'F3', 'F4', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F22', 'F23', 'F24', 'F25', 'F26', 'F27', 'F30', 'F31', 'F32',
            'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G12', 'G13', 'G14', 'G15', 'G16', 'G17', 'G18', 'G19', 'G20', 'G21', 'G22', 'G23', 'G24', 'G25', 'G26', 'G27', 'G28', 'G29', 'G30', 'G31', 'G32', 'G33',
            'H2', 'H9', 'H10', 'H16', 'H17', 'H20', 'H22', 'H32',
            'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9', 'I10', 'I12', 'I13', 'I14', 'I15', 'I16', 'I17', 'I18', 'I19', 'I20', 'I21', 'I22', 'I23', 'I24', 'I25', 'I26', 'I27', 'I28', 'I29', 'I30', 'I31', 'I32', 'I33',
            'J3', 'J4', 'J5', 'J11', 'J12', 'J13', 'J14', 'J15', 'J16', 'J17', 'J18', 'J19', 'J20', 'J21', 'J22', 'J23', 'J24', 'J25', 'J26', 'J27', 'J28', 'J29', 'J30', 'J31', 'J32', 'J33', 'J34']
    )
}


export default Sector;
