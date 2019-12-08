import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../component/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component{

    state = {
        ingredients: null,
        totalPrice: 4,
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

    clearIngredientHandler=()=>{
        this.setState(
            {
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
        )
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

        this.setState({loading: true}); // when continue is clicked, then we want to show the spinner

        const order = {
            ingredient: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'max',
                address: 'street1',
                phone: '12345',
                creditCard: '123'
            }
        }

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false, purchasing: false}); // after receiving response from server, we want to close modal and spinner

            })
            .catch(error=> {
                console.log(error);
                this.setState({loading: false, purchasing: false});
            });
        
    }

    componentDidMount = () =>{
        // send get request to fetch data from the database
        axios.get('/ingredients.json')
            .then(response => {
                console.log(response);
                this.setState({ingredients: response.data}) // update ingredients
                this.updatePurchaseState(response.data); // update purchase state
            })
            .catch(error=>{
                console.log(error);
            })
    }

    render(){
        
        // disable the less button if the ingredient has a value 0
        let disabledInfo = {...this.state.ingredients};
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

        if(this.state.ingredients != null){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>;
                    <BuildControls 
                        addIngHandle={this.addIngredientHandler} 
                        removeIngHandle={this.removeIngredientHandler}
                        purchaseHandle={this.purchaseHandler}
                        disabledInfo={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        clearClicked={this.clearIngredientHandler}
                    />
                </Aux>
            )

            orderSummary = (
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);