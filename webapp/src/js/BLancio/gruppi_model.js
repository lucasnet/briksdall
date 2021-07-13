export class Gruppi_Model{

    // fields
    _urlGruppiList = '/webapi/blancio.asmx/Gruppi_Elenco';
    _username = '';
    _password = '';
    
    // constructor
    constructor(params){
        this._username = params.username;
        this._password = params.password;
    }


    // public methods
    async Gruppi_List(){
        const strXml = this.#getXml_List(); 
        const returnedData = await this.#postData(
            this._urlGruppiList,
            'strxmlIN=' + strXml
        )
        return returnedData;
    }
    async Gruppi_Detail(){

    }
    async Gruppi_Set(){

    }
    async Gruppi_Delete(){

    }



    // private methods
    async #postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            //'Content-Type': 'application/json'
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: data // body data type must match "Content-Type" header
        });

        const returned_data = await response.text();
        return returned_data; 
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
                           "<filtro_descrizione></filtro_descrizione>" +
                           "<page_index>0</page_index>" +
                         "</data>" +
                      "</request>";
        return strXml;
    }
}   

