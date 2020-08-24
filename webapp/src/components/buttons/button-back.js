import React from 'react';

const ButtonBack = (props) => {
    return (
        <button             
            className="btn btn-sm btn-light btn-icon-split" 
            onClick={props.click}>
                <span className="icon text-white-50">
                    <i className="fas fa-arrow-left"></i>
                </span>
                <span className="text">Ritorna</span>
        </button>
    );
};

export default ButtonBack;