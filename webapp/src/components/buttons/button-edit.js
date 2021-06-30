import React from 'react';

// Edit button component (functional component)
// 
// props:
// - click: button click event handler

const ButtonEdit = (props) => {
    return (
        <a class="btn btn-app" onClick={props.click}>
            <i class="fas fa-edit"></i> Modifica
        </a>        
    );
};

export default ButtonEdit;