import React from 'react';

// Table Row component (functional component)
// 
// props:
//  - type      -> table type (0: generic table, 1: lookup table)
//  - key       -> element "key"
//  - element   -> payload (json)
//  - clickEdit   -> function for edit row
//  - clickDelete -> function for delete row


// components
import TableRowGeneric from './TableRowGeneric';
import TableRowLookup from './TableRowLookup';

// custom css
//import classes from './TableRow.module.css';

const TableRow = (props) => {

    const type = props.type;
    const row_generic = <TableRowGeneric 
                            key={props.key}
                            element={props.element} 
                            clickEdit={props.clickEdit}
                            clickDelete={props.clickDelete}
                        />;
    const row_lookup = <TableRowLookup 
                            key={props.key}
                            element={props.element} 
                            clickEdit={props.clickEdit}
                            clickDelete={props.clickDelete}
                        />;

    switch (type) {
        case 1: return row_lookup;
        default: return row_generic;
    }
    
    
};

export default TableRow;