import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const buildControls = (props) =>{
    return(
        <div className={styles.BuildControls}>
            {controls.map((el)=>{
                return <BuildControl 
                    key={el.label} 
                    label={el.label} 
                    addIngHandle={()=>props.addIngHandle(el.type)}
                />
            })}
        </div>
    )
}

export default buildControls;