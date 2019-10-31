import React, { Component } from 'react';

const Text = (props) => {

    let message = (<p>the input is ok</p>);
    if(props.input.length >= 7){ message = (<p>the input is too long</p>)}
    else if(props.input.length <= 3){ message = (<p>the input is too short</p>)}
    
    return(
        <div>
            <p>the length of the input: {props.input.length}</p>
            {message}
        </div>
    )
}

export default Text;