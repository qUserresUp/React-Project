import * as actionTypes from '../actions';

/* 
    when combining two reducers, each reducer does not have access to the global state, 
    it only have access to its own state, although they are merged into one reducer at the end
*/

const initialState = {
    result: [],
}

const reducer = (state = initialState, action) => {

    switch(action.type){

        case actionTypes.STORE_RESULT:
            return {
                ...state,
                result: state.result.concat({id: new Date(), value:action.curCounter}) // concat() returns a new list, so this does not mutate the state directly
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