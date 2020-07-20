import * as React from 'react';
import styled from 'styled-components';
import NavigationItem from './NavigationItem';
import { Link } from 'react-router-dom';

export interface INavigationContainerProps {
    selectedRoute: string
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 45px 0 0 0;
    padding: 10px 0 0 0;
    overflow: auto;
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
`;

export const NavigationList: React.FunctionComponent<INavigationContainerProps> = (props) => {
    let isSelected = (route: string) => props.selectedRoute === route;

    return (
        <Container>
            <Link to="/profile" onClick={(e) => console.log(e)}>
                <NavigationItem title="Profile" icon="fas fa-user"
                    selected={isSelected('/profile')} />
            </Link>
            <Link to="/">
                <NavigationItem title="Events" icon="fas fa-calendar-alt"
                    selected={isSelected('/')} />
            </Link>
            <Link to="/ranking">
                <NavigationItem title="Ranking" icon="far fa-chart-bar"
                    selected={isSelected('/ranking')} />
            </Link>
            <Link to="/athletes">
                <NavigationItem title="Athletes" icon="fab fa-diaspora"
                    selected={isSelected('/athletes')} />
            </Link>
            <Link to="watch">
                <NavigationItem title="Watch" icon="fas fa-cog"
                    selected={isSelected('/watch')} />
            </Link>
            <Link to="betting">
                <NavigationItem title="Betting" icon="fas fa-cog"
                    selected={isSelected('/betting')} />
            </Link>
            <Link to="connect">
                <NavigationItem title="Connect" icon="fas fa-cog"
                    selected={isSelected('/connect')} />
            </Link>
            <Link to="settings">
                <NavigationItem title="Settings" icon="fas fa-cog"
                    selected={isSelected('/settings')} />
            </Link>
        </Container >);
};


