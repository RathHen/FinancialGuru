import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import Loans from './components/loans';
import Header from './components/header';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (intitialState) => {
  return createStore(reducers, intitialState, composeEnhancers(applyMiddleware(reduxThunk)));
}

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Header>
    </Header>
    <Loans >
    </Loans>
    
    
   </Provider>,
  document.querySelector('#root')
);
