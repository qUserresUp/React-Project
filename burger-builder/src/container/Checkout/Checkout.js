import React, { Component } from 'react';
import CheckoutSummary from '../../component/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {

    continueCheckoutHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

    cancelCheckoutHandler = () =>  {
        this.props.history.goBack();
    }

    render(){
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.props.ings}
                continueCheckout={this.continueCheckoutHandler}
                cancelCheckout={this.cancelCheckoutHandler}
                />
                <Route 
                path={this.props.match.path + '/contact-data'} 
                component={ContactData}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
    }
}

export default connect(mapStateToProps)(Checkout);