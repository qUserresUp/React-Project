import React from 'react';
import styles from './Input.module.css';

const input = (props) =>{
    
    let inputElement = null;
    const inputClasses = [styles.inputElement];

    if(props.invalid){
        inputClasses.push(styles.Invalid);
    }
    
    switch (props.elementType) {
        
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.onChange}/>;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.onChange}/>;
            break;
        case ('select'):
            inputElement = (
                <select className={inputClasses.join(' ')} onChange={props.onChange}>
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