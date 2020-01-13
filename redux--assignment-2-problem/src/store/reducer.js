
import * as actionTypes from '../store/actions';

const initialState = {
    persons: [],
}

const rootReducer = (state = initialState, action) => {

    if(action.type === actionTypes.addPerson){
        
        const newPerson = {
            id: Math.random(), // not really unique but good enough here!
            name: action.name,
            age: action.age,
        }

        return {
            ...state,
            persons: state.persons.concat(newPerson),
        }
    }

    if(action.type === actionTypes.deletePerson){
        
        return {
            ...state,
            persons: state.persons.filter(person => person.id !== action.personID),
        }
    }

    return state;
}

export default rootReducer;