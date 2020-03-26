import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../component/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionType from '../../store/actions';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component{

    state = {

        purchasable: false,
        purchasing: false,
        loading: false

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
        return sum > 0;
    }

    // add ingredient to burger
    /*
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
    */

    // remove ingredient from burger
    /*
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
    */

    clearIngredientHandler=()=>{
        this.props.onClear();
    }
    
    purchaseHandler = () =>{
        this.setState({purchasing: true});
    }

    cancelOrderHandler = () =>{
        this.setState({purchasing: false});
    }

    continueOrderHandler = () =>{
        // alert('continue order!')
        // in real applications, its ideal to calculate the total price on server-side, prevent user from manipulating data
    /*
        const queryParams = [];
        for(let i in this.props.ings){
            queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.props.ings[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        });
    */
       this.props.history.push( '/checkout');        
    }

    componentDidMount = () =>{
        // send get request to fetch data from the database
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         console.log(response);
        //         this.setState({ingredients: response.data}) // update ingredients
        //         this.updatePurchaseState(response.data); // update purchase state
        //     })
        //     .catch(error=>{
        //         console.log(error);
        //     })
    }

    render(){
        
        // disable the less button if the ingredient has a value 0
        let disabledInfo = {...this.props.ings};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        /*
            since <orderSummary /> and <Burger /> components depend on ingredient 
            so before we were able to fetch the data, we have to set the two components 
            to null and <Spinner /> first
        */
        let orderSummary = null; 
        let burger = <Spinner />;

        if(this.props.ings != null){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>;
                    <BuildControls 
                        addIngHandle={this.props.onIngredientAdded} 
                        removeIngHandle={this.props.onIngredientRemoved}
                        purchaseHandle={this.purchaseHandler}
                        disabledInfo={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        clearClicked={this.clearIngredientHandler}
                    />
                </Aux>
            )

            orderSummary = (
                <OrderSummary 
                    ingredients={this.props.ings}
                    price={this.props.price}
                    continueOrderHandle={this.continueOrderHandler}
                    cancelOrderHandle={this.cancelOrderHandler}/>
            )
        }
        
        if(this.state.loading){
            orderSummary = <Spinner />
        }
                
        return (
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.cancelOrderHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        ings: state.ingredients,
        price: state.totalPrice,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionType.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionType.REMOVE_INGREDIENT, ingredientName: ingName}),
        onClear: () => dispatch({type: actionType.CLEAR_INGREDIENT}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));