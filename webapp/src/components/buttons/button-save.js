import React from 'react';

const ButtonSave = (props) => {
    return (
        <button             
            className="btn btn-sm btn-light btn-icon-split" 
            onClick={props.click}>
                <span className="icon text-white-50">
                    <i className="fas fa-save"></i>
                </span>
                <span className="text">Salva</span>
        </button>
    );
};

export default ButtonSave;