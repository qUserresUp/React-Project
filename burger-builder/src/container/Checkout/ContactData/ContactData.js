import React, { Component } from 'react';
import Button from '../../../component/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../component/UI/Spinner/Spinner';
import Input from '../../../component/UI/Input/Input';

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
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
            },

            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zip Code'
                },
                value: '',
            },

            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
            },

            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
            },

            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', display: 'Fastest'},
                        {value: 'cheapest', display: 'Cheapest'},
                    ]
                },
                value: '',
            },
        },
        
        loading: false,
    }

    orderHandler = () => {
        console.log(this.props.ingredients);

        this.setState({loading: true}); // when continue is clicked, then we want to show the spinner

        const order = {
            ingredient: this.props.ingredients,
            price: this.props.totalPrice, 
            
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

    formInputChangeHandler = (event, inputIdentifier) =>{
        const updatedForm = {...this.state.orderForm}; // Be careful, '...' spread operator does not perform deep copy on nested objects
        const updatedElement = {...updatedForm[inputIdentifier]}; // therefore, we need to make a copy for the nested object again
        updatedElement.value = event.target.value;
        updatedForm[inputIdentifier] = updatedElement;
        this.setState({orderForm: updatedForm});
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
                <form>
                    {formElementArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        onChange={(event) => this.formInputChangeHandler(event,formElement.id)}
                    />
                    ))}
                    <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
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

export default ContactData;