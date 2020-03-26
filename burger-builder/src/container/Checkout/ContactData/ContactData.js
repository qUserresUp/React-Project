import React, { Component } from 'react';
import Button from '../../../component/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../component/UI/Spinner/Spinner';
import Input from '../../../component/UI/Input/Input';
import { connect } from 'react-redux';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,

                },
                valid: false,
                touched: false,
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true,
                    
                },
                valid: false,
                touched: false,
            },

            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false,
            },

            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true,
                    
                },
                valid: false,
                touched: false,
            },

            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    
                },
                valid: false,
                touched: false,
            },

            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', display: 'Fastest'},
                        {value: 'cheapest', display: 'Cheapest'},
                    ]
                },
                value: 'fastest',
                valid: true,
            },
        },
        
        loading: false,
        formIsValid: false,
    }

    orderHandler = ( event ) => {

        event.preventDefault();
        this.setState({loading: true}); // when continue is clicked, then we want to show the spinner

        const formData = {};
        for(let formElementID in this.state.orderForm){
            formData[formElementID] = this.state.orderForm[formElementID].value;
        }
        const order = {
            ingredient: this.props.ings,
            price: this.props.price, 
            orderData: formData,
        }

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false}); // after receiving response from server, we want to close modal and spinner
                this.props.history.push('/');
            })
            .catch(error=> {
                console.log(error);
                this.setState({loading: false});
            });
    }

    checkValidity(value, rules) {
        let isValid = true;
        if(!rules){ return isValid};
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = (value.length >= rules.minLength) && isValid;
        }

        if(rules.maxLength){
            isValid = (value.length <= rules.maxLength) && isValid
        }

        if(rules.isEmail) {
            isValid = isValid && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
        }

        if(rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    formInputChangeHandler = (event, inputIdentifier) =>{
        const updatedForm = {...this.state.orderForm}; // Be careful, '...' spread operator does not perform deep copy on nested objects
        const updatedElement = {...updatedForm[inputIdentifier]}; // therefore, we need to make a copy for the nested object again
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.touched = true;
        updatedForm[inputIdentifier] = updatedElement;

        let formIsValid = true;
        for(let inputId in updatedForm) {
            formIsValid = updatedForm[inputId].valid && formIsValid
        }
        this.setState({orderForm: updatedForm, formIsValid: formIsValid});
    }
    render(){

        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config: this.state.orderForm[key],
            });
        }

        let contactform = <Spinner />
        
        if(!this.state.loading){
            contactform = (
                <form onSubmit={this.orderHandler}>
                    {formElementArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        onChange={(event) => this.formInputChangeHandler(event,formElement.id)}
                        invalid={!formElement.config.valid && formElement.config.touched}
                    />
                    ))}
                    <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
                </form>
            )
        }

        return(
            <div className={styles.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {contactform}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
    }
}

export default connect(mapStateToProps)(ContactData);