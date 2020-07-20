import * as React from 'react';
import styled, { css } from 'styled-components';
import { FC, useState } from 'react'
import { UserInfoItem } from './UserInfoItem'

export interface IUserProps {
    name: string;
    events?: number;
    points?: number;
    img?: string;

}

const Container = styled.div`
    display: grid;
    grid-template-areas: 
        "title title"
        "image info";
    grid-template-columns: 130px auto;
    margin-bottom:20px;
`;

const UserTitle = styled.div`
    font-weight: bold;
    grid-area: title;
    margin-bottom: 25px;
    font-size: 19px;
`;


const UserImage = styled.div`
    border-radius: 50%;
    border: 1px solid rgba(229, 75, 75, 0.5);
    width: 115px;
    height: 115px;
    grid-area: image;
    position: relative;

    &:after {
        content: "";
        display: block;
        background-size: 110px;
        height: 110px;
        width: 110px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;        

        ${(props: { img: string }) => props.img &&
            css`
                background-image: url(${props.img});
            `}
    }
`;

const InfoContainer = styled.div`
    grid-area: info;
`;

export const User: FC<IUserProps> = (props: IUserProps) => {
    let { name, events, points, img } = props;

    return (
        <Container>
            <UserTitle>{name}</UserTitle>
            <UserImage img={img}></UserImage>
            <InfoContainer>
                <UserInfoItem color="#e54b4b" value={events} description="Events Watched" icon="fas fa-check-circle"></UserInfoItem>
                <UserInfoItem color="#0cca4a" value={points} description="Points Earned" icon="fas fa-arrow-circle-up"></UserInfoItem>
            </InfoContainer>
        </Container>
    )
}