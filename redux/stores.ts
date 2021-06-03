/*
*BZ0015            060321     Setup redux-saga for project
************************************************************************
*/
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers/index'
import rootSaga from './sagas/index'

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware,createLogger()))
  }
  return applyMiddleware(...middleware)
}

export const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware()
  const store: any = createStore(rootReducer, bindMiddleware([sagaMiddleware]))

  sagaMiddleware.run(rootSaga)

  return store
}

const wrapper = createWrapper(makeStore)
export default wrapper