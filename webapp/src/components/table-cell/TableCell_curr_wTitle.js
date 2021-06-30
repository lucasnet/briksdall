import React from 'react';


// Component Currency cell with a Title and a Value.
// The Value will be an H5 element styled with a "euro" icon on the left.
// The Title will be a Span element.

// "currency" class is defined in briksdall.css

const TableCell_curr_wTitle = (props) => {
    return (
        <td className="td-currency">   
            <span className="label">
                <span className="fas fa-euro-sign"></span>
                &nbsp;{props.Title}
            </span>                
            <h5>{props.Value}</h5>
        </td>          
    );
};

export default TableCell_curr_wTitle;