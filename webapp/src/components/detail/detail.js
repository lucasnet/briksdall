import React from 'react';

// components
import Calendar from 'react-calendar';
import DDRisorse from '../drop-downs/dd-risorse';
import DDGruppi from '../drop-downs/dd-gruppi';
import DDSottoGruppi from '../drop-downs/dd-sottogruppi';
import DDTipologie from '../drop-downs/dd-tipologie';
import TextBoxNumber from '../textboxes/textbox-number';
import ButtonSave from '../buttons/button-save';
import ButtonUndo from '../buttons/button-undo';
import ButtonClear from '../buttons/button-clear';
import ButtonBack from '../buttons/button-back';

// css
import classes from './detail.module.css';
import 'react-calendar/dist/Calendar.css';



class Detail extends React.Component {

    constructor(props) {
        super(props);        
    }

    id = this.props.id;
    state = {
        currentdate: new Date(),
        currentGroup: 0,
    }

    onCalendarSelect = (date) => {
        this.setState({currentdate : date})
    };
    onGruppiChange = (e) => {        
        this.setState({currentGroup: e.target.value});
    };

    render() {
        const a = "Sel. " + this.state.currentdate;

        return (
            <div className="panel">
                <div className="row detail-texture">
                    <div className="col-md-12">
                        <h2>Modifica Registrazione</h2>
                        <h5>
                            <p className="table-subtitle">Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.</p>
                        </h5>
                    </div>                    
                </div>                                        
                <div className="row detail-color">
                    <div className="col-md-4">
                        <Calendar className={classes.calendar} onChange={this.onCalendarSelect} />
                        <p>{a}</p>
                    </div>
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="txtCodice">Codice Registrazione</label>
                                <input type="text" className="form-control input-sm" id="txtCodice" disabled></input>
                            </div>                            
                            <div className="col-md-6">
                                <label>Risorsa</label>
                                <DDRisorse></DDRisorse>                                
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Gruppo</label>
                                <DDGruppi onchange={this.onGruppiChange}></DDGruppi>                      
                            </div>
                            <div className="col-md-6">
                                <label>Sottogruppo</label>
                                <div className="input-group">
                                    <DDSottoGruppi filtergroup={this.state.currentGroup}></DDSottoGruppi>             
                                </div>
                            </div>
                        </div>
                        <div className="row">                                             
                            <div className="col-md-6">
                                <label>Importo (€)</label>
                                <div className="input-group">  
                                    <TextBoxNumber placeholder="Importo" maxlength="7"></TextBoxNumber>                                    
                                    <div className="input-group-addon input-sm">&nbsp;,&nbsp;</div>
                                    <TextBoxNumber placeholder="00" maxlength="2"></TextBoxNumber>                                    
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label>Tipologia</label>
                                <div className="input-group">
                                    <DDTipologie></DDTipologie>                             
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <label>Note</label>
                                <textarea className="form-control input-sm cleanInput textarea" placeholder="Inserire le note relative a questa registrazione" rows="4" cols="1" maxLength="200"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                
                <footer className="panel-footer">
                    <div className="row">
                        <div className="col-md-12">
                            <ButtonSave></ButtonSave>
                            &nbsp;
                            <ButtonUndo></ButtonUndo>     
                            &nbsp;               
                            <ButtonClear></ButtonClear>
                            &nbsp;
                            <ButtonBack click={this.props.return} value={this.state.currentdate}></ButtonBack>
                        </div>
                    </div>                    
                </footer>                
            </div>
        );
    }
};

export default Detail;