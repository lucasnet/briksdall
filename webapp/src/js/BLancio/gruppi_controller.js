import { Base_Controller } from "/BLancio/controller_base";

//
// Controller for Gruppi process
//
export class Gruppi_Controller{

    // fields
    _auth = null;           //{username : "", password : "" };
    _route_elements = null; // {model : "", presenter : "", contoller: "", template : ""}
    _controllerBase = null;


    // Constructor. Set up initial values.
    // Params:
    // - auth: web services authorization fields (username, password)
    // - route_elements: routing elements (model, presenter, controller, template)
    constructor(auth, route_elements){
        this._auth = auth;
        this._route_elements = route_elements;

        this._controllerBase = new Base_Controller();
    }



    // Public Section 

    // Init. Entry point method. Initializes Gruppi process showing Gruppi list.
    // Params:
    // - notifyDetail: delegate for Detail event (click on single element in the list)
    async Init(notifyDetail){
        const {Gruppi_Model} = await import(this._route_elements.model);
        const {Gruppi_Presenter} = await import(this._route_elements.presenter);
        
        const model = new Gruppi_Model(this._auth);
        let rawData = await model.Gruppi_List();

        const responseResult = this._controllerBase.GetResponseResult(rawData);
        const responseRawData = this._controllerBase.GetResponseRawData(rawData);
        const responseData = this.#getStructuredData(responseRawData);

        const presenter = new Gruppi_Presenter(this._route_elements);
        presenter.ShowList(responseResult, responseData, notifyDetail);
    }

   

    // Private Section

    #getStructuredData(responserawdata){
        const xmlDoc = $.parseXML(responserawdata);        
       
        let loe = [];
        let row = null;
        let codice = "";
        let descrizione = "";

        $(xmlDoc).find("row").each(function () {           
            // row = $(this).find("row");

            let elem_codice = $(this)[0].childNodes[0];
            codice = elem_codice.textContent;

            let elem_descrizione = $(this)[0].childNodes[1];
            descrizione = decodeURIComponent(elem_descrizione.textContent);

            loe.push([codice, descrizione]);
        });

        return loe;
    }
}



