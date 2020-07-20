import { FunctionComponent, useState } from "react"
import * as React from 'react'
import './index.scss'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

import { NavigationWithRouter } from "./components/navigation/navigation";
import styled from "styled-components"

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import EventsView from "./pages/events/UfcEventsView"
import BookingView from "./pages/booking/BookingView"

//redux store
import { Provider } from 'react-redux'
import configureStore, { history } from "./store"
import { ConnectedRouter } from "connected-react-router"

//animation
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Order from "./components/order/Order"

const ApplicationWrapper = styled.div`
    height: 100vh;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 390px minmax(min-content, 855px) auto;
`

const StyledTransitionGroup = styled(TransitionGroup)`
    position: relative;
    height: 100%;
    overflow: hidden;
`
const store = configureStore();

const App: FunctionComponent = () => {

    return (
        <Provider store={store}>
            <ApplicationWrapper>
                <ConnectedRouter history={history}>
                    <NavigationWithRouter></NavigationWithRouter>
                    <Route render={({ location }) => (
                        <StyledTransitionGroup>
                            <CSSTransition key={location.key} timeout={800} classNames="fade">
                                <Switch location={location}>
                                    <Route exact path="/" component={EventsView} />
                                    <Route exact path="/booking/:id" component={BookingView} />
                                </Switch>
                            </CSSTransition>
                        </StyledTransitionGroup>
                    )} />
                </ConnectedRouter>
                <Order></Order>
            </ApplicationWrapper>
        </Provider>
    );
}

export default App;