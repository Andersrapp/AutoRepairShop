function createCustomerPage() {
    createEntityPage();
    var infoWrapperDetails = {"title": "Add/Edit/Delete Customer", "info": "Always use search to check if customer already exists!"};
    populateInfoWrapper(infoWrapperDetails);

    var searchWrapperDetails = [
        {"title": "Search Customer SSN:", "id": "search-customer-ssn",
            "script": "javascript:checkIfCustomerExists()", "type": "number"}
    ];

    populateSearchWrapper(searchWrapperDetails);
    getCustomerTable();
}

function getCustomerTable() {
    var tableWrapper = $('#table-wrapper');
    tableWrapper.empty();
    var table = $('<table/>', {"class": "show-all-table"});
    var tableHeader = $('<thead/>', {"class": "show-all-table-header"});
    var tableHeaderRow = $('<tr/>');

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/customers",
        dataType: "json",
        success: function (entityData) {

            var tableTitle1 = $('<th/>', {"text": "SSN", "class": "show-all-table-title", "id": "show-customers-ssn-title"});
            var tableTitle2 = $('<th/>', {"text": "First Name", "class": "show-all-table-title", "id": "show-customers-first-name-title"});
            var tableTitle3 = $('<th/>', {"text": "Last Name", "class": "show-all-table-title", "id": "show-customers-last-name-title"});
            var tableTitle4 = $('<th/>', {"text": "Street Address", "class": "show-all-table-title", "id": "show-customers-street-address-title"});
            var tableTitle5 = $('<th/>', {"text": "Zip Code", "class": "show-all-table-title", "id": "show-customers-zip-code-title"});
            var tableTitle6 = $('<th/>', {"text": "City", "class": "show-all-table-title", "id": "show-customers-city-title"});
            var tableTitle7 = $('<th/>', {"text": "Email", "class": "show-all-table-title", "id": "show-customers-email-title"});
            var tableTitle8 = $('<th/>', {"text": "Phone Number", "class": "show-all-table-title", "id": "show-customers-phone-number-title"});
            var tableTitle9 = $('<th/>', {"text": "Gender", "class": "show-all-table-title", "id": "show-customers-gender-title"});
            var tableTitle10 = $('<th/>', {"text": "Edit", "class": "show-all-table-title", "id": "show-customers-edit-title"});

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
                var customerSSN = entity.socialSecurityNumber;
                var tableRow = $('<tr/>', {"id": "row-" + customerSSN});
                var tableDataCell1 = $('<td/>', {"text": customerSSN});
                var tableDataCell2 = $('<td/>', {"text": entity.firstName});
                var tableDataCell3 = $('<td/>', {"text": entity.lastName});
                var tableDataCell4 = $('<td/>', {"text": entity.streetAddress});
                var tableDataCell5 = $('<td/>', {"text": entity.zipCode});
                var tableDataCell6 = $('<td/>', {"text": entity.city});
                var tableDataCell7 = $('<td/>', {"text": entity.email});
                var tableDataCell8 = $('<td/>', {"text": entity.phoneNumber});
                var tableDataCell9 = $('<td/>', {"text": entity.gender});
                var tableDataCell10 = $('<td/>').append($('<input/>',
                        {"id": "table-edit-customer", "value": "Edit", "type": "button",
                            "onclick": "javascript:createEditableViewForCustomer(" + customerSSN + ")"}));
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

function clearCustomerForm() {
    createCustomerForm();
    $('#search-customer-ssn').val("");
}

function createCustomerForm() {

    var inputWrapperDetails = [
        {"text": "Social security number:", "id": "customer-ssn", "class": "form-input-field uneditable number"}
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
    $('#customer-ssn').prop('disabled', true);

    var buttonWrapperDetails = [
        {"type": "button", "value": "clear", "class": "form-button", "id": "form-clear-button", "onclick": "javascript:clearCustomerForm()"}
        ,
        {"type": "button", "value": "save", "class": "form-button", "id": "form-save-button", "onclick": "javascript:registerCustomer()"}
    ];

    populateButtonWrapper(buttonWrapperDetails);
}

function checkIfCustomerExists() {
    $('#form-input-field').prop('disabled', false);
    $('#customer-ssn').prop('disabled', true);

    $('.input-form-field').val("");
    var socialSecurityNumber = $('#search-customer-ssn').val();
    var SSNtodayMinus18years = get18YearOldSSN();

    if (socialSecurityNumber > 190001010000 && socialSecurityNumber < SSNtodayMinus18years) {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/customers/check/" + socialSecurityNumber,
            dataType: "json",
            success: function (booleanData) {
                if (booleanData) {
                    createCustomerForm();
                    getCustomerBySocialSecurityNumber();
                } else {
                    createCustomerForm();
                    $('#customer-ssn').val(socialSecurityNumber);
                }
            }
        });
    }
    else {
        alert("Invalid input, please enter proper social security number");
    }
}

function getCustomerBySocialSecurityNumber() {
    var socialSecurityNumber = $('#search-customer-ssn').val();
    createCustomerForm();
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/customers/find/" + socialSecurityNumber,
        dataType: "json",
        success: function (data) {
            if (data !== null) {
                $('#customer-ssn').val(data.socialSecurityNumber);
                $('#customer-ssn').prop('disabled', true);
                $('#first-name').val(data.firstName);
                $('#last-name').val(data.lastName);
                $('#street-address').val(data.streetAddress);
                $('#zip-code').val(data.zipCode);
                $('#city').val(data.city);
                $('#email').val(data.email);
                $('#phone-number').val(data.phoneNumber);
                $('#gender').val(data.gender);

                var buttonWrapperDetails = [
                    {"value": "new", "type": "button", "class": "form-button", "id": "form-new-button", "onclick": "javascript:createCustomerForm()"}
                    ,
                    {"value": "update", "type": "button", "class": "form-button", "id": "form-update-button", "onclick": "javascript:updateCustomer()"}
                    ,
                    {"value": "edit", "type": "button", "class": "form-button", "id": "form-edit-button", "onclick": "javascript:editCustomer()"}
                ];

                populateButtonWrapper(buttonWrapperDetails);
                closeFormForEditing();
            }
        },
        error: function () {
            $('#customer-ssn').val("");
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
    $('#search-customer-ssn').val("");
}

function registerCustomer() {
    var socialSecurityNumber = $('#customer-ssn').val();
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
            url: "http://localhost:8080/customers/register/new",
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
            success: function (registered) {
                if (registered) {
                    createCustomerRegistrationCopy();
                } else {
                    alert("Invalid input!");
                }
            }
        });
    } else {
        alert("Invalid input!");
    }
    getCustomerTable();
}

