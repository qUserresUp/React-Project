import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';

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
        purchasable: false,
        purchasing: false

    }

    // enable order button when at least one ingredient added
    updatePurchaseState=(ingredients)=>{
        
        const sum = Object.keys(ingredients)
            .map((igKey)=>(
                ingredients[igKey]
            ))
            .reduce((sum,el)=>(
                 sum+el
            ),0);
        this.setState({purchasable: sum > 0})
    }

    // add ingredient to burger
    addIngredientHandler=(type)=>{
        const newCount = this.state.ingredients[type]+1;
        let newIng = {...this.state.ingredients};
        newIng[type] =newCount;
        let newPrice = this.state.totalPrice+INGREDIENT_PRICE[type];

        this.setState({
            ingredients: newIng, 
            totalPrice: newPrice
        });
        // here we need to give the updated state to updatePurchasesState() function, or it will use the current state ,set wrong value
        // for example, current state: 0,0,0,0, next state 1,0,0,0, the order button should be enabled, however, use the old state will set it disabled
        this.updatePurchaseState(newIng); 
    }

    // remove ingredient from burger
    removeIngredientHandler=(type)=>{
        if(this.state.ingredients[type] <= 0){ return; } // prevent from negative value
        const newCount = this.state.ingredients[type]-1;
        let newIng = {...this.state.ingredients};
        newIng[type] =newCount;
        let newPrice = this.state.totalPrice-INGREDIENT_PRICE[type];

        this.setState({
            ingredients: newIng, 
            totalPrice: newPrice
        });
        this.updatePurchaseState(newIng);
    }

    
    purchaseHandler = () =>{
        this.setState({purchasing: true});
    }

    cancelOrderHandler = () =>{
        this.setState({purchasing: false});
    }

    continueOrderHandler = () =>{
        alert('continue order!')
    }

    render(){
        
        // disable the less button if the ingredient has a value 0
        let disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
                
        return (
            <Aux>
                <Modal show={this.state.purchasing} cancelOrderHandle={this.cancelOrderHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        continueOrderHandle={this.continueOrderHandler}
                        cancelOrderHandle={this.cancelOrderHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    addIngHandle={this.addIngredientHandler} 
                    removeIngHandle={this.removeIngredientHandler}
                    purchaseHandle={this.purchaseHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;