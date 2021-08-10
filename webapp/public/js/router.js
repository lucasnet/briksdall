
class Router {

    auth = {
        username: "luca",
        password: "lucadsnet"
    };

    routesList = {
        "Gruppi":{
            "template"   : "/BLancio/gruppi",
            "controller" : "/BLancio/cGruppi",
            "presenter"  : "/BLancio/pGruppi",
            "model"      : "/BLancio/mGruppi",
            "error"      : "/error"
        },
        "Gruppi_Detail":{
            "template"   : "/BLancio/gruppo",
            "controller" : "/BLancio/cGruppo",
            "presenter"  : "/BLancio/pGruppi",
            "model"      : "/BLancio/mGruppi",
            "error"      : "/error"
        },
        "Sottogruppi":{
            "template"   : "\\BLancio\\gruppi",
            "controller" : "\\BLancio\\cGruppi",
            "presenter"  : "\\BLancio\\vGruppi",
            "model"      : "\\BLancio\\mGruppi"
        }
    };

    constructor(){}

    async Route(params){    
        var pageID = params.id;
        var route_elements = this.routesList[pageID];
        let controller = null;
        let rawData = null;

        switch (pageID){

            case "Gruppi":
                let {Gruppi_Controller} = await import(route_elements.controller);
                controller = new Gruppi_Controller(this.auth, route_elements);
                rawData = await controller.Init(this.#notify_BLancio_GruppiDetail);
                break;

            case "Gruppi_Detail":
                const {Gruppo_Controller} = await import(route_elements.controller);
                controller = new Gruppo_Controller(this.auth, route_elements, params.element);
                rawData = await controller.Init(this.#notify_BLancio_GruppiList);
                break;

            default:
                break;
        }
    }

    
    #notify_BLancio_GruppiDetail(id){
        router.Route({id: "Gruppi_Detail", element: id})
    }
    #notify_BLancio_GruppiList(){
        router.Route({id: "Gruppi"})
    }






    async #getTemplate(templateID){
        var html_content = "";

        switch (templateID){
            case "Gruppi"          : html_content = await this.#getData('\\BLancio\\gruppi'); break;
            case "Sottogruppi"     : html_content = await this.#getData('\\BLancio\\sottogruppi'); break;
            case "Risorse"         : html_content = await this.#getData('\\BLancio\\risorse'); break;
            case "Supermercati"    : html_content = await this.#getData('\\BLancio\\supermercati'); break;
            case "SetupPrevisione" : html_content = await this.#getData('\\BLancio\\previsione_setup'); break;

            default: alert(templateID); break;
        }

        return html_content;
    }

    
    async #getData(url = '') {       
        const response = await fetch(url);
        const data = await response.text();
        return data; 
    }
    
}