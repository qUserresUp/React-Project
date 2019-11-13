import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


class BurgerBuilder extends Component{

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
    }

    addIngredientHandler=(type)=>{
        const newCount = this.state.ingredients[type]+1;
        let newIng = {...this.state.ingredients};
        newIng[type] =newCount;
        let newPrice = this.state.totalPrice+INGREDIENT_PRICE[type];

        this.setState({
            ingredients: newIng, 
            totalPrice: newPrice
        });
    }

    render(){

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls addIngHandle={this.addIngredientHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;