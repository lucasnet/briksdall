
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
        const rawData = await model.Gruppi_List();

        const presenter = new Gruppi_Presenter(this._route_elements);
        presenter.ShowList(rawData);
    }
}



