import * as actionTypes from './actions';

const initialState = {
    counter: 0,
    result: [],
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
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                result: state.result.concat({id: new Date(), value:state.counter}) // concat() returns a new list, so this does not mutate the state directly
            }
        case actionTypes.DELETE_RESULT:
            let updatedArray = state.result.filter(el => el.id !== action.deleteElID)
            return {
                ...state,
                result: updatedArray,
            }
    }

    return state;
}

export default reducer