function createStatisticPage() {
    createEntityPage();
    var infoWrapperDetails = {"title": "Statistic", "info": "Start date must be set before end date. End date cannot be set to later than a month from today!."};
    populateInfoWrapper(infoWrapperDetails);

    var searchWrapper = $('#search-wrapper');
    searchWrapper.empty();

    var para1 = $('<p/>');
    var para2 = $('<p/>');
    var searchRow1 = $('<div/>', {"class": "search-row"});
    var searchRowTitle1 = $('<span/>', {"class": "search-field-title", "text": "Set start date:"});
    var searchField1 = $('<input/>', {"class": "search-field", "id": "search-start-date", "type": "date"});

    searchRow1.append(searchRowTitle1, searchField1);

    var searchRow2 = $('<div/>', {"class": "search-row"});
    var searchRowTitle2 = $('<span/>', {"class": "search-field-title", "text": "Set end date:"});
    var searchField2 = $('<input/>', {"class": "search-field", "id": "search-end-date", "type": "date"});

    searchRow2.append(searchRowTitle2, searchField2);

    var searchRow3 = $('<input/>', {"id": "set-date", "type": "button", "value": "Set dates", "onclick": 'javascript:setDate()'});

    searchWrapper.append(searchRow1, para1, searchRow2, para2, searchRow3);

    var today = getTodaysDate();
    $('#search-end-date').val(today);
    $('#search-start-date').val('2015-01-01');

    var tableWrapper = $('#table-wrapper');
    tableWrapper.empty();
    var customerTableWrapper = $('<div/>', {"id": "customerTable-wrapper", "class": "wrapper statistic-table-wrapper"});
    var carTableWrapper = $('<div/>', {"id": "carTable-wrapper", "class": "wrapper statistic-table-wrapper"});
    var serviceOrderTableWrapper = $('<div/>', {"id": "serviceOrderTable-wrapper", "class": "wrapper statistic-table-wrapper"});
    tableWrapper.append(customerTableWrapper, serviceOrderTableWrapper, carTableWrapper);
}

function setDate() {
    var startDate = $('#search-start-date').val();
    var endDate = $('#search-end-date').val();
    var nextMonth = getTodaysDatePlusOneMonth();
    if (startDate !== "" && endDate !== "" && startDate < endDate && endDate <= nextMonth) {
        createCustomerTable(startDate, endDate);
        createServiceOrderTable(startDate, endDate);
        createCarTable(startDate, endDate);
    }
}

function createCustomerTable(startDate, endDate) {

    var customerTableWrapper = $('#customerTable-wrapper');
    customerTableWrapper.empty();
    var customerTableWrapperTitle = $('<h1/>', {"id": "customerTable-wrapper-title", "text": "Customer"});
    var customerTable = $('<table/>', {"class": "show-all-table"});
    var tableHeader = $('<thead/>', {"class": "show-all-table-header"});
    var tableHeaderRow = $('<tr/>');
    var tableTitle1 = $('<th/>', {"text": "Total", "class": "statistic-title"});
    var tableTitle2 = $('<th/>', {"text": "Period", "class": "statistic-title"});
    var tableTitle3 = $('<th/>', {"text": "Female", "class": "statistic-title"});
    var tableTitle4 = $('<th/>', {"text": "Male", "class": "statistic-title"});
    var tableTitle5 = $('<th/>', {"text": "Male <30", "class": "statistic-title"});
    var tableTitle6 = $('<th/>', {"text": "Male <50", "class": "statistic-title"});
    var tableTitle7 = $('<th/>', {"text": "Male >50", "class": "statistic-title"});
    var tableTitle8 = $('<th/>', {"text": "Female <30", "class": "statistic-title"});
    var tableTitle9 = $('<th/>', {"text": "Female <50", "class": "statistic-title"});
    var tableTitle10 = $('<th/>', {"text": "Female >50", "class": "statistic-title"});

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
    customerTable.append(tableHeader);

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/statistics/customer",
        data: {
            "startDate": startDate,
            "endDate": endDate
        },
        dataType: "json",
        success: function (customerStatisticDTO) {
            var tableRow = $('<tr/>');
            var tableDataCell1 = $('<td/>', {"text": customerStatisticDTO.customerTotalCount});
            var tableDataCell2 = $('<td/>', {"text": customerStatisticDTO.customerPeriodCount});
            var tableDataCell3 = $('<td/>', {"text": customerStatisticDTO.femalePercentage + " %"});
            var tableDataCell4 = $('<td/>', {"text": customerStatisticDTO.malePercentage + " %"});
            var tableDataCell5 = $('<td/>', {"text": customerStatisticDTO.maleUnder30Percentage + " %"});
            var tableDataCell6 = $('<td/>', {"text": customerStatisticDTO.maleUnder50Percentage + " %"});
            var tableDataCell7 = $('<td/>', {"text": customerStatisticDTO.maleOver50Percentage + " %"});
            var tableDataCell8 = $('<td/>', {"text": customerStatisticDTO.femaleUnder30Percentage + " %"});
            var tableDataCell9 = $('<td/>', {"text": customerStatisticDTO.femaleUnder50Percentage + " %"});
            var tableDataCell10 = $('<td/>', {"text": customerStatisticDTO.femaleOver50Percentage + " %"});

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
            customerTable.append(tableRow);
            customerTableWrapper.append(customerTableWrapperTitle, customerTable);
        }
    });
}

