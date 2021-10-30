import { Base_Model } from "/BLancio/model_base";

//
// Interface with Previsione Setup web services.
//
export class PrevisioneSetup_Model{

    // fields
    _urlSottogruppi_List   = '/webapi/blancio.asmx/PrevisioneConfigurazione_Elenco';
    _urlSottogruppi_DEL    = '/webapi/blancio.asmx/PrevisioneConfigurazione_Dettaglio_DEL';
    _urlSottogruppi_SET    = '/webapi/blancio.asmx/PrevisioneConfigurazione_Dettaglio_SET';
    _urlGenerate           = '/webapi/blancio.asmx/PrevisioneConfigurazione_Genera';
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
    async Sottogruppi_List(idRisorsa, idGruppo){
      const strXml = this.#getXml_SottogruppiList(idRisorsa, idGruppo); 
      return this._modelBase.List(strXml, this._urlSottogruppi_List);
    }
    async Sottogruppi_DEL(idRisorsa, idSottogruppo){
        const strXml = this.#getXml_SottogruppiDel(idRisorsa, idSottogruppo); 
        return this._modelBase.Delete(strXml, this._urlSottogruppi_DEL);
    }
    async Sottogruppi_SET(idRisorsa, idSottogruppo){
        const strXml = this.#getXml_SottogruppiSet(idRisorsa, idSottogruppo); 
        return this._modelBase.Set(strXml, this._urlSottogruppi_SET);
    }
    async Generate(idRisorsa){
      const strXml = this.#getXml_Generate(idRisorsa); 
      return this._modelBase.Set(strXml, this._urlGenerate);
    }



    // private methods
    

    #getXml_SottogruppiList(idRisorsa, idGruppo){
        const strXml = "<?xml version='1.0' encoding='utf-8' ?>" +
                       "<request ID='" + this._modelBase.GetRequestID() + "'>" +
                         "<auth>" +
                           "<username>" + this._username + "</username>" +
                           "<password>" + this._password + "</password>" +
                         "</auth>" +
                         "<data>" +
                           "<codice_risorsa>" + idRisorsa + "</codice_risorsa>" +
                           "<codice_gruppo>" + idGruppo + "</codice_gruppo>" +
                         "</data>" +
                      "</request>";
        return strXml;
    }
    #getXml_SottogruppiDel(idRisorsa, idSottogruppo){
        const strXml = "<?xml version='1.0' encoding='utf-8' ?>" +
                   "<request ID='" + this._modelBase.GetRequestID() + "'>" +
                     "<auth>" +
                       "<username>" + this._username + "</username>" +
                       "<password>" + this._password + "</password>" +
                     "</auth>" +
                     "<data>" +
                       "<codicerisorsa>" + idRisorsa + "</codicerisorsa>" + 
                       "<codicesottogruppo>" + idSottogruppo + "</codicesottogruppo>" +                       
                     "</data>" +
                  "</request>";
        return strXml;
    }
    #getXml_SottogruppiSet(idRisorsa, idSottogruppo){
        const strXml = "<?xml version='1.0' encoding='utf-8' ?>" +
                   "<request ID='" + this._modelBase.GetRequestID() + "'>" +
                     "<auth>" +
                       "<username>" + this._username + "</username>" +
                       "<password>" + this._password + "</password>" +
                     "</auth>" +
                     "<data>" +
                       "<codice_risorsa>" + idRisorsa + "</codice_risorsa>" + 
                       "<codice_sottogruppo>" + idSottogruppo + "</codice_sottogruppo>" +                       
                     "</data>" +
                  "</request>";
        return strXml;
    }
    #getXml_Generate(idRisorsa){
      const strXml = "<?xml version='1.0' encoding='utf-8' ?>" +
                 "<request ID='" + this._modelBase.GetRequestID() + "'>" +
                   "<auth>" +
                     "<username>" + this._username + "</username>" +
                     "<password>" + this._password + "</password>" +
                   "</auth>" +
                   "<data>" +
                     "<codice_risorsa>" + idRisorsa + "</codice_risorsa>" +                       
                   "</data>" +
                "</request>";
      return strXml;
  }
}