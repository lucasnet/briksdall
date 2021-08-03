export class Gruppi_Presenter{
    
    _route_elements = null; // {model : "", presenter : "", contoller: "", template : "", error : ""}

    constructor(route_elements){
        this._route_elements = route_elements;       
    }

    async ShowList(responseResult, responseData, notifyDetail){
       
        const template = (responseResult.codice == 0) ? this._route_elements.template : this._route_elements.error;

        let html_template = await this.#getData(template);

        if (responseResult.codice != 0){
            html_template = html_template.replace("{descrizione}", responseResult.descrizione);
        }

        $("#main_content").html(html_template);

        if (responseResult.codice == 0){
            $('#dataTable').DataTable({
                data: responseData,
                "columnDefs": [
                    {
                        "targets": [ 0 ],
                        "visible": false,
                        "searchable": false
                    },
                    {
                        "targets": 1,
                        "render": function ( data, type, row ) {
                            return '<h5>' + row[1] + '</h5>';
                        }
                    },
                    {
                        "targets": 2,
                        "searchable": false,
                        "orderable": false,
                        "render": function ( data, type, row ) {                                        
                                        const edit = '<button class="btn btn-light btn-icon-split" '
                                                        + 'id="' + row[0] + '"> '                                                    
                                                        + '<span class="icon text-white-50">'
                                                        + '<i class="fas fa-edit"></i>'
                                                        + '</span>'
                                                        + '<span class="text">Modifica</span>'
                                                        + '</button>';

                                        return edit;
                                    }
                    }
                ]               
            });

            $('#dataTable tbody').on('click', 'td button', function (){
                notifyDetail(this.id);
            });
        }
    }


    // Private Section

    async #getData(url = '') {       
        const response = await fetch(url);
        const data = await response.text();
        return data; 
    }

}