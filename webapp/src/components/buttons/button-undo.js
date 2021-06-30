import React from 'react';

const ButtonUndo = (props) => {
    return (
        <button             
            className="btn btn-sm btn-light btn-icon-split" 
            onClick={props.click}>
                <span className="icon text-white-50">
                    <i className="fas fa-undo"></i>
                </span>
                <span className="text">Ripristina</span>
        </button>
    );
};

export default ButtonUndo;