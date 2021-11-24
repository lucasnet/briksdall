//
// Presenter for Registrazioni modules
//
export class Registrazioni_Presenter{
    
    // fields
    _templates    = null; // {modal_ok : "", modal_err : "", template : "", error : ""}
    _modalconfirm = "";   // template for modal confirm      
    _modalok      = "";   // template for modal ok
    _modalerror   = "";   // template for modal error



    // Constructor.
    // set up initial values.
    // params: templates. Routing templates
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
                controller){
           
        
        const template = (responseResult.codice == 0) ? this._templates.template : this._templates.erro
        let html_template = await this.#getData(template);
        if (responseResult.codice != 0){
            html_template = html_template.replace("{descrizione}", responseResult.descrizione);
        }
        $("#main_content").html(html_template);
         
        
        this.#filterCboElements($("#cboRisorse")    , risorse_responseData,     "");
        this.#filterCboElements($("#cboGruppi")     , gruppi_responseData,      "");
        this.#filterCboElements($("#cboSottogruppi"), sottogruppi_responseData, "");

        const self = this;
        $("#cboGruppi").change(function(){
            const gruppo = $("#cboGruppi option:selected").text();
            self.#filterCboElements($("#cboSottogruppi"),sottogruppi_responseData,gruppo);
        });
    
    }

    // ShowList. Shows Registrazioni list.
    // params:
    // - responseResult: web service response result (json format)
    // - responseData: web service response data (xml string format)
    // - notifyDetail: delegate for element "click" ("detail" request) 
    async ShowList(responseResult, responseData, notifyDetail){
       
        if (responseResult.codice == 0){
            $('#dataTable').DataTable({
                data: responseData,
                "columnDefs": [
                    {
                        "targets": [ 0 ],
                        "visible": false,
                        "searchable": false,
                        "render": function ( data, type, row ) {
                            return '<h6>' + row.codice + '</h6>';
                        }
                    },
                    {
                        // Data
                        "targets": 1,
                        "render": function ( data, type, row ) {
                            return '<h6>' + row.data + '</h6>';
                        }
                    },
                    {
                        // Gruppo
                        "targets": 2,
                        "render": function ( data, type, row ) {
                            return '<h6>' + row.gruppo + '</h6>';
                        }
                    },
                    {
                        // Sottogruppo
                        "targets": 3,
                        "render": function ( data, type, row ) {
                            return '<h6>' + row.sottogruppo + '</h6>';
                        }
                    },
                    {
                        // Risorsa
                        "targets": 4,
                        "render": function ( data, type, row ) {
                            return '<h6>' + row.risorsa + '</h6>';
                        }
                    },
                    {
                        // Note
                        "targets": 5,
                        "render": function ( data, type, row ) {
                            return '<h6>' + row.note + '</h6>';
                        }
                    },
                    {
                        // Valore Entrate
                        "name": "entrate",
                        "targets": 6,
                        "orderable": false,
                        "render": function ( data, type, row ) {
                            if (row.codice_tipologia == '1') return '<h6>€ ' + row.valore + '</h6>';
                            return '';
                        }
                    },
                    {
                        // Valore Uscite
                        "targets": 7,
                        "orderable": false,
                        "render": function ( data, type, row ) {
                            if (row.codice_tipologia == '2') return '<h6>€ ' + row.valore + '</h6>';
                            return '';
                        }
                    },
                    {
                        "targets": 8,
                        "searchable": false,
                        "orderable": false,
                        "render": function ( data, type, row ) {                                        
                                        const edit = '<button class="btn btn-info btn-icon-split" '
                                                        + 'id="' + row[0] + '"> '                                                    
                                                        + '<span class="icon text-white-50">'
                                                        + '<i class="fas fa-edit"></i>'
                                                        + '</span>'
                                                        //+ '<span class="text"></span>'
                                                        + '</button>';

                                        return edit;
                                    }
                    }
                ],
                "order": [[ 1, "asc" ]]

            //     "footerCallback": function ( row, data, start, end, display ) {
            //         var api = this.api(), columns = [6, 7];

            //         // Remove the formatting to get integer data for summation
            //         var intVal = function ( i ) {
            //             return typeof i === 'string' ?
            //                 i.replace(/[\$,]/g, '')*1 :
            //                 typeof i === 'number' ?
            //                 i : 0;
            //         };
                    
            //         // total over all pages
            //         const total = api
            //             .column( 6 )
            //             .data()
            //             .reduce( function (a, b) {
            //                 return intVal(a) + intVal(b);
            //             }, 0 );
                    
            //         // Total over this page
            //         const pageTotal = api
            //             .column( 6, { page: 'current'} )
            //             .data()
            //             .reduce( function (a, b) {
            //                 return intVal(a) + intVal(b);
            //             }, 0 );

            //              // Update footer
            //      $( api.column( 6 ).footer() ).html(
            //          '$'+pageTotal +' ( $'+ total +' total)'
            //      );
            //  }
            
            });

            $('#dataTable tbody').on('click', 'td button', function (){
                notifyDetail(this.id);
            });
            $('#btnNew').on('click', function (){
                notifyDetail(0);
            });

        }
    }

    // ShowDetail. Shows Registrazione element.
    // params:
    // - responseResult: web service response result (json format)
    // - responseData: web service response data (xml string format)
    // - events: list of delegates (save, delete, list)
    // - sender: object owner
    async ShowDetail(responseResult, responseData, events, sender){

        let html_modalconfirm = await this.#getData(this._modalconfirm);

        const template = (responseResult.codice == 0) ? this._templates.template : this._templates.error;

        let html_template = await this.#getData(template);

        if (responseResult.codice != 0){
            html_template = html_template.replace("{descrizione}", responseResult.descrizione);
        }

        $("#main_content").html(html_template);
        $("#modal_confirm").html(html_modalconfirm);

        if (responseResult.codice == 0){
            $("#txtDescrizione").val(responseData.descrizione);
            $("#txtCodice").val(responseData.codice);

            // events
            $("#btnSave").on("click", function (){
                events.save(sender,
                            {                             
                             codice      : $("#txtCodice").val(), 
                             descrizione : $("#txtDescrizione").val( )
                            });
            });

            $("#btnDelete").on("click", function (){

                $('#confermModalTitle').text('Sei sicuro di voler eliminare questo gruppo?');
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



        // private methods

        // Fill the drop down Object with Elements.
        // Elements are filtered with Filter
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
    

    async #getData(url = '') {       
        const response = await fetch(url);
        const data = await response.text();
        return data; 
    }

}