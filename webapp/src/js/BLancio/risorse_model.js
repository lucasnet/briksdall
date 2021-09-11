import { Base_Model } from "/BLancio/model_base";

//
// Interface with Risorse / Risorsa web services.
//
export class Risorse_Model{

    // fields
    _urlList   = '/webapi/blancio.asmx/RisorseEconomiche_Elenco';
    _urlDetail = '/webapi/blancio.asmx/RisorseEconomiche_Dettaglio_GET';
    _urlSet    = '/webapi/blancio.asmx/RisorseEconomiche_Dettaglio_SET';
    //_urlDelete = '/webapi/blancio.asmx/Risorse_Dettaglio_DEL';
    _username = '';
    _password = '';
    _modelBase = null;
    
    // constructor
    constructor(auth){
        this._username = auth.username;
        this._password = auth.password;

        this._modelBase = new Base_Model();
    }


    // public methods
    async Risorse_List(){
        const strXml = this.#getXml_List(); 
        return this._modelBase.List(strXml, this._urlList);
    }
    async Risorse_Detail(elementID){
        const strXml = this.#getXml_Detail(elementID);
        return this._modelBase.Detail(strXml, this._urlDetail);
    }
    async Risorse_Set(data){
        const strXml = this.#getXml_Set(data); 
        return this._modelBase.Set(strXml, this._urlSet);
    }
    //async Risorse_Delete(elementID){
    //  const strXml = this.#getXml_Delete(elementID); 
    //  return this._modelBase.Delete(strXml, this._urlDelete);
    //}



    // private methods
    

    #getXml_List(){
        const strXml = "<?xml version='1.0' encoding='utf-8' ?>" +
                       "<request ID='" + this._modelBase.GetRequestID() + "'>" +
                         "<auth>" +
                           "<username>" + this._username + "</username>" +
                           "<password>" + this._password + "</password>" +
                         "</auth>" +
                         "<data>" +                           
                           "<filtro_descrizione></filtro_descrizione>" +
                           "<page_index>-1</page_index>" +
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
                            "<descrizione>" + encodeURIComponent(data.descrizione) + "</descrizione>" +                            
                            "<riporto_mensile>" + data.riporto_mensile + "</riporto_mensile>" +
                          "</data>" +
                        "</request>";
        return strXml;
    }
    //#getXml_Delete(elementID){
    //  const strXml = "<?xml version='1.0' encoding='utf-8' ?>" +
    //             "<request ID='" + this._modelBase.GetRequestID() + "'>" +
    //               "<auth>" +
    //                 "<username>" + this._username + "</username>" +
    //                 "<password>" + this._password + "</password>" +
    //               "</auth>" +
    //               "<data>" +
    //                 "<codice>" + elementID + "</codice>" +                       
    //               "</data>" +
    //            "</request>";
    //  return strXml;
    //}
}