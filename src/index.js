import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';



import reducers from './reducers';
import Loans from './components/CreateLoans';
import Test from './components/loans';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (intitialState) => {
  return createStore(reducers, intitialState, composeEnhancers(applyMiddleware(reduxThunk)));
}

const store = configureStore();

// const store = createStore(
//   reducers, 
//   composeEnhancers(applyMiddleware(reduxThunk))
// );



ReactDOM.render(
  <Provider store={store}>

    {/* <Loans /> */}
    <Test/>
   </Provider>,
  document.querySelector('#root')
);
