import React, { Component } from 'react';
import CheckoutSummary from '../../component/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';

class Checkout extends Component {
    
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon:0,
        },
        totalPrice: 0, 
    }

    componentDidMount(){
        console.log(this.props);
        const queryParams = new URLSearchParams(this.props.location.search); // use 'URLSearchParams' to parse query 
        let ing = {};
        let price = 0;
        for(let entry of queryParams.entries()){
            if(entry[0] === 'price'){
                price = entry[1];
            }
            else{
                ing[entry[0]] = +entry[1]; // watchout! the entry[1] is a string, convert it to number
            }
        }
        this.setState({ingredients: ing, totalPrice: price});
    }

    continueCheckoutHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

    cancelCheckoutHandler = () =>  {
        this.props.history.goBack();
    }

    render(){
        console.log(this.state);
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                continueCheckout={this.continueCheckoutHandler}
                cancelCheckout={this.cancelCheckoutHandler}
                />
                <Route 
                path={this.props.match.path + '/contact-data'} 
                render={()=>(<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...this.props}/>)}
                />
            </div>
        );
    }
}

export default Checkout;