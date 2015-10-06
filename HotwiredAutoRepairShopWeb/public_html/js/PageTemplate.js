function createEntityPage() {
    var bodyWrapper = $('#body-wrapper');
    bodyWrapper.empty();

    var infoWrapper = $('<div/>', {"id": "info-wrapper"});

    var searchWrapper = $('<div/>', {"class": "wrapper", "id": "search-wrapper"});
    var formWrapper = $('<div/>', {"class": "wrapper", "id": "form-wrapper"});
    var inputWrapper = $('<div/>', {"class": "wrapper", "id": "input-wrapper"});
    var workTypeWrapper = $('<div/>', {"class": "wrapper", "id": "workType-wrapper"});
    var activeOrderWrapper = $('<div/>', {"class": "wrapper", "id": "activeOrder-wrapper"});

    var buttonWrapper = $('<div/>', {"class": "wrapper", "id": "button-wrapper"});

    var tableWrapper = $('<div/>', {"class": "wrapper", "id": "table-wrapper"});

    formWrapper.append(inputWrapper, workTypeWrapper, activeOrderWrapper, buttonWrapper);
    bodyWrapper.append(infoWrapper, searchWrapper, formWrapper, tableWrapper);
}

function populateInfoWrapper(infoWrapperDetails) {
    var infoWrapper = $('#info-wrapper');
    infoWrapper.empty();

    var infoWrapperHeader = $('<h1/>', {"id": "info-wrapper-header", "text": infoWrapperDetails.title});
    var infoWrapperBody = $('<div/>', {"id": "info-wrapper-body", "text": infoWrapperDetails.info});
    infoWrapper.append(infoWrapperHeader, infoWrapperBody);

}

function populateSearchWrapper(searchWrapperDetails) {
    var searchWrapper = $('#search-wrapper');
    searchWrapper.empty();

    for (var i = 0; i < searchWrapperDetails.length; i++) {
        var searchRowDetail = searchWrapperDetails[i];

        var searchRow = $('<div/>', {"class": "search-row"});

        var searchRowTitle = $('<span/>', {"class": "search-field-title", "text": searchRowDetail.title});
        var searchField = $('<input/>', {"class": "search-field", "id": searchRowDetail.id, "type": searchRowDetail.type});
        var searchButton = $('<input/>', {"class": "form-search-button", "type": "button", "value": "Search", "onclick": searchRowDetail.script});
        var para = $('<p/>');
        searchRow.append(searchRowTitle, searchField, searchButton, para);
        searchWrapper.append(searchRow);
    }
}

function populateInputWrapper(inputWrapperDetails) {
    var inputWrapper = $('#input-wrapper');
    inputWrapper.empty();

    for (var i = 0; i < inputWrapperDetails.length; i++) {
        var formRowDetails = inputWrapperDetails[i];

        var para = $('<p/>');
        var formRow = $('<div/>', {"class": "form-row"});
        var formRowTitle = $('<span/>', {"class": "form-input-title", "text": formRowDetails.text});
        var inputField = $('<input/>', {
            "type": formRowDetails.type,
            "pattern": formRowDetails.pattern,
            "max": formRowDetails.max,
            "min": formRowDetails.min,
            "class": formRowDetails.class,
            "id": formRowDetails.id});
        formRow.append(formRowTitle, inputField, para);
        inputWrapper.append(formRow);
    }
}

function populateWorkTypeWrapper() {
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
}

function populateActiveOrderWrapper() {
    var activeOrderWrapper = $('#activeOrder-wrapper');
    activeOrderWrapper.empty();
    var activeCheckBox = $('<div/>', {"text": "Active:"})
            .append($('<input/>', {"type": "checkbox", "class": "input-checkbox", "id": "active-checkbox"}));
    activeOrderWrapper.append(activeCheckBox);
}

function populateButtonWrapper(buttonWrapperDetails) {
    var buttonWrapper = $('#button-wrapper');
    buttonWrapper.empty();

    for (var i = 0; i < buttonWrapperDetails.length; i++) {
        var button = buttonWrapperDetails[i];
        var formButton = $('<input/>', button);
        buttonWrapper.append(formButton);
    }
}

function closeFormForEditing() {
    $('.editable').prop('disabled', true);
    $('.uneditable').prop('disabled', true);
    $("#form-edit-button").prop('disabled', false);
    $("#form-update-button").prop('disabled', true);
    $('.input-checkbox').prop('disabled', true);
    $('.deactivated').prop('disabled', true);
}

function openFormForEditing() {
    $('.editable').prop('disabled', false);
    $('.uneditable').prop('disabled', true);
    $("#form-update-button").prop('disabled', false);
    $("#form-edit-button").prop('disabled', true);
    $('.input-checkbox').prop('disabled', false);
    $('.deactivated').prop('disabled', true);
}

function clearForm() {
    $('.form-input-field').val("");
    $('.search-field').val("");
    $('.input-checkbox').prop('checked', false);
}

function getTodaysDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;
    return today;
}

function getTodaysDatePlusOneMonth() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (mm === 12) {
        mm = 01;
        yyyy++;
    } else {
        mm++;
    }

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;
    return today;
}

function get18YearOldSSN() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear() - 18;

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var SSN = yyyy + mm + dd + "9999";
    return SSN;
}