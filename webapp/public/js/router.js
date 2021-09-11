
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
        },
        "Supermercati":{
            "template"   : "/BLancio/supermercati",
            "controller" : "/BLancio/cSupermercati",
            "presenter"  : "/BLancio/pSupermercati",
            "model"      : "/BLancio/mSupermercati",
            "error"      : "/error"
        },
        "Supermercati_Detail":{
            "template"   : "/BLancio/supermercato",
            "controller" : "/BLancio/cSupermercato",
            "presenter"  : "/BLancio/pSupermercati",
            "model"      : "/BLancio/mSupermercati",            
            "error"      : "/error"
        },
        "Risorse":{
            "template"   : "/BLancio/risorse",
            "controller" : "/BLancio/cRisorse",
            "presenter"  : "/BLancio/pRisorse",
            "model"      : "/BLancio/mRisorse",
            "error"      : "/error"
        },
        "Risorse_Detail":{
            "template"   : "/BLancio/risorsa",
            "controller" : "/BLancio/cRisorsa",
            "presenter"  : "/BLancio/pRisorse",
            "model"      : "/BLancio/mRisorse",            
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

            case "Supermercati":
                let {Supermercati_Controller} = await import(route_elements.controller);
                controller = new Supermercati_Controller(this.auth, route_elements);
                rawData = await controller.Init(this.#notify_BLancio_SupermercatiDetail);
                break;

            case "Supermercati_Detail":
                const {Supermercato_Controller} = await import(route_elements.controller);
                controller = new Supermercato_Controller(this.auth, route_elements, params.element);
                rawData = await controller.Init(this.#notify_BLancio_SupermercatiList);
                break;

            case "Risorse":
                let {Risorse_Controller} = await import(route_elements.controller);
                controller = new Risorse_Controller(this.auth, route_elements);
                rawData = await controller.Init(this.#notify_BLancio_RisorseDetail);
                break;

            case "Risorse_Detail":
                const {Risorsa_Controller} = await import(route_elements.controller);
                controller = new Risorsa_Controller(this.auth, route_elements, params.element);
                rawData = await controller.Init(this.#notify_BLancio_RisorseList);
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
    #notify_BLancio_SupermercatiDetail(id){
        router.Route({id: "Supermercati_Detail", element: id})
    }
    #notify_BLancio_SupermercatiList(){
        router.Route({id: "Supermercati"})
    }
    #notify_BLancio_RisorseDetail(id){
        router.Route({id: "Risorse_Detail", element: id})
    }
    #notify_BLancio_RisorseList(){
        router.Route({id: "Risorse"})
    }
    
}