import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

/*
  Now, functional components can also have state using React Hooks
  Use useState() function from react library to set and change states
  useState() returns two variables (current state, function to set state)

  difference between useState and setState: useState does not merge new change with current change
  
*/
class App extends Component {
  state = {
    person: [
      { name: "max", age: 18 },
      { name: "max1", age: 19 },
      { name: "max2", age: 20 }
    ]
  };

  // when passing this function into the JSX code below, do not use {this.onClickHandler()}, or this function will exec immediantely
  // instead, only pass the reference of this function {this.onClickHandler}
  onClickHandler = () => {
    // this.state.person[0].name = "maxChange";  do not change state directly, or ReactDOM will not recognize the change
    // use Component.setState(): this function takes state object as input, and compare the difference, then update the DOM
    this.setState({
      person: [
        { name: "maxChange", age: 19 },
        { name: "max1Change", age: 20 },
        { name: "max2Change", age: 21 }
      ]
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Hi, this is da React Project yo</h1>
        <p>This is a paragraph!!</p>
        <button onClick={this.onClickHandler}>switch names</button>
        <Person
          name={this.state.person[0].name}
          age={this.state.person[0].age}
          click={this.onClickHandler}
        >
          and my hobby is fishing
        </Person>
        <Person
          name={this.state.person[1].name}
          age={this.state.person[1].age}
        />
        <Person
          name={this.state.person[2].name}
          age={this.state.person[2].age}
        />
      </div>
    );
  }
}

export default App;
