function createServiceOrderPage() {
    createEntityPage();
    var infoWrapperDetails = {"title": "Add/Edit/Delete ServiceOrder", "info": "Search for Car and Mechanic to register service order! Id will be generated automatically."};
    populateInfoWrapper(infoWrapperDetails);

    var searchWrapperDetails = [
        {"title": "Search Service order id:", "id": "search-serviceOrder-id",
            "script": "javascript:checkIfServiceOrderExists()", "type": "number"}
        ,
        {"title": "Search Car license plate:", "id": "search-license-plate",
            "script": "javascript:checkIfCarExistsViaServiceOrders()", "type": "text"}
        ,
        {"title": "Search Mechanic SSN:", "id": "search-mechanic-ssn",
            "script": "javascript:checkIfMechanicExistsViaServiceOrders()", "type": "number"}
    ];

    populateSearchWrapper(searchWrapperDetails);

    getServiceOrderTable();
}

function getServiceOrderTable() {
    var tableWrapper = $('#table-wrapper');
    tableWrapper.empty();
    var table = $('<table/>', {"class": "show-all-table"});
    var tableHeader = $('<thead/>', {"class": "show-all-table-header"});
    var tableHeaderRow = $('<tr/>');

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/serviceOrders",
        dataType: "json",
        success: function (entityData) {

            var tableTitle1 = $('<th/>', {"text": "Service Order Id", "class": "show-all-table-title"});
            var tableTitle2 = $('<th/>', {"text": "Customer SSN", "class": "show-all-table-title"});
            var tableTitle3 = $('<th/>', {"text": "License Plate", "class": "show-all-table-title"});
            var tableTitle4 = $('<th/>', {"text": "Mechanic SSN", "class": "show-all-table-title"});
            var tableTitle5 = $('<th/>', {"text": "Registration", "class": "show-all-table-title"});
            var tableTitle6 = $('<th/>', {"text": "Service", "class": "show-all-table-title"});
            var tableTitle7 = $('<th/>', {"text": "Pickup", "class": "show-all-table-title"});
            var tableTitle8 = $('<th/>', {"text": "Edit", "class": "show-all-table-title"});

            tableHeaderRow.append(
                    tableTitle1
                    , tableTitle2
                    , tableTitle3
                    , tableTitle4
                    , tableTitle5
                    , tableTitle6
                    , tableTitle7
                    , tableTitle8
                    );
            tableHeader.append(tableHeaderRow);
            table.append(tableHeader);

            for (var i = 0; i < entityData.length; i++) {
                var serviceOrder = entityData[i];
                var tableRow = $('<tr/>');
                var serviceOrderId = serviceOrder.id;
                var tableDataCell1 = $('<td/>', {"text": serviceOrderId, "id": "id-" + (i + 1)});
                var tableDataCell2 = $('<td/>', {"text": serviceOrder.customer.socialSecurityNumber, "id": "customerSSN-" + (i + 1)});
                var tableDataCell3 = $('<td/>', {"text": serviceOrder.car.licensePlate, "id": "licensePlate-" + (i + 1)});
                var tableDataCell4 = $('<td/>', {"text": serviceOrder.mechanic.socialSecurityNumber, "id": "mechanicSSN-" + (i + 1)});
                var tableDataCell5 = $('<td/>', {"text": serviceOrder.registrationDate, "id": "dateOfRegistration-" + (i + 1)});
                var tableDataCell6 = $('<td/>', {"text": serviceOrder.serviceDate, "id": "dateOfService-" + (i + 1)});
                var tableDataCell7 = $('<td/>', {"text": serviceOrder.pickupDate, "id": "dateOfPickup-" + (i + 1)});
                var tableDataCell8 = $('<td/>');
                if (serviceOrder.active) {
                    tableDataCell8.append($('<input/>',
                            {"id": "table-edit-serviceOrder-" + (i + 1), "value": "Edit", "type": "button",
                                "onclick": "javascript:createEditableViewForServiceOrder(\"" + serviceOrderId + "\")"}));
                }
                tableRow.append(
                        tableDataCell1
                        , tableDataCell2
                        , tableDataCell3
                        , tableDataCell4
                        , tableDataCell5
                        , tableDataCell6
                        , tableDataCell7
                        , tableDataCell8
                        );
                table.append(tableRow);
            }
        }
    });
    tableWrapper.append(table);
}

