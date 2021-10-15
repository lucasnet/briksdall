import { Base_Controller }       from "/BLancio/controller_base";
import { Sottogruppi_Model }     from "/BLancio/mSottogruppi";
import { Sottogruppi_Presenter } from "/BLancio/pSottogruppi";
import { Gruppi_Model }          from "/BLancio/mGruppi";

//
// Controller for Sottogruppo module
//
export class Sottogruppo_Controller{

    // fields
    _auth           = null;  // {username : "", password : "" };
    _templates      = null;  // {modal_ok : "", modal_err : "", template : "", error : ""}
    _elementID      = null;
    _model          = null;
    _presenter      = null;
    _listDelegate   = null;
    _controllerBase = null;


    // Constructor. Set up initial values.
    // Params:
    // - auth: web services authorization fields (username, password)
    // - templates: routing templates
    // - elementID: current element (ID)
    constructor(auth, templates, elementID){
        this._auth = auth;
        this._templates = templates;
        this._elementID = elementID;
 
        this._controllerBase = new Base_Controller();
    }
    
    
    // Public Section

    // getters
    GetControllerBase(){
        return this._controllerBase;
    }
    GetModel(){
        return this._model;
    }
    GetPresenter(){
        return this._presenter;
    }
    GetListDelegate(){
        return this._listDelegate;
    }

        
    // Init. Initialize Gruppo, showing its detail.
    // Main engine for handling Gruppo operations (Save, Delete)
    // Params:
    // - notifyList: delegate for List (Gruppi list) request.
    async Init(notifyList){

        this._listDelegate = notifyList;

        this._model = new Sottogruppi_Model(this._auth);
        this._presenter = new Sottogruppi_Presenter(this._templates);
        
        let rawData = null;
        let responseResult;
        let responseRawData;
        let responseData;
        
        const mGruppi = new Gruppi_Model(this._auth);
        rawData = await mGruppi.Gruppi_List();
        responseResult  = this._controllerBase.GetResponseResult(rawData);
        responseRawData = this.#getResponseRawData(rawData);
        const gruppiData = this.#getStructuredDataGruppi(responseRawData);
       

        rawData = await this._model.Sottogruppi_Detail(this._elementID);

        responseResult  = this._controllerBase.GetResponseResult(rawData);
        responseRawData = this.#getResponseRawData(rawData);
        responseData    = this.#getStructuredData(responseRawData);

        const events = { save: await this.#notifysave, delete: await this.#notifydelete, list: notifyList};
        this._presenter.ShowDetail(responseResult, responseData, gruppiData, events, this);
    }

   

    // Private Section

    #getResponseRawData(rawdata){
        const xmlDoc = $.parseXML(rawdata);        
        let data = "";

        $(xmlDoc).each(function () {                       
            data = $(this).find("response").children()[1].outerHTML;    // 0: Result, 1: Data
        });

        return data;
    }

    #getStructuredData(responserawdata){
        const xmlDoc = $.parseXML(responserawdata);        
       
        let loe = [];
        let row = null;
        let codice = "";
        let descrizione = "";
        let codice_gruppo = 0;
        let solo_movimenti = 0;

        $(xmlDoc).find("codice").each(function () {                 
            codice = this.textContent;
        });
        $(xmlDoc).find("descrizione").each(function () {                                   
            descrizione = decodeURIComponent(this.textContent);            
        });
        $(xmlDoc).find("codice_gruppo").each(function () {                                   
            codice_gruppo = decodeURIComponent(this.textContent);            
        });
        $(xmlDoc).find("solo_movimenti").each(function () {                                   
            solo_movimenti = decodeURIComponent(this.textContent);            
        });

        return {codice, descrizione, codice_gruppo, solo_movimenti};
    }

    #getStructuredDataGruppi(responserawdata){
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


    async #notifysave(sender, data){        
                
        let rawData = await sender.GetModel().Sottogruppi_Set(data);
        const responseResult = sender.GetControllerBase().GetResponseResult(rawData);

        const events = { list: sender.GetListDelegate()};
        sender.GetPresenter().ShowModalResponse(responseResult, events);
    }

    async #notifydelete(sender, elementID){
        let rawData = await sender.GetModel().Sottogruppi_Delete(elementID);
        const responseResult = sender.GetControllerBase().GetResponseResult(rawData);

        const events = { list: sender.GetListDelegate()};
        sender.GetPresenter().ShowModalResponse(responseResult, events);
    }

}
