import React from 'react';

export default props => 
    <button className="btn btn-default" onClick={props.onClick}>
        {props.value}
    </button>