function createServiceOrderForm() {
    var inputWrapperDetails = [
        {"text": "Service order id:", "id": "serviceOrder-id", "class": "form-input-field uneditable"}
        ,
        {"type": "date", "text": "Registration date:", "id": "registration-date", "class": "form-input-field uneditable"}
        ,
        {"text": "Customer SSN:", "id": "customer-ssn", "class": "form-input-field uneditable"}
        ,
        {"text": "License plate:", "id": "license-plate", "class": "form-input-field uneditable"}
        ,
        {"text": "Mechanic SSN:", "id": "mechanic-ssn", "class": "form-input-field uneditable"}
        ,
        {"text": "Based on complaint:", "id": "complaint-id", "class": "form-input-field uneditable"}
        ,
        {"type": "date", "text": "Date Of Service:", "id": "service-date", "class": "form-input-field editable"}
        ,
        {"type": "date", "text": "Date Of Pickup:", "id": "pickup-date", "class": "form-input-field editable"}
    ];
    populateInputWrapper(inputWrapperDetails);
    $('.uneditable').prop('disabled', true);
    populateWorkTypeWrapper();
    populateActiveOrderWrapper();

    var buttonWrapperDetails = [
        {"type": "button", "value": "clear", "class": "form-button", "id": "form-clear-button", "onclick": "javascript:clearForm()"}
        ,
        {"type": "button", "value": "save", "class": "form-button", "id": "form-save-button", "onclick": "javascript:registerServiceOrder()"}
    ];

    populateButtonWrapper(buttonWrapperDetails);
}

function checkIfServiceOrderExists() {
    openFormForEditing();

    $('.input-form-field').val("");
    var serviceOrderId = $('#search-serviceOrder-id').val();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/serviceOrders/check/" + serviceOrderId,
        dataType: "json",
        async: false,
        success: function (booleanData) {
            if (booleanData) {
                createServiceOrderForm();
                getServiceOrderById(serviceOrderId);
            } else {
                createServiceOrderForm();
            }
        }
    });
}

function getServiceOrderById(serviceOrderId) {
    var workTypeWrapper = $("#workType-wrapper");
    workTypeWrapper.empty();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/workTypes",
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
        {"value": "new", "type": "button", "class": "form-button", "id": "form-new-button", "onclick": "javascript:createServiceOrderForm()"}
        ,
        {"value": "update", "type": "button", "class": "form-button", "id": "form-update-button", "onclick": "javascript:updateServiceOrder()"}
        ,
        {"value": "edit", "type": "button", "class": "form-button", "id": "form-edit-button", "onclick": "javascript:editServiceOrder()"}
    ];

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/serviceOrders/find/" + serviceOrderId,
        dataType: "json",
        async: false,
        success: function (serviceOrderData) {
            if (serviceOrderData !== null) {
                populateButtonWrapper(buttonWrapperDetails);
                $('#serviceOrder-id').val(serviceOrderData.id);
                $('#registration-date').val(serviceOrderData.registrationDate);
                $('#customer-ssn').val(serviceOrderData.customerSSN);
                $('#license-plate').val(serviceOrderData.licensePlate);
                $('#mechanic-ssn').val(serviceOrderData.mechanicSSN);
                $('#complaint-id').val(serviceOrderData.complaintId);
                $('#service-date').val(serviceOrderData.serviceDate);
                $('#pickup-date').val(serviceOrderData.pickupDate);
                $('#mileage').val(serviceOrderData.mileage);

                if (serviceOrderData.complaintId !== null) {
                    $('#complaint-id').val(serviceOrderData.complaintId);
                }

                var workTypeIds = serviceOrderData.workTypeIds;
                for (var i = 0; i < workTypeIds.length; i++) {
                    $('#' + (workTypeIds[i])).prop('checked', true);
                }
                var active = serviceOrderData.active;
                if (active) {
                    $('#active-checkbox').prop('checked', true);
                } else {
                    alert("Inactive service order can not be updated or deleted!");
                    $('.form-input-field').addClass('deactivated');
                    $('.input-checkbox').addClass('deactivated');
                    $('#form-edit-button').addClass('deactivated');
                    $('#form-update-button').addClass('deactivated');
                }
            }
        },
        error: function () {
            $('#serviceOrder-id').val("");
            $('#customer-ssn').val("");
            $('#license-plate').val("");
            $('#mechanic-ssn').val("");
            $('#service-date').val("");
            $('#pickup-date').val("");
            $('#mileage').val("");
        }
    });
    closeFormForEditing();
}

