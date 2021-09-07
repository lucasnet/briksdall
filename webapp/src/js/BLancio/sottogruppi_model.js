//
// Interface with Sottogruppo / Sottogruppi web services.
//
export class Sottogruppi_Model{

    // fields
    _urlList   = '/webapi/blancio.asmx/Sottogruppi_Elenco';
    _urlDetail = '/webapi/blancio.asmx/Sottogruppi_Dettaglio_GET';
    _urlSet    = '/webapi/blancio.asmx/Sottogruppi_Dettaglio_SET';
    _urlDelete = '/webapi/blancio.asmx/Sottogruppi_Dettaglio_DEL';
    _username = '';
    _password = '';
    
    // constructor
    constructor(auth){
        this._username = auth.username;
        this._password = auth.password;
    }


    // public methods
    async Sottogruppi_List(){
        const strXml = this.#getXml_List(); 
        const returnedData = await this.#postData(
            this._urlList,
            'strxmlIN=' + strXml
        )
        return returnedData;
    }
    async Sottogruppi_Detail(elementID){
        const strXml = this.#getXml_Detail(elementID); 
        const returnedData = await this.#postData(
            this._urlDetail,
            'strxmlIN=' + strXml
        )
        return returnedData;
    }
    async Sottogruppi_Set(data){
        const strXml = this.#getXml_Set(data); 
        const returnedData = await this.#postData(
            this._urlSet,
            'strxmlIN=' + strXml
        )
        return returnedData;
    }
    async Sottogruppi_Delete(elementID){
      const strXml = this.#getXml_Delete(elementID); 
      const returnedData = await this.#postData(
          this._urlDelete,
          'strxmlIN=' + strXml
      )
      return returnedData;
    }



    // private methods
    async #postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST',               // *GET, POST, PUT, DELETE, etc.
          mode: 'cors',                 // no-cors, *cors, same-origin
          cache: 'no-cache',            // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin',   // include, *same-origin, omit
          headers: {           
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow',           // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: data                    // body data type must match "Content-Type" header
        });

        const soap_data = await response.text();                        // soap data (with envelope)
        const status = response.status;                                 // http response status

        if (status == 200){
            // no problem...
            const xml_soap_data = $.parseXML(soap_data)                     // convert soap data in xml document
            const returned_data = xml_soap_data.children[0].textContent;    // get content (data without envelope)
            return returned_data; 
        }else{
            // an error occurs, probably 500
            throw soap_data;
        }
    }

    // request ID per le chiamate a web services
    #getRequestID() {
        var today = new Date();
        var month = (today.getMonth() + 1).toString();
        if (month.length < 2)
            month = "0" + month;
        var day = today.getDate().toString();
        if (day.length < 2)
            day = "0" + day;
        var hour = today.getHours().toString();
        if (hour.length < 2)
            hour = "0" + hour;
        var minutes = today.getMinutes().toString();
        if (minutes.length < 2)
            minutes = "0" + minutes;
        var secs = today.getSeconds().toString();
        if (secs.length < 2)
            secs = "0" + secs;
        return today.getFullYear().toString() + month + day + hour + minutes + secs;
    }

    #getXml_List(){
        const strXml = "<?xml version='1.0' encoding='utf-8' ?>" +
                       "<request ID='" + this.#getRequestID() + "'>" +
                         "<auth>" +
                           "<username>" + this._username + "</username>" +
                           "<password>" + this._password + "</password>" +
                         "</auth>" +
                         "<data>" +
                           "<codice_gruppo></codice_gruppo>" +
                           "<filtro_descrizione></filtro_descrizione>" +
                           "<page_index>-1</page_index>" +
                         "</data>" +
                      "</request>";
        return strXml;
    }
    #getXml_Detail(elementID){
        const strXml = "<?xml version='1.0' encoding='utf-8' ?>" +
                   "<request ID='" + this.#getRequestID() + "'>" +
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
                        "<request ID='" + this.#getRequestID() + "'>" +
                          "<auth>" +
                            "<username>" + this._username + "</username>" +
                            "<password>" + this._password + "</password>" +
                          "</auth>" +
                          "<data>" +
                            "<codice>" + data.codice + "</codice>" +
                            "<descrizione>" + encodeURIComponent(data.descrizione) + "</descrizione>" +
                            "<codice_gruppo>" + data.codice_gruppo + "</codice_gruppo>" +
                            "<solo_movimenti>" + data.solo_movimenti + "</solo_movimenti>" +
                          "</data>" +
                        "</request>";
        return strXml;
    }
    #getXml_Delete(elementID){
      const strXml = "<?xml version='1.0' encoding='utf-8' ?>" +
                 "<request ID='" + this.#getRequestID() + "'>" +
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