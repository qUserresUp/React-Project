import React, { Component } from "react";
import './UserIO.css'

const UserOutput = (props) => {

    return <p className="UserIO">This is UserOutput paragraph, user name: {props.name}</p>;
}

export default UserOutput;
