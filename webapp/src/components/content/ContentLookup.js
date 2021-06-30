import React from 'react';

// Lookup Content component (class component)
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

class ContentLookup extends React.Component {

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
    rows_lookup = [
        {
            ID : 1,
            Codice : 1,
            Descrizione: 'Lookup Elemento 1'
        },
        {
            ID : 2,
            Codice : 2,
            Descrizione: 'Lookup Elemento 2'
        },
        {
            ID : 3,
            Codice : 3,
            Descrizione: 'Lookup Elemento 3'
        },
        {
            ID : 4,
            Codice : 4,
            Descrizione: 'Lookup Elemento 4'
        },
        {
            ID : 5,
            Codice : 5,
            Descrizione: 'Lookup Elemento 5'
        },
        {
            ID : 6,
            Codice : 6,
            Descrizione: 'Lookup Elemento 6'
        },
        {
            ID : 7,
            Codice : 7,
            Descrizione: 'Lookup Elemento 7'
        },
        {
            ID : 8,
            Codice : 8,
            Descrizione: 'Lookup Elemento 8'
        },
        {
            ID : 9,
            Codice : 9,
            Descrizione: 'Lookup Elemento 9'
        },
        {
            ID : 10,
            Codice : 10,
            Descrizione: 'Lookup Elemento 10'
        }
    ];
    rows = [
        {
            ID : 1,
            Data : "12/12/2002",
            Gruppo : "Gruppo A",
            Sottogruppo : "Sottogruppo 1",        
            Descrizione : "Descrizione",
            Risorsa : "Risorsa AA",
            Signum : 0,
            Valore : "200.56"
        },
        {
            ID : 2,
            Data : "22/02/2002",
            Gruppo : "Gruppo B",
            Sottogruppo : "Sottogruppo 2",        
            Descrizione : "Descrizione della regione due.",
            Risorsa : "Risorsa BB",
            Signum : 1,
            Valore : "1200.56"
        }
    ];





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
        if (this.state.mode === this._modes.TABLE){
            return (
                <Table 
                    type={1}
                    title={"Elenco Lookup"}
                    abstract={"this is the abstract"}
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

export default ContentLookup;