import React, { Component } from 'react';
import './CharComponent.css'

const CharComponent = (props) =>{
    return <p className='CharComponent' onClick={props.change}>{props.char}</p>

}

export default CharComponent;