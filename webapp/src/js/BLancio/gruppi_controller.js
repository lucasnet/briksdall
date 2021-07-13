
export async function init(route_elements){
    const params = {
        username: "",
        password: ""
    };

    const {Gruppi_Model} = await import(route_elements.model);
    // const presenter = await import(route_elements.presenter);
    
    const model = new Gruppi_Model(params);
    const rawData = await model.Gruppi_List();

    var html_content = await getData(route_elements.template);
    $("#main_content").html(html_content);
}



async function getData(url = '') {       
    const response = await fetch(url);
    const data = await response.text();
    return data; 
}