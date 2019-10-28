import React from "react";
import { Component } from "react";

// one function can only return one parent element
// props.children will get the value between open tag and closing tag
const person = props => {
  return (
    <div>
      <p onClick={props.click}>
        My name is {props.name}, and I am {props.age} years old.{" "}
      </p>
      <p>{props.children}</p>
    </div>
  );
};

// Components can be implemented with Function or Class. In class, use this.props to get the input value
class person2 extends Component {
  render() {
    return (
      <p>
        {" "}
        My name is {this.props.name}, and I am {this.props.age} years old.{" "}
      </p>
    );
  }
}
export default person;
