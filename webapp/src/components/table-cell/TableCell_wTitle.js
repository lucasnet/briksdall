import React from 'react';

// Component cell with a Title and a Value.
// The Title will be an H5 element styled with a "list" icon on the left.
// The Value will be a Span element in italic mode.

const TableCell_wTitle = (props) => {
    return (
        <td>
            <h5>
                <span className="label label-info-custom">
                    <span className="fas fa-list"></span>
                    &nbsp;{props.Title}
                </span>
            </h5>            
            <span><i>{props.Value}</i></span>
        </td>        
    );
};

export default TableCell_wTitle;