import React, {Component} from "react";
import styles from './Person.module.css' // import modular css file, this style is scoped to this component only
import './Person.css' // import the css file in order to tell Webpack to inject the css styling into the HTML file
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/Context';

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

  constructor(props){
    super(props)
    this.inputElRef = React.createRef(); //use ref - method 2: class based component use createRef() to create reference
  }

  static contextType = AuthContext;

  componentDidMount(){  
    // this.inputEl.focus();
    this.inputElRef.current.focus();
  }

  render() {

    console.log('[Person.js] is rendering');
    return (

    <div className={styles.Person}>

      {this.context.authenticated ? <p>is Authenticated</p> : <p>Please Login</p>}
      <p onClick={this.props.click}>
        My name is {this.props.name}, and I am {this.props.age} years old.{" "}
      </p>
      <input 
      type="text" 
      onChange={this.props.changed} 
      value={this.props.name} 
      // ref={(inputRef)=>{this.inputEl = inputRef}} // use ref - method1: use inline function to get reference to the element
      ref={this.inputElRef} // use ref - method2: use constructor + React.createRef() + this.inputElRef.current.focus()
      />
    </div>    
    );
  }
}

/*
  use 'prop-types' package to help define the type of props
  Install: npm install --save prop-types
  This is very helpful when distributing my component to a project or team, help other to use this component correctly
  When incorrect props is passed to this component, then a warning will be cast to the console
 */
Person.propTypes={
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
  
}
export default Person;
