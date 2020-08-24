import React from 'react';

//import classes from './TableHeader.module.css';
import Auxiliary from '../hoc/Auxiliary';
import ButtonAdd from '../buttons/button-add';
import ButtonPrint from '../buttons/button-print';

const TableHeaderGeneric = (props) => {
    return (
        <Auxiliary>
        <tr>
            <th colSpan="5">
                <h2>Elenco Registrazioni</h2>
                <h5>
                    <p className="table-subtitle">Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.</p>
                </h5>
            </th>
         </tr>           
        <tr>           
            <th colSpan="3">
                <div>                    
                    <ButtonAdd click={props.clickAdd} />
                    &nbsp;
                    <ButtonPrint click={props.clickPrint}/>
                </div>    
            </th>
            <th className="td-currency">
                Entrate
            </th>            
            <th className="td-currency">
                Uscite
            </th> 
        </tr>
        </Auxiliary>
    )
};

export default TableHeaderGeneric;