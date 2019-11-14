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
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map((el)=>{
                return <BuildControl 
                    key={el.label} 
                    label={el.label} 
                    addIngHandle={()=>props.addIngHandle(el.type)}
                    removeIngHandle={()=>props.removeIngHandle(el.type)}
                    disabledInfo={props.disabledInfo[el.type]}
                />
            })}
            <button className={styles.OrderButton} 
                    disabled={!props.purchasable}
                    onClick={props.purchaseHandle}
            >
                ORDER NOW
            </button>
        </div>
    )
}

export default buildControls;