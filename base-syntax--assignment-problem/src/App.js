import React, { Component } from 'react';
import './App.css';

import UserOutput from './UserIO/UserOutput';
import UserInput from './UserIO/UserInput';


class App extends Component {

  state = {
    userName: "Hey, type in the box"
  }

  changeHandler = (event) => {
    this.setState({
      userName: event.target.value
    })
  }
  render() {

    const stylesheet = {
      backgroundColor: 'yellow',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
    }

    return (
      <div className="App">
        <h style={stylesheet}>HOMEWORK ASSIGNMENT 1</h>
        

        <UserOutput name={this.state.userName} />
        <UserInput changeHandler={this.changeHandler} name={this.state.userName} />
      </div>
    );
  }
}

export default App;