function createCarTable(startDate, endDate) {

    var carTableWrapper = $('#carTable-wrapper');
    carTableWrapper.empty();

    var carTableWrapperTitle = $('<h1/>', {"id": "carTable-wrapper-title", "text": "Car"});
    var carTable = $('<table/>', {"class": "show-all-table"});
    var tableHeader = $('<thead/>', {"class": "show-all-table-header"});
    var tableHeaderRow = $('<tr/>');
    var tableTitle1 = $('<th/>', {"text": "Total", "class": "statistic-title"});
    var tableTitle2 = $('<th/>', {"text": "Brands", "class": "statistic-title"});

    tableHeaderRow.append(
            tableTitle1
            , tableTitle2
            );
    tableHeader.append(tableHeaderRow);
    carTable.append(tableHeader);

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/statistics/car",
        data: {
            "startDate": startDate,
            "endDate": endDate
        },
        dataType: "json",
        success: function (carStatisticDTO) {

            var tableRow = $('<tr/>');
            var tableDataCell1 = $('<td/>', {"text": carStatisticDTO.carsTotalCount});
            var tableDataCell2 = $('<td/>', {"text": carStatisticDTO.brandsTotalCount});

            tableRow.append(
                    tableDataCell1
                    , tableDataCell2
                    );
            carTable.append(tableRow);
            carTableWrapper.append(carTableWrapperTitle, carTable);
        }
    });
}

function createServiceOrderTable(startDate, endDate) {

    var serviceOrderTableWrapper = $('#serviceOrderTable-wrapper');
    serviceOrderTableWrapper.empty();
    var serviceOrderTableWrapperTitle = $('<h1/>', {"id": "customerTable-wrapper-title", "text": "Service Order"});
    var serviceOrderTable = $('<table/>', {"class": "show-all-table"});
    var tableHeader = $('<thead/>', {"class": "show-all-table-header"});
    var tableHeaderRow = $('<tr/>');
    var tableTitle1 = $('<th/>', {"text": "Total", "class": "statistic-title"});
    var tableTitle2 = $('<th/>', {"text": "Period", "class": "statistic-title"});
    var tableTitle3 = $('<th/>', {"text": "Income", "class": "statistic-title"});
    tableHeaderRow.append(
            tableTitle1
            , tableTitle2
            , tableTitle3

            );
    tableHeader.append(tableHeaderRow);
    serviceOrderTable.append(tableHeader);
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/statistics/serviceOrder",
        data: {
            "startDate": startDate,
            "endDate": endDate
        },
        dataType: "json",
        success: function (serviceOrderStatisticDTO) {

            var tableRow = $('<tr/>');
            var tableDataCell1 = $('<td/>', {"text": serviceOrderStatisticDTO.serviceOrderTotalCount});
            var tableDataCell2 = $('<td/>', {"text": serviceOrderStatisticDTO.serviceOrderPeriodCount});
            var tableDataCell3 = $('<td/>', {"text": serviceOrderStatisticDTO.totalIncome});
            tableRow.append(
                    tableDataCell1
                    , tableDataCell2
                    , tableDataCell3
                    );
            serviceOrderTable.append(tableRow);
            serviceOrderTableWrapper.append(serviceOrderTableWrapperTitle, serviceOrderTable);
        }
    });
}