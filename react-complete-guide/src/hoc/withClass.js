import React from 'react';

// const withClass = (props) =>{
//     return <div className={props.classes}>{props.children}</div>
// }

// using spreak operator {...props} to pass all the input props to the wrapped component
const withClass = (WrappedComponent, classes) => {
    return (props)=>(
        <div className={classes}>
            <WrappedComponent {...props}/>
        </div>
    )
}

export default withClass;