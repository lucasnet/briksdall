//
// Controller for Risorsa module
//
export class Risorsa_Controller{

    // fields
    _auth = null;           //{username : "", password : "" };
    _route_elements = null; // {model : "", presenter : "", contoller: "", template : ""}
    _elementID = null;
    _model = null;
    _presenter = null;
    _listDelegate = null;


    // Constructor. Set up initial values.
    // Params:
    // - auth: web services authorization fields (username, password)
    // - route_elements: routing elements (model, presenter, controller, template)
    // - elementID: current element (ID)
    constructor(auth, route_elements, elementID){
        this._auth = auth;
        this._route_elements = route_elements;
        this._elementID = elementID;
    }
    
    
    // Public Section

    // Init. Initialize Risorsa, showing its detail.
    // Main engine for handling Risorsa operations (Save, Delete)
    // Params:
    // - notifyList: delegate for List (Risorse list) request.
    async Init(notifyList){

        this._listDelegate = notifyList;

        const {Risorse_Model} = await import(this._route_elements.model);
        this._model = new Risorse_Model(this._auth);
    
        const {Risorse_Presenter} = await import(this._route_elements.presenter);
        this._presenter = new Risorse_Presenter(this._route_elements);
        
        let rawData = null;
        let responseResult;
        let responseRawData;
        let responseData;
        
        rawData = await this._model.Risorse_Detail(this._elementID);

        responseResult  = this.#getResponseResult(rawData);
        responseRawData = this.#getResponseRawData(rawData);
        responseData    = this.#getStructuredData(responseRawData);

        const events = { save: await this.#notifysave, delete: null, list: notifyList};
        this._presenter.ShowDetail(responseResult, responseData, events, this);
    }

   

    // Private Section

    #getResponseResult(rawdata){
        const xmlDoc = $.parseXML(rawdata);

        let codice = 0;
        let descrizione = "";
        $(xmlDoc).each(function () {
            codice = $(this).find("response>result>codice").text();
            descrizione = $(this).find("response>result>descrizione").text();
        });

        return {
                codice : codice,
                descrizione : descrizione
            };
    }

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
                
        let rawData = await sender._model.Risorse_Set(data);
        const responseResult = sender.#getResponseResult(rawData);

        const events = { list: sender._listDelegate};
        sender._presenter.ShowModalResponse(responseResult, events);
    }

    //async #notifydelete(sender, elementID){
    //    let rawData = await sender._model.Risorse_Delete(elementID);
    //    const responseResult = sender.#getResponseResult(rawData);
    //
    //    const events = { list: sender._listDelegate};
    //    sender._presenter.ShowModalResponse(responseResult, events);
    //}

}
