function createMechanicPage() {
    createEntityPage();
    var infoWrapperDetails = {"title": "Add/Edit/Delete Mechanic", "info": "Always use search to check if mechanic already exists!"};
    populateInfoWrapper(infoWrapperDetails);

    var searchWrapperDetails = [
        {"title": "Search Mechanic SSN:", "id": "search-mechanic-ssn",
            "script": "javascript:checkIfMechanicExists()", "type": "number"}
    ];

    populateSearchWrapper(searchWrapperDetails);

    getMechanicTable();
}

function getMechanicTable() {
    var tableWrapper = $('#table-wrapper');
    tableWrapper.empty();
    var table = $('<table/>', {"class": "show-all-table"});
    var tableHeader = $('<thead/>', {"class": "show-all-table-header"});
    var tableHeaderRow = $('<tr/>');

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/mechanics",
        dataType: "json",
        success: function (entityData) {

            var tableTitle1 = $('<th/>', {"text": "SSN", "class": "show-all-table-title", "id": "show-mechanics-ssn-title"});
            var tableTitle2 = $('<th/>', {"text": "First Name", "class": "show-all-table-title", "id": "show-mechanics-first-name-title"});
            var tableTitle3 = $('<th/>', {"text": "Last Name", "class": "show-all-table-title", "id": "show-mechanics-last-name-title"});
            var tableTitle4 = $('<th/>', {"text": "Street Address", "class": "show-all-table-title", "id": "show-mechanics-street-address-title"});
            var tableTitle5 = $('<th/>', {"text": "Zip Code", "class": "show-all-table-title", "id": "show-mechanics-zip-code-title"});
            var tableTitle6 = $('<th/>', {"text": "City", "class": "show-all-table-title", "id": "show-mechanics-city-title"});
            var tableTitle7 = $('<th/>', {"text": "Email", "class": "show-all-table-title", "id": "show-mechanics-email-title"});
            var tableTitle8 = $('<th/>', {"text": "Phone Number", "class": "show-all-table-title", "id": "show-mechanics-phone-number-title"});
            var tableTitle9 = $('<th/>', {"text": "Gender", "class": "show-all-table-title", "id": "show-mechanics-gender-title"});
            var tableTitle10 = $('<th/>', {"text": "Edit", "class": "show-all-table-title", "id": "show-mechanics-edit-title"});

            tableHeaderRow.append(
                    tableTitle1
                    , tableTitle2
                    , tableTitle3
                    , tableTitle4
                    , tableTitle5
                    , tableTitle6
                    , tableTitle7
                    , tableTitle8
                    , tableTitle9
                    , tableTitle10
                    );
            tableHeader.append(tableHeaderRow);
            table.append(tableHeader);

            for (var i = 0; i < entityData.length; i++) {
                var entity = entityData[i];
                var mechanicSSN = entity.socialSecurityNumber;
                var tableRow = $('<tr/>', {"id": "row-" + mechanicSSN});
                var tableDataCell1 = $('<td/>', {"text": mechanicSSN});
                var tableDataCell2 = $('<td/>', {"text": entity.firstName});
                var tableDataCell3 = $('<td/>', {"text": entity.lastName});
                var tableDataCell4 = $('<td/>', {"text": entity.streetAddress});
                var tableDataCell5 = $('<td/>', {"text": entity.zipCode});
                var tableDataCell6 = $('<td/>', {"text": entity.city});
                var tableDataCell7 = $('<td/>', {"text": entity.email});
                var tableDataCell8 = $('<td/>', {"text": entity.phoneNumber});
                var tableDataCell9 = $('<td/>', {"text": entity.gender});
                var tableDataCell10 = $('<td/>').append($('<input/>',
                        {"id": "table-edit-mechanic", "value": "Edit", "type": "button",
                            "onclick": "javascript:createEditableViewForMechanic(" + mechanicSSN + ")"}));
                tableRow.append(
                        tableDataCell1
                        , tableDataCell2
                        , tableDataCell3
                        , tableDataCell4
                        , tableDataCell5
                        , tableDataCell6
                        , tableDataCell7
                        , tableDataCell8
                        , tableDataCell9
                        , tableDataCell10
                        );
                table.append(tableRow);
            }
        }
    });
    tableWrapper.append(table);
}

