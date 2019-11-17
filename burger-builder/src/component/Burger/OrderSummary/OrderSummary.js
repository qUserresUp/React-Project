import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary=(props)=>{

    const ingSummary = Object.keys(props.ingredients)
        .map((igKey)=>{
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>
                        {igKey}
                    </span>
                    :{props.ingredients[igKey]}
                </li>)
        })

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the floowing ingredients: </p>
            <ul>
                {ingSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Cotinue to Checkout?</p>
            <Button btnType={'Danger'} clicked={props.cancelOrderHandle}>Cancel</Button>
            <Button btnType={'Success'} clicked={props.continueOrderHandle}>Continue</Button>
        </Aux>
    )
}

export default orderSummary;