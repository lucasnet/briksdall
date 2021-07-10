
export async function init(route_elements){
    console.log('init');

    var html_content = await getData(route_elements.template);
    $("#main_content").html(html_content);
}



async function getData(url = '') {       
    const response = await fetch(url);
    const data = await response.text();
    return data; 
}