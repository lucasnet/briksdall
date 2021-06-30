
class Router{
    constructor(){}

    Route(params){
        var html_content="";

        switch (params.id){
            case "Gruppi": html_content = "<h1 class=\"h3 mb-4 text-gray-800\">Gruppi</h1>"; break;
            case "Sottogruppi": html_content = "<h1 class=\"h3 mb-4 text-gray-800\">Sottogruppi</h1>"; break;
            case "Supermercati": html_content = "<h1 class=\"h3 mb-4 text-gray-800\">Supermercati</h1>"; break;
                
            default: alert(params.id); break;
        }
        
        $("#main_content").html(html_content);
    }
}