import { Base_Controller }         from "/BLancio/controller_base";
import { Registrazioni_Model }     from "/BLancio/mRegistrazioni";
import { Registrazioni_Presenter } from "/BLancio/pRegistrazioni";

//
// Controller for Registrazioni process
//
export class Registrazioni_Controller{

    // fields
    _auth           = null;     // {username : "", password : "" };
    _templates      = null;     // {modal_ok : "", modal_err : "", template : "", error : ""}
    _controllerBase = null;


    // Constructor. Set up initial values.
    // Params:
    // - auth: web services authorization fields (username, password)
    // - templates: routing templates
    constructor(auth, templates){
        this._auth = auth;
        this._templates = templates;

        this._controllerBase = new Base_Controller();
    }



    // Public Section 

    // Init. Entry point method. Initializes Gruppi process showing Gruppi list.
    // Params:
    // - notifyDetail: delegate for Detail event (click on single element in the list)
    async Init(notifyDetail){
        
        const data = await this.GetList();

        const presenter = new Registrazioni_Presenter(this._templates);
        presenter.ShowList(data.responseResult, data.responseData, notifyDetail);
    }

    async GetList(){
        
        const model = new Registrazioni_Model(this._auth);
        let rawData = await model.Registrazioni_List();
        
        const responseResult = this._controllerBase.GetResponseResult(rawData);
        const responseRawData = this._controllerBase.GetResponseRawData(rawData);
        const responseData = this.#getStructuredData(responseRawData);

        return {responseResult, responseData};
    }


    
    // Private Section

    #getStructuredData(responserawdata){
        const xmlDoc = $.parseXML(responserawdata);        
       
        let loe = [];
        let codice = "";
        let data = "";
        let gruppo = "";
        let sottogruppo = "";
        let risorsa = "";
        let valore = "";
        let note = "";
        let codice_tipologia = "";
        let status = 0;

        $(xmlDoc).find("row").each(function () {      
            
            const elements = this.childNodes;

            elements.forEach(function (element) {
                switch (element.nodeName.toLowerCase()){
                    case 'codice'           : codice           = element.textContent; break;
                    case 'data'             : data             = element.textContent; break;
                    case 'gruppo'           : gruppo           = decodeURIComponent(element.textContent); break;
                    case 'sottogruppo'      : sottogruppo      = decodeURIComponent(element.textContent); break;
                    case 'risorsa'          : risorsa          = decodeURIComponent(element.textContent); break;
                    case 'valore'           : valore           = element.textContent; break;
                    case 'note'             : note             = decodeURIComponent(element.textContent); break;
                    case 'codice_tipologia' : codice_tipologia = element.textContent; break;
                    case 'status'           : status           = element.textContent; break;
                }
               
            });

            loe.push({codice, data, gruppo, sottogruppo, risorsa, valore, note, codice_tipologia, status});
        });

        return loe;
    }
}

