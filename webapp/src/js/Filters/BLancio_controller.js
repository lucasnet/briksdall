import { Base_Controller }         from "/BLancio/controller_base";
import { Filters_Model }           from "/Filters/model";


//
// Controller for Filters Data
//
export class Filters_Controller{

    // fields
    _auth           = null;     // {username : "", password : "" };
    _controllerBase = null;


    // Constructor. Set up initial values.
    // Params:
    // - auth: web services authorization fields (username, password)
    constructor(auth){
        this._auth = auth;

        this._controllerBase = new Base_Controller();
    }



    // Public Section 

    // BLancio_Get.
    // Get BLancio filter values from Filters web service.
    // Parameters:
    //
    // Return value:
    // json composed by:
    // - responseResult : result of web service call
    // - responseData : filters value in a json format (filter name, filter value)
    async Get_BLancio(){
        
        const model = new Filters_Model(this._auth);
        let rawData = await model.BLancio_GET();
        
        const responseResult = this._controllerBase.GetResponseResult(rawData);
        const responseRawData = this._controllerBase.GetResponseRawData(rawData);
        const responseData = this.#getStructuredData(responseRawData);

        return {responseResult, responseData};
    }

    // BLancio_Set
    // Set BLancio filter values to Filters web service.
    // Parameters:
    // - data : data filter values in json format.
    // Return value. 
    // json composed by:
    // - responseResult : result of web service call.
    async Set_BLancio(data){

        const model = new Filters_Model(this._auth);
        let rawData = await model.BLancio_SET(data);
        const responseResult = this._controllerBase.GetResponseResult(rawData);

        return {responseResult};
    }

    // Set_Default
    // Set default filter values to Filters web service.
    // Parameters:
    // 
    // Return value. 
    // json composed by:
    // - responseResult : result of web service call.
    async Set_Default(){

        const model = new Filters_Model(this._auth);
        let rawData = await model.Default(data);
        const responseResult = this._controllerBase.GetResponseResult(rawData);

        return {responseResult};
    }


    
    // Private Section

    // getStructuredData.
    // Structures ws response data from raw format to json format.
    // Parameters:
    // - responserawdata : ws raw data (xml format)
    // Return value:
    // - data in a json format (name, value)
    #getStructuredData(responserawdata){
        const rawdata = "<data>" + responserawdata + "</data>";
        const xmlDoc = $.parseXML(rawdata);        
                
        let applicati = 0;
        let registrazioni_da_GG = "";
        let registrazioni_da_MM = "";
        let registrazioni_da_AA = "";
        let registrazioni_a_GG = "";
        let registrazioni_a_MM = "";
        let registrazioni_a_AA = "";
        let registrazioni_codicegruppo = "";
        let registrazioni_codicerisorsa = "";
        let registrazioni_codicesottogruppo = "";
        let registrazioni_codicetipologia = "";

        $(xmlDoc).find("data").each(function () {      
            
            const elements = this.childNodes;

            elements.forEach(function (element) {
                switch (element.nodeName.toLowerCase()){
                    case 'applicati'                       : applicati                       = element.textContent; break;
                    case 'registrazioni_da_gg'             : registrazioni_da_GG             = element.textContent; break;
                    case 'registrazioni_da_mm'             : registrazioni_da_MM             = element.textContent; break;
                    case 'registrazioni_da_aa'             : registrazioni_da_AA             = element.textContent; break;
                    case 'registrazioni_a_gg'              : registrazioni_a_GG              = element.textContent; break;
                    case 'registrazioni_a_mm'              : registrazioni_a_MM              = element.textContent; break;
                    case 'registrazioni_a_aa'              : registrazioni_a_AA              = element.textContent; break;
                    case 'registrazioni_codicegruppo'      : registrazioni_codicegruppo      = element.textContent; break;
                    case 'registrazioni_codicerisorsa'     : registrazioni_codicerisorsa     = element.textContent; break;
                    case 'registrazioni_codicesottogruppo' : registrazioni_codicesottogruppo = element.textContent; break;
                    case 'registrazioni_codicetipologia'   : registrazioni_codicetipologia   = element.textContent; break;
                }
               
            });
        });

        return {applicati, registrazioni_da_GG, registrazioni_da_MM, registrazioni_da_AA, 
                            registrazioni_a_GG, registrazioni_a_MM, registrazioni_a_AA,
                            registrazioni_codicegruppo, registrazioni_codicerisorsa, 
                            registrazioni_codicesottogruppo, registrazioni_codicetipologia};
    }
}