function clearMechanicForm() {
    createMechanicForm();
    $('#search-mechanic-ssn').val("");
}

function createMechanicForm() {

    var inputWrapperDetails = [
        {"text": "Social security number:", "id": "mechanic-ssn", "class": "form-input-field uneditable number"}
        ,
        {"text": "First name:", "id": "first-name", "class": "form-input-field editable"}
        ,
        {"text": "Last name:", "id": "last-name", "class": "form-input-field editable"}
        ,
        {"text": "Street address:", "id": "street-address", "class": "form-input-field editable"}
        ,
        {"text": "Zip code:", "id": "zip-code", "class": "form-input-field editable"}
        ,
        {"text": "City:", "id": "city", "class": "form-input-field editable"}
        ,
        {"text": "Email:", "id": "email", "class": "form-input-field editable"}
        ,
        {"text": "Phone number:", "id": "phone-number", "class": "form-input-field editable"}
        ,
        {"text": "Gender:", "id": "gender", "class": "form-input-field editable"}
    ];
    populateInputWrapper(inputWrapperDetails);
    $('#mechanic-ssn').prop('disabled', true);

    var buttonWrapperDetails = [
        {"type": "button", "value": "clear", "class": "form-button", "id": "form-clear-button", "onclick": "javascript:clearMechanicForm()"}
        ,
        {"type": "button", "value": "save", "class": "form-button", "id": "form-save-button", "onclick": "javascript:registerMechanic()"}
    ];

    populateButtonWrapper(buttonWrapperDetails);
}


function checkIfMechanicExists() {
    $('#form-input-field').prop('disabled', false);
    $('#mechanic-ssn').prop('disabled', true);

    $('.input-form-field').val("");
    var socialSecurityNumber = $('#search-mechanic-ssn').val();
    var SSNtodayMinus18years = get18YearOldSSN();

    if (socialSecurityNumber > 190001010000 && socialSecurityNumber < SSNtodayMinus18years) {

        $.ajax({
            type: "GET",
            url: "http://localhost:8080/mechanics/check/" + socialSecurityNumber,
            dataType: "json",
            success: function (booleanData) {
                if (booleanData) {
                    createMechanicForm();
                    getMechanicBySocialSecurityNumber();
                } else {
                    createMechanicForm();
                    $('#mechanic-ssn').val(socialSecurityNumber);
                }
            }
        });
    }
    else {
        alert("Poor social security number");
    }
}

function getMechanicBySocialSecurityNumber() {
    var socialSecurityNumber = $('#search-mechanic-ssn').val();
    createMechanicForm();
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/mechanics/find/" + socialSecurityNumber,
        dataType: "json",
        success: function (data) {
            if (data !== null) {
                $('#mechanic-ssn').val(data.socialSecurityNumber);
                $('#mechanic-ssn').prop('disabled', true);
                $('#first-name').val(data.firstName);
                $('#last-name').val(data.lastName);
                $('#street-address').val(data.streetAddress);
                $('#zip-code').val(data.zipCode);
                $('#city').val(data.city);
                $('#email').val(data.email);
                $('#phone-number').val(data.phoneNumber);
                $('#gender').val(data.gender);

                var buttonWrapperDetails = [
                    {"value": "new", "type": "button", "class": "form-button", "id": "form-new-button", "onclick": "javascript:createMechanicForm()"}
                    ,
                    {"value": "update", "type": "button", "class": "form-button", "id": "form-update-button", "onclick": "javascript:updateMechanic()"}
                    ,
                    {"value": "edit", "type": "button", "class": "form-button", "id": "form-edit-button", "onclick": "javascript:editMechanic()"}
                ];

                populateButtonWrapper(buttonWrapperDetails);
                closeFormForEditing();
            }
        },
        error: function () {
            $('#mechanic-ssn').val("");
            $('#first-name').val("");
            $('#last-name').val("");
            $('#street-address').val("");
            $('#zip-code').val("");
            $('#city').val("");
            $('#email').val("");
            $('#phone-number').val("");
            $('#gender').val("");
        }
    });
    $('#search-mechanic-ssn').val("");
}

