import React from 'react';

// Lookup Gruppi Content component (class component)
// 
// props:
//
// state:
// - mode : lookup mode (table/detail)
// - id : selected item (0 -> new item)

// components
import Table from '../table/Table';
import Detail from '../detail/detail';

// css
//import classes from './Content.module.css';

// data mocks (test)
import data from '../../mocks_data/gruppi.json';


class ContentLookupGruppi extends React.Component {

    _modes = {
        TABLE : 'table',
        DETAIL : 'detail'
    }

    constructor(props) {
        super(props);
        this.state = {
                        mode: this._modes.TABLE,
                        id : 0
                    };  
    }
    
    
    // data test
    rows_lookup = data;


    editRow = (id) => {
        this.setState({mode : this._modes.DETAIL, id: id});
    }
    deleteRow = (id) => {
        alert('delete row ' + id);
    }
    addRow = () =>{
        this.setState({mode : this._modes.DETAIL, id: 0});
    }
    print = () => {
        alert('print table');
    }
    detailReturn = () =>{        
        this.setState({mode : this._modes.TABLE});
    }



    render() {
        const lookup_table = 1;

        if (this.state.mode === this._modes.TABLE){
            return (
                <Table 
                    type={lookup_table}
                    title={"Configurazione Gruppi"}
                    abstract={"Configurazione dei Gruppi di bilancio."}
                    elements={this.rows_lookup}   
                    addRow={this.addRow}
                    print={this.print}             
                    editRow={this.editRow}
                    deleteRow={this.deleteRow}>                    
                </Table>
            );
        }
        else{
            return (
                <Detail 
                    id={this.state.id} 
                    return={this.detailReturn}>                    
                </Detail>        
            );
        }
    }
};

export default ContentLookupGruppi;