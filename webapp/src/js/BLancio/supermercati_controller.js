import { Base_Controller }        from "/BLancio/controller_base";
import { Supermercati_Model }     from "/BLancio/mSupermercati";
import { Supermercati_Presenter } from "/BLancio/pSupermercati";

//
// Controller for Supermercati process
//
export class Supermercati_Controller{

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

        const presenter = new Supermercati_Presenter(this._templates);
        presenter.ShowList(data.responseResult, data.responseData, notifyDetail);
    }

    async GetList(){
    
        const model = new Supermercati_Model(this._auth);
        let rawData = await model.Supermercati_List();

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

        $(xmlDoc).find("row").each(function () {           

            let elem_codice = $(this)[0].childNodes[0];
            codice = elem_codice.textContent;

            let elem_descrizione = $(this)[0].childNodes[1];
            descrizione = decodeURIComponent(elem_descrizione.textContent);

            loe.push([codice, descrizione]);
        });

        return loe;
    }
}



