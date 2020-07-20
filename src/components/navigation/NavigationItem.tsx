import * as React from 'react';
import styled, { css } from 'styled-components';

interface INavigationItemProps {
    selected?: boolean;
    icon: string;
    title: string;
}

const ItemWrapper = styled.div`
    height: 120px;
    width: 120px;
    border: 1px solid #f8f8f8;    
    position: relative;
    cursor: pointer;
    color: #c9ccd7;

    &:hover {
        border-color: #cacaca;
        color: #adadad;
    }

    
    &.selected {
        color: #1b2337;
    }
`;

const Content = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;    
    font-size: 20px;
`;

const Title = styled.div`
    font-size: 14px;
    margin-top: 18px;
    font-weight: bold;
`;

const ContentWrapper = styled.div`
     position: absolute;
     height: 130px;
     width: 130px;
     box-shadow: 0 0 2px 2px #e54b4b;
     border-radius: 15%;
     background: #fff;
     top: -5px;
     left: -5px;
     z-index: 1;
`;

const NavigationItem: React.FunctionComponent<INavigationItemProps> = (props) => {
    const { selected, icon, title } = props;
    let content = (
        <Content>
            <div className={icon} />
            <Title>{title}</Title>
        </Content>)

    return (
        <ItemWrapper className={selected ? "selected" : null}>
            {selected ? <ContentWrapper>{content}</ContentWrapper> : content}
        </ItemWrapper>)
};

export default NavigationItem;
