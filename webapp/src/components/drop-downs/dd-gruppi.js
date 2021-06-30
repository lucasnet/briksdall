import React from 'react';

// will be get from webapi
const data = [
    {value: 7, text: 'Abbigliamento'},
    {value: 5, text: 'Alimentari'},
    {value: 3, text: 'Auto'},
    {value: 6, text: 'Casa'},
    {value: 9, text: 'Casa Card.Ferrari'},
    {value: 10, text: 'Casa Statuto 24'},
    {value: 8, text: 'Spese Mediche'},
    {value: 1, text: 'Stipendio'},
    {value: 4, text: 'Tempo Libero'},
    {value: 2, text: 'Trasporti'},
];

const DDGruppi = (props) => {

    const rawdata = data.map(element => {
        return <option key={element.value} value={element.value}>{element.text}</option>
        }            
    );

    return (
        <select className="form-control input-sm" onChange={props.onchange}>
            <option key="0" defaultValue value="0">&lt;Seleziona gruppo&gt;</option>
            {rawdata}
        </select>  
    );
};

export default DDGruppi;