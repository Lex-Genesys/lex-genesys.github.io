(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

var callbackButton = document.getElementById('buttonCallback');

function handleDateTimeField() {
    const rappelPlusTardRadio = document.getElementById('rappelPlusTard');
    const dateTimeField = document.getElementById('dateTimeField');
    dateTimeField.style.display = rappelPlusTardRadio.checked ? 'block' : 'none';
}

const rappelPlusTardRadio = document.getElementById('rappelPlusTard');
const rappelImmediatRadio = document.getElementById('rappelImmediat');
rappelPlusTardRadio.addEventListener('change', handleDateTimeField);
rappelImmediatRadio.addEventListener('change', handleDateTimeField);

function showCalendarOnFocus() {
    const dateTimeInput = document.getElementById('DateTime');
    dateTimeInput.click(); // Simulate a click event on the input to trigger the calendar
}

// Attach event listener to the date-time input to trigger calendar display
const dateTimeInput = document.getElementById('DateTime');
dateTimeInput.addEventListener('focus', showCalendarOnFocus);

// Function to handle the initial state of the date-time field on page load
function handleInitialDateTimeField() {
    handleDateTimeField(); // Call the function to set the initial state
}

// Attach event listener to the "DOMContentLoaded" event to handle initial state
document.addEventListener('DOMContentLoaded', handleInitialDateTimeField);

function convertUTCPlus2ToUTC(date) {
    const utcTimestamp = date.getTime();
    const utcDate = new Date(utcTimestamp);
    return utcDate;
}

function convertAndUseAPIInput(callback) {
    const rappelPlusTardRadio = document.getElementById('rappelPlusTard');
    const dateTimeInput = document.getElementById("DateTime").value;

    if (rappelPlusTardRadio.checked) {
        // Convert date-time to UTC if "Rappel Plus Tard" is selected
        const utcPlus2Date = new Date(dateTimeInput);
        if (isNaN(utcPlus2Date)) {
            alert("Invalid date format. Please enter a valid date.");
            return;
        }

        const utcDate = convertUTCPlus2ToUTC(utcPlus2Date);
        const utcDate1 = utcDate.toISOString();

        // API call using the converted UTC date-time for "Rappel Plus Tard"
        var xhr = new XMLHttpRequest();
        var url = "https://api.mypurecloud.de/api/v2/conversations/callbacks";
        var requestBody = {
            "queueId": "9489e4b8-474b-48eb-88bc-0d4506579320",
            "callbackUserName": document.getElementById('Name').value,
            "callbackNumbers": [document.getElementById('phone').value],
            "callbackScheduledTime": utcDate1,
            "routingData": {
                "priority": 0,
                "skillIds": ["ee307d00-58ab-4a49-91bb-241a97705b48"]
            }
        };

        var requestBodyJson = JSON.stringify(requestBody);
        var authToken = "mlxaj2ObYULZCKPazsfmgjCtSLsXpxIBkdKD8iz_ppknDOJLoyuUdz3BPu2Ofprg8t8SG8v150VJdHJ1pEvFNQ";

        xhr.open("POST", url);
        xhr.setRequestHeader("Authorization", "Bearer " + authToken);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "application/json");

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                var response = JSON.parse(xhr.responseText);
                callback(response); // Call the callback function with the API response
            } else {
                console.error("La requête a échoué avec le statut :", xhr.status);
                callback(null); // Call the callback with null to indicate an error
            }
        };

        xhr.onerror = function () {
            console.error("Erreur de requête");
            callback(null); // Call the callback with null to indicate an error
        };

        xhr.send(requestBodyJson);
    } else {
        // API call for "Rappel Immédiat" without date-time consideration
        var xhr = new XMLHttpRequest();
        var url = "https://api.mypurecloud.de/api/v2/conversations/callbacks";
        var requestBody = {
            "queueId": "9489e4b8-474b-48eb-88bc-0d4506579320",
            "callbackUserName": document.getElementById('Name').value,
            "callbackNumbers": [document.getElementById('phone').value],
            "routingData": {
                "priority": 0,
                "skillIds": ["ee307d00-58ab-4a49-91bb-241a97705b48"]
            }
        };

        var requestBodyJson = JSON.stringify(requestBody);
        var authToken = "mlxaj2ObYULZCKPazsfmgjCtSLsXpxIBkdKD8iz_ppknDOJLoyuUdz3BPu2Ofprg8t8SG8v150VJdHJ1pEvFNQ"; 

        xhr.open("POST", url);
        xhr.setRequestHeader("Authorization", "Bearer " + authToken);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "application/json");

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                var response = JSON.parse(xhr.responseText);
                callback(response); // Call the callback function with the API response
            } else {
                console.error("La requête a échoué avec le statut :", xhr.status);
                callback(null); // Call the callback with null to indicate an error
            }
        };

        xhr.onerror = function () {
            console.error("Erreur de requête");
            callback(null); // Call the callback with null to indicate an error
        };

        xhr.send(requestBodyJson);
    }
}

// Usage:
callbackButton.addEventListener('click', function (event) {
    event.preventDefault();
    // Call the function and pass a callback function to handle the API response
    convertAndUseAPIInput(function (response) {
        if (response) {
            // Handle the successful API response here
            console.log("API response:", response);
        } else {
            // Handle the API request failure here
            console.log("API request failed.");
        }
    });
});
