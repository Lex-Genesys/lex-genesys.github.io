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
    $(document).ready(function () {
        $('#DateTimePicker').datetimepicker({
            icons: {
                time: 'fa fa-clock',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-crosshairs',
                clear: 'fa fa-trash',
                close: 'fa fa-times'
            },
            useCurrent: false, // Do not use the current date/time as the default
            format: 'YYYY-MM-DD HH:mm', // Format for both date and time
            // Additional options and settings can be added here
        });
    });
})(jQuery);


var callbackButton = document.getElementById('buttonCallback');
var dateTimeField = document.getElementById('dateTimeField');
var rappelImmediatRadio = document.getElementById('rappelImmediat');
var rappelPlusTardRadio = document.getElementById('rappelPlusTard');

function handleDateTimeField() {
    dateTimeField.style.display = rappelPlusTardRadio.checked ? 'block' : 'none';
  }

  rappelImmediatRadio.addEventListener('click', function () {
    handleDateTimeField();
  });

  rappelPlusTardRadio.addEventListener('click', function () {
    handleDateTimeField();
  });

  // Initially call handleDateTimeField() to set the correct display state
  handleDateTimeField();

function convertUTCPlus2ToUTC(date) {
    const utcTimestamp = date.getTime();
    const utcDate = new Date(utcTimestamp);
    return utcDate;
}

function convertAndUseAPIInput(callback) {
    const rappelPlusTardRadio = document.getElementById('rappelPlusTard');
    const dateTimeInput = document.getElementById("DateTime").value;

    if (rappelPlusTardRadio.checked) {
        const utcPlus2Date = new Date(dateTimeInput);
        if (isNaN(utcPlus2Date)) {
            alert("Invalid date format. Please enter a valid date.");
            return;
        }

        const utcDate = convertUTCPlus2ToUTC(utcPlus2Date);
        const utcDate1 = utcDate.toISOString();

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
                callback(response);
            } else {
                console.error("La requête a échoué avec le statut :", xhr.status);
                callback(null);
            }
        };

        xhr.onerror = function () {
            console.error("Erreur de requête");
            callback(null);
        };

        xhr.send(requestBodyJson);
    } else {
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
                callback(response);
            } else {
                console.error("La requête a échoué avec le statut :", xhr.status);
                callback(null);
            }
        };

        xhr.onerror = function () {
            console.error("Erreur de requête");
            callback(null);
        };

        xhr.send(requestBodyJson);
    }
}

// Function to check if the required fields are empty
function areRequiredFieldsEmpty() {
    const nameInput = document.getElementById('Name').value;
    const phoneInput = document.getElementById('phone').value;
    const dateTimeInput = document.getElementById('DateTime').value;

    return nameInput.trim() === '' || phoneInput.trim() === '' || (dateTimeField.style.display === 'block' && dateTimeInput.trim() === '');
}



// Button click event
callbackButton.addEventListener('click', function (event) {
    event.preventDefault();

    // Check if the required fields are empty
    if (areRequiredFieldsEmpty()) {
        // Show an error message
        showErrorPopup("Veuillez remplir tous les champs obligatoires.");
    } else {
        // Call the function and pass a callback function to handle the API response
        convertAndUseAPIInput(function (response) {
            if (response) {
                console.log("API response:", response);
                // Handle the successful API response here

                // Empty the fields after the successful API request
                document.getElementById('Name').value = '';
                document.getElementById('phone').value = '';
                document.getElementById('DateTime').value = '';

                // Display the success message in a pop-up
                showSuccessPopup("Merci pour votre demande, un conseiller va vous appeler dans le meilleur des délais");
            } else {
                console.log("API request failed.");
                // Handle the API request failure here
            }

            // Re-enable the input fields to allow editing
            document.getElementById('Name').disabled = false;
            document.getElementById('phone').disabled = false;
            document.getElementById('DateTime').disabled = false;
        });
    }
});

 // Function to display an error message in a custom modal dialog
 function showErrorPopup(message) {
    $("#messageText").text(message);
    $("#messageModalLabel").text("Erreur");
    $("#messageModal").modal("show");
}

// Function to display a success message in a custom modal dialog
function showSuccessPopup(message) {
    $("#messageText").text(message);
    $("#messageModalLabel").text("Succès");
    $("#messageModal").modal("show");
}