import React, {useState} from 'react';

import './AddPerson.css';



const addPerson = (props) => {

    // no need to store local UI state in Redux store
    const [name, setName] = useState('');
    const [age, setAge] = useState(null);

    const changeNameHandler = (event) => {
        setName(event.target.value)
    }

    const changeAgeHandler = (event) => {
        setAge(event.target.value)
    }

    
    return (
    <div className="AddPerson">
        <input type='text' placeholder="name" onChange={changeNameHandler} />
        <input type='number' placeholder="age" onChange={changeAgeHandler} />
        <button onClick={() => props.personAdded(name,age)}>Add Person</button>
    </div>)

};

export default addPerson;