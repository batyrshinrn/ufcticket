import * as React from 'react'
import { FC } from 'react'
import styled, { css } from 'styled-components';

export interface IUserInfoItemProps {
    value: number;
    description: string;
    icon: string;
    color: string;
}

const Container = styled.div`
    display: grid;
    grid-template-areas: 
        "icon value"
        "icon description";
    grid-template-columns: 50px auto; 
    padding: 5px;
`;

const IconContainer = styled.div`
    position: relative;
    width: 40px;
    height: 40px;
    grid-area: icon;
`;

const IconWrapper = styled.div`
    border-radius: 50%;
    opacity: 0.15;    
    width: 100%;
    height: 100%;

    ${(props: { color: string }) => css`
        background-color: ${props.color};
    `};
`;

const Icon = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${(props: { color: string }) => css`
        color: ${props.color};
    `}
`;

const Value = styled.div`
    font-weight: bold;
    grid-area: value;
    font-size: 16px;
 `;

const Description = styled.div`
    color: #b6bbca;
    grid-area: description;
    font-size: 12px;
    font-weight: bold;
 `;

export const UserInfoItem: FC<IUserInfoItemProps> = (props: IUserInfoItemProps) => {
    let { color, description, icon, value } = props;

    return (
        <Container>
            <IconContainer>
                <IconWrapper color={color}></IconWrapper>
                <Icon className={icon} color={color}></Icon>
            </IconContainer>

            <Value>{value}</Value>
            <Description>{description}</Description>
        </Container>);
}