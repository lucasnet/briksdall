import React from 'react';

// Table Header component (functional component)
// 
// props:
//  - type       -> table type (0: generic table, 1: lookup table)
//  - title      -> table title (string)
//  - abstract   -> table abstract (text)
//  - type       -> table type (0: generic table, 1: lookup table)
//  - clickAdd   -> function for add new row
//  - clickPrint -> function for print table


// components
import TableHeaderGeneric from './TableHeaderGeneric';
import TableHeaderLookup from './TableHeaderLookup';

// custom css
//import classes from './TableHeader.module.css';

const TableHeader = (props) => {

    const type = props.type;
    const th_generic = <TableHeaderGeneric
                            title={props.title}
                            abstract={props.abstract}
                            clickAdd={() => props.addRow()}
                            clickPrint={() => props.print()}
                        />
   const th_lookup = <TableHeaderLookup
                            title={props.title}
                            abstract={props.abstract}                
                            clickAdd={() => props.addRow()}
                            clickPrint={() => props.print()}
                     />

    switch (type){
        case 1  : return th_lookup;
        default : return th_generic;
    }
    
};

export default TableHeader;