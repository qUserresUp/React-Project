import React, { Component } from "react";
// import Radium,  {StyleRoot} from 'radium';
//import "./App.css";
import styles from './App.module.css';
import Persons from "../Components/Persons/Persons";
import Cockpit from '../Components/Cockpit/Cockpit';
import Aux from '../hoc/Aux';
import withClass from '../hoc/withClass';
import { thisTypeAnnotation } from "@babel/types";
import AuthContext from '../context/Context';

// import ErrorBoundary from '../Components/ErrorBoundary/ErrorBoundary'

/*
  Now, functional components can also have state using React Hooks
  Use useState() function from react library to set and change states
  useState() returns two variables (current state, function to set state)

  difference between useState and setState: useState does not merge new change with current change
  
*/
class App extends Component {

  state = {
    person: [
      { id: "abcd", name: "max", age: 18 },
      { id: "asfa", name: "max1", age: 19 },
      { id: "asdfa", name: "max2", age: 20 }
    ],

    togglePerson: false,
    changeCounter: 0,
    isAuthenticated: false
  };

/*====================================================
  Creation LifeCycles:
    constructor()
    getDerivedStateFromProps()
    render()
    componentDidMount() => send HTTP requests or timeouts in this step to avoid side-effects
====================================================*/

static getDerivedStateFromProps(props, state){
  console.log('[App.js] getDerivedStateFromProps', props);
  return state;
}

componentDidMount(){
  console.log('[App.js] componentDidMount');
}

/*====================================================
  Update LifeCycles:
    getDerivedStateFromProps()
    shouldComponentUpdate(nextProps, nextState)
    render()
    Update Child Component Props
    getSnapshotBeforeupdate(prevProps,prevState)
    componentDidUpdate()
====================================================*/

  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true; 
  }

  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate');
  }


/*====================================================
  Handlers
====================================================*/

  togglePersonHandler = () => {

    this.setState({
      togglePerson: !this.state.togglePerson
    })
  };

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.person.findIndex(p=>{return p.id===id});
    const newPersonObj = {...this.state.person[personIndex]}; // create a copy of the person object, do not create a reference
    newPersonObj.name = event.target.value;
    const newPerson = [...this.state.person];
    newPerson[personIndex] = newPersonObj;
    this.setState({person: newPerson});

    //this.setState({changeCounter: this.state.changeCounter+1}); // **Very Important**: setState is called asynchronously, therefore it is not guaranteed that this.state is the previous state
    this.setState((prevState, props)=>{ return {changeCounter: prevState.changeCounter+1}}) // pass a function to setState(), the first parameter will be previous state, this way it is guaranteed to use previous state

  };

  deletePersonHandler = (personIndex) =>{
    // const newPerson = this.state.person; // this creates a reference of the state.person, not a copy
    // newPerson.splice(personIndex, 1); // this will directly modify the state, it is not a good practice

    // two ways to create a copy of the state element
    //const newPerson = this.state.person.slice(); // use slice() to create a copy
    const newPerson = [...this.state.person]; // use spread to create a copy
    newPerson.splice(personIndex,1);
    this.setState({person: newPerson});
  };

  loginHandler = () =>{
    this.setState({isAuthenticated: true})
  }


/* 
  when passing this function into the JSX code below, do not use {this.onClickHandler()}, or this function will exec immediantely
  instead, only pass the reference of this function {this.onClickHandler}
  this.state.person[0].name = "maxChange";  do not change state directly, or ReactDOM will not recognize the change
  use Component.setState(): this function takes state object as input, and compare the difference, then update the DOM
*/

  // onClickHandler = input => {
    
  //   this.setState({
  //     person: [
  //       { name: input, age: 19 },
  //       { name: "max1Change", age: 20 },
  //       { name: "max2Change", age: 21 }
  //     ]
  //   });
  // };

  //if handler need input, arrow event handler function can be inefficient sometimes, suggest to use bind syntax

  /*====================================================
    render
  ====================================================*/

  render() {
    // React also support inline css style sheet

    /*
    const stylesheet = {
      backgroundColor: 'green',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      color: 'white',
      // installed radium package to use peudo hover style in our inline style
      // ":hover": {
      //   backgroundColor:'lightgreen',
      //   color:'black' 
      // }
    };
    */

    /*
     write logic outside of JSX code to make it cleaner
     the render() method is called everytime state changes

     every component should have a unique key prop to help React update the DOM
     index is not a good key because it is updated each time we delete an element
     use unique id from the database
    */
    
    console.log('[App.js] is rendering');

    let personComp = null;
    if(this.state.togglePerson){
      personComp = (
        <div>
          <Persons
          persons={this.state.person}
          click={this.deletePersonHandler} 
          changed={this.nameChangeHandler}
          auth={this.state.isAuthenticated}
          />
        </div>
      )
    }

    
    //wrap everything in a <StyleRoot> in order to use advanced radium features like @media
    return (
      <AuthContext.Provider value={{authenticated: this.state.isAuthenticated, login:this.loginHandler}}>
      <Cockpit 
        personLength={this.state.person.length}
        togglePerson={this.state.togglePerson}
        clicked={this.togglePersonHandler}
      />
      {personComp}
      </AuthContext.Provider>
    );
  }
}

// wrap our App with higher order component Radium
export default withClass(App,styles.App);
