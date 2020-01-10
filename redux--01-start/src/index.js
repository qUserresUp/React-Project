import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'; // <Provider/> injects store into react components [TODO]
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import reducer from './store/reducer';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

/*
    when combining multiple reducers,
    combineReducers() takes an object as input
    redux adds an extra layer to the global store
*/
const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer,
})

const store = createStore(rootReducer);


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
