function createCarPage() {
    createEntityPage();
    var infoWrapperDetails = {"title": "Add/Edit/Delete Car", "info": "Always use search to check if car/customer already exists!"};
    populateInfoWrapper(infoWrapperDetails);

    var searchWrapperDetails = [
        {"title": "Search Customer SSN:", "id": "search-customer-ssn",
            "script": "javascript:checkIfCustomerExistsViaCars()", "type": "number"}
        ,
        {"title": "Search Car license plate:", "id": "search-license-plate",
            "script": "javascript:checkIfCarExists()", "type": "text"}
    ];
    populateSearchWrapper(searchWrapperDetails);

    getCarTable();
}

function getCarTable() {
    var tableWrapper = $('#table-wrapper');
    tableWrapper.empty();
    var table = $('<table/>', {"class": "show-all-table"});
    var tableHeader = $('<thead/>', {"class": "show-all-table-header"});
    var tableHeaderRow = $('<tr/>');

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cars",
        dataType: "json",
        success: function (entityData) {

            var tableTitle1 = $('<th/>', {"text": "License Plate", "class": "show-all-table-title"});
            var tableTitle2 = $('<th/>', {"text": "Brand", "class": "show-all-table-title"});
            var tableTitle3 = $('<th/>', {"text": "Model", "class": "show-all-table-title"});
            var tableTitle4 = $('<th/>', {"text": "Production Year", "class": "show-all-table-title"});
            var tableTitle5 = $('<th/>', {"text": "Fuel Type", "class": "show-all-table-title"});
            var tableTitle6 = $('<th/>', {"text": "Mileage", "class": "show-all-table-title"});
            var tableTitle7 = $('<th/>', {"text": "Edit", "class": "show-all-table-title"});

            tableHeaderRow.append(
                    tableTitle1
                    , tableTitle2
                    , tableTitle3
                    , tableTitle4
                    , tableTitle5
                    , tableTitle6
                    , tableTitle7
                    );
            tableHeader.append(tableHeaderRow);
            table.append(tableHeader);

            for (var i = 0; i < entityData.length; i++) {
                var car = entityData[i];
                var tableRow = $('<tr/>');
                var licensePlate = car.licensePlate;
                var tableDataCell1 = $('<td/>', {"text": licensePlate});
                var tableDataCell2 = $('<td/>', {"text": car.brand});
                var tableDataCell3 = $('<td/>', {"text": car.model});
                var tableDataCell4 = $('<td/>', {"text": car.productionYear});
                var tableDataCell5 = $('<td/>', {"text": car.fuelType});
                var tableDataCell6 = $('<td/>', {"text": car.mileage});
                var tableDataCell7 = $('<td/>').append($('<input/>',
                        {"id": "table-edit-car-" + (i + 1), "value": "Edit", "type": "button",
                            "onclick": "javascript:createEditableViewForCar(\"" + licensePlate + "\")"}));

                for (var j = 0; j <= i; j++) {
                    tableRow.append(
                            tableDataCell1
                            , tableDataCell2
                            , tableDataCell3
                            , tableDataCell4
                            , tableDataCell5
                            , tableDataCell6
                            , tableDataCell7
                            );
                    table.append(tableRow);
                }
            }
        }
    });
    tableWrapper.append(table);
}

function createCarForm() {
    var inputWrapperDetails = [
        {"text": "Customer SSN:", "id": "customer-ssn", "class": "form-input-field uneditable number"}
        ,
        {"text": "License plate:", "id": "license-plate", "class": "form-input-field uneditable"}
        ,
        {"text": "Brand:", "id": "brand", "class": "form-input-field editable"}
        ,
        {"text": "model:", "id": "model", "class": "form-input-field editable"}
        ,
        {"text": "Production year:", "id": "production-year", "class": "form-input-field editable"}
        ,
        {"text": "Fuel type:", "id": "fuel-type", "class": "form-input-field editable"}
        ,
        {"text": "Mileage:", "id": "mileage", "class": "form-input-field editable"}
    ];
    populateInputWrapper(inputWrapperDetails);
    $('#customer-ssn').prop('disabled', true);
    $('#license-plate').prop('disabled', true);


    var buttonWrapperDetails = [
        {"type": "button", "value": "clear", "class": "form-button", "id": "form-clear-button", "onclick": "javascript:clearForm()"}
        ,
        {"type": "button", "value": "save", "class": "form-button", "id": "form-save-button", "onclick": "javascript:registerCar()"}
    ];

    populateButtonWrapper(buttonWrapperDetails);
}

