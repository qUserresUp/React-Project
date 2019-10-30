import React, { Component } from "react";

const UserInput = (props) => {
    return (
        <div className="UserIO">
            <input type="text" onChange={props.changeHandler} value={props.name} />
        </div>
    );
}

export default UserInput;