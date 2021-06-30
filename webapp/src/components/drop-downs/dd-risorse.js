import React from 'react';

const DDRisorse = (props) => {
    return (
        <select className="form-control input-sm" onChange={props.onChange}>
            <option defaultValue value="0">&lt;Seleziona Risorsa&gt;</option>
            <option value="4">Banca Ely&amp;Luca</option>
            <option value="1">Cassa</option>
            <option value="6">CDC Ely</option>
            <option value="5">CDC Luca</option>
            <option value="7">CDC Postepay</option>
            <option value="8">Paypal</option>
            <option value="2">Ticket Sodexo</option>
            <option value="3">Ticket Sodexo (scaduti)</option>
        </select>   
    );
};

export default DDRisorse;