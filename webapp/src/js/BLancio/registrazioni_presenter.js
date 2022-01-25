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


    // Init.
    // Initializes graphic object in the view, filling "filters" drop downs elements.
    // Parameters:
    // - responseResult : response data in json format
    // - risorse_responseData : "risorse" data elements in json format
    // - gruppi_responseData : "gruppi" data elements in json format
    // - sottogruppi_responseData : "sottogruppi" data elements in json format
    // - events : events delegates for 
    //            - notifySaveFilters
    //            - notifyRemoveFilters
    // - controller : controller object
    // Return value:
    // - none
    async Init(responseResult,
                risorse_responseData,
                gruppi_responseData,
                sottogruppi_responseData,
                events,
                controller){
           
        // download html template
        const template = (responseResult.codice == 0) ? this._templates.template : this._templates.error;
        let html_template = await this.#getData(template);
        if (responseResult.codice != 0){
            html_template = html_template.replace("{descrizione}", responseResult.descrizione);
        }
        $("#main_content").html(html_template);
         
        // fill filters drop downs
        this.#filterCboElements($("#cboRisorse")    , risorse_responseData,     "");
        this.#filterCboElements($("#cboGruppi")     , gruppi_responseData,      "");
        this.#filterCboElements($("#cboSottogruppi"), sottogruppi_responseData, "");

        // link "gruppi" dropdown with "sottogruppi" dropdown
        const self = this;
        $("#cboGruppi").change(function(){
            const gruppo = $("#cboGruppi option:selected").text();
            self.#filterCboElements($("#cboSottogruppi"),sottogruppi_responseData,gruppo);
        });
    
        // assign events to filter buttons click
        $("#btnApplyFilter").click(function(){
            const data = self.#getFilters4Save();
            events.notifySaveFilters(data);
        });
        $("#btnRemoveFilter").click(events.notifyRemoveFilters);

        // define datatable structure
        $('#dataTable').DataTable({            
            "columnDefs": [
                {
                    "targets": [ 0 ],
                    "visible": false,
                    "searchable": false,
                    "render": function ( data, type, row ) {
                        return '<p style="font-size: small">' + row.codice + '</p>';
                    }
                },
                // Data
                {
                    "targets": 1,
                    "render": function ( data, type, row ) {
                        return '<p style="font-size: small">' + row.data + '</p>';
                    }
                },
                // Gruppo
                {
                    "targets": 2,
                    "render": function ( data, type, row ) {
                        return '<p style="font-size: small">' + row.gruppo + '</p>';
                    }
                },
                // Sottogruppo
                {
                    "targets": 3,
                    "render": function ( data, type, row ) {
                        return '<p style="font-size: small">' + row.sottogruppo + '</p>';
                    }
                },
                // Risorsa
                {
                    "targets": 4,
                    "render": function ( data, type, row ) {
                        return '<p style="font-size: small">' + row.risorsa + '</p>';
                    }
                },
                // Note
                {
                    "targets": 5,
                    "render": function ( data, type, row ) {
                        return '<p style="font-size: small">' + row.note + '</p>';
                    }
                },
                // Valore Entrate
                {
                    "name": "entrate",
                    "targets": 6,
                    "orderable": false,
                    "render": function ( data, type, row ) {
                        if (row.codice_tipologia == '1') return '<p style="text-align: right; font-size: small">€ ' + row.valore + '</p>';
                        return '';
                    }
                },
                // Valore Uscite
                {
                    "targets": 7,
                    "orderable": false,
                    "render": function ( data, type, row ) {
                        if (row.codice_tipologia == '2') return '<p style="text-align: right; font-size: small">€ ' + row.valore + '</p>';
                        return '';
                    }
                },
                {
                    "targets": 8,
                    "searchable": false,
                    "orderable": false,
                    "render": function ( data, type, row ) {                                        
                                    const edit = '<button class="btn btn-info btn-icon-split" '
                                                    + 'id="' + row.codice + '"> '                                                    
                                                    + '<span class="icon text-white-50">'
                                                    + '<i class="fas fa-edit"></i>'
                                                    + '</span>'
                                                    //+ '<span class="text"></span>'
                                                    + '</button>';

                                    return edit;
                                }
                }
            ],
            "order": [[ 1, "desc" ]]

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

    }

    // InitDetail.
    // Initializes graphic object in the view.
    // Parameters:
    // - responseResult : response data in json format
    // - risorse_responseData : "risorse" data elements in json format
    // - gruppi_responseData : "gruppi" data elements in json format
    // - sottogruppi_responseData : "sottogruppi" data elements in json format
    // - events : events delegates for 
    //            - notifySave
    //            - notifyRemove
    // - controller : controller object
    // Return value:
    // - none
    async InitDetail(responseResult,
                    risorse_responseData,
                    gruppi_responseData,
                    sottogruppi_responseData,
                    events,                 
                    controller)
    {
   
        // download html template
        const template = (responseResult.codice == 0) ? this._templates.template : this._templates.error;
        let html_template = await this.#getData(template);
        if (responseResult.codice != 0){
            html_template = html_template.replace("{descrizione}", responseResult.descrizione);
        }
        $("#main_content").html(html_template);

        let html_modalconfirm = await this.#getData(this._modalconfirm);
        $("#modal_confirm").html(html_modalconfirm);


        // fill filters drop downs
        this.#filterCboElements($("#cboRisorse")    , risorse_responseData,     "");
        this.#filterCboElements($("#cboGruppi")     , gruppi_responseData,      "");
        this.#filterCboElements($("#cboSottogruppi"), sottogruppi_responseData, "");

        // link "gruppi" dropdown with "sottogruppi" dropdown
        const self = this;
        $("#cboGruppi").change(function(){
            const gruppo = $("#cboGruppi option:selected").text();
            self.#filterCboElements($("#cboSottogruppi"),sottogruppi_responseData,gruppo);
        });



        // link "action" buttons
        $("#btnSave").on("click", function (){
            events.save(controller, self.#getData4Saving());
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

        // date picker
        $('#datepicker').datepicker({
            format: "dd/mm/yyyy",
            language: "it",
            todayHighlight: true
        });
    }


    // ShowList.
    // Shows Registrazioni list, links every row with a "notify detail" event, add a "new" button.
    // Parameters:
    // - responseResult: web service response result (json format)
    // - responseData: web service response data (xml string format)
    // - notifyDetail: delegate for element "click" ("detail" request) 
    async ShowList(responseResult, responseData, notifyDetail){
       
        if (responseResult.codice == 0){

            const table = $('#dataTable').DataTable();
            this.#addRows(table, responseData);

            $('#dataTable tbody').on('click', 'td button', function (){
                notifyDetail(this.id);
            });
            $('#btnNew').on('click', function (){
                notifyDetail(0);
            });

        }
    }

    // ShowFilters.
    // Shows filters values.
     // Parameters:
    // - responseResult: web service response result (json format)
    // - responseData: web service response data (json string format)
    async ShowFilters(responseResult, responseData){
        const codice = responseResult.codice;

        const applicati           = responseData.applicati;
        const registrazioni_da_AA = responseData.registrazioni_da_AA;
        const registrazioni_da_MM = responseData.registrazioni_da_MM;
        const registrazioni_da_GG = responseData.registrazioni_da_GG;
        const registrazioni_a_AA  = responseData.registrazioni_a_AA;
        const registrazioni_a_MM  = responseData.registrazioni_a_MM;
        const registrazioni_a_GG  = responseData.registrazioni_a_GG;
        const registrazioni_codicegruppo      = responseData.registrazioni_codicegruppo;
        const registrazioni_codicerisorsa     = responseData.registrazioni_codicerisorsa;
        const registrazioni_codicesottogruppo = responseData.registrazioni_codicesottogruppo;
        const registrazioni_codicetipologia   = responseData.registrazioni_codicetipologia;

        $('#cboGiorniDA').val(registrazioni_da_GG);
        $('#cboMesiDA').val(registrazioni_da_MM);
        $('#cboAnniDA').val(registrazioni_da_AA);
        $('#cboGiorniA').val(registrazioni_a_GG);
        $('#cboMesiA').val(registrazioni_a_MM);
        $('#cboAnniA').val(registrazioni_a_AA);
        $('#cboGruppi').val(registrazioni_codicegruppo);
        $('#cboSottogruppi').val(registrazioni_codicesottogruppo);
        $('#cboTipologie').val(registrazioni_codicetipologia);
        $('#cboRisorse').val(registrazioni_codicerisorsa);

    }




    // ShowDetail. Shows Registrazione element.
    // params:
    // - responseResult: web service response result (json format)
    // - responseData: web service response data (xml string format)
    async ShowDetail(responseResult, responseData){

        if (responseResult.codice == 0){
            $("#txtCodice").val(responseData.codice);
            $("#cboRisorse").val(responseData.codice_risorsa);
            $("#cboSottogruppi").val(responseData.codice_sottogruppo);
            $("#txtImportoINT").val(responseData.importo_INT);
            $("#txtImportoDEC").val(responseData.importo_DEC);
            $("#cboTipologie").val(responseData.codice_tipologia);
            $("#txtNote").val(responseData.note);

            const row_reg_aa = responseData.data_registrazione_AA;
            const row_reg_mm = (responseData.data_registrazione_MM - 1);
            const row_reg_gg = responseData.data_registrazione_GG;
            $('#datepicker').datepicker("setDate", new Date(row_reg_aa, row_reg_mm, row_reg_gg));

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
    
    // getFilters4Save.
    // Get filter data for saving filters.
    // Parameters:
    //
    // Return value:
    // filters data in json format.
    #getFilters4Save(){
        const registrazioni_da_AA = $('#cboAnniDA').val();
        const registrazioni_da_MM = $('#cboMesiDA').val();
        const registrazioni_da_GG = $('#cboGiorniDA').val();
        const registrazioni_a_AA  = $('#cboAnniA').val();
        const registrazioni_a_MM  = $('#cboMesiA').val();
        const registrazioni_a_GG  = $('#cboGiorniA').val();
        const registrazioni_codicegruppo      = $('#cboGruppi').val();
        const registrazioni_codicerisorsa     = $('#cboRisorse').val();
        const registrazioni_codicesottogruppo = $('#cboSottogruppi').val();
        const registrazioni_codicetipologia   = $('#cboTipologie').val();
    
        return {
                registrazioni_da_GG,
                registrazioni_da_MM,
                registrazioni_da_AA,
                registrazioni_a_GG,
                registrazioni_a_MM,
                registrazioni_a_AA,
                registrazioni_codicegruppo,
                registrazioni_codicesottogruppo,
                registrazioni_codicerisorsa,
                registrazioni_codicetipologia
        };
    }

    // addRows.
    // add rows to datatable.
    // Parameters:
    // - table : datatable object
    // - responseData : raw data to add
    // Return value:
    //
    #addRows(table, responseData){
        table.clear();

        responseData.forEach(function(element){                    
            table.row.add( element ).draw();
        });        
    }

    // getData4Saving.
    // Get data for saving.
    // Parameters:
    //
    // Return value:
    // data in json format.
    #getData4Saving(){
        const codice = $("#txtCodice").val();
        const codice_risorsa = $("#cboRisorse").val();
        const codice_sottogruppo = $("#cboSottogruppi").val();
        const importo_INT = $("#txtImportoINT").val();
        const importo_DEC = $("#txtImportoDEC").val();
        const codice_tipologia = $("#cboTipologie").val();
        const note = $("#txtNote").val();
        const selected_date = $('#datepicker').datepicker('getDate');
	    let data_registrazione_GG = '';
	    let data_registrazione_MM = '';
	    let data_registrazione_AA = '';
	    if (selected_date != null) {
	        data_registrazione_AA = selected_date.getFullYear().toString();
	        data_registrazione_MM = (selected_date.getMonth() + 1).toString();
	        data_registrazione_GG = selected_date.getDate().toString();
	    }
        
        return {
            codice,
            codice_risorsa,
            codice_sottogruppo,
            importo_INT,
            importo_DEC,
            codice_tipologia,
            note,
            data_registrazione_GG,
            data_registrazione_MM,
            data_registrazione_AA
        };
    }


    async #getData(url = '') {       
        const response = await fetch(url);
        const data = await response.text();
        return data; 
    }

}