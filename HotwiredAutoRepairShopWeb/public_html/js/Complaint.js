function createComplaintPage() {
    createEntityPage();
    var infoWrapperDetails = {"title": "Add/Edit/Delete Complaint", "info": "Search for Service Order id to register complaint! Complain id will be generated automatically."};
    populateInfoWrapper(infoWrapperDetails);

    var searchWrapperDetails = [
        {"title": "Search Complaint id:", "id": "search-complaint-id",
            "script": "javascript:checkIfComplaintExists()", "type": "number"}
        ,
        {"title": "Search Service order id:", "id": "search-serviceOrder-id",
            "script": "javascript:checkIfComplaintExistsByServiceOrderId()", "type": "number"}
    ];

    populateSearchWrapper(searchWrapperDetails);

    getComplaintTable();
}

function getComplaintTable() {
    var tableWrapper = $('#table-wrapper');
    tableWrapper.empty();
    var table = $('<table/>', {"class": "show-all-table"});
    var tableHeader = $('<thead/>', {"class": "show-all-table-header"});
    var tableHeaderRow = $('<tr/>');

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/complaints",
        dataType: "json",
        success: function (entityData) {

            var tableTitle1 = $('<th/>', {"text": "Complaint Id", "class": "show-all-table-title"});
            var tableTitle2 = $('<th/>', {"text": "Service Order id", "class": "show-all-table-title"});
            var tableTitle3 = $('<th/>', {"text": "WorkTypes", "class": "show-all-table-title"});
            var tableTitle4 = $('<th/>', {"text": "Edit", "class": "show-all-table-title"});

            tableHeaderRow.append(
                    tableTitle1
                    , tableTitle2
                    , tableTitle3
                    , tableTitle4
                    );
            tableHeader.append(tableHeaderRow);
            table.append(tableHeader);

            for (var i = 0; i < entityData.length; i++) {
                var complaint = entityData[i];
                var workTypes = complaint.workTypes;
                var incompleteServiceOrderId = complaint.incompleteServiceOrderId;
                var descriptionCell = $('<div/>');

                for (var j = 0; j < workTypes.length; j++) {
                    var description = $('<span/>', {"text": workTypes[j].description}).append($('<br/>'));
                    descriptionCell.append(description);
                }
                var tableRow = $('<tr/>');
                var complaintId = complaint.id;
                var tableDataCell1 = $('<td/>', {"text": complaintId, "id": "id-" + (i + 1)});
                var tableDataCell2 = $('<td/>', {"text": incompleteServiceOrderId, "id": "serviceOrder-id-" + (i + 1)});
                var tableDataCell3 = $('<td/>', {"id": "complaint-workType-description"}).append(descriptionCell);
                var tableDataCell4 = $('<td/>');
                if (complaint.active) {
                    tableDataCell4.append($('<input/>',
                            {"id": "table-edit-complaint-" + (i + 1), "value": "Edit", "type": "button",
                                "onclick": "javascript:createEditableViewForComplaint(\"" + complaintId + "\")"}));
                }
                tableRow.append(
                        tableDataCell1
                        , tableDataCell2
                        , tableDataCell3
                        , tableDataCell4
                        );
                table.append(tableRow);
            }
        }
    });
    tableWrapper.append(table);
}

function createComplaintForm() {

    populateInputWrapper(getInputWrapperDetails());
    $('.uneditable').prop('disabled', true);

    var buttonWrapperDetails = [
        {"type": "button", "value": "clear", "class": "form-button", "id": "form-clear-button", "onclick": "javascript:clearForm()"}
        ,
        {"type": "button", "value": "save", "class": "form-button", "id": "form-save-button", "onclick": "javascript:registerComplaint()"}
    ];

    populateButtonWrapper(buttonWrapperDetails);

    populateActiveOrderWrapper();
}

