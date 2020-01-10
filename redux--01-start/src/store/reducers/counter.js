import * as actionTypes from '../actions';

/* 
    when combining two reducers, each reducer does not have access to the global state, 
    it only have access to its own state, although they are merged into one reducer at the end
*/

const initialState = {
    counter: 0,
}

const reducer = (state = initialState, action) => {

    switch(action.type){

        case actionTypes.INCREMENT:
            return {
                ...state,
                counter: state.counter+1,
            }
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter-1,
            }
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.value
            }
        case actionTypes.SUBTRACT:
            return {
                ...state,
                counter: state.counter - action.value
            }
    }

    return state;
}

export default reducer