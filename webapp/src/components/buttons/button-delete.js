import React from 'react';

// Delete button component (functional component)
// 
// props:
// - click: button click event handler

const ButtonDelete = (props) => {
    return (        
        <a class="btn btn-app" onClick={props.click}>
            <i class="fas fa-trash"></i> Elimina
        </a>     
    );
};

export default ButtonDelete;