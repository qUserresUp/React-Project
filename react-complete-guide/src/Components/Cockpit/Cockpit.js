import React, {useEffect, useRef} from 'react'; // useEffect lifecycle hook
import styles from './Cockpit.module.css';

const Cockpit =(props)=>{

    const togglebtnRef = React.useRef(null);
    /* 
        useEffect is the lifecycle hook for functional component 
        and is a combination of componentDidMount() + componentDidUpdate() + componentWillUnmount()
        send HTTPS requests can happen in this hook
        The second input is a list of dependencies
        if the list is empty, then this will only executed when the component is rendered for the first time
    */
    useEffect(()=>{
        console.log('[Cockpit.js] useEffect');
        // setTimeout(()=>{alert('Saved data to cloud');}, 1000);
        togglebtnRef.current.click();
        return ()=>{ console.log('this will be executed when this component is unmounted, clean up work can happen here'); } // this returned function will executed when the component is unmounted
    },[]);

    /*
        can have multiple useEffect() functions
        if no second argument is passed to the function, then the returned function will be executed every lifecycle of this component
    */
    useEffect(()=>{
        console.log('[Cockpit.js] 2nd useEffect');
        // setTimeout(()=>{alert('Saved data to cloud2');}, 1000);
        return ()=>{ console.log('[Cockpit.js] 2nd useEffect cleanup work'); } 
    });
    
    const classArr = [];     // use a string of css class names to pass more than one stylsheet into an element
    let btnClass = '';
    
    if(props.togglePerson){ btnClass=styles.red; }
    if(props.personLength <= 2){ classArr.push(styles.red); }
    if(props.personLength <= 1){ classArr.push(styles.bold); }

    return(
        <div className={styles.Cockpit}>
            <h1>Hi, this is da React Project</h1>
            <p className={classArr.join(' ')}>I can change color and font</p>
            <button 
                ref={togglebtnRef}
                className={btnClass}
                onClick={props.clicked}>
                toggle person
             </button>
        </div>
    )
}

/*
    React.memo is similar to shouldComponentUpdate() in class based component, 
    if this component does not change, then it will not be updated
*/
export default React.memo(Cockpit);  