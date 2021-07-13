
class Router{

    routerList = {
        "Gruppi":{
            "template"   : "/BLancio/gruppi",
            "controller" : "/BLancio/cGruppi",
            "presenter"  : "\\BLancio\\vGruppi",
            "model"      : "/BLancio/mGruppi"
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
        var route_elements = this.routerList[pageID];

        let controller = await import(route_elements.controller);
        controller.init(route_elements);       
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