import { Base_Controller }         from "/BLancio/controller_base";
import { Registrazioni_Model }     from "/BLancio/mRegistrazioni";
import { Registrazioni_Presenter } from "/BLancio/pRegistrazioni";
import { Risorse_Controller }      from "/BLancio/cRisorse";
import { Gruppi_Controller }       from "/BLancio/cGruppi";
import { Sottogruppi_Controller }  from "/BLancio/cSottogruppi";
import { Filters_Controller }      from "/Filters/controller";


//
// Controller for Registrazioni process
//
export class Registrazioni_Controller{

    // fields
    _auth           = null;     // {username : "", password : "" };
    _templates      = null;     // {modal_ok : "", modal_err : "", template : "", error : ""}
    _controllerBase = null;
    _presenter      = null;
    _risorse        = null;
    _gruppi         = null;
    _sottogruppi    = null;


    // Constructor. Set up initial values.
    // Params:
    // - auth: web services authorization fields (username, password)
    // - templates: routing templates
    constructor(auth, templates){
        this._auth = auth;
        this._templates = templates;

        this._controllerBase = new Base_Controller();
        this._presenter = new Registrazioni_Presenter(this._templates);
    }



    // Public Section 


    // Init. 
    // Entry point method. 
    // Initializes entire process showing Registrazioni list filtered by filters set, and showing filter values.
    // Params:
    // - notifyDetail: delegate for Detail event (click on single element in the list)
    async Init(notifyDetail){

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

        const auth = this._auth;
        const self = this;
        // init presenter object
        this._presenter.Init(responseResult,
            response_risorse.responseData,
            response_gruppi.responseData,
            response_sottogruppi.responseData,
            { 
                notifySaveFilters : function(data){
                                        self.#notifySaveFilters(auth, data);
                                    }, 
                notifyRemoveFilters : function(){
                                        self.#notifyRemoveFilters(auth);
                                    }
            },
            this);


        // step 2 : set Regitrazioni list and sends data to presenter
        const data = await this.GetList();
        this._presenter.ShowList(data.responseResult, data.responseData, notifyDetail);

        // step 3 : set Filters list and sends data to presenter object
        const filtersdata = await this.GetFilters();
        this._presenter.ShowFilters(filtersdata.responseResult, filtersdata.responseData);

    }

    // GetList.
    // Get Registrazioni list data.
    // Parameters:
    //
    // Return value.
    // - responseResult : result of web service call
    // - responseData : data values in a json format.
    async GetList(){
        
        const model = new Registrazioni_Model(this._auth);
        let rawData = await model.Registrazioni_List();
        
        const responseResult = this._controllerBase.GetResponseResult(rawData);
        const responseRawData = this._controllerBase.GetResponseRawData(rawData);
        const responseData = this.#getStructuredData(responseRawData);

        return {responseResult, responseData};
    }


    // GetFilters.
    // Get Filters data values.
    // Parameters:
    //
    // Return value.
    // - responseResult : result of web service call
    // - responseData : data values in a json format.
    async GetFilters(){
        
        const cFilters = new Filters_Controller(this._auth);
        const {responseResult, responseData} = await cFilters.Get_BLancio();

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

    // notifySaveFilters.
    // Notifies Save filters (from presenter)
    // Parameters;
    // - data : data to save (from presenter) in json format
    // - auth : authorization (username, password) structure
    // Return value:
    // - responseResult : operation result in json format (code, description)
    async #notifySaveFilters(auth, data){
        const cFilters = new Filters_Controller(auth);
        const {responseResult} = await cFilters.Set_BLancio(data);

        const data1 = await this.GetList();
        this._presenter.ShowList(data1.responseResult, data1.responseData, this.#notifyDetail);

        return {responseResult};
    }

    // notifyRemoveFilters.
    // Notifies Remove filters, aka set filters to default (from presenter)
    // Parameters;
    // - auth : authorization (username, password) structure
    // Return value:
    // - responseResult : operation result in json format (code, description)
    async #notifyRemoveFilters(auth){
        const cFilters = new Filters_Controller(auth);
        const {responseResult} = await cFilters.Set_Default();

        const data1 = await this.GetList();
        this._presenter.ShowList(data1.responseResult, data1.responseData, this.#notifyDetail);

        return {responseResult};
    }

    
    #notifyDetail(data){
        
    }
}

