import React from 'react';

const ButtonClear = (props) => {
    return (
        <button             
            className="btn btn-sm btn-light btn-icon-split" 
            onClick={props.click}>
                <span className="icon text-white-50">
                    <i className="fas fa-broom"></i>
                </span>
                <span className="text">Pulisci</span>
        </button>
    );
};

export default ButtonClear;