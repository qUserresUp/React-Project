import React from "react";
import { Component } from "react";
import Radium from 'radium';


import './Person.css' // import the css file in order to tell Webpack to inject the css styling into the HTML file

// one function can only return one parent element
// props.children will get the value between open tag and closing tag
const person = props => {
  const style={
    '@media (min-width:500px)' : {
      width: '450px'
    }
  }
  return (
    <div className="Person" style={style}>
      <p onClick={props.click}>
        My name is {props.name}, and I am {props.age} years old.{" "}
      </p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name} />
    </div>
  );
};

// Components can be implemented with Function or Class. In class, use this.props to get the input value
// class person2 extends Component {
//   render() {
//     return (
//       <p>
//         {" "}
//         My name is {this.props.name}, and I am {this.props.age} years old.{" "}
//       </p>
//     );
//   }
// }
export default Radium(person);
