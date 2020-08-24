import React from 'react';

// Table Generic Row component (functional component)
// 
// props:
//  - type      -> table type (0: generic table, 1: lookup table)
//  - element   -> payload (json)
//  - clickEdit   -> function for edit row
//  - clickDelete -> function for delete row


// components
import TableCell from '../table-cell/TableCell';
import TableCell_wTitle from '../table-cell/TableCell_wTitle';
import TableCell_curr_wTitle from '../table-cell/TableCell_curr_wTitle';
import ButtonDelete from '../buttons/button-delete';
import ButtonEdit from '../buttons/button-edit';

// custom css
//import classes from './TableRow.module.css';

const TableRowGeneric = (props) => {

    const element = props.element;

    // element is made of:
    // - ID
    // - Data
    // - Gruppo
    // - Sottogruppo
    // - Descrizione
    // - Risorsa
    // - Signum (1 -> ingresso, 0 -> uscita)
    // - Valore

    const gruppo = element.Gruppo + " - " + element.Sottogruppo;

    return (
        <tr>
            <td>
                <ButtonEdit click={props.clickEdit}></ButtonEdit> 
                <ButtonDelete click={props.clickDelete}></ButtonDelete>    
            </td>
            <TableCell Value={element.Data} />
            <TableCell_wTitle Title={gruppo} Value={element.Descrizione} />            
            {(element.Signum === 1) ? <td></td> : <TableCell_curr_wTitle Title={element.Risorsa} Value={element.Valore} />} 
            {(element.Signum === 0) ? <td></td> : <TableCell_curr_wTitle Title={element.Risorsa} Value={element.Valore} />}                                    
        </tr>
    );
};

export default TableRowGeneric;