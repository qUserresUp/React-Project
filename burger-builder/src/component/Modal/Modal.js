import React from 'react';
import styles from './Modal.module.css';
import Aux from '../../hoc/Aux';
import Backdrop from '../UI/Backdrop/Backdrop';

const modal = (props) =>(
    <Aux>
        <Backdrop show={props.show} clicked={props.cancelOrderHandle}/>
        <div className={styles.Modal}
            style={{
                transform: props.show ? 'translateY(0)':'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}
        >
            {props.children}
        </div>
    </Aux>
)

// use React.memo() in functional components, its similar to shouldComponentUpdate() in class based components
// however when preState equals nextState, shouldComponentUpdate() returns false, memo() returns true
// when modal is not shown, then we do not update the wrapped orderSummary
export default React.memo(modal, (preProps, nextProps)=>{ return preProps.show === nextProps.show});