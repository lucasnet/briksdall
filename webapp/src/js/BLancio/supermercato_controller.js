import { Base_Controller }        from "/BLancio/controller_base";
import { Supermercati_Model }     from "/BLancio/mSupermercati";
import { Supermercati_Presenter } from "/BLancio/pSupermercati";

//
// Controller for Supermercato module
//
export class Supermercato_Controller{

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

        this._model = new Supermercati_Model(this._auth);
        this._presenter = new Supermercati_Presenter(this._templates);
        

        let rawData = await this._model.Supermercati_Detail(this._elementID);

        const responseResult  = this._controllerBase.GetResponseResult(rawData);
        const responseRawData = this.#getResponseRawData(rawData);
        const responseData    = this.#getStructuredData(responseRawData);

        const events = { save: await this.#notifysave, delete: await this.#notifydelete, list: notifyList};
        this._presenter.ShowDetail(responseResult, responseData, events, this);
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
       
        let codice = "";
        let descrizione = "";

        $(xmlDoc).find("codice").each(function () {                 
            codice = this.textContent;
        });
        $(xmlDoc).find("descrizione").each(function () {                                   
            descrizione = decodeURIComponent(this.textContent);            
        });

        return {codice, descrizione};
    }

    async #notifysave(sender, data){        
                
        let rawData = await sender.GetModel().Supermercati_Set(data);
        const responseResult = sender.GetControllerBase().GetResponseResult(rawData);

        const events = { list: sender.GetListDelegate()};
        sender.GetPresenter().ShowModalResponse(responseResult, events);
    }

    async #notifydelete(sender, elementID){
        
        let rawData = await sender.GetModel().Supermercati_Delete(elementID);
        const responseResult = sender.GetControllerBase().GetResponseResult(rawData);

        const events = { list: sender.GetListDelegate()};
        sender.GetPresenter().ShowModalResponse(responseResult, events);
    }

}



