import React from 'react';

// Table Lookup Row component (functional component)
// 
// props:
//  - element   -> payload (json)
//  - clickEdit   -> function for edit row
//  - clickDelete -> function for delete row


// components
import ButtonDelete from '../buttons/button-delete';
import ButtonEdit from '../buttons/button-edit';

// custom css
//import classes from './TableRow.module.css';

const TableRowLookup = (props) => {

    const element = props.element;

    // element is made of:
    // - ID
    // - Codice
    // - Descrizione
    

    return (
        <tr>
            <td className="col-actions">
                <ButtonEdit click={props.clickEdit}></ButtonEdit> 
                <ButtonDelete click={props.clickDelete}></ButtonDelete>    
            </td>
            <td>{element.Descrizione}</td>
        </tr>
    );
};

export default TableRowLookup;