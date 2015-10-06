$(function ()
{
    createMain();
    $.ajaxSetup({beforeSend: function (xhr) {
            if (xhr.overrideMimeType)
            {
                xhr.overrideMimeType("application/json");
            }
        }});
});

function createMain() {
    var wrapper = $('#wrapper');
    wrapper.empty();

    var headWrapper = $('<div/>', {"class": "wrapper", "id": "head-wrapper"});
    var headTitle = $('<h1/>', {"text": "Hotwired Auto Repair Shop", "id": "head-title", "onclick": "javascript:createMain()"});

    var headNavigation = $('<ul/>', {"id": "head-navigation-list"});
    var customerButton = $('<li/>', {"class": "head-nav-button", "text": "Customer", "id": "add-or-edit-customer-button", "onclick": "javascript:createCustomerPage()"});
    var carButton = $('<li/>', {"class": "head-nav-button", "text": "Car", "id": "add-or-edit-car-button", "onclick": "javascript:createCarPage()"});
    var serviceOrderButton = $('<li/>', {"class": "head-nav-button", "text": "Service Order", "id": "add-or-edit-service-order-button", "onclick": "javascript:createServiceOrderPage()"});
    var mechanicButton = $('<li/>', {"class": "head-nav-button", "text": "Mechanic", "id": "add-or-edit-mechanic-button", "onclick": "javascript:createMechanicPage()"});
    var workTypeButton = $('<li/>', {"class": "head-nav-button", "text": "WorkType", "id": "add-or-edit-worktype-button", "onclick": "javascript:createWorkTypePage()"});
    var complaintButton = $('<li/>', {"class": "head-nav-button", "text": "Complaint", "id": "add-or-edit-complaint-button", "onclick": "javascript:createComplaintPage()"});
    var statisticButton = $('<li/>', {"class": "head-nav-button", "text": "Statistic", "id": "add-or-edit-statistic-button", "onclick": "javascript:createStatisticPage()"});

    headNavigation.append(
            customerButton
            ,
            carButton
            ,
            serviceOrderButton
            ,
            mechanicButton
            ,
            workTypeButton
            ,
            complaintButton
            ,
            statisticButton
            );

    headWrapper.append(
            headTitle
            ,
            headNavigation
            );

    var bodyWrapper = $('<div/>', {"class": "wrapper", "id": "body-wrapper"});

    var infoWrapper = $('<div/>', {"id": "info-wrapper"});
    var infoHeader = $('<h1/>', {"id": "body-info-title", "text": "Welcome!"});
    var infoBody = $('<div/>', {"id": "body-info-text", "text": "Click the links above to navigate!"});
    infoWrapper.append(
            infoHeader
            ,
            infoBody
            );

    bodyWrapper.append(
            infoWrapper
            );

    wrapper.append(
            headWrapper
            ,
            bodyWrapper
            );
}