function checkIfCarExists() {
    $('.editable').prop('disabled', false);
    $('.input-form-field').val("");

    var socialSecurityNumber = $('#search-customer-ssn').val();
    var licensePlate = $('#search-license-plate').val();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cars/check/car/" + licensePlate,
        dataType: "json",
        success: function (booleanData) {
            if (booleanData) {
                createCarForm();
                getCarByLicensePlate();
            } else {
                createCarForm();
                $('#customer-ssn').val(socialSecurityNumber);
                $('#license-plate').val(licensePlate);
            }
        }
    });
}

function checkIfCustomerExistsViaCars() {
    $('.editable').prop('disabled', false);
    $('.input-form-field').val("");

    var socialSecurityNumber = $('#search-customer-ssn').val();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/customers/check/" + socialSecurityNumber,
        dataType: "json",
        success: function (booleanData) {
            if (booleanData) {
                createCarForm();
                $('#customer-ssn').val(socialSecurityNumber);
                getAllCarsBySocialSecurityNumber();
            } else {
                createCarForm();
                $('#customer-ssn').val(socialSecurityNumber);
            }
        }
    });
}

function getCarByLicensePlate() {
    var licensePlate = $('#search-license-plate').val();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cars/findByLicensePlate/" + licensePlate,
        dataType: "json",
        success: function (data) {
            if (data !== null) {
                $('#license-plate').val(data.licensePlate);
                $('#brand').val(data.brand);
                $('#model').val(data.model);
                $('#production-year').val(data.productionYear);
                $('#fuel-type').val(data.fuelType);
                $('#mileage').val(data.mileage);

                var buttonWrapperDetails = [
                    {"value": "new", "type": "button", "class": "form-button", "id": "form-new-button", "onclick": "javascript:createCarForm()"}
                    ,
                    {"value": "update", "type": "button", "class": "form-button", "id": "form-update-button", "onclick": "javascript:updateCar()"}
                    ,
                    {"value": "edit", "type": "button", "class": "form-button", "id": "form-edit-button", "onclick": "javascript:editCar()"}
                ];
                populateButtonWrapper(buttonWrapperDetails);
                closeFormForEditing();
            }
        },
        error: function () {
            $('#license-plate').val("");
            $('#brand').val("");
            $('#model').val("");
            $('#production-year').val("");
            $('#fuel-type').val("");
            $('#mileage').val("");
        }
    });
    getOwnerSSNByLicensePlate();
}

function getOwnerSSNByLicensePlate() {
    var licensePlate
            = $('#search-license-plate').val()
            ;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/customers/findCustomerSSNByLicensePlate/" + licensePlate,
        dataType: "json",
        success: function (customerSSN) {
            if (customerSSN !== null) {
                $('#customer-ssn').val(customerSSN);
            } else {
                alert("Car is not attached to any customer!");
            }
        }
    });
}

function registerCar() {
    var socialSecurityNumberInput = $('#customer-ssn').val();
    var licensePlateInput = $('#license-plate').val();
    var brandInput = $('#brand').val();
    var modelInput = $('#model').val();
    var productionYearInput = $('#production-year').val();
    var fuelTypeInput = $('#fuel-type').val();
    var mileageInput = $('#mileage').val();

    if (socialSecurityNumberInput !== "" && licensePlateInput !== "") {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/cars/register/new",
            data: ({
                "socialSecurityNumber": socialSecurityNumberInput
                , "licensePlate": licensePlateInput
                , "brand": brandInput
                , "model": modelInput
                , "productionYear": productionYearInput
                , "fuelType": fuelTypeInput
                , "mileage": mileageInput
            }),
            dataType: "json",
            async: false,
            success:
                    createCarRegistrationCopy()
        });
    } else {
        alert("Input is missing!!");
    }
    getAllCarsBySocialSecurityNumber();
}

function editCar() {
    var buttonWrapperDetails = [
        {"value": "new", "type": "button", "class": "form-button", "id": "form-new-button", "onclick": "javascript:createCarForm()"}
        ,
        {"value": "update", "type": "button", "class": "form-button", "id": "form-update-button", "onclick": "javascript:updateCar()"}
        ,
        {"value": "edit", "type": "button", "class": "form-button", "id": "form-edit-button", "onclick": "javascript:editCar()"}
        ,
        {"value": "delete", "type": "button", "class": "form-button", "id": "form-delete-button", "onclick": "javascript:alertBeforeDeleteCar()"}
    ];

    populateButtonWrapper(buttonWrapperDetails);
    openFormForEditing();
}

function updateCar() {
    var socialSecurityNumber = $('#customer-ssn').val();
    var licensePlateInput = $('#license-plate').val();
    var brandInput = $('#brand').val();
    var modelInput = $('#model').val();
    var productionYearInput = $('#production-year').val();
    var fuelTypeInput = $('#fuel-type').val();
    var mileageInput = $('#mileage').val();

    var carObject = {
        "socialSecurityNumber": socialSecurityNumber
        , "licensePlate": licensePlateInput
        , "brand": brandInput
        , "model": modelInput
        , "productionYear": productionYearInput
        , "fuelType": fuelTypeInput
        , "mileage": mileageInput
    };

    var stringifiedObject = JSON.stringify(carObject);

    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/cars/update/",
        data: (stringifiedObject),
        dataType: "json",
        contentType: "application/json",
        async: false,
        success: createCarRegistrationCopy()
    });
    getCarTable();
}