function registerServiceOrder() {
    var customerSSN = $('#customer-ssn').val();
    var licensePlate = $('#license-plate').val();
    var mechanicSSN = $('#mechanic-ssn').val();
    var serviceDate = $('#service-date').val();
    var pickupDate = $('#pickup-date').val();
    var complaintId = $('#complaint-id').val();

    if (complaintId === "") {
        complaintId = null;
    }

    var active;
    if ($('#active-checkbox').is(':checked')) {
        active = true;
    } else {
        active = false;
    }
    var workTypeIds = [];

    if (mechanicSSN !== "" && licensePlate !== "") {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/workTypes",
            dataType: "json",
            async: false,
            success: function (data) {
                for (var i = 0; i < data.length; ++i) {
                    if ($('#' + data[i].id).is(':checked')) {
                        workTypeIds[workTypeIds.length] = data[i].id;
                    }
                }
            }
        });
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/serviceOrders/register/new",
            data: ({
                "customerSSN": customerSSN
                , "licensePlate": licensePlate
                , "mechanicSSN": mechanicSSN
                , "complaintId": complaintId
                , "serviceDate": serviceDate
                , "pickupDate": pickupDate
                , "workTypeIds": workTypeIds.toString()
//                , "active": active
            }),
            dataType: "json",
            async: false,
//            contentType: "application/json",
            success: function (serviceOrder) {
                $('#serviceOrder-id').val(serviceOrder.id);
                $('#registration-date').val(serviceOrder.registrationDate);
                createServiceOrderRegistrationCopy();
            }
        });
    } else {
        alert("Input is missing!!");
    }
}

function editServiceOrder() {
    var buttonWrapperDetails = [
        {"value": "new", "type": "button", "class": "form-button", "id": "form-new-button", "onclick": "javascript:createServiceOrderForm()"}
        ,
        {"value": "update", "type": "button", "class": "form-button", "id": "form-update-button", "onclick": "javascript:updateServiceOrder()"}
        ,
        {"value": "edit", "type": "button", "class": "form-button", "id": "form-edit-button", "onclick": "javascript:editServiceOrder()"}
        ,
        {"value": "delete", "type": "button", "class": "form-button", "id": "form-delete-button", "onclick": "javascript:alertBeforeDeleteServiceOrder()"}
    ];

    populateButtonWrapper(buttonWrapperDetails);
    openFormForEditing();
}

function updateServiceOrder() {
    var serviceOrderId = $('#serviceOrder-id').val();
    var registrationDate = $('#registration-date').val();
    var customerSSN = $('#customer-ssn').val();
    var licensePlate = $('#license-plate').val();
    var mechanicSSN = $('#mechanic-ssn').val();
    var complaintId = $('#complaint-id').val();
    var serviceDate = $('#service-date').val();
    var pickupDate = $('#pickup-date').val();
    var workTypeIds = getCheckedWorkTypeIds();
    var active;

    var active;
    if ($('#active-checkbox').is(':checked')) {
        active = true;
    } else {
        active = false;
    }

    if (complaintId === "") {
        complaintId = null;
    }

    var serviceOrder = {
        "id": serviceOrderId,
        "registrationDate": registrationDate,
        "customerSSN": customerSSN,
        "mechanicSSN": mechanicSSN,
        "licensePlate": licensePlate,
        "complaintId": complaintId,
        "serviceDate": serviceDate,
        "pickupDate": pickupDate,
        "workTypeIds": workTypeIds,
        "active": active
    };
    var stringifiedServiceOrder = JSON.stringify(serviceOrder);

    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/serviceOrders/update",
        data: stringifiedServiceOrder,
        dataType: "json",
        contentType: "application/json",
        async: false,
        success: function (data) {
            createServiceOrderRegistrationCopy();
        }
    });
    getServiceOrderTable();
}

function createServiceOrderRegistrationCopy() {

    var buttonWrapperDetails = [
        {"value": "new", "type": "button", "class": "form-button", "id": "form-new-button", "onclick": "javascript:createServiceOrderForm()"}
        ,
        {"value": "update", "type": "button", "class": "form-button", "id": "form-update-button", "onclick": "javascript:updateServiceOrder()"}
        ,
        {"value": "edit", "type": "button", "class": "form-button", "id": "form-edit-button", "onclick": "javascript:editServiceOrder()"}
    ];

    populateButtonWrapper(buttonWrapperDetails);
    closeFormForEditing();
}

function alertBeforeDeleteServiceOrder() {
    if (confirm("Do you really wish to delete service order?! Click ok to delete!") === true) {
        deleteServiceOrderByServiceOrderId();
        createServiceOrderPage();
    }
}

