import { Base_Controller }  from "/BLancio/controller_base";
import { Registrazioni_Model }     from "/BLancio/mRegistrazioni";
import { Registrazioni_Presenter } from "/BLancio/pRegistrazioni";
import { Risorse_Controller }      from "/BLancio/cRisorse";
import { Gruppi_Controller }       from "/BLancio/cGruppi";
import { Sottogruppi_Controller }  from "/BLancio/cSottogruppi";

//
// Controller for Registrazione module
//
export class Registrazione_Controller{

    // fields
    _auth           = null;  // {username : "", password : "" };
    _templates      = null;  // {modal_ok : "", modal_err : "", template : "", error : ""}
    _elementID      = null;
    _model          = null;
    _presenter      = null;
    _listDelegate   = null;
    _controllerBase = null;
    _risorse        = null;
    _gruppi         = null;
    _sottogruppi    = null;


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
    GetAuth(){
        return this._auth;
    }


    
    // Init. Initialize Registrazione, showing its detail.
    // Main engine for handling Gruppo operations (Save, Delete)
    // Params:
    // - notifyList: delegate for List (Registrazioni list) request.
    async Init(notifyList){

        this._listDelegate = notifyList;

        this._model = new Registrazioni_Model(this._auth);
        this._presenter = new Registrazioni_Presenter(this._templates);
        
        // step 1 : initializes risorse + gruppi + sottogruppi controller
        this._risorse = new Risorse_Controller(this._auth, null);
        this._gruppi = new Gruppi_Controller(this._auth, null);
        this._sottogruppi = new Sottogruppi_Controller(this._auth, null);
     
        const response_risorse     = await this._risorse.GetList();
        const response_gruppi      = await this._gruppi.GetList();
        const response_sottogruppi = await this._sottogruppi.GetList();
        
        let responseResult = response_risorse.responseResult;
        if (responseResult.codice == 0) responseResult = response_gruppi.responseResult;
        if (responseResult.codice == 0) responseResult = response_sottogruppi.responseResult;

        // init presenter object
        const events = { save: await this.#notifysave, delete: await this.#notifydelete, list: notifyList};
        this._presenter.InitDetail(responseResult,
            response_risorse.responseData,
            response_gruppi.responseData,
            response_sottogruppi.responseData,
            events,
            this);


        // step 2 : set Regitrazioni detail and sends data to presenter
        let rawData = await this._model.Registrazioni_Detail(this._elementID);

        responseResult  = this._controllerBase.GetResponseResult(rawData);
        const responseRawData = this.#getResponseRawData(rawData);
        const responseData    = this.#getStructuredData(responseRawData);

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
        let data_registrazione_GG = "";
        let data_registrazione_MM = "";
        let data_registrazione_AA = "";
        let codice_sottogruppo = "";
        let sottogruppo = "";
        let codice_tipologia = "";
        let importo_INT = "";
        let importo_DEC = "";
        let codice_risorsa = "";
        let risorsa = "";
        let note = "";
        let status = "";
        
        $(xmlDoc).find("codice").each(function () {
            codice = this.textContent;
        });
        $(xmlDoc).find("data_registrazione_GG").each(function () {
            data_registrazione_GG = this.textContent;            
        });
        $(xmlDoc).find("data_registrazione_MM").each(function () {
            data_registrazione_MM = this.textContent; 
        });
        $(xmlDoc).find("data_registrazione_AA").each(function () {
            data_registrazione_AA = this.textContent;            
        });
        $(xmlDoc).find("codice_sottogruppo").each(function () {
            codice_sottogruppo = this.textContent; 
        });
        $(xmlDoc).find("sottogruppo").each(function () {
            sottogruppo = decodeURIComponent(this.textContent);            
        });
        $(xmlDoc).find("codice_tipologia").each(function () {
            codice_tipologia = this.textContent;            
        });
        $(xmlDoc).find("importo_INT").each(function () {
            importo_INT = this.textContent; 
        });
        $(xmlDoc).find("importo_DEC").each(function () {
            importo_DEC = this.textContent; 
        });
        $(xmlDoc).find("codice_risorsa").each(function () {
            codice_risorsa = this.textContent;
        });
        $(xmlDoc).find("risorsa").each(function () {
            risorsa = decodeURIComponent(this.textContent);
        });
        $(xmlDoc).find("note").each(function () {
            note = decodeURIComponent(this.textContent);
        });
        $(xmlDoc).find("status").each(function () {
            status = this.textContent;
        });

        return {codice, 
                data_registrazione_GG, data_registrazione_MM, data_registrazione_AA,
                codice_sottogruppo, sottogruppo,
                codice_risorsa, risorsa,
                codice_tipologia,
                importo_INT, importo_DEC,
                note, 
                status
            };
    }

    async #notifysave(controller, data){        

        const model = new Registrazioni_Model(controller.GetAuth());
        let rawData = await model.Registrazioni_Set(data);

        this._controllerBase = new Base_Controller();
        const responseResult = this._controllerBase.GetResponseResult(rawData);

        const events = { list: controller.GetListDelegate()};
        controller.GetPresenter().ShowModalResponse(responseResult, events);
    }

    async #notifydelete(sender, elementID){

        let rawData = await sender.GetModel().Registrazioni_Delete(elementID);
        const responseResult = sender.GetControllerBase().GetResponseResult(rawData);

        const events = { list: sender.GetListDelegate()};
        sender.GetPresenter().ShowModalResponse(responseResult, events);
    }

}



