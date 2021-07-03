
class Router{
    constructor(){}

    async Route(params){        
        var html_content = await this.#getTemplate(params.id);
        $("#main_content").html(html_content);
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

    // Example POST method implementation:
    async #getData(url = '') {       
        const response = await fetch(url);
        const data = await response.text();
        return data; 
    }
    
}