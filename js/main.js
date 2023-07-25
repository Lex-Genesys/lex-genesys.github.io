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


function convertUTCPlus2ToUTC(date) {
    const utcTimestamp = date.getTime() - 1800000; 
    const utcDate = new Date(utcTimestamp);
    return utcDate;
  }
  
  function convertAndUseAPIInput(callback) {
    const dateTimeInput = document.getElementById("DateTime").value;
    const utcPlus2Date = new Date(dateTimeInput);
  
    if (isNaN(utcPlus2Date)) {
      alert("Invalid date format. Please enter a valid date.");
      return;
    }
  
    const utcDate = convertUTCPlus2ToUTC(utcPlus2Date);
    const utcDate1 = utcDate.toISOString();
  
    // API call
    var xhr = new XMLHttpRequest();
    var url = "https://api.mypurecloud.de/api/v2/conversations/callbacks";
    var requestBody = {
      "queueId": "9489e4b8-474b-48eb-88bc-0d4506579320",
      "callbackUserName": document.getElementById('Name').value,
      "callbackNumbers": [document.getElementById('phone').value],
      "callbackScheduledTime": utcDate1,
      "routingData": {
        "skillIds": ["ee307d00-58ab-4a49-91bb-241a97705b48"]
      },
    };
    var requestBodyJson = JSON.stringify(requestBody);
    var authToken = "7DwJq-47vnNpYVBZULZNuEFvW2rwr2RjsdPa6UZmVCHoWa8di6NNJdqVnAY1pOsOVoC3layo7nX5pf2sqAKL-Q";
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
  
  // Button click event
  callbackButton.addEventListener('click', function (event) {
    event.preventDefault();
  
    // Call the function and pass a callback function to handle the API response
    convertAndUseAPIInput(function (response) {
      if (response) {
        console.log("API response:", response);
        // Handle the successful API response here
      } else {
        console.log("API request failed.");
        // Handle the API request failure here
      }
    });
  });
  
 
 