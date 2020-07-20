import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware, Epic } from 'redux-observable'

import { rootEpic } from './epics'
import { rootReducer, RootState } from './reducers'

import { createBrowserHistory } from 'history'
import { routerMiddleware} from 'connected-react-router'

const epicMiddleware = createEpicMiddleware<any, any, RootState>();
export const history = createBrowserHistory()

export default function configureStore() {
    const middlewares = [epicMiddleware, routerMiddleware(history)];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer(history),
        composeWithDevTools(middleWareEnhancer)
    );

    epicMiddleware.run(rootEpic);
    return store;
}

export function registerEpic(epic: Epic) {
    epicMiddleware.run(epic);
}