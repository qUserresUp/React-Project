import React from 'react';
import styles from './Backdrop.module.css';

const backdrop=(props)=>{

    
    const bdStyle = props.close ? [styles.Backdrop, styles.Close].join(' ') : styles.Backdrop;

    return props.show ? <div className={bdStyle} onClick={props.clicked}></div> : null
}

export default backdrop;