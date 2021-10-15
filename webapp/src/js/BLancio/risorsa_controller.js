import { Base_Controller } from "/BLancio/controller_base";
import { Risorse_Model } from "/BLancio/mRisorse";
import { Risorse_Presenter } from "/BLancio/pRisorse";

//
// Controller for Risorsa module
//
export class Risorsa_Controller{

    // fields
    _auth           = null;      // {username : "", password : "" };
    _templates      = null;      // {modal_ok : "", modal_err : "", template : "", error : ""}
    _elementID      = null;
    _model          = null;
    _presenter      = null;
    _listDelegate   = null;
    _controllerBase = null;


    // Constructor. Set up initial values.
    // Params:
    // - auth: web services authorization fields (username, password)
    // - templates: 
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

    
    // Init. Initialize Risorsa, showing its detail.
    // Main engine for handling Risorsa operations (Save, Delete)
    // Params:
    // - notifyList: delegate for List (Risorse list) request.
    async Init(notifyList){

        this._listDelegate = notifyList;

        this._model     = new Risorse_Model(this._auth);
        this._presenter = new Risorse_Presenter(this._templates);
        
        let rawData = null;
        let responseResult;
        let responseRawData;
        let responseData;
        
        rawData = await this._model.Risorse_Detail(this._elementID);

        responseResult  = this._controllerBase.GetResponseResult(rawData);
        responseRawData = this.#getResponseRawData(rawData);
        responseData    = this.#getStructuredData(responseRawData);

        const events = { save: await this.#notifysave, delete: null, list: notifyList};
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
       
        let loe = [];
        let row = null;
        let codice = "";
        let descrizione = "";
        let riporto_mensile = 0;

        $(xmlDoc).find("codice").each(function () {                 
            codice = this.textContent;
        });
        $(xmlDoc).find("descrizione").each(function () {                                   
            descrizione = decodeURIComponent(this.textContent);            
        });
        $(xmlDoc).find("riporto_mensile").each(function () {                                   
            riporto_mensile = decodeURIComponent(this.textContent);            
        });

        return {codice, descrizione, riporto_mensile};
    }

  
    async #notifysave(sender, data){        
                
        let rawData = await sender.GetModel().Risorse_Set(data);
        const responseResult = sender.GetControllerBase().GetResponseResult(rawData);

        const events = { list: sender.GetListDelegate()};
        sender.GetPresenter().ShowModalResponse(responseResult, events);
    }

}
