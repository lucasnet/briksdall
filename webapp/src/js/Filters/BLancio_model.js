import { Base_Model } from "/BLancio/model_base";

//
// Interface with Filters web service.
//
export class Filters_Model{

    // fields
    _urlDefault      = '/webapi/Filtri.asmx/SetFiltriDefault';
    _urlBLancioGET   = '/webapi/Filtri.asmx/BLancio_GET';
    _urlBLancioSET   = '/webapi/Filtri.asmx/BLancio_SET';
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

    // Filters SET DEFAULT
    async Default(){
      const strXml = this.#getXml_Get(); 
      return this._modelBase.List(strXml, this._urlDefault);
    }

     // Filters BLancio SET
     async BLancio_SET(data){
      const strXml = this.#getXml_Set(data); 
      return this._modelBase.Set(strXml, this._urlBLancioSET);
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

    #getXml_Set(data){
      const strXml = "<?xml version='1.0' encoding='utf-8' ?>" +
                      "<request ID='" + this._modelBase.GetRequestID() + "'>" +
                        "<auth>" +
                          "<username>" + this._username + "</username>" +
                          "<password>" + this._password + "</password>" +
                        "</auth>" +
                        "<data>" +
                          "<registrazioni_da_gg>" + data.registrazioni_da_GG + "</registrazioni_da_gg>" +
                          "<registrazioni_da_mm>" + data.registrazioni_da_MM + "</registrazioni_da_mm>" +
                          "<registrazioni_da_aa>" + data.registrazioni_da_AA + "</registrazioni_da_aa>" +
                          "<registrazioni_a_gg>" + data.registrazioni_a_GG + "</registrazioni_a_gg>" +
                          "<registrazioni_a_mm>" + data.registrazioni_a_MM + "</registrazioni_a_mm>" +
                          "<registrazioni_a_aa>" + data.registrazioni_a_AA + "</registrazioni_a_aa>" +
                          "<registrazioni_codicegruppo>" + data.registrazioni_codicegruppo + "</registrazioni_codicegruppo>" +
                          "<registrazioni_codicerisorsa>" + data.registrazioni_codicerisorsa + "</registrazioni_codicerisorsa>" +
                          "<registrazioni_codicesottogruppo>" + data.registrazioni_codicesottogruppo + "</registrazioni_codicesottogruppo>" +
                          "<registrazioni_codicetipologia>" + data.registrazioni_codicetipologia + "</registrazioni_codicetipologia>" +                          
                        "</data>" +
                      "</request>";
      return strXml;
  }

}