function editCustomer() {
    var buttonWrapperDetails = [
        {"value": "new", "type": "button", "class": "form-button", "id": "form-new-button", "onclick": "javascript:createCustomerForm()"}
        ,
        {"value": "update", "type": "button", "class": "form-button", "id": "form-update-button", "onclick": "javascript:updateCustomer()"}
        ,
        {"value": "edit", "type": "button", "class": "form-button", "id": "form-edit-button", "onclick": "javascript:editCustomer()"}
        ,
        {"value": "delete", "type": "button", "class": "form-button", "id": "form-delete-button", "onclick": "javascript:alertBeforeDeleteCustomer()"}
    ];
    populateButtonWrapper(buttonWrapperDetails);
    openFormForEditing();
}

function updateCustomer() {
    var socialSecurityNumber = $('#customer-ssn').val();
    var firstName = $('#first-name').val();
    var lastName = $('#last-name').val();
    var streetAddress = $('#street-address').val();
    var zipCode = $('#zip-code').val();
    var city = $('#city').val();
    var email = $('#email').val();
    var phoneNumber = $('#phone-number').val();
    var gender = $('#gender').val();

    var customerObject = {"socialSecurityNumber": socialSecurityNumber,
        "firstName": firstName,
        "lastName": lastName,
        "streetAddress": streetAddress,
        "zipCode": zipCode,
        "city": city,
        "email": email,
        "phoneNumber": phoneNumber,
        "gender": gender};
    if (socialSecurityNumber !== "" && firstName !== "" && lastName !== "" && phoneNumber !== "") {
        var stringifiedObject = JSON.stringify(customerObject);
        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/customers/update/",
            data: (stringifiedObject),
            contentType: "application/json",
            async: false,
            success: function (updated) {
                if (updated) {
                    createCustomerRegistrationCopy();
                } else {
                    alert("Invalid input!");
                }
            }
        });
    }
    getCustomerTable();
}

function createCustomerRegistrationCopy() {

    var buttonWrapperDetails = [
        {"value": "new", "type": "button", "class": "form-button", "id": "form-new-button", "onclick": "javascript:createCustomerForm()"}
        ,
        {"value": "update", "type": "button", "class": "form-button", "id": "form-update-button", "onclick": "javascript:updateCustomer()"}
        ,
        {"value": "edit", "type": "button", "class": "form-button", "id": "form-edit-button", "onclick": "javascript:editCustomer()"}
    ];

    populateButtonWrapper(buttonWrapperDetails);
    closeFormForEditing();
}

function alertBeforeDeleteCustomer() {
    if (confirm("Do you really wish to delete customer?! Click ok to delete!") === true) {
        deleteCustomerBySocialSecurityNumber();
        createCustomerPage();
    }
}

function deleteCustomerBySocialSecurityNumber() {
    var socialSecurityNumber = $('#customer-ssn').val();

    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/customers/delete/" + socialSecurityNumber,
        dataType: "json",
        async: false,
        success: function (deleted) {
            if (deleted) {
                success: createCustomerForm();
            } else {
                alert("Customer connected to a serviceorder cannot be deleted!");
            }
        }
    });
    getCustomerTable();
}

function createEditableViewForCustomer(customerSSN) {
    createCustomerForm();
    $("#search-customer-ssn").val(customerSSN);
    getCustomerBySocialSecurityNumber();
    closeFormForEditing();
}