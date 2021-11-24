import { Base_Model } from "/BLancio/model_base";

//
// Interface with Filters web service.
//
export class Filters_Model{

    // fields
    _urlBLancioGET   = '/webapi/Filtri.asmx/BLancio_GET';
    _username  = '';
    _password  = '';
    _modelBase = null;
    

    // constructor
    constructor(auth){
        this._username = auth.username;
        this._password = auth.password;

        this._modelBase = new Base_Model();
    }


    // public methods

    // Filters BLancio GET
    async BLancio_GET(){
      const strXml = this.#getXml_Get(); 
      return this._modelBase.List(strXml, this._urlBLancioGET);
    }



    
    // private methods
    
    #getXml_Get(){
        const strXml = "<?xml version='1.0' encoding='utf-8' ?>" +
                       "<request ID='" + this._modelBase.GetRequestID() + "'>" +
                         "<auth>" +
                           "<username>" + this._username + "</username>" +
                           "<password>" + this._password + "</password>" +
                         "</auth>" +
                         "<data>" +
                         "</data>" +
                      "</request>";
        return strXml;
    }
}