function createCarRegistrationCopy() {

    var buttonWrapperDetails = [
        {"value": "new", "type": "button", "class": "form-button", "id": "form-new-button", "onclick": "javascript:createCarForm()"}
        ,
        {"value": "update", "type": "button", "class": "form-button", "id": "form-update-button", "onclick": "javascript:updateCar()"}
        ,
        {"value": "edit", "type": "button", "class": "form-button", "id": "form-edit-button", "onclick": "javascript:editCar()"}
    ];

    populateButtonWrapper(buttonWrapperDetails);
    closeFormForEditing();
    getCarTable();
}

function alertBeforeDeleteCar() {
    if (confirm("Do you really wish to delete car?! Click ok to delete!") === true) {
        deleteCarByLicensePlate();
        createCarPage();
    }
}

function deleteCarByLicensePlate() {
    var licensePlate = $('#license-plate').val();

    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/cars/delete/" + licensePlate,
        dataType: "json",
        success: function (deleted) {
            if (deleted) {
                createCarPage();
            } else {
                alert("Car connected to a serviceorder cannot be deleted!");
            }
        }
    });
    getCarTable();
}

function createEditableViewForCar(licensePlate) {
    createCarForm();
    $("#search-license-plate").val(licensePlate);
    getCarByLicensePlate();
    closeFormForEditing();
}

function getAllCarsBySocialSecurityNumber() {

    var socialSecurityNumber = $('#search-customer-ssn').val();
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cars/findBySocialSecurityNumber/" + socialSecurityNumber,
        dataType: "json",
        success:
                function (customersCars)
                {
                    if (customersCars !== null) {
                        createCarTableWithCustomerCars(customersCars);
                    } else {
                        createCarForm();
                    }
                }
        ,
        error: function () {
            $('#license-plate').val("");
            $('#brand').val("");
            $('#model').val("");
            $('#production-year').val("");
            $('#fuel-type').val("");
            $('#mileage').val("");
        }
    });
}

function createCarTableWithCustomerCars(customersCars) {
    var tableWrapper = $('#table-wrapper');
    tableWrapper.empty();
    var table = $('<table/>', {"class": "show-all-table"});
    var tableHeader = $('<thead/>', {"class": "show-all-table-header"});
    var tableHeaderRow = $('<tr/>');

    var tableTitle1 = $('<th/>', {"text": "License Plate", "class": "show-all-table-title"});
    var tableTitle2 = $('<th/>', {"text": "Brand", "class": "show-all-table-title"});
    var tableTitle3 = $('<th/>', {"text": "Model", "class": "show-all-table-title"});
    var tableTitle4 = $('<th/>', {"text": "Production Year", "class": "show-all-table-title"});
    var tableTitle5 = $('<th/>', {"text": "Fuel Type", "class": "show-all-table-title"});
    var tableTitle6 = $('<th/>', {"text": "Mileage", "class": "show-all-table-title"});
    var tableTitle7 = $('<th/>', {"text": "Details", "class": "show-all-table-title"});

    tableHeaderRow.append(
            tableTitle1
            , tableTitle2
            , tableTitle3
            , tableTitle4
            , tableTitle5
            , tableTitle6
            , tableTitle7
            );
    tableHeader.append(tableHeaderRow);
    table.append(tableHeader);

    for (var i = 0; i < customersCars.length; i++) {
        var car = customersCars[i];
        var tableRow = $('<tr/>');
        var licensePlate = car.licensePlate;
        var tableDataCell1 = $('<td/>', {"text": licensePlate});
        var tableDataCell2 = $('<td/>', {"text": car.brand});
        var tableDataCell3 = $('<td/>', {"text": car.model});
        var tableDataCell4 = $('<td/>', {"text": car.productionYear});
        var tableDataCell5 = $('<td/>', {"text": car.fuelType});
        var tableDataCell6 = $('<td/>', {"text": car.mileage});
        var tableDataCell7 = $('<td/>').append($('<input/>',
                {"id": "table-edit-car", "value": "Details", "type": "button",
                    "onclick": "javascript:createEditableViewForCar(\"" + licensePlate + "\")"}));
        for (var j = 0; j <= i; j++) {
            tableRow.append(
                    tableDataCell1
                    , tableDataCell2
                    , tableDataCell3
                    , tableDataCell4
                    , tableDataCell5
                    , tableDataCell6
                    , tableDataCell7
                    );
            table.append(tableRow);
        }
    }
    tableWrapper.append(table);
}