function checkIfComplaintExists() {
    $('.editable').prop('disabled', false);
    $('.input-form-field').val("");

    var complaintId = $('#search-complaint-id').val();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/complaints/check/complaint/" + complaintId,
        dataType: "json",
        success: function (booleanData) {
            if (booleanData) {
                $('#search-complaint-id').val(complaintId);
                getComplaintByComplaintId();
            } else {
                $('#search-complaint-id').val("");
                $('.form-input-field').val("");
                createComplaintPage();
            }
        }
    });
}

function getComplaintByComplaintId() {
    populateInputWrapper(getInputWrapperDetails());
    $('.uneditable').prop('disabled', true);
    var complaintId = $('#search-complaint-id').val();

    var workTypeWrapper = $("#workType-wrapper");
    workTypeWrapper.empty();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/serviceOrders/findWorkTypesByComplaintId/" + complaintId,
        dataType: "json",
        async: false,
        success: function (workTypeData) {
            for (var i = 0; i < workTypeData.length; ++i) {
                var workType = workTypeData[i];
                var workTypeCheckbox = $('<div/>', {"class": "work-type-checkbox", "text": workType.description})
                        .append($('<input/>', {"type": "checkbox", "class": "input-checkbox", "id": workType.id}));
                workTypeWrapper.append(workTypeCheckbox);
            }
        }
    });

    var buttonWrapperDetails = [
        {"value": "new", "type": "button", "class": "form-button", "id": "form-new-button", "onclick": "javascript:createComplaintForm()"}
        ,
        {"value": "update", "type": "button", "class": "form-button", "id": "form-update-button", "onclick": "javascript:updateComplaint()"}
        ,
        {"value": "edit", "type": "button", "class": "form-button", "id": "form-edit-button", "onclick": "javascript:editComplaint()"}
        ,
        {"value": "serv. order", "type": "button", "class": "form-button", "id": "form-serviceOrder-button", "onclick": "javascript:createServiceOrderFromComplaint()"}
    ];
    populateButtonWrapper(buttonWrapperDetails);
    populateActiveOrderWrapper();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/complaints/find/" + complaintId,
        dataType: "json",
        success: function (complaintData) {
            if (complaintData !== null) {
                $('#complaint-id').val(complaintData.id);
                $('#serviceOrder-id').val(complaintData.incompleteServiceOrderId);

                for (var i = 0; i < complaintData.workTypes.length; i++) {

                    $('#' + (complaintData.workTypes[i].id)).prop('checked', true);
                }

                var active = complaintData.active;
                if (active) {
                    $('#active-checkbox').prop('checked', true);
                } else {
                    $('#active-checkbox').prop('checked', false);
                    $('.form-input-field').addClass('deactivated');
                    $('.input-checkbox').addClass('deactivated');
                    $('#form-edit-button').addClass('deactivated');
                    $('#form-update-button').addClass('deactivated');
                    $('#form-serviceOrder-button').addClass('deactivated');
                }
                closeFormForEditing();
            }
        },
        error: function () {
            $('#complaint-id').val("");
            $('#serviceOrder-id').val("");
            populateWorkTypeWrapper();
        }
    });
}

function registerComplaint() {
    var serviceOrderId = $('#serviceOrder-id').val();

    var workTypeIds = [];

    if (serviceOrderId !== "") {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/serviceOrders/findWorkTypeIdsByServiceOrderId/" + serviceOrderId,
            dataType: "json",
            async: false,
            success: function (data) {
                for (var i = 0; i < data.length; ++i) {
                    if ($('#' + data[i]).is(':checked')) {
                        workTypeIds[workTypeIds.length] = data[i];
                    }
                }
            }
        });
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/complaints/register/new",
            data: ({
                "serviceOrderId": serviceOrderId
                , "workTypeIds": workTypeIds.toString()
            }),
            dataType: "json",
            async: false,
            success: function (complaintDTO) {
                $('#complaint-id').val(complaintDTO.id);
                createComplaintRegistrationCopy();
            }
        });
    } else {
        alert("Input is missing!!");
    }
    getComplaintTable();
}

