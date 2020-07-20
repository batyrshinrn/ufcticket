import * as React from 'react'
import { FC, useState } from 'react'
import styled from 'styled-components';
import { User } from './user/User';
import image from '../../assets/joker.png'
import Level from './Level';
import { NavigationList } from './NavigationContainer';
import { withRouter, RouteComponentProps } from 'react-router';

const NavigationWrapper = styled.div`
    display: flex;
    flex-direction: column;    
    padding: 45px 45px 0 45px;
    margin: 0 35px 0 0;
    box-sizing: border-box;
    box-shadow: 0 0 15px 1px rgba(192, 192, 192, 0.3);
    overflow: auto;
`;

export interface INavigationProps {

}

const Navigation: FC<INavigationProps> = (props:RouteComponentProps<INavigationProps>) => {
    return (
        <NavigationWrapper>
            <User name="JokerFace94" events={21} points={811} img={image}></User>
            <Level currentScore={700}></Level>
            <NavigationList selectedRoute={props.location.pathname}></NavigationList>
        </NavigationWrapper>)
}

export const NavigationWithRouter = withRouter(props => <Navigation {...props}/>)