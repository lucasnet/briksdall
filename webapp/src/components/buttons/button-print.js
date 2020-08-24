import React from 'react';

// Print button component (functional component)
// 
// props:
// - click: button click event handler

const ButtonPrint = (props) => {
    return (
        <a class="btn btn-app" onClick={props.click}>
            <i class="fas fa-print"></i> Stampa
        </a>          
    );
};

export default ButtonPrint;