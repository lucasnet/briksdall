export class Gruppi_Presenter{
    
    _route_elements = null; // {model : "", presenter : "", contoller: "", template : "", error : ""}

    constructor(route_elements){
        this._route_elements = route_elements;
    }

    async ShowList(rawdata){
        let html_content = "";

        const responseResult = this.#getResponseResult(rawdata);
        const responseData = this.#getResponseData(rawdata);
        const template = (responseResult.codice == 0) ? this._route_elements.template : this._route_elements.error;

        html_content = await this.#getData(template);

        html_content = this.#fillTemplate(responseData, responseResult, html_content);

        $("#main_content").html(html_content);
    }

     async #getData(url = '') {       
         const response = await fetch(url);
         const data = await response.text();
         return data; 
     }

     #getResponseResult(rawdata){
        const xmlDoc = $.parseXML(rawdata);
        const $xml = $(xmlDoc);

        let codice = 0;
        let descrizione = "";
        $($xml).each(function () {
            codice = $(this).find("response>result>codice").text();
            descrizione = $(this).find("response>result>descrizione").text();
        });

        return {
                codice : codice,
                descrizione : descrizione
            };
     }
     #getResponseData(rawdata){
        const xmlDoc = $.parseXML(rawdata);
        const $xml = $(xmlDoc);
       
        let data = "";
        $($xml).each(function () {           
            data = $(this).find("response>data").text();
        });

        return data;
     }

     #fillTemplate(rawdata, result, template){
        if (result.codice == 0)
            return template;

        template = template.replace("{descrizione}", result.descrizione);
        return template;
     }
}