import React from 'react';

const DDTipologie = (props) => {
    return (
        <select className="form-control input-sm" onChange={props.onChange}>
            <option defaultValue value="0">&lt;Seleziona Tipologia&gt;</option>
            <option value="1">Entrate</option>
            <option value="2">Uscite</option>
        </select>       
    );
};

export default DDTipologie;