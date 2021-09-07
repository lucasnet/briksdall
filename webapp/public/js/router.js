
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
            "template"   : "/BLancio/sottogruppi",
            "controller" : "/BLancio/cSottogruppi",
            "presenter"  : "/BLancio/pSottogruppi",
            "model"      : "/BLancio/mSottogruppi",
            "error"      : "/error"
        },
        "Sottogruppi_Detail":{
            "template"   : "/BLancio/sottogruppo",
            "controller" : "/BLancio/cSottogruppo",
            "presenter"  : "/BLancio/pSottogruppi",
            "model"      : "/BLancio/mSottogruppi",
            "modelGruppi": "/BLancio/mGruppi",
            "error"      : "/error"
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

            case "Sottogruppi":
                let {Sottogruppi_Controller} = await import(route_elements.controller);
                controller = new Sottogruppi_Controller(this.auth, route_elements);
                rawData = await controller.Init(this.#notify_BLancio_SottogruppiDetail);
                break;

            case "Sottogruppi_Detail":
                const {Sottogruppo_Controller} = await import(route_elements.controller);
                controller = new Sottogruppo_Controller(this.auth, route_elements, params.element);
                rawData = await controller.Init(this.#notify_BLancio_SottogruppiList);
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
    #notify_BLancio_SottogruppiDetail(id){
        router.Route({id: "Sottogruppi_Detail", element: id})
    }
    #notify_BLancio_SottogruppiList(){
        router.Route({id: "Sottogruppi"})
    }

    
}