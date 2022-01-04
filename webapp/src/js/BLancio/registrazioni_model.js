import { Base_Model } from "/BLancio/model_base";

//
// Interface with Registrazioni web services.
//
export class Registrazioni_Model{

    // fields
    _urlList   = '/webapi/blancio.asmx/Registrazioni_Elenco';
    _urlDetail = '/webapi/blancio.asmx/Registrazione_Dettaglio_GET';
    _urlSet    = '/webapi/blancio.asmx/Registrazione_Dettaglio_SET';
    _urlDelete = '/webapi/blancio.asmx/Registrazioni_Dettaglio_DEL';
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
    async Registrazioni_List(){
      const strXml = this.#getXml_List(); 
      return this._modelBase.List(strXml, this._urlList);
    }
    async Registrazioni_Detail(elementID){
        const strXml = this.#getXml_Detail(elementID);
        return this._modelBase.Detail(strXml, this._urlDetail);
    }
    async Registrazioni_Set(data){
        const strXml = this.#getXml_Set(data); 
        return this._modelBase.Set(strXml, this._urlSet);
    }
    async Registrazioni_Delete(elementID){
      const strXml = this.#getXml_Delete(elementID); 
      return this._modelBase.Delete(strXml, this._urlDelete);
    }



    // private methods
    

    #getXml_List(){
        const strXml = "<?xml version='1.0' encoding='utf-8' ?>" +
                       "<request ID='" + this._modelBase.GetRequestID() + "'>" +
                         "<auth>" +
                           "<username>" + this._username + "</username>" +
                           "<password>" + this._password + "</password>" +
                         "</auth>" +
                         "<data>" +
                           "<page_index>0</page_index>" +
                         "</data>" +
                      "</request>";
        return strXml;
    }
    #getXml_Detail(elementID){
        const strXml = "<?xml version='1.0' encoding='utf-8' ?>" +
                   "<request ID='" + this._modelBase.GetRequestID() + "'>" +
                     "<auth>" +
                       "<username>" + this._username + "</username>" +
                       "<password>" + this._password + "</password>" +
                     "</auth>" +
                     "<data>" +
                       "<codice>" + elementID + "</codice>" +                       
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
                            "<codice>" + data.codice + "</codice>" +
                            "<data_registrazione_GG>" + data.data_registrazione_GG + "</data_registrazione_GG>" +
                            "<data_registrazione_MM>" + data.data_registrazione_MM + "</data_registrazione_MM>" +
                            "<data_registrazione_AA>" + data.data_registrazione_AA + "</data_registrazione_AA>" +
                            "<codice_sottogruppo>" + data.codice_sottogruppo + "</codice_sottogruppo>" + 
                            "<codice_tipologia>" + data.codice_tipologia + "</codice_tipologia>" +
                            "<importo_INT>" + data.importo_INT + "</importo_INT>" +
                            "<importo_DEC>" + data.importo_DEC + "</importo_DEC>" +
                            "<codice_risorsa>" + data.codice_risorsa + "</codice_risorsa>" +
                            "<note>" + encodeURIComponent(data.note) + "</note>" +                  
                          "</data>" +
                        "</request>";
        return strXml;
    }
    #getXml_Delete(elementID){
      const strXml = "<?xml version='1.0' encoding='utf-8' ?>" +
                 "<request ID='" + this._modelBase.GetRequestID() + "'>" +
                   "<auth>" +
                     "<username>" + this._username + "</username>" +
                     "<password>" + this._password + "</password>" +
                   "</auth>" +
                   "<data>" +
                     "<codice>" + elementID + "</codice>" +                       
                   "</data>" +
                "</request>";
      return strXml;
  }
}