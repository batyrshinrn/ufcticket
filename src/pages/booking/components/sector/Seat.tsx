import * as React from 'react';
import { SeatType } from '../../model/SeatTypeEnum';


export interface ISeatProps {
    xAxis: number,
    yAxis: number,
    seatType: SeatType,
    isPinned?: boolean;
    readonly?: boolean;
    onSelect?: (selected: boolean) => void;
}

const Seat: React.FunctionComponent<ISeatProps> = (props) => {
    let { xAxis, yAxis, isPinned, readonly, onSelect } = props;
    let [seatType, setSeatType] = React.useState(props.seatType);

    let color = "";
    switch (seatType) {
        case SeatType.reserved:
            color = "#e54b4b"; break;
        case SeatType.friendly:
            color = "#93c9fe"; break;
        case SeatType.friendlyReserved:
            color = "#198cff"; break;
        case SeatType.taken:
            color = "#0cc347"; break;
        default:
            color = "#e7e8ed"; break;
    }

    return (
        <g
            fill={color}
            style={({ cursor: "pointer" })}
            onMouseMove={() => {
                if (!readonly && isPinned) {
                    if (seatType != SeatType.taken && seatType != SeatType.reserved && seatType != SeatType.friendlyReserved) {
                        setSeatType(SeatType.taken);
                        if (onSelect) {
                            onSelect(true);
                        }
                    }
                }
            }}
            onMouseDown={() => {
                if (readonly || seatType == SeatType.reserved || seatType == SeatType.friendlyReserved) {
                    return;
                }
                if (seatType == SeatType.taken) {
                    setSeatType(props.seatType);
                    if (onSelect) {
                        onSelect(false);
                    }
                }
                else {
                    setSeatType(SeatType.taken);
                    if (onSelect) {
                        onSelect(true);
                    }
                }
            }}>
            <rect x={xAxis} y={yAxis} rx="2" width="13" height="7" />
            <rect x={xAxis + 1} y={yAxis + 8} rx="2" width="11" height="3" />
        </g>);
};

export default Seat;
