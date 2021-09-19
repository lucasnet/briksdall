//
// Base module for "controller" modules.
//
export class Base_Controller{

    // Get the reponse result, content of "result" node.
    GetResponseResult(rawdata){
        const xmlDoc = $.parseXML(rawdata);

        let codice = 0;
        let descrizione = "";
        $(xmlDoc).each(function () {
            codice = $(this).find("response>result>codice").text();
            descrizione = $(this).find("response>result>descrizione").text();
        });

        return {
                codice : codice,
                descrizione : descrizione
            };
    }

    // Get the reponse data, content of "data" node.
    GetResponseRawData(rawdata){
        const xmlDoc = $.parseXML(rawdata);        
       
        let data = "";
        $(xmlDoc).each(function () {           
            data = $(this).find("response>data").html();
        });

        return data;
    }

}