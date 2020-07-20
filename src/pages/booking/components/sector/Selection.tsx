import * as React from 'react';
import styled from 'styled-components';
import { RootState } from '../../../../store/reducers';
import { getSelectionSelector, getSelectionPosition } from '../../../../store/selector/seats.selector';
import { useSelector, useDispatch } from 'react-redux';
import { setSelection, clearPosition } from '../../../../store/actions';

const SelectionContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    top: 10px;
    left: 10px;
    background: #fff;
    box-shadow: 0 0 3px #d4d4d4;
    border-radius: 5px;
    min-width: 180px;
    padding: 10px;

    > .selection {
        overflow: auto;
        max-height: 80px;
        flex: 1;
        direction: rtl;
        text-align: left;

        &::-webkit-scrollbar {
            width: 0.5em;
        }
    
        &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
        }
        
        &::-webkit-scrollbar-thumb {
            background-color: #e8e8e8;
            outline: 1px solid slategrey;
        }

        > .selection-row {
            display: flex;
            flex-direction: row;

            & + .selection-row {
                margin-top: 15px;
            }

            > .selection-row-item {
                font-size: 0.9em;
                > span {
                    display: block;
                }

                & + .selection-row-item {
                    margin: 0 20px 0 0px;
                }

                > .selection-row-item-value {
                    font-weight: bold;
                }

                > .selection-row-item-title {
                    font-size: 0.8em;
                    color: #b3b3b3;
                }
            }
        }
    }
    > .selection-button-container {
        align-self: center;
        > button {
            border: 1px solid #e54b4b;
            border-radius: 5px;
            height: 30px;
            width: 30px;
            background-color: #e54b4b;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            margin: 0 0 0 10px;
            box-shadow: 0 3px 5px #bbbbbb;
            &:focus {
                outline: none;
            }
            &:active {
                color: #d8d8d8;
            }
        }
    }
`
interface ISelectionProps {
    onCreateOrder: () => void
}

const Selection: React.FunctionComponent<ISelectionProps> = (props) => {
    let { onCreateOrder } = props

    let dispatch = useDispatch();
    let container = React.useRef(null);
    let seats = useSelector((state: RootState) => getSelectionSelector(state));
    let position = useSelector((state: RootState) => getSelectionPosition(state));

    let [visible, setVisible] = React.useState(false);

    var timer = React.useRef(null);
    React.useEffect(() => {
        let handleClickOutside = (event: MouseEvent) => {
            if (container.current && !(container.current.contains(event.target))) {
                timer.current = setTimeout(() => {
                    setVisible(false);
                    console.log("setVisible false");
                }, 300);
                console.log(timer);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            dispatch(clearPosition());
        }
    }, [container])

    React.useEffect(() => {
        if(timer.current) {
            clearTimeout(timer.current);
        }
        if (seats 
            && Object.keys(seats).length !== 0
            && container.current 
            && container.current.offsetParent !== null
            && position != null) {
            setVisible(true);
        }
    }, [seats])

    let selectionRows = [];
    for (let sector in seats) {

        let sectorSeats = seats[sector];
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

    let cumulativeOffset = (element: HTMLElement) => {
        var top = 0, left = 0;
        do {
            top += element.offsetTop || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent as HTMLElement;

        } while (element);

        return {
            top: top,
            left: left
        };
    };

    let offsetLeft = container && container.current && cumulativeOffset(container.current.parentElement).left || 0

    let x = position && (position.x - offsetLeft - 210 / 2) || 0;
    let y = position && (position.y - (selectionRows.length === 1 ? 50 : 100) - 15) || 0;

    return (
        <SelectionContainer style={({
            top: y,
            left: x,
            visibility: visible ? "visible" : "hidden"
        })} ref={container}>
            <div className="selection">
                {selectionRows}
            </div>
            <div className="selection-button-container">
                <button onClick={() => {
                    onCreateOrder && onCreateOrder();
                }}><i className="fa fa-check"></i></button>
            </div>
        </SelectionContainer>);
};

export default Selection;