function registerMechanic() {
    var socialSecurityNumber = $('#mechanic-ssn').val();
    var firstName = $('#first-name').val();
    var lastName = $('#last-name').val();
    var streetAddress = $('#street-address').val();
    var zipCode = $('#zip-code').val();
    var city = $('#city').val();
    var email = $('#email').val();
    var phoneNumber = $('#phone-number').val();
    var gender = $('#gender').val();

    if (socialSecurityNumber !== "" && firstName !== "" && lastName !== "" && phoneNumber !== "") {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/mechanics/register/new",
            data: ({"socialSecurityNumber": socialSecurityNumber,
                "firstName": firstName,
                "lastName": lastName,
                "streetAddress": streetAddress,
                "zipCode": zipCode,
                "city": city,
                "email": email,
                "phoneNumber": phoneNumber,
                "gender": gender}),
            dataType: "json",
            "async": false,
            success:
                    createMechanicRegistrationCopy()
        });
    } else {
        alert("No valid input entered!");
    }
    getMechanicTable();
}

function editMechanic() {
    var buttonWrapperDetails = [
        {"value": "new", "type": "button", "class": "form-button", "id": "form-new-button", "onclick": "javascript:createMechanicForm()"}
        ,
        {"value": "update", "type": "button", "class": "form-button", "id": "form-update-button", "onclick": "javascript:updateMechanic()"}
        ,
        {"value": "edit", "type": "button", "class": "form-button", "id": "form-edit-button", "onclick": "javascript:editMechanic()"}
        ,
        {"value": "delete", "type": "button", "class": "form-button", "id": "form-delete-button", "onclick": "javascript:alertBeforeDeleteMechanic()"}
    ];
    populateButtonWrapper(buttonWrapperDetails);
    openFormForEditing();
}

function updateMechanic() {
    var socialSecurityNumber = $('#mechanic-ssn').val();
    var firstName = $('#first-name').val();
    var lastName = $('#last-name').val();
    var streetAddress = $('#street-address').val();
    var zipCode = $('#zip-code').val();
    var city = $('#city').val();
    var email = $('#email').val();
    var phoneNumber = $('#phone-number').val();
    var gender = $('#gender').val();

    var mechanicObject = {"socialSecurityNumber": socialSecurityNumber,
        "firstName": firstName,
        "lastName": lastName,
        "streetAddress": streetAddress,
        "zipCode": zipCode,
        "city": city,
        "email": email,
        "phoneNumber": phoneNumber,
        "gender": gender};
    if (socialSecurityNumber !== "" && firstName !== "" && lastName !== "" && phoneNumber !== "") {
        var stringifiedObject = JSON.stringify(mechanicObject);
        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/mechanics/update/",
            data: (stringifiedObject),
            contentType: "application/json",
            async: false,
            success:
                    createMechanicRegistrationCopy()
        });
    }
    getMechanicTable();
}

function createMechanicRegistrationCopy() {

    var buttonWrapperDetails = [
        {"value": "new", "type": "button", "class": "form-button", "id": "form-new-button", "onclick": "javascript:createMechanicForm()"}
        ,
        {"value": "update", "type": "button", "class": "form-button", "id": "form-update-button", "onclick": "javascript:updateMechanic()"}
        ,
        {"value": "edit", "type": "button", "class": "form-button", "id": "form-edit-button", "onclick": "javascript:editMechanic()"}
    ];

    populateButtonWrapper(buttonWrapperDetails);
    closeFormForEditing();
}

function alertBeforeDeleteMechanic() {
    if (confirm("Do you really wish to delete mechanic?! Click ok to delete!") === true) {
        deleteMechanicBySocialSecurityNumber();
        createMechanicPage();
    }
}

function deleteMechanicBySocialSecurityNumber() {
    var socialSecurityNumber = $('#mechanic-ssn').val();

    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/mechanics/delete/" + socialSecurityNumber,
        dataType: "json",
        async: false,
        success: function (deleted) {
            if (deleted) {
                createMechanicForm();
            } else {
                alert("Mechanic connected to a serviceorder cannot be deleted!");
            }
        }
    });
    getMechanicTable();
}

function createEditableViewForMechanic(mechanicSSN) {
    createMechanicForm();
    $("#search-mechanic-ssn").val(mechanicSSN);
    getMechanicBySocialSecurityNumber();
    closeFormForEditing();
}