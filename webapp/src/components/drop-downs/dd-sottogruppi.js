import React from 'react';

// will be get from webapi
const data = [    
    {gruppo: 1, value: 39, text: 'Add. CDC'},
    {gruppo: 3, value: 5,  text: 'Assicurazione'},
    {gruppo: 1, value: 70, text: 'Assicurazione Casa'},
    {gruppo: 1, value: 54, text: 'Assicurazione mutuo'},
    {gruppo: 1, value: 48, text: 'Assicurazione vita'},
    {gruppo: 1, value: 3,  text: 'ATM'},
    {gruppo: 1, value: 40, text: 'Bancomat'},
    {gruppo: 3, value: 4,  text: 'Benzina'},
    {gruppo: 1, value: 56, text: 'Biancheria casa'},
    {gruppo: 3, value: 6,  text: 'Bollo'},
    {gruppo: 1, value: 34, text: 'Canone RAI'},
    {gruppo: 1, value: 36, text: 'Casalinghi'},
    {gruppo: 1, value: 12, text: 'Cellulare'},
    {gruppo: 1, value: 67, text: 'Cimitero'},
    {gruppo: 1, value: 14, text: 'Cinema'},
    {gruppo: 1, value: 65, text: 'Condizionatore'},
    {gruppo: 1, value: 47, text: 'Dentista'},
    {gruppo: 1, value: 52, text: 'Ebay'},
    {gruppo: 1, value: 51, text: 'Elettronica'},
    {gruppo: 1, value: 30, text: 'Enel'},
    {gruppo: 1, value: 55, text: 'Esami'},
    {gruppo: 1, value: 16, text: 'Estetista'},
    {gruppo: 1, value: 71, text: 'Fai Da Te Bricolage'},
    {gruppo: 1, value: 35, text: 'Farmacia'},
    {gruppo: 1, value: 10, text: 'Francobolli'},
    {gruppo: 1, value: 29, text: 'Gas'},
    {gruppo: 5, value: 25, text: 'Generico'},
    {gruppo: 3, value: 59, text: 'Generico Auto'},
    {gruppo: 1, value: 49, text: 'Generico casa'},
    {gruppo: 1, value: 61, text: 'Gestione conto babbo Luca'},
    {gruppo: 1, value: 63, text: 'Gestione conto mamma Ely'},
    {gruppo: 7, value: 44, text: 'Giacche'},
    {gruppo: 1, value: 57, text: 'Giardinaggio'},
    {gruppo: 1, value: 18, text: 'Gioco'},
    {gruppo: 1, value: 53, text: 'Imu'},
    {gruppo: 7, value: 45, text: 'Intimo'},
    {gruppo: 3, value: 9,  text: 'Lavaggio'},
    {gruppo: 1, value: 58, text: 'Lavanderia'},
    {gruppo: 7, value: 41, text: 'Maglioni'},
    {gruppo: 3, value: 7,  text: 'Manutenzione Auto'},
    {gruppo: 1, value: 66, text: 'Manutenzione Casa'},
    {gruppo: 1, value: 21, text: 'Matrimonio'},
    {gruppo: 1, value: 72, text: 'Matteo'},
    {gruppo: 1, value: 38, text: 'Mobili/Elettrodomestici'},
    {gruppo: 1, value: 26, text: 'Mutuo'},
    {gruppo: 1, value: 27, text: 'Mutuo INPS'},
    {gruppo: 1, value: 22, text: 'Onlus'},
    {gruppo: 5, value: 24, text: 'Pane'},
    {gruppo: 7, value: 42, text: 'Pantaloni'},
    {gruppo: 1, value: 17, text: 'Parrucchiere'},
    {gruppo: 1, value: 11, text: 'Punto Croce'},
    {gruppo: 1, value: 19, text: 'Regali'},
    {gruppo: 1, value: 13, text: 'Ristorante / Pizzeria'},
    {gruppo: 7, value: 43, text: 'Scarpe'},
    {gruppo: 1, value: 60, text: 'Sky'},
    {gruppo: 1, value: 33, text: 'Spazzatura'},
    {gruppo: 5, value: 23, text: 'Spesa'},
    {gruppo: 1, value: 37, text: 'Spese banca'},
    {gruppo: 1, value: 64, text: 'Spese Card.Ferrari'},
    {gruppo: 1, value: 28, text: 'Spese Condominiali'},
    {gruppo: 1, value: 68, text: 'Spese Statuto 24'},
    {gruppo: 1, value: 1,  text: 'Stipendio'},
    {gruppo: 1, value: 69, text: 'Studio/Corsi'},
    {gruppo: 1, value: 32, text: 'Telefono'},
    {gruppo: 3, value: 8,  text: 'Telepass'},
    {gruppo: 1, value: 50, text: 'Titoli'},
    {gruppo: 1, value: 2,  text: 'Treno'},
    {gruppo: 7, value: 46, text: 'Varie abbigliamento'},
    {gruppo: 1, value: 20, text: 'Varie tempo libero'},
    {gruppo: 1, value: 15, text: 'Viaggi'}
];
    

    const DDSottoGruppi = (props) => {

        const filter = props.filtergroup;

        const rawdata = data.map(element => {
                if (filter === 0) {
                    // all elements
                    return <option key={element.value} gruppo={element.gruppo} value={element.value}>{element.text}</option>
                }else{
                    // filter
                    return (element.gruppo === filter) ? <option key={element.value} gruppo={element.gruppo} value={element.value}>{element.text}</option> : ''
                }
            }            
        );

        return (
            <select className="form-control input-sm" onChange={props.onChange}>
                <option key="0" defaultValue value="0">&lt;Seleziona sottogruppo&gt;</option>
                {rawdata}
            </select>            
    );
};

export default DDSottoGruppi;