
export class Gruppi_Controller{

    // fields
    _auth = null;           //{username : "", password : "" };
    _route_elements = null; // {model : "", presenter : "", contoller: "", template : ""}

    // constructor
    constructor(auth, route_elements){
        this._auth = auth;
        this._route_elements = route_elements;
    }


    async Init(){
        const {Gruppi_Model} = await import(this._route_elements.model);
        const {Gruppi_Presenter} = await import(this._route_elements.presenter);
        
        const model = new Gruppi_Model(this._auth);
        let rawData = await model.Gruppi_List();

        const responseResult = this.#getResponseResult(rawData);
        const responseRawData = this.#getResponseRawData(rawData);
        const responseData = this.#getStructuredData(responseRawData);

        const presenter = new Gruppi_Presenter(this._route_elements);
        presenter.ShowList(responseResult, responseData);
    }



    // Private Section

    #getResponseResult(rawdata){
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

     #getResponseRawData(rawdata){
        const xmlDoc = $.parseXML(rawdata);        
       
        let data = "";
        $(xmlDoc).each(function () {           
            data = $(this).find("response>data").html();
        });

        return data;
     }

     #getStructuredData(responserawdata){
        const xmlDoc = $.parseXML(responserawdata);        
       
        let loe = [];
        let row = null;
        let codice = "";
        let descrizione = "";

        $(xmlDoc).find("row").each(function () {           
            // row = $(this).find("row");

            let elem_codice = $(this)[0].childNodes[0];
            codice = elem_codice.textContent;

            let elem_descrizione = $(this)[0].childNodes[1];
            descrizione = decodeURIComponent(elem_descrizione.textContent);

            loe.push([codice, descrizione]);
        });

        return loe;
     }
}