function createComplaintRegistrationCopy() {

    var buttonWrapperDetails = [
        {"value": "new", "type": "button", "class": "form-button", "id": "form-new-button", "onclick": "javascript:createComplaintForm()"}
        ,
        {"value": "update", "type": "button", "class": "form-button", "id": "form-update-button", "onclick": "javascript:updateComplaint()"}
        ,
        {"value": "edit", "type": "button", "class": "form-button", "id": "form-edit-button", "onclick": "javascript:editComplaint()"}
        ,
        {"value": "service order", "type": "button", "class": "form-button", "id": "form-serviceOrder-button", "onclick": "javascript:createServiceOrderFromComplaint()"}
    ];

    populateButtonWrapper(buttonWrapperDetails);
    closeFormForEditing();
}

function editComplaint() {
    var buttonWrapperDetails = [
        {"value": "new", "type": "button", "class": "form-button", "id": "form-new-button", "onclick": "javascript:createComplaintForm()"}
        ,
        {"value": "update", "type": "button", "class": "form-button", "id": "form-update-button", "onclick": "javascript:updateComplaint()"}
        ,
        {"value": "edit", "type": "button", "class": "form-button", "id": "form-edit-button", "onclick": "javascript:editComplaint()"}
        ,
        {"value": "delete", "type": "button", "class": "form-button", "id": "form-delete-button", "onclick": "javascript:alertBeforeDeleteComplaint()"}
    ];

    populateButtonWrapper(buttonWrapperDetails);
    openFormForEditing();
}

function updateComplaint() {
    var complaintId = $('#complaint-id').val();
    var serviceOrderId = $('#serviceOrder-id').val();
    var active;

    if ($('#active-checkbox').is(':checked')) {
        active = true;
    } else {
        active = false;
    }

    var workTypes = getWorkTypesByServiceOrderId(serviceOrderId);
    var complaint = {
        "id": complaintId,
        "incompleteServiceOrderId": serviceOrderId,
        "active": active,
        "workTypes": workTypes
    };

    var stringifiedComplaint = JSON.stringify(complaint);

    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/complaints/update",
        data: stringifiedComplaint,
        dataType: "json",
        contentType: "application/json",
        success: createComplaintRegistrationCopy()
    });
    getComplaintTable();
}

function alertBeforeDeleteComplaint() {
    if (confirm("Do you really wish to delete service order?! Click ok to delete!") === true) {
        deleteComplaintByComplaintId();
        createComplaintPage();
    }
}

function deleteComplaintByComplaintId() {
    var complaintId = $('#complaint-id').val();

    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/complaints/deleteById/" + complaintId,
        dataType: "json",
        success: createComplaintForm()
    });
    getComplaintTable();
}

function createEditableViewForComplaint(complaintId) {
    $("#search-complaint-id").val(complaintId);
    createComplaintForm();
    getComplaintByComplaintId();
    closeFormForEditing();
}

function checkIfComplaintExistsByServiceOrderId() {
    var serviceOrderId = $('#search-serviceOrder-id').val();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/complaints/check/serviceOrder/" + serviceOrderId,
        dataType: "json",
        success: function (integerReply) {
            switch (integerReply) {
                case 1:
                    $('#serviceOrder-id').val(serviceOrderId);
                    createComplaintForm();
                    populateWorkTypeWrapperForServiceOrder();
                    break;
                case 2:
                    getComplaintByServiceOrderId(serviceOrderId);
                    break;
                case 3:
                    alert("You cannot register a complaint without a valid reference to a previous service order");
                    break;
            }
        }
    });
}


