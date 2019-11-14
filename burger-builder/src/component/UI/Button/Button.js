import React from 'react';
import styles from './Button.module.css';

const button =(props)=>{
    return <button className={[styles.Button,styles[props.btnType]].join(' ')}>{props.children}</button>
}

export default button;