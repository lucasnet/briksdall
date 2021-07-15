export class Gruppi_Presenter{

    _route_elements = null; // {model : "", presenter : "", contoller: "", template : ""}

    constructor(route_elements){
        this._route_elements = route_elements;
    }

    async ShowList(rawdata){
        const html_content = await this.#getData(this._route_elements.template);
        $("#main_content").html(html_content);
    }

     async #getData(url = '') {       
         const response = await fetch(url);
         const data = await response.text();
         return data; 
     }
}