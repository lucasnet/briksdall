import React from 'react';

// Lookup Table Header component (functional component)
// 
// props:
//  - title      -> table title (string)
//  - abstract   -> table abstract (text)
//  - type       -> table type (0: generic table, 1: lookup table)
//  - clickAdd   -> function for add new row
//  - clickPrint -> function for print table

// components
import Auxiliary from '../hoc/Auxiliary';
import ButtonAdd from '../buttons/button-add';
import ButtonPrint from '../buttons/button-print';

// custom css 
//import classes from './TableHeader.module.css';

const TableHeaderLookup = (props) => {
    return (
        <Auxiliary>
        <tr>
            <th colSpan="2">
                <h2>{props.title}</h2>
                <h5>
                    <p className="table-subtitle">{props.abstract}</p>
                </h5>
            </th>
         </tr>           
        <tr>           
            <th>
                <div>                    
                    <ButtonAdd click={props.clickAdd} />                    
                    <ButtonPrint click={props.clickPrint} />
                </div>    
            </th>
            <th></th>            
        </tr>
        </Auxiliary>
    )
};

export default TableHeaderLookup;