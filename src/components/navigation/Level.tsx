import * as React from 'react';
import styled from 'styled-components';

interface ILevelProps {
    currentScore: number;
}

const LevelInfo = styled.div`
    display: flex;
    justify-content: space-between;
    color: #b6bbca;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 14px;
`;

const LevelBlock = styled.div`
    height: 5px;
    background: #eeeff2;
`;

const AchivedLevel = styled(LevelBlock)`
    background:#e54b4b;
`;

const LevelBlocksWrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;    

     &>div {
         flex: 1;
         border-radius: 20%;
         &+div {
             margin-left: 2px;
         }
     }
`

const Level: React.FC<ILevelProps> = (props) => {
    const blockCount = 10;
    const { currentScore } = props;
    const total = blockCount * 100;
    const currentLevel = currentScore / 100;

    let blocks = [];
    for (let i = 0; i < blockCount; i++) {
        blocks.push(i < currentLevel ? <AchivedLevel key={i} /> : <LevelBlock key={i} />);
    }

    return (
        <>
            <LevelInfo>
                <div>Level {currentLevel}</div>
                <div>{currentScore}/{total}</div>
            </LevelInfo>
            <LevelBlocksWrapper>
                {blocks}
            </LevelBlocksWrapper>
        </>
    );
};

export default Level;
