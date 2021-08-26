//import { notify } from "../../router_Common";

export class Gruppo_Controller{

    // fields
    _auth = null;           //{username : "", password : "" };
    _route_elements = null; // {model : "", presenter : "", contoller: "", template : ""}
    _elementID = null;
    _model = null;
    _presenter = null;
    _listDelegate = null;

    // constructor
    constructor(auth, route_elements, elementID){
        this._auth = auth;
        this._route_elements = route_elements;
        this._elementID = elementID;
    }
    
    
    async Init(notifyList){

        this._listDelegate = notifyList;

        const {Gruppi_Model} = await import(this._route_elements.model);
        this._model = new Gruppi_Model(this._auth);
    
        const {Gruppi_Presenter} = await import(this._route_elements.presenter);
        this._presenter = new Gruppi_Presenter(this._route_elements);
        

        let rawData = await this._model.Gruppi_Detail(this._elementID);

        const responseResult  = this.#getResponseResult(rawData);
        const responseRawData = this.#getResponseRawData(rawData);
        const responseData    = this.#getStructuredData(responseRawData);

        const events = { save: await this.#notifysave, delete: this.#notifydelete, list: notifyList};
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

        $(xmlDoc).find("codice").each(function () {                 
            codice = this.textContent;
        });
        $(xmlDoc).find("descrizione").each(function () {                                   
            descrizione = decodeURIComponent(this.textContent);            
        });

        return {codice, descrizione};
    }

    async #notifysave(sender, data){        
                
        let rawData = await sender._model.Gruppi_Set(data);
        const responseResult = sender.#getResponseResult(rawData);

        const events = { list: sender._listDelegate};
        sender._presenter.ShowModalResponse(responseResult, events);
    }

    #notifydelete(id){
        alert("delete!");
    }

}



