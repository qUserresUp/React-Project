import React from 'react';
import styles from './Input.module.css';

const input = (props) =>{
    
    let inputElement = null;

    switch (props.elementType) {
        
        case ('input'):
            inputElement = <input className={styles.InputElement} {...props.elementConfig} value={props.value} onChange={props.onChange}/>;
            break;
        case ('textarea'):
            inputElement = <textarea className={styles.InputElement} {...props.elementConfig} value={props.value} onChange={props.onChange}/>;
            break;
        case ('select'):
            inputElement = (
                <select className={styles.InputElement} onChange={props.onChange}>
                    {props.elementConfig.options.map(opt => (
                        <option value={opt.value} >{opt.display}</option>
                    ))}
                </select>
            )
            break;
        default:
            inputElement = <input className={styles.InputElement} {...props.elementConfig} value={props.value} onChange={props.onChange}/>;
    }
    return (
        <div>
            <label className={styles.Label} >{props.name}</label>
            {inputElement}
        </div>
    );
}

export default input;