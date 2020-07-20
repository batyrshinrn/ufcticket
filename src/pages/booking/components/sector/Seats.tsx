import * as React from 'react';
import { SeatType } from '../../model/SeatTypeEnum';
import Seat from './Seat';
import styled from 'styled-components';

interface ISeatsProps {
    seats: number[][];
    reserved: Set<string>;
    scale: number;
    onSelectionDone: (position: { x: number, y: number }, seats: string[]) => void
}

const SectorDiv = styled.div`
    max-width: 700px;

    > .legend {
        margin: 45px 0 0 0;
    }
`

const LegendText = styled.text`
    font-size: 0.75em;
    font-weight: bold;
    fill: silver;
`
const SeatsContainer = styled.div`
    overflow: hidden;
`

const SvgRing = styled.svg`
    user-select: none;
`

let IsPanning: boolean = false;
let StartPoint: { x: number, y: number, translateX: number, translateY: number }
    = { x: 0, y: 0, translateX: 0, translateY: 0 };
let EndPoint: { x: number, y: number } = { x: 0, y: 0 };


const Seats: React.FunctionComponent<ISeatsProps> = (props) => {
    let { seats, reserved, scale, onSelectionDone } = props;

    let [translate, setTranslate] = React.useState({ x: 0, y: 0 });
    let [cursor, setCursor] = React.useState("grab");
    let [isPinned, setIsPinned] = React.useState(false);
    let [selectedSeats, setSelectedSeats] = React.useState([]);

    let yAxis = 10
    let yAxisStep = 25;

    let xAxis = 50;
    let xAxisStep = 18;

    let aCode = 'A'.charCodeAt(0);

    let rows = seats.map((v, i) => {
        let char = String.fromCharCode(aCode + i);
        return <text
            key={i}
            style={({ userSelect: "none" })}
            x="5"
            y={(yAxis + 8 + yAxisStep * i).toString()}>{char}
        </text>
    });

    let rowGroups = <g fill="#e7e8ed" fontSize="0.6em">{rows}</g>

    let seatGroups = [];
    for (let row = 0; row < seats.length; row++) {
        let y = yAxis + yAxisStep * row;
        let char = String.fromCharCode(aCode + row);
        for (let col = 0; col < seats[row].length; col++) {
            let x = xAxis + xAxisStep * col;

            let seatType = seats[row][col];
            if (seatType == SeatType.none) continue;

            let seatNumber = `${char}${col + 1}`;

            if (reserved.has(seatNumber)) {
                seatType = seatType == SeatType.friendly
                    ? SeatType.friendlyReserved
                    : SeatType.reserved;
            }

            seatGroups.push(<Seat
                key={seatNumber}
                isPinned={isPinned}
                xAxis={x}
                yAxis={y}
                seatType={seatType}
                onSelect={(selected: boolean) => {
                    if (selected) {
                        selectedSeats = [...selectedSeats, seatNumber];
                        setSelectedSeats(selectedSeats);
                    } else {
                        //remove seat from selected collection
                        let ind = selectedSeats.indexOf(seatNumber);
                        if (~ind) {
                            selectedSeats.splice(ind, 1);
                            setSelectedSeats([...selectedSeats]);
                        }
                    }

                    console.log(selectedSeats.join(' '));
                }}></Seat>);
        }
    }

    let viewBoxWidth = xAxisStep * (seats[0].length - 1) + 15;
    let m: number = viewBoxWidth / 2 + 50;
    let viewBoxHeight = yAxis + yAxisStep * (seats.length - 1) + 15;

    return (
        <SectorDiv>
            <svg viewBox={`0 0 ${viewBoxWidth + 50} 115`} style={({ cursor: cursor })}
                onMouseDown={(e) => {
                    IsPanning = true;
                    StartPoint = {
                        x: e.nativeEvent.x,
                        y: e.nativeEvent.y,
                        translateX: translate.x,
                        translateY: translate.y
                    };

                    setCursor("grabbing");
                }}
                onMouseMove={(e) => {
                    if (IsPanning) {
                        EndPoint = { x: e.nativeEvent.x, y: e.nativeEvent.y };
                        var dx = (StartPoint.x - EndPoint.x) / scale;
                        var dy = (StartPoint.y - EndPoint.y) / scale;
                        setTranslate({
                            x: StartPoint.translateX - dx,
                            y: StartPoint.translateY - dy
                        })
                    }
                }}

                onMouseUp={(e) => {
                    IsPanning = false;
                    setCursor("grab");
                }}>
                <text style={(
                    { userSelect: "none" }
                )} fill="#e7e8ed" fontSize="1.2em" x={`${m - 20}`} y="50">Ring</text>
                <path stroke="#e7e8ed" d={`M${m - 170} 0 L${m - 145} 50 L${m} 110 L${m + 145} 50 L${m + 170} 0`} fill="none" strokeWidth="3" />
            </svg>
            <SeatsContainer>
                <svg transform={`scale(${scale}) translate(${translate.x} ${translate.y})`}
                    onMouseDown={() => {
                        setIsPinned(true)
                    }}
                    onMouseUp={(e) => {
                        setIsPinned(false)
                        if (selectedSeats.length != 0 && onSelectionDone) {
                            onSelectionDone({ x: e.nativeEvent.x, y: e.nativeEvent.y }, selectedSeats)
                        }
                    }}
                    viewBox={`0 0 ${viewBoxWidth + 50}  ${viewBoxHeight}`}>
                    {rowGroups}
                    {seatGroups}
                </svg>
            </SeatsContainer>
            <svg viewBox={`0 0 ${viewBoxWidth + 50} 15`} className="legend">
                <LegendText x="180" y="10">Available</LegendText>
                <Seat xAxis={240} yAxis={0} seatType={SeatType.default} readonly={true}></Seat>

                <LegendText x="280" y="10">Selection</LegendText>
                <Seat xAxis={342} yAxis={0} seatType={SeatType.taken} readonly={true}></Seat>

                <LegendText x="382" y="10">Taken</LegendText>
                <Seat xAxis={424} yAxis={0} seatType={SeatType.reserved} readonly={true}></Seat>

                <LegendText x="462" y="10">Invalid friendly</LegendText>
                <Seat xAxis={557} yAxis={0} seatType={SeatType.friendly} readonly={true}></Seat>
            </svg>
        </SectorDiv>);
};

export default Seats;
