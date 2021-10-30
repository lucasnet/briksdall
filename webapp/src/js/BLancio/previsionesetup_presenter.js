//
// Presenter for Setup Previsione process
//
export class PrevisioneSetup_Presenter{
    
    // fields
    _templates = null;      // {modal_ok : "", modal_err : "", template : "", error : ""}
    _modalconfirm = "";     // template for modal confirm      
    _modalok      = "";     // template for modal ok
    _modalerror   = "";     // template for modal error



    // Constructor.
    // set up initial values.
    // params: route_elements. Routing elements (model, controller, presenter, templates)
    constructor(templates){
        this._templates = templates;    
        
        this._modalok = templates.modal_ok;
        this._modalerror = templates.modal_err;
        this._modalconfirm = templates.modal_confirm;
    }



    // public methods

    async Init(responseResult,
                risorse_responseData,
                gruppi_responseData,
                sottogruppi_responseData,
                notifyRisorseChanged,
                notifyInsertSottogruppo,
                notifyGenerate,
                controller){
                   
        const template = (responseResult.codice == 0) ? this._templates.template : this._templates.error;
        let html_template = await this.#getData(this._templates.template);
        if (responseResult.codice != 0){
            html_template = html_template.replace("{descrizione}", responseResult.descrizione);
        }
        $("#main_content").html(html_template);


        let html_modalconfirm = await this.#getData(this._modalconfirm);
        $("#modal_confirm").html(html_modalconfirm);


        this.#filterCboElements($("#ddRisorse_filtro"), risorse_responseData,     "");
        this.#filterCboElements($("#ddGruppi_filtro"),  gruppi_responseData,      "");
        this.#filterCboElements($("#ddSottogruppi"),    sottogruppi_responseData, "");

        const self = this;
        $("#ddGruppi_filtro").change(function(){
            const gruppo = $("#ddGruppi_filtro option:selected").text();
            self.#filterCboElements($("#ddSottogruppi"),sottogruppi_responseData,gruppo);
        });
        $("#ddRisorse_filtro").change(function(){
            const idRisorsa = $("#ddRisorse_filtro").val();
            const idGruppo = $("#ddGruppi_filtro").val();
            notifyRisorseChanged(controller, idRisorsa, idGruppo);
        });
        $("#btnInsert").click(function(){
            const idRisorsa = $("#ddRisorse_filtro").val();
            const idSottogruppo = $("#ddSottogruppi").val();
            notifyInsertSottogruppo(controller, idRisorsa, idSottogruppo);
        });
        $("#btnGenerate").click(function(){
             // modal confirm
             $('#confermModalTitle').text('Confermi la generazione di una nuova previsione per la risorsa selezionata?');
             $('#confermModal').modal('show');
             $('#doNotConferm').text('No');
             $('#confermIt').text('Si');

             $('#confermIt').off('click');

             $('#confermIt').click(function () {

                const idRisorsa = $("#ddRisorse_filtro").val();
                notifyGenerate(controller, idRisorsa);

             });
            
        });


        $('#dataTable').DataTable({
            "columnDefs": [
                {
                    // codice
                    "targets": [ 0 ],
                    "visible": false,
                    "searchable": false
                },
                {
                    // sottogruppo
                    "targets": 1,
                    "render": function ( data, type, row ) {
                        return row[1];
                    }
                },                    
                {
                    // gruppo
                    "targets": 2,
                    "render": function ( data, type, row ) {
                        return row[2];
                    }
                },
                {
                    "targets": 3,
                    "searchable": false,
                    "orderable": false,
                    "render": function ( data, type, row ) {                                        
                                    const edit = '<button class="btn btn-light btn-icon-split" '
                                                    + 'id="' + row[3] + '"> '     // row[3] = id sottogruppo                                               
                                                    + '<span class="icon text-white-50">'
                                                    + '<i class="fas fa-trash"></i>'
                                                    + '</span>'
                                                    + '</button>';
                                    return edit;
                                }
                }
            ],
            "order": [[ 1, "asc" ]]            
        });


    }

    // ShowSottogruppiList. Shows Sottogruppi list.
    // params:
    // - responseResult: web service response result (json format)
    // - responseData: web service response data (xml string format)
    // - notifyRemove: delegate for element "click" ("remove" request) 
    async ShowSottogruppiList(responseResult, responseData, notifyRemove, controller){

        if (responseResult.codice == 0){
            const table = $('#dataTable').DataTable();
            this.#addRows(table, responseData);

            const idRisorsa = $('#ddRisorse_filtro').val();

            $('#dataTable tbody').on('click', 'td button', function (){

                const idSottogruppo = this.id;

                // modal confirm
                $('#confermModalTitle').text('Sei sicuro di voler eliminare questo sottogruppo?');
                $('#confermModal').modal('show');
                $('#doNotConferm').text('No');
                $('#confermIt').text('Si');

                $('#confermIt').off('click');

                $('#confermIt').click(function () {

                    notifyRemove(controller, idRisorsa, idSottogruppo);

                });
               
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
                events.list;
              })

        }else{
            
            let html_modalerror = await this.#getData(this._modalerror);
            $("#modal_error").html(html_modalerror);

            $('#errorModal').modal('show');
            $('#showErrorCode').text(responseResult.codice);
            $('#showErrorMsg').text(responseResult.descrizione);
        }
    }



    // private methods

    #filterCboElements(object, elements, filter){
        object.empty();

        // first element (empty)
        let opt = document.createElement("option");
        opt.value = 0;          // codice
        opt.innerHTML = "";     // descrizione                                
        object.append(opt);

        elements.forEach(function(element)
                            {                                
                                let opt = document.createElement("option");
                                opt.value= element[0];          // codice
                                opt.innerHTML = element[1];     // descrizione
                            
                                // then append it to the select element
                                const toadd = (filter == "") || (element[2] == filter);
                                if (toadd) object.append(opt);
                            });
        return;
    }

    #addRows(table, responseData){

        table.clear();

        responseData.forEach(function(element){
            const codice        = element[0];
            const sottogruppo   = element[1];
            const gruppo        = element[2];
            const idSottogruppo = element[3];

            let row = table
                        .row.add( [ codice, sottogruppo, gruppo, idSottogruppo ] )
                        .draw();
        });        
    }

    async #getData(url = '') {       
        const response = await fetch(url);
        const data = await response.text();
        return data; 
    }

}