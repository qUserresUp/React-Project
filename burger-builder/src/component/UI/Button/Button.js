import React from 'react';
import styles from './Button.module.css';

// className should receive a string of css classes seperated by space
const button =(props)=>{

    let classes = [styles.Button,styles[props.btnType]];
   
    return (<button 
            className={classes.join(' ')}
            onClick={props.clicked}
            disabled={props.disabled}
            >
                {props.children}
            </button>)
}

export default button;