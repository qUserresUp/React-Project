import React from 'react';
import styles from './Button.module.css';

// className should receive a string of css classes seperated by space
const button =(props)=>{
    return (<button 
            className={[styles.Button,styles[props.btnType]].join(' ')}
            onClick={props.clicked}>
                {props.children}
            </button>)
}

export default button;