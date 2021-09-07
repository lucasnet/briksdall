//
// Controller for Sottogruppi process
//
export class Sottogruppi_Controller{

    // fields
    _auth = null;           //{username : "", password : "" };
    _route_elements = null; // {model : "", presenter : "", contoller: "", template : ""}



    // Constructor. Set up initial values.
    // Params:
    // - auth: web services authorization fields (username, password)
    // - route_elements: routing elements (model, presenter, controller, template)
    constructor(auth, route_elements){
        this._auth = auth;
        this._route_elements = route_elements;
    }



    // Public Section 

    // Init. Entry point method. Initializes Gruppi process showing Gruppi list.
    // Params:
    // - notifyDetail: delegate for Detail event (click on single element in the list)
    async Init(notifyDetail){
        const {Sottogruppi_Model} = await import(this._route_elements.model);
        const {Sottogruppi_Presenter} = await import(this._route_elements.presenter);
        
        const model = new Sottogruppi_Model(this._auth);
        let rawData = await model.Sottogruppi_List();

        const responseResult = this.#getResponseResult(rawData);
        const responseRawData = this.#getResponseRawData(rawData);
        const responseData = this.#getStructuredData(responseRawData);

        const presenter = new Sottogruppi_Presenter(this._route_elements);
        presenter.ShowList(responseResult, responseData, notifyDetail);
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
        let codice = "";
        let descrizione = "";
        let gruppo = "";
        let solo_movimenti = "";

        $(xmlDoc).find("row").each(function () {           

            let elem_codice = $(this)[0].childNodes[0];
            codice = elem_codice.textContent;

            let elem_descrizione = $(this)[0].childNodes[1];
            descrizione = decodeURIComponent(elem_descrizione.textContent);

            let elem_gruppo = $(this)[0].childNodes[2];
            gruppo = decodeURIComponent(elem_gruppo.textContent);

            let elem_sm = $(this)[0].childNodes[3];
            solo_movimenti = (elem_sm.textContent == "1") ? "Solo Movimenti" : "";

            loe.push([codice, descrizione, gruppo, solo_movimenti]);
        });

        return loe;
     }
}