function deleteServiceOrderByServiceOrderId() {
    var serviceOrderId = $('#serviceOrder-id').val();

    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/serviceOrders/deleteByServiceOrderId/" + serviceOrderId,
        dataType: "json",
        success:
                createServiceOrderForm()
    });
    getServiceOrderTable();
}

function createEditableViewForServiceOrder(serviceOrderId) {
    createServiceOrderForm();
    getServiceOrderById(serviceOrderId);
}

function getAllServiceOrdersByLicensePlate() {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/serviceOrders/findBySocialSecurityNumber/" + socialSecurityNumber,
        dataType: "json",
        success:
                function (customersServiceOrders)
                {
                    if (customersServiceOrders !== null) {
                        createServiceOrderTableWithCustomerServiceOrders(customersServiceOrders);
                    } else {
                        createServiceOrderForm();
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

function createServiceOrderTableWithCustomerServiceOrders(customersServiceOrders) {
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

    for (var i = 0; i < customersServiceOrders.length; i++) {
        var serviceOrder = customersServiceOrders[i];
        var tableRow = $('<tr/>');
        var licensePlate = serviceOrder.licensePlate;
        var tableDataCell1 = $('<td/>', {"text": licensePlate});
        var tableDataCell2 = $('<td/>', {"text": serviceOrder.brand});
        var tableDataCell3 = $('<td/>', {"text": serviceOrder.model});
        var tableDataCell4 = $('<td/>', {"text": serviceOrder.productionYear});
        var tableDataCell5 = $('<td/>', {"text": serviceOrder.fuelType});
        var tableDataCell6 = $('<td/>', {"text": serviceOrder.mileage});
        var tableDataCell7 = $('<td/>').append($('<input/>',
                {"id": "table-edit-serviceOrder", "value": "Details", "type": "button",
                    "onclick": "javascript:createEditableViewForServiceOrder(\"" + licensePlate + "\")"}));
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

function checkIfCarExistsViaServiceOrders() {
    $('#customer-ssn').prop('disabled', true);

    $('.input-form-field').val("");
    var licensePlate = $('#search-license-plate').val();
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cars/check/car/" + licensePlate,
        dataType: "json",
        success: function (booleanData) {
            if (booleanData) {
                createServiceOrderForm();
                $('#license-plate').val(licensePlate);
                getAllServiceOrdersByLicensePlate();
            } else {
                alert("You cannot open a service order without a registered car!");
            }
        }
    });
}

function checkIfMechanicExistsViaServiceOrders() {
    var mechanicSocialSecurityNumber = $('#search-mechanic-ssn').val();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/mechanics/check/" + mechanicSocialSecurityNumber,
        dataType: "json",
        success: function (booleanData) {
            if (booleanData) {
                $('#mechanic-ssn').val(mechanicSocialSecurityNumber);
            } else {
                alert("You must specify a registered mechanic!");
            }
        }
    });
}

function getAllServiceOrdersByLicensePlate() {

    var licensePlate = $('#search-license-plate').val();
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/serviceOrders/findbylicenseplate/" + licensePlate,
        dataType: "json",
        success:
                function (serviceOrders)
                {
                    if (serviceOrders !== null) {
                        getOwnerSSNByLicensePlate();
                        createServiceOrderTableForCar(serviceOrders);
                    } else {
                        createCarForm();
                    }
                }
        ,
        error: function () {
            $('#serviceOrder-id').val("");
            $('#customer-ssn').val("");
            $('#license-plate').val("");
            $('#mechanic-ssn').val("");
            $('#service-date').val("");
            $('#pickup-date').val("");
        }
    });
}

