
/*
    Redux Usage
*/

const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0,
}

// reducer: assign an initial state to store, and reacts to  actions
const rootReducer = (state = initialState, action) => {

    if(action.type === 'INC_COUNTER'){
        return {
            ...state,
            counter: state.counter+action.value,
        }
    }
    else if(action.type === 'DEC_COUNTER'){
        return {
            ...state,
            counter: state.counter-action.value
        }
    }
    return state;
}

// store
const store = createStore(rootReducer);

// subscription: takes an function as argument, function is triggered whenever state changes
store.subscribe(()=> {
    console.log('[subscription]: ', store.getState());
})

// dispatch action: send actions to store
store.dispatch({type: 'INC_COUNTER', value: 10});
store.dispatch({type: 'DEC_COUNTER', value: 5});