function getComplaintByServiceOrderId(serviceOrderId) {
    populateInputWrapper(getInputWrapperDetails());
    var workTypeWrapper = $("#workType-wrapper");
    workTypeWrapper.empty();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/serviceOrders/findWorkTypesByServiceOrderId/" + serviceOrderId,
        dataType: "json",
        success: function (workTypeData) {
            for (var i = 0; i < workTypeData.length; ++i) {
                var workType = workTypeData[i];
                var workTypeCheckbox = $('<div/>', {"class": "work-type-checkbox", "text": workType.description})
                        .append($('<input/>', {"type": "checkbox", "class": "input-checkbox", "id": workType.id}));
                workTypeWrapper.append(workTypeCheckbox);
            }
        }
    });
    var buttonWrapperDetails = [
        {"value": "new", "type": "button", "class": "form-button", "id": "form-new-button", "onclick": "javascript:createComplaintForm()"}
        ,
        {"value": "update", "type": "button", "class": "form-button", "id": "form-update-button", "onclick": "javascript:updateComplaint()"}
        ,
        {"value": "edit", "type": "button", "class": "form-button", "id": "form-edit-button", "onclick": "javascript:editComplaint()"}
    ];
    populateButtonWrapper(buttonWrapperDetails);
    populateActiveOrderWrapper();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/complaints/findByServiceOrderId/" + serviceOrderId,
        dataType: "json",
        success: function (complaintData) {
            $('#complaint-id').val(complaintData.id);
            $('#serviceOrder-id').val(complaintData.incompleteServiceOrderId);

            var workTypes = complaintData.workTypes;
            for (var i = 0; i < workTypes.length; i++) {
                $('#' + (workTypes[i].id)).prop('checked', true);
            }

            if (complaintData.active) {
                $('#active-checkbox').prop('checked', true);
            } else {
                $('#active-checkbox').prop('checked', false);
                $('.form-input-field').addClass('deactivated');
                $('.input-checkbox').addClass('deactivated');
                $('#form-edit-button').addClass('deactivated');
                $('#form-update-button').addClass('deactivated');
            }
            closeFormForEditing();
        },
        error: function () {
            createComplaintPage();
        }
    });
}

function getWorkTypesByServiceOrderId(serviceOrderId) {

    var workTypes = [];
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/serviceOrders/findWorkTypesByServiceOrderId/" + serviceOrderId,
        dataType: "json",
        async: false,
        success: function (workTypeData) {
            for (var i = 0; i < workTypeData.length; ++i) {
                if ($('#' + workTypeData[i].id).is(':checked')) {
                    workTypes[workTypes.length] = {
                        "id": workTypeData[i].id,
                        "description": workTypeData[i].description,
                        "price": workTypeData[i].price,
                        "incompleteserviceOrderId": workTypeData[i].serviceOrders
                    };
                }
            }
        }
    });
    return workTypes;
}

function populateWorkTypeWrapperForServiceOrder() {
    var serviceOrderId = $('#search-serviceOrder-id').val();
    $('#serviceOrder-id').val(serviceOrderId);
    var workTypeWrapper = $("#workType-wrapper");
    workTypeWrapper.empty();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/serviceOrders/findWorkTypesByServiceOrderId/" + serviceOrderId,
        dataType: "json",
        success: function (workTypeData) {
            for (var i = 0; i < workTypeData.length; ++i) {
                var workType = workTypeData[i];
                var workTypeCheckbox = $('<div/>', {"class": "work-type-checkbox", "text": workType.description})
                        .append($('<input/>', {"type": "checkbox", "class": "input-checkbox", "id": workType.id}));
                workTypeWrapper.append(workTypeCheckbox);
            }
        }
    });
}

function getInputWrapperDetails() {
    var inputWrapperDetails = [
        {"text": "Complaint id:", "id": "complaint-id", "class": "form-input-field uneditable"}
        ,
        {"text": "Service order id:", "id": "serviceOrder-id", "class": "form-input-field uneditable"}
    ];
    return inputWrapperDetails;
}

function createServiceOrderFromComplaint() {
    var complaintId = $('#complaint-id').val();
    var serviceOrderId = $('#serviceOrder-id').val();

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/serviceOrders/register/newFromComplaint",
        data: ({
            "complaintId": complaintId
            , "serviceOrderId": serviceOrderId
        }),
        dataType: "json",
        async: false,
        success: function (serviceOrder) {
            var newServiceOrderId = serviceOrder.id;
            createServiceOrderPage();
            createServiceOrderForm();
            getServiceOrderById(newServiceOrderId);
        }
    });
}