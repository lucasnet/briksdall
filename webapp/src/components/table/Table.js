import React from 'react';

 
// Table component (functional component)
// 
// props:
//  - type      -> table type (0: generic table, 1: lookup table)
//  - title     -> table title (string)
//  - abstract  -> table abstract (text)
//  - elements  -> payload table (array)
//  - editRow   -> function for edit row
//  - deleteRow -> function for delete row
//  - addRow    -> function for add new row
//  - print     -> function for print table



// components
import TableRow from '../table-row/TableRow';
import TableHeader from '../table-header/TableHeader';

// custom css


const Table = (props) => {

    const rows = props.elements.map(row => {
        return <TableRow
                    type={props.type} 
                    key={row.ID}
                    element={row} 
                    clickEdit={() => props.editRow(row.ID)}
                    clickDelete={() => props.deleteRow(row.ID)}
                ></TableRow>
    });

    return (        
        <table className="table table-head-fixed text-nowrap" width="100%" cellSpacing="0">
            <thead>
                <TableHeader
                    title={props.title}
                    abstract={props.abstract}
                    type={props.type}
                    clickAdd={() => props.addRow()}
                    clickPrint={() => props.print()}>                        
                </TableHeader>
            </thead>            
            <tbody>
                {rows}
            </tbody>
        </table>
    );
};

export default Table;