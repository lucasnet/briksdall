export class Gruppi_Presenter{
    
    _route_elements = null; // {model : "", presenter : "", contoller: "", template : "", error : ""}

    constructor(route_elements){
        this._route_elements = route_elements;
    }

    async ShowList(responseResult, responseData){
       
        const template = (responseResult.codice == 0) ? this._route_elements.template : this._route_elements.error;

        let html_template = await this.#getData(template);

        if (responseResult.codice != 0){
            html_template = html_template.replace("{descrizione}", responseResult.descrizione);
        }

        $("#main_content").html(html_template);

        if (responseResult.codice == 0){
            $('#dataTable').DataTable({
                data: responseData
            });
        }
    }


    // Private Section

    async #getData(url = '') {       
        const response = await fetch(url);
        const data = await response.text();
        return data; 
    }

}