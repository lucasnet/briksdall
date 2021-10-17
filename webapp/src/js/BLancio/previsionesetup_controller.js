import { Base_Controller }           from "/BLancio/controller_base";
import { Risorse_Controller }        from "/BLancio/cRisorse";
import { Gruppi_Controller }         from "/BLancio/cGruppi";
import { Sottogruppi_Controller }    from "/BLancio/cSottogruppi";
//import { PrevisioneSetup_Model }     from "/BLancio/mPrevisioneSetup";
import { PrevisioneSetup_Presenter } from "/BLancio/pPrevisioneSetup";

//
// Controller for Previsione Setup process
//
export class PrevisioneSetup_Controller{

    // fields
    _auth           = null;     // {username : "", password : "" };
    _templates      = null;     // {modal_ok : "", modal_err : "", template : "", error : ""}
    _controllerBase = null;
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

        const presenter = new PrevisioneSetup_Presenter(this._templates);
        
        let responseResult = response_risorse.responseResult;
        if (responseResult.codice == 0) responseResult = response_gruppi.responseResult;
        if (responseResult.codice == 0) responseResult = response_sottogruppi.responseResult;

        presenter.Init(responseResult,
                    response_risorse.responseData,
                    response_gruppi.responseData,
                    response_sottogruppi.responseData,
                       notifyDetail);
    }

   

    // Private Section

}
