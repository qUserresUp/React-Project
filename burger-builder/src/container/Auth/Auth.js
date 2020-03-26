import React, { Component } from 'react';
import classes from './Auth.module.css';
import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';


class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
            },

            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        },
        formIsValid: false,
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

    inputChangeHandler = (event, controlName) =>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true,
            }
        }; // Be careful, '...' spread operator does not perform deep copy on nested objects
        
        let formIsValid = true;
        for(let inputId in updatedControls) {
            formIsValid = updatedControls[inputId].valid && formIsValid
        }

        this.setState({controls: updatedControls, formIsValid: formIsValid});
    }

    
    render() {

        const formElementArray = [];
        for(let key in this.state.controls){
            formElementArray.push({
                id:key,
                config: this.state.controls[key],
            });
        }

        const form = formElementArray.map(formElement => (
            <Input 
                key={formElement.id} 
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                onChange={(event) => this.inputChangeHandler(event,formElement.id)}
                invalid={!formElement.config.valid && formElement.config.touched}
            />
        ))
        return (
            <div className={classes.Auth}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </div>
        )
    }
}

export default Auth;