function createServiceOrderTableForCar(serviceOrders) {
    var tableWrapper = $('#table-wrapper');
    tableWrapper.empty();
    var table = $('<table/>', {"class": "show-all-table"});
    var tableHeader = $('<thead/>', {"class": "show-all-table-header"});
    var tableHeaderRow = $('<tr/>');
    var tableTitle1 = $('<th/>', {"text": "Service Order Id", "class": "show-all-table-title"});
    var tableTitle2 = $('<th/>', {"text": "Customer SSN", "class": "show-all-table-title"});
    var tableTitle3 = $('<th/>', {"text": "License Plate", "class": "show-all-table-title"});
    var tableTitle4 = $('<th/>', {"text": "Mechanic SSN", "class": "show-all-table-title"});
    var tableTitle5 = $('<th/>', {"text": "Registration", "class": "show-all-table-title"});
    var tableTitle6 = $('<th/>', {"text": "Service", "class": "show-all-table-title"});
    var tableTitle7 = $('<th/>', {"text": "Pickup", "class": "show-all-table-title"});
    var tableTitle8 = $('<th/>', {"text": "Details", "class": "show-all-table-title"});

    tableHeaderRow.append(
            tableTitle1
            , tableTitle2
            , tableTitle3
            , tableTitle4
            , tableTitle5
            , tableTitle6
            , tableTitle7
            , tableTitle8
            );
    tableHeader.append(tableHeaderRow);
    table.append(tableHeader);

    for (var i = 0; i < serviceOrders.length; i++) {
        var serviceOrder = serviceOrders[i];
        var tableRow = $('<tr/>');
        var serviceOrderId = serviceOrder.id;
        var tableDataCell1 = $('<td/>', {"text": serviceOrderId, "id": "id-" + (i + 1)});
        var tableDataCell2 = $('<td/>', {"text": serviceOrder.customer.socialSecurityNumber, "id": "customerSSN-" + (i + 1)});
        var tableDataCell3 = $('<td/>', {"text": serviceOrder.car.licensePlate, "id": "licensePlate-" + (i + 1)});
        var tableDataCell4 = $('<td/>', {"text": serviceOrder.mechanic.socialSecurityNumber, "id": "mechanicSSN-" + (i + 1)});
        var tableDataCell5 = $('<td/>', {"text": serviceOrder.registrationDate, "id": "dateOfRegistration-" + (i + 1)});
        var tableDataCell6 = $('<td/>', {"text": serviceOrder.serviceDate, "id": "dateOfService-" + (i + 1)});
        var tableDataCell7 = $('<td/>', {"text": serviceOrder.pickupDate, "id": "dateOfPickup-" + (i + 1)});
        var tableDataCell8 = $('<td/>').append($('<input/>',
                {"id": "table-edit-serviceOrder-" + (i + 1), "value": "Details", "type": "button",
                    "onclick": "javascript:getServiceOrderById(\"" + serviceOrderId + "\")"}));
        for (var j = 0; j <= i; j++) {
            tableRow.append(
                    tableDataCell1
                    , tableDataCell2
                    , tableDataCell3
                    , tableDataCell4
                    , tableDataCell5
                    , tableDataCell6
                    , tableDataCell7
                    , tableDataCell8
                    );
            table.append(tableRow);
        }
    }
    tableWrapper.append(table);
}


function getCustomerByServiceOrderId(serviceOrderId) {
    var customer;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/serviceOrders/findCustomerByServiceOrderId/" + serviceOrderId,
        dataType: "json",
        async: false,
        success: function (customer) {
            customer = {
                "socialSecurityNumber": customer.socialSecurityNumber,
                "firstName": customer.firstName,
                "lastName": customer.lastName,
                "streetAddress": customer.streetAddress,
                "zipCode": customer.zipCode,
                "city": customer.city,
                "email": customer.email,
                "phoneNumber": customer.phoneNumber,
                "gender": customer.gender,
                "ownedCars": customer.ownedCars
            };
        }
    });
    return customer;
}
function getCarByServiceOrderId(serviceOrderId) {
    var car;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/serviceOrders/findCarByServiceOrderId/" + serviceOrderId,
        dataType: "json",
        async: false,
        success: function (data) {
            car = {
                "licensePlate": data.licensePlate,
                "brand": data.brand,
                "model": data.model,
                "fuelType": data.fuelType,
                "mileage": data.mileage,
                "productionYear": data.productionYear
            };
        }
    });
    return car;
}
function getMechanicByServiceOrderId(serviceOrderId) {
    var mechanic;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/serviceOrders/findMechanicByServiceOrderId/" + serviceOrderId,
        dataType: "json",
        async: false,
        success: function (data) {
            mechanic = {
                "socialSecurityNumber": data.socialSecurityNumber,
                "firstName": data.firstName,
                "lastName": data.lastName,
                "streetAddress": data.streetAddress,
                "zipCode": data.zipCode,
                "city": data.city,
                "email": data.email,
                "phoneNumber": data.phoneNumber,
                "gender": data.gender,
                "salary": data.salary,
                "carInProgress": data.carsInProgress
            };
        }
    });
    return mechanic;
}
function getCheckedWorkTypeIds() {
    var workTypeIds = [];
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/workTypes",
        dataType: "json",
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; ++i) {
                if ($('#' + data[i].id).is(':checked')) {
                    workTypeIds[workTypeIds.length] = data[i].id;
                }
            }
        }
    });
    return workTypeIds;
}