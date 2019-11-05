import React, {Component} from 'react';
import Person from './Person/Person';

// const functionName = () => ()  will return whatever is in the parathesis without a return keyword

/*
const Persons = (props) => {
    
    console.log('[Persons.js] is rendering');

    return (
        props.persons.map((person,index) => {
            return (
            <Person 
            name={person.name} 
            age={person.age} 
            click={() => props.click(index)}
            changed={(event) => props.changed(event, person.id)}
            key={person.id}
            />
            )
          })
    )
    
}
*/

class Persons extends Component{

    // static getDerivedStateFromProps(props,state){
    //     console.log('[Persons.js] getDerivedStateFromProps', props);
    //     return state;
    //}

/*====================================================
  Update LifeCycles:
====================================================*/

    shouldComponentUpdate(nextProps, nextState){ // use this function to prevent needless re-rendering
        console.log('[Persons.js] shouldComponentUpdate');
        if(nextProps.persons !== this.props.persons){ return true; } // if the prop does not change, then we do not need to re-render this component
        return false;
    }
    
    getSnapshotBeforeUpdate(){
        console.log('[Persons.js] getSnapshotBeforeUpdate');
    }

    // fetch data from server should happen here
    componentDidUpdate(){
        console.log('[Persons.js] componentDidUpdate');
    }

/*====================================================
    render
====================================================*/

    render(){

        console.log('[Persons.js] is rendering');
        return (
            this.props.persons.map((person,index) => {
            return (
            <Person 
            name={person.name} 
            age={person.age} 
            click={() => this.props.click(index)}
            changed={(event) => this.props.changed(event, person.id)}
            key={person.id}
            />
            )
          })
        )
    }
}

export default Persons;
