import React, { Component } from 'react';
import { connect } from 'react-redux'; // 'connect' is a function that returns a higher order function [TODO]

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <div>
                    <CounterOutput value={this.props.ctr} />
                    <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                    <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                    <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                    <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
                </div>
                <button onClick={this.props.onStoreResult}>Store Result</button>
                <ul>
                    {this.props.storedResult.map(el => (
                        <li key={el.id} onClick={()=>this.props.onDeleteResult(el.id)}>{el.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

// 'connect' configuration: pass info from redux store to <Counter /> as props
const mapStateToProps = state => {
    return {
        ctr: state.counter,
        storedResult: state.result,
    }
}

// 'connect' configuration: pass redux dispatch functions to <Counter /> as props
const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT}),
        onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
        onAddCounter: () => dispatch({type: actionTypes.ADD, value=5}),
        onSubtractCounter: () => dispatch({type: actionTypes.SUBTRACT, value=5}),
        onStoreResult: ()=> dispatch({type: actionTypes.STORE_RESULT}),
        onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, deleteElID: id}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);