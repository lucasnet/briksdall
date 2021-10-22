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
                notifyRisorseChanged){
                   
        const template = (responseResult.codice == 0) ? this._templates.template : this._templates.error;
        let html_template = await this.#getData(this._templates.template);
        if (responseResult.codice != 0){
            html_template = html_template.replace("{descrizione}", responseResult.descrizione);
        }
        $("#main_content").html(html_template);

        this.#filterCboElements($("#ddRisorse_filtro"), risorse_responseData, "");
        this.#filterCboElements($("#ddGruppi_filtro"),  gruppi_responseData, "");
        this.#filterCboElements($("#ddSottogruppi"),    sottogruppi_responseData, "");

        const self = this;
        $("#ddGruppi_filtro").change(function(){
            const gruppo = $("#ddGruppi_filtro option:selected").text();
            self.#filterCboElements($("#ddSottogruppi"),sottogruppi_responseData,gruppo);
        });
        $("#ddRisorse_filtro").change(function(){
            const idRisorsa = $("#ddRisorse_filtro").val();
            notifyRisorseChanged(idRisorsa);
        });
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
                        // riporto mensile
                        "targets": 2,
                        "searchable": false,
                        "render": function ( data, type, row ) {
                            return '<h6>' + row[2] + '</h6>';
                        }
                    },
                    {
                        "targets": 3,
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
            //$('#btnNew').on('click', function (){
            //    notifyDetail(0);
            //});
        }
    }

    // ShowDetail. Shows Risorse element.
    // params:
    // - responseResult: web service response result (json format)
    // - responseData: web service response data (xml string format)
    // - events: list of delegates (save, delete, list)
    // - sender: object owner
    async ShowDetail(responseResult, responseData, events, sender){

        let html_modalconfirm = await this.#getData(this._modalconfirm);

        const template = (responseResult.codice == 0) ? this._route_elements.template : this._route_elements.error;

        let html_template = await this.#getData(template);

        if (responseResult.codice != 0){
            html_template = html_template.replace("{descrizione}", responseResult.descrizione);
        }

        $("#main_content").html(html_template);
        $("#modal_confirm").html(html_modalconfirm);


        if (responseResult.codice == 0){
            $("#txtDescrizione").val(responseData.descrizione);
            $("#txtCodice").val(responseData.codice);
            $("#chkRiportoMensile").prop('checked', responseData.riporto_mensile == "1");           

            // events
            $("#btnSave").on("click", function (){
                events.save(sender,
                            {                             
                             codice         : $("#txtCodice").val(), 
                             descrizione    : $("#txtDescrizione").val(),                             
                             riporto_mensile: $("#chkRiportoMensile").prop('checked') ? "1" : "0"
                            });
            });

            //$("#btnDelete").on("click", function (){
            //
            //    $('#confermModalTitle').text('Sei sicuro di voler eliminare questo sottogruppo?');
            //    $('#confermModal').modal('show');
            //    $('#doNotConferm').text('No');
            //    $('#confermIt').text('Si');
            //
            //    $('#confermIt').off('click');
            //
            //    $('#confermIt').click(function () {
            //
            //        events.delete(
            //                        sender,
            //                        $("#txtCodice").val()
            //                     );
            //
            //    });
            //});

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

}