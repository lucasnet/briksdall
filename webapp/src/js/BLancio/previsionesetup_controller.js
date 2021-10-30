import { Base_Controller }           from "/BLancio/controller_base";
import { Risorse_Controller }        from "/BLancio/cRisorse";
import { Gruppi_Controller }         from "/BLancio/cGruppi";
import { Sottogruppi_Controller }    from "/BLancio/cSottogruppi";
import { PrevisioneSetup_Model }     from "/BLancio/mPrevisioneSetup";
import { PrevisioneSetup_Presenter } from "/BLancio/pPrevisioneSetup";

//
// Controller for Previsione Setup process
//
export class PrevisioneSetup_Controller{

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
        this._presenter = new PrevisioneSetup_Presenter(this._templates);
    }

    // Getters
    GetControllerBase(){
        return this._controllerBase;
    }
    GetPresenter(){
        return this._presenter;
    }
    GetAuth(){
        return this._auth;
    }


    // Public Section 

    // Init. Entry point method. 
    async Init(notifyDetail){
        // risorse controller
        // gruppi + sottogruppi model
        this._risorse = new Risorse_Controller(this._auth, null);
        this._gruppi = new Gruppi_Controller(this._auth, null);
        this._sottogruppi = new Sottogruppi_Controller(this._auth, null);
     
        const response_risorse     = await this._risorse.GetList();
        const response_gruppi      = await this._gruppi.GetList();
        const response_sottogruppi = await this._sottogruppi.GetList();
        
        let responseResult = response_risorse.responseResult;
        if (responseResult.codice == 0) responseResult = response_gruppi.responseResult;
        if (responseResult.codice == 0) responseResult = response_sottogruppi.responseResult;

        this._presenter.Init(responseResult,
                    response_risorse.responseData,
                    response_gruppi.responseData,
                    response_sottogruppi.responseData,
                    this.NotifyRisorseChanged,
                    this.InsertSottogruppo,
                    this.Generate,
                    this);
    }

    async GetSottogruppiList(idRisorsa, idGruppo){
        
        const model = new PrevisioneSetup_Model(this._auth);
        let rawData = await model.Sottogruppi_List(idRisorsa, idGruppo);
        
        const responseResult  = this._controllerBase.GetResponseResult(rawData);
        const responseRawData = this._controllerBase.GetResponseRawData(rawData);
        const responseData = this.#getStructuredData(responseRawData);

        return {responseResult, responseData};
    }
   
    async InsertSottogruppo(sender, idRisorsa, idSottogruppo){
        const model = new PrevisioneSetup_Model(sender.GetAuth());
        let rawData = await model.Sottogruppi_SET(idRisorsa, idSottogruppo);
        
        const responseResult = sender.GetControllerBase().GetResponseResult(rawData);

        const events = { list: sender.NotifyRisorseChanged(sender, idRisorsa, 0)};
        sender.GetPresenter().ShowModalResponse(responseResult, events);
    }

    async RemoveSottogruppo(sender, idRisorsa, idSottogruppo){
        const model = new PrevisioneSetup_Model(sender.GetAuth());
        let rawData = await model.Sottogruppi_DEL(idRisorsa, idSottogruppo);
        
        const responseResult = sender.GetControllerBase().GetResponseResult(rawData);

        const events = { list: sender.NotifyRisorseChanged(sender, idRisorsa, 0)};
        sender.GetPresenter().ShowModalResponse(responseResult, events);
    }

    async NotifyRisorseChanged(sender, idRisorsa, idGruppo){
        const data = await sender.GetSottogruppiList(idRisorsa, idGruppo);

        sender.GetPresenter().ShowSottogruppiList(data.responseResult, data.responseData, sender.RemoveSottogruppo, sender);
    }

    async Generate(sender, idRisorsa){
        const model = new PrevisioneSetup_Model(sender.GetAuth());
        let rawData = await model.Generate(idRisorsa);
        
        const responseResult = sender.GetControllerBase().GetResponseResult(rawData);

        //const events = { list: sender.NotifyRisorseChanged(sender, idRisorsa, 0)};
        sender.GetPresenter().ShowModalResponse(responseResult, null);
    }



    // Private Section

    #getStructuredData(responserawdata){
        const xmlDoc = $.parseXML(responserawdata);        
       
        let loe = [];        
        let codice = "";
        let gruppo = "";
        let sottogruppo = "";
        let idSottogruppo = "";

        $(xmlDoc).find("row").each(function () {           

            let elem_codice = $(this)[0].childNodes[0];
            codice = elem_codice.textContent;

            let elem_gruppo = $(this)[0].childNodes[1];
            gruppo = decodeURIComponent(elem_gruppo.textContent);

            let elem_sottogruppo = $(this)[0].childNodes[2];
            sottogruppo = decodeURIComponent(elem_sottogruppo.textContent);

            let elem_idsottogruppo = $(this)[0].childNodes[3];
            idSottogruppo = elem_idsottogruppo.textContent;

            loe.push([codice, gruppo, sottogruppo, idSottogruppo]);
        });

        return loe;
     }

}
