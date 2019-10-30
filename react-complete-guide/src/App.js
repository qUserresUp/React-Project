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

  nameChangeHandler = (event) => {
    this.setState({
      person: [
        { name: "max", age: 30 },
        { name: event.target.value, age: 40 },
        { name: "max2Change", age: 50 }
      ]
    });
  };
  // when passing this function into the JSX code below, do not use {this.onClickHandler()}, or this function will exec immediantely
  // instead, only pass the reference of this function {this.onClickHandler}
  onClickHandler = input => {
    // this.state.person[0].name = "maxChange";  do not change state directly, or ReactDOM will not recognize the change
    // use Component.setState(): this function takes state object as input, and compare the difference, then update the DOM
    this.setState({
      person: [
        { name: input, age: 19 },
        { name: "max1Change", age: 20 },
        { name: "max2Change", age: 21 }
      ]
    });
  };

  //arrow event handler function can be inefficient sometimes, suggest to use bind syntax
  render() {
    // React also support inline css style sheet

    const stylesheet = {
      backgroundColor: 'yellow',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    return (
      <div className="App">
        <h1>Hi, this is da React Project yo</h1>
        <p>This is a paragraph!!</p>
        <button style={stylesheet}
          onClick={() => this.onClickHandler("max1ChangeInputButton")}>
          switch names
        </button>
        <Person
          name={this.state.person[0].name}
          age={this.state.person[0].age}
          click={this.onClickHandler.bind(this, "max1ChangeInputText")}
        >
          and my hobby is fishing
        </Person>
        <Person
          name={this.state.person[1].name}
          age={this.state.person[1].age}
          changed={this.nameChangeHandler}
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
