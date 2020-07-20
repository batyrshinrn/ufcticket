import * as React from 'react';
import styled from 'styled-components'

const Rect1 = styled.rect`
  fill: #fafafa;
  stroke: #cbced8;
  stroke-width: 1;
`

const Rect2 = styled(Rect1)`
  stroke-width: 2;
`

const SectorRect = styled(Rect1)`
  cursor: pointer;
  &:hover {
    stroke: #399c1d ;
    fill: #effaf4;
  }
`

const SectorPath1 = styled.path`
  stroke: #cbced8;
  stroke-width: 1;
  fill: #fff;
  cursor: pointer;

  &:hover {
    stroke: #399c1d;
    fill: #effaf4;
  }
`
const SectorPath2 = styled(SectorPath1)`
  stroke-width:2;
`

const Ring = styled.text`
  font: bold 10px sans-serif;
  fill: #c2797b;
  text-anchor:middle;
`

interface IDefaultArenaProps {
  onSectorSelect: (sectorNumber: number) => void;
}

const DefaultArena: React.FunctionComponent<IDefaultArenaProps> = (props) => {
  const { onSectorSelect } = props;

  return (
    <svg viewBox="0 0 474 325">
      <Rect2 rx='110' x='5' y='5' width='465' height='315' />
      <Rect1 rx="120" x='30' y='32.5' width='415' height='260' fill='#fff' />
      <SectorRect rx="10" x='60' y='75' width='25' height='175' onClick={() => onSectorSelect(5)} />
      <SectorRect rx="10" x='390' y='75' width='25' height='175' onClick={() => onSectorSelect(6)} />
      <SectorRect rx="10" x='158' y='133' width='40' height='60' onClick={() => onSectorSelect(7)} />
      <SectorRect rx="10" x='282' y='133' width='40' height='60' onClick={() => onSectorSelect(8)}/>

      {/* ring */}
      <polygon points="210,162.5 218,182.5 240,192 262,182.5 270,162.5 262,142.5 240,133 218,142.5"
        fill="#fce4e6"
        stroke="#c2797b"
        strokeWidth="2" />

      <Ring x="240" y="167">Ring</Ring>

      <SectorPath1 d="M195 205 h90 q20 0 30 10 L365 265 q10 10 -10 10 h-238 q-10 -2 -2-10 L165 215 q10 -10 30 -10" 
        onClick={() => onSectorSelect(1)} />

      <SectorPath1 transform="scale(1,-1) translate(0,-325)"
        d="M195 205 h90 q20 0 30 10 L365 265 q10 10 -10 10 h-238 q-10 -2 -2-10 L165 215 q10 -10 30 -10" 
        onClick={() => onSectorSelect(2)}/>

      <SectorPath2 transform="rotate(90) scale(0.6) translate(30,-440)"
        d="M195 205 h90 q20 0 30 10 L365 265 q10 10 -10 10 h-238 q-10 -2 -2-10 L165 215 q10 -10 30 -10" 
        onClick={() => onSectorSelect(3)}/>

      <SectorPath2 transform="rotate(270) scale(0.6) translate(-510, 350)"
        d="M195 205 h90 q20 0 30 10 L365 265 q10 10 -10 10 h-238 q-10 -2 -2-10 L165 215 q10 -10 30 -10" 
        onClick={() => onSectorSelect(4)}/>
    </svg>
  );
};

export default DefaultArena;
