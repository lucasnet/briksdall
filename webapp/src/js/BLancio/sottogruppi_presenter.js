//
// Presenter for Sottogruppo / Sottogruppi modules
//
export class Sottogruppi_Presenter{
    
    // fields
    _route_elements = null; // {model : "", presenter : "", contoller: "", template : "", error : ""}
    _modalconfirm = "/Common/modal_confirm"; // template for modal confirm      
    _modalok      = "/Common/modal_ok";      // template for modal ok
    _modalerror   = "/Common/modal_error";   // template for modal error



    // Constructor.
    // set up initial values.
    // params: route_elements. Routing elements (model, controller, presenter, templates)
    constructor(route_elements){
        this._route_elements = route_elements;       
    }



    // public methods

    // ShowList. Shows Sottogruppi list.
    // params:
    // - responseResult: web service response result (json format)
    // - responseData: web service response data (xml string format)
    // - notifyDetail: delegate for element "click" ("detail" request) 
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
                        // codice
                        "targets": [ 0 ],
                        "visible": false,
                        "searchable": false
                    },
                    {
                        // descrizione
                        "targets": 1,
                        "render": function ( data, type, row ) {
                            return '<h5>' + row[1] + '</h5>';
                        }
                    },
                    {
                        // gruppo
                        "className" : "bg-light",
                        "targets": 2,
                        "render": function ( data, type, row ) {
                            return '<h5>' + row[2] + '</h5>';
                        }
                    },
                    {
                        // solo movimenti
                        "targets": 3,
                        "searchable": false,
                        "render": function ( data, type, row ) {
                            return '<h6>' + row[3] + '</h6>';
                        }
                    },
                    {
                        "targets": 4,
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
                ],
                "order": [[ 1, "asc" ]]            
            });

            $('#dataTable tbody').on('click', 'td button', function (){
                notifyDetail(this.id);
            });
            $('#btnNew').on('click', function (){
                notifyDetail(0);
            });
        }
    }

    // ShowDetail. Shows Gruppo element.
    // params:
    // - responseResult: web service response result (json format)
    // - responseData: web service response data (xml string format)
    // - gruppiData: web service response Gruppi data (xml string format)
    // - events: list of delegates (save, delete, list)
    // - sender: object owner
    async ShowDetail(responseResult, responseData, gruppiData, events, sender){

        let html_modalconfirm = await this.#getData(this._modalconfirm);

        const template = (responseResult.codice == 0) ? this._route_elements.template : this._route_elements.error;

        let html_template = await this.#getData(template);

        if (responseResult.codice != 0){
            html_template = html_template.replace("{descrizione}", responseResult.descrizione);
        }

        $("#main_content").html(html_template);
        $("#modal_confirm").html(html_modalconfirm);

        this.#getCboElements(gruppiData);

        if (responseResult.codice == 0){
            $("#txtDescrizione").val(responseData.descrizione);
            $("#txtCodice").val(responseData.codice);
            $("#chkSoloMovimenti").prop('checked', responseData.solo_movimenti == "1");
            $("#cboGruppi").val(responseData.codice_gruppo);

            // events
            $("#btnSave").on("click", function (){
                events.save(sender,
                            {                             
                             codice         : $("#txtCodice").val(), 
                             descrizione    : $("#txtDescrizione").val(),
                             codice_gruppo  : $("#cboGruppi").val(),
                             solo_movimenti : $("#chkSoloMovimenti").prop('checked') ? "1" : "0"
                            });
            });

            $("#btnDelete").on("click", function (){

                $('#confermModalTitle').text('Sei sicuro di voler eliminare questo sottogruppo?');
                $('#confermModal').modal('show');
                $('#doNotConferm').text('No');
                $('#confermIt').text('Si');

                $('#confermIt').off('click');

                $('#confermIt').click(function () {

                    events.delete(
                                    sender,
                                    $("#txtCodice").val()
                                 );

                });
            });

            $("#btnBack").on("click", function (){
                events.list();
            });
        }
    }

    // ShowModalResponse. Shows Ok/Error modal.
    // params:
    // - responseResult: web service response result (json format).
    //                  if responseResult.Codice == 0 shows OK modal, else shows Error modal.
    // - events: list of delegates (list). When OK modal closed, fires List delegate.
    async ShowModalResponse(responseResult, events){
        if (responseResult.codice == 0){

            let html_modalok = await this.#getData(this._modalok);
            $("#modal_ok").html(html_modalok);

            $('#okModal').modal('show');
            $('#chiudibox').off("click").click(function () {
                $('#okModal').modal('hide');               
            });
            $('#xbox').off("click").click(function () {
                $('#okModal').modal('hide');
            });
            $('#modal_ok').on('hidden.bs.modal', function (e) {                
                events.list();
              })

        }else{
            
            let html_modalerror = await this.#getData(this._modalerror);
            $("#modal_error").html(html_modalerror);

            $('#errorModal').modal('show');
            $('#showErrorCode').text(responseResult.codice);
            $('#showErrorMsg').text(responseResult.descrizione);
        }
    }



    // Private Section

    async #getData(url = '') {       
        const response = await fetch(url);
        const data = await response.text();
        return data; 
    }

    #getCboElements(gruppiData){
        gruppiData.forEach(function(element)
                            {
                                let opt = document.createElement("option");
                                opt.value= element[0];          // codice
                                opt.innerHTML = element[1];     // descrizione
                            
                                // then append it to the select element
                                $("#cboGruppi").append(opt);
                            });
        return;
    }
}