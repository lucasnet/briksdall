import { Base_Controller }   from "/BLancio/controller_base";
import { Risorse_Model }     from "/BLancio/mRisorse";
import { Risorse_Presenter } from "/BLancio/pRisorse";


//
// Controller for Risorse process
//
export class Risorse_Controller{

    // fields
    _auth = null;           // {username : "", password : "" };
    _templates = null;      // {modal_ok : "", modal_err : "", template : "", error : ""}
    _controllerBase = null;


    // Constructor. Set up initial values.
    // Params:
    // - auth: web services authorization fields (username, password)
    // - templates: modal_ok, modal_err, template
    constructor(auth, templates){
        this._auth = auth;
        this._templates = templates;

        this._controllerBase = new Base_Controller();
    }
    


    // Public Section 

    // Init. Entry point method. Initializes Risorse process showing Risorse list.
    // Params:
    // - notifyDetail: delegate for Detail event (click on single element in the list)
    async Init(notifyDetail){
        
        const data = await this.GetList();
        
        const presenter = new Risorse_Presenter(this._templates);
        presenter.ShowList(data.responseResult, data.responseData, notifyDetail);
    }


    async GetList(){
        
        const model = new Risorse_Model(this._auth);
        let rawData = await model.Risorse_List();
        
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
        let descrizione = "";
        let riporto_mensile = "";

        $(xmlDoc).find("row").each(function () {           

            let elem_codice = $(this)[0].childNodes[0];
            codice = elem_codice.textContent;

            let elem_descrizione = $(this)[0].childNodes[1];
            descrizione = decodeURIComponent(elem_descrizione.textContent);

            let elem_sm = $(this)[0].childNodes[2];
            riporto_mensile = (elem_sm.textContent == "1") ? "Riporto Mensile" : "";

            loe.push([codice, descrizione, riporto_mensile]);
        });

        return loe;
     }
}



