function createWorkTypePage() {
    createEntityPage();
    var infoWrapperDetails = {"title": "Add/Edit/Delete WorkType", "info": "Always use search to check if car/customer already exists!"};
    populateInfoWrapper(infoWrapperDetails);
    var searchWrapperDetails = [
        {"title": "Search Work Type Id:", "id": "search-workType-id",
            "script": "javascript:checkIfWorkTypeExists()", "type": "number"}
    ];
    populateSearchWrapper(searchWrapperDetails);
    getWorkTypeTable();
    createWorkTypeForm();
}

function getWorkTypeTable() {
    var tableWrapper = $('#table-wrapper');
    tableWrapper.empty();
    var table = $('<table/>', {"class": "show-all-table"});
    var tableHeader = $('<thead/>', {"class": "show-all-table-header"});
    var tableHeaderRow = $('<tr/>');
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/workTypes",
        dataType: "json",
        success: function (entityData) {

            var tableTitle1 = $('<th/>', {"text": "Work type id", "class": "show-all-table-title"});
            var tableTitle2 = $('<th/>', {"text": "Description", "class": "show-all-table-title"});
            var tableTitle3 = $('<th/>', {"text": "Price", "class": "show-all-table-title"});
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
                var workType = entityData[i];
                var tableRow = $('<tr/>');
                var workTypeId = workType.id;
                var tableDataCell1 = $('<td/>', {"text": workTypeId});
                var tableDataCell2 = $('<td/>', {"text": workType.description});
                var tableDataCell3 = $('<td/>', {"text": workType.price});
                var tableDataCell4 = $('<td/>').append($('<input/>',
                        {"id": "table-edit-workType-" + (i + 1), "value": "Edit", "type": "button",
                            "onclick": "javascript:createEditableViewForWorkType(" + workTypeId + ")"}));
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

function createWorkTypeForm() {
    var inputWrapperDetails = [
        {"text": "Work type id:", "id": "workType-id", "class": "form-input-field "}
        ,
        {"text": "Description:", "id": "description", "class": "form-input-field editable"}
        ,
        {"text": "Price:", "id": "price", "class": "form-input-field editable"}
    ];
    populateInputWrapper(inputWrapperDetails);
    $('#workType-id').prop('disabled', true);
    var buttonWrapperDetails = [
        {"type": "button", "value": "clear", "class": "form-button", "id": "form-clear-button", "onclick": "javascript:clearForm()"}
        ,
        {"type": "button", "value": "save", "class": "form-button", "id": "form-save-button", "onclick": "javascript:registerWorkType()"}
    ];
    populateButtonWrapper(buttonWrapperDetails);
}

function checkIfWorkTypeExists() {
    $('#form-input-field').prop('disabled', false);
    $('#workType-id').prop('disabled', true);
    $('.input-form-field').val("");
    var workTypeId = $('#search-workType-id').val();
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/workTypes/check/" + workTypeId,
        dataType: "json",
        success: function (booleanData) {
            if (booleanData) {
                getWorkTypeById();
            } else {
                createWorkTypeForm();
                $('#search-workType-id').val("");
            }
        }
    });
}

function registerWorkType() {
    var description = $('#description').val();
    var price = $('#price').val();
    if (description !== "" && price !== "") {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/workTypes/register/new",
            data: ({
                "description": description
                , "price": price
            }),
            dataType: "json",
            async: false,
            success: function (workType) {
                $('#workType-id').val(workType.id);
                createWorkTypeRegistrationCopy();
            }
        });
    } else {
        alert("Input is missing!!");
    }
    getWorkTypeTable();
}

function editWorkType() {
    var buttonWrapperDetails = [
        {"value": "new", "type": "button", "class": "form-button", "id": "form-new-button", "onclick": "javascript:createWorkTypeForm()"}
        ,
        {"value": "update", "type": "button", "class": "form-button", "id": "form-update-button", "onclick": "javascript:updateWorkType()"}
        ,
        {"value": "edit", "type": "button", "class": "form-button", "id": "form-edit-button", "onclick": "javascript:editWorkType()"}
        ,
        {"value": "delete", "type": "button", "class": "form-button", "id": "form-delete-button", "onclick": "javascript:alertBeforeDeleteWorkType()"}
    ];
    populateButtonWrapper(buttonWrapperDetails);
    openFormForEditing();
}

function updateWorkType() {
    var description = $('#description').val();
    var price = $('#price').val();
    var id = $('#workType-id').val();

    if (description !== "" && price !== "" && id !== "") {
        var workTypeObject = {
            "description": description
            , "price": price
            , "id": id
        };

        var stringifiedObject = JSON.stringify(workTypeObject);
        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/workTypes/update",
            data: (stringifiedObject),
            dataType: "json",
            contentType: "application/json",
            success: function () {
                createWorkTypeRegistrationCopy();
                getWorkTypeTable();
            }
        });
    } else {
        alert("Input is missing!!");
    }
}

function createWorkTypeRegistrationCopy() {

    var buttonWrapperDetails = [
        {"value": "new", "type": "button", "class": "form-button", "id": "form-new-button", "onclick": "javascript:createWorkTypeForm()"}
        ,
        {"value": "update", "type": "button", "class": "form-button", "id": "form-update-button", "onclick": "javascript:updateWorkType()"}
        ,
        {"value": "edit", "type": "button", "class": "form-button", "id": "form-edit-button", "onclick": "javascript:editWorkType()"}
    ];
    populateButtonWrapper(buttonWrapperDetails);
    closeFormForEditing();
}

function alertBeforeDeleteWorkType() {
    if (confirm("Do you really wish to delete work type?! Click ok to delete!") === true) {
        deleteWorkTypeBySocialSecurityNumber();
    }
}

function deleteWorkTypeBySocialSecurityNumber() {
    var workTypeId = $('#workType-id').val();
    
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/workTypes/deleteById/" + workTypeId,
        dataType: "json",
        success: function (deleted) {
            if (deleted) {
                createWorkTypePage();
            } else {
                alert("Worktype connected to a service order cannot be deleted!");
            }
        }
    });
    getWorkTypeTable();
}

function createEditableViewForWorkType(workTypeId) {
    $("#search-workType-id").val(workTypeId);
    getWorkTypeById();
    closeFormForEditing();
}

function getWorkTypeById() {
    var workTypeId = $('#search-workType-id').val();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/workTypes/find/" + workTypeId,
        dataType: "json",
        success: function (workType)
        {
            if (workType !== null) {
                $('#workType-id').val(workType.id);
                $('#description').val(workType.description);
                $('#price').val(workType.price);
            }
            createWorkTypeRegistrationCopy();
        }
        ,
        error: function () {
            $('#workType-id').val("");
            $('#description').val("");
            $('#price').val("");
        }
    });
}