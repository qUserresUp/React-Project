import React, {Component} from "react";
import styles from './Person.module.css' // import modular css file, this style is scoped to this component only
import './Person.css' // import the css file in order to tell Webpack to inject the css styling into the HTML file

// one function can only return one parent element
// props.children will get the value between open tag and closing tag

/*
const Person = props => {
  
  console.log('[Person.js] is rendering');

  return (
    <div className={styles.Person}>
      <p onClick={props.click}>
        My name is {props.name}, and I am {props.age} years old.{" "}
      </p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name} />
    </div>    
  );
};
*/

//Components can be implemented with Function or Class. In class, use this.props to get the input value
class Person extends Component {

  render() {

    console.log('[Person.js] is rendering');
    return (
    <div className={styles.Person}>
      <p onClick={this.props.click}>
        My name is {this.props.name}, and I am {this.props.age} years old.{" "}
      </p>
      <p>{this.props.children}</p>
      <input type="text" onChange={this.props.changed} value={this.props.name} />
    </div>    
    );
  }
}
export default Person;
