//
// Base module for "model" modules.
//
export class Base_Model{

    // MODIFIES: nothing
    // EFFECTS: gets the list of elements from Saas (web service)
    async List(strXml, url){        
        const returnedData = await this.#postData(
            url,
            '{strxmlIN: "' + strXml + '"}'
        )
        return returnedData;
    }
    // MODIFIES: nothing
    // EFFECTS: gets the element detail from Saas (web service)
    async Detail(strXml, url){        
        const returnedData = await this.#postData(
            url,
            '{strxmlIN: "' + strXml + '"}'
        )
        return returnedData;
    }
    // MODIFIES: nothing
    // EFFECTS: sends/saves the element detail to Saas (web service)
    async Set(strXml, url){        
        const returnedData = await this.#postData(
            url,
            '{strxmlIN: "' + strXml + '"}'
        )
        return returnedData;
    }
    // MODIFIES: nothing
    // EFFECTS: deletes the element (sends request) to Saas (web service)
    async Delete(strXml, url){        
        const returnedData = await this.#postData(
            url,
            '{strxmlIN: "' + strXml + '"}'
        )
        return returnedData;
    }
            
    // MODIFIES: nothing
    // EFFECTS: makes the request identifier (ID)
    GetRequestID() {
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
    

    
    // private section

    async #postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST',               // *GET, POST, PUT, DELETE, etc.
          mode: 'cors',                 // no-cors, *cors, same-origin
          cache: 'no-cache',            // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin',   // include, *same-origin, omit
          headers: {           
            'Content-Type': 'application/json; charset=utf-8',
          },
          datatype: "json",
          redirect: 'follow',           // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: data                    // body data type must match "Content-Type" header
        });

        const soap_data = await response.text();                        // soap data (with envelope)
        const status = response.status;                                 // http response status

        if (status == 200){
            // no problem...
            const json_soap_data = $.parseJSON(soap_data);
            return json_soap_data.d;
        }else{
            // an error occurs, probably 500
            throw soap_data;
        }
    }

}