import React from 'react';

// Add button component (functional component)
// 
// props:
// - click: button click event handler


const ButtonAdd = (props) => {
    return (
        <a class="btn btn-app" onClick={props.click}>
            <i class="fas fa-plus"></i> Aggiungi
        </a>   
    );
};

export default ButtonAdd;