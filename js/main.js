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

callbackButton.addEventListener('click', function(event) {
    event.preventDefault();
    var xhr = new XMLHttpRequest(); // Declare and initialize the xhr variable here
    var name = document.getElementById('Name').value;
    var phone = document.getElementById('phone').value;
    function convertUTCPlus2ToUTC(date) {
        const utcTimestamp = date.getTime() - (2 * 3600000); // Subtract 2 hours for UTC+0
        const utcDate = new Date(utcTimestamp);
      
        return utcDate;
      }
      
      function convertAndUseAPIInput() {
        const dateTimeInput = document.getElementById("DateTime").value;
        const utcPlus2Date = new Date(dateTimeInput);
        
        if (isNaN(utcPlus2Date)) {
          alert("Invalid date format. Please enter a valid date.");
          return;
        }
      
        const utcDate = convertUTCPlus2ToUTC(utcPlus2Date);
        const utcDate1 = utcDate.toISOString(); // Use this as an input for the API
        
      }
      
    var url = "https://api.mypurecloud.de/api/v2/conversations/callbacks";

    // Corps de la requête (converti en JSON)
    var requestBody = {
        "queueId": "9489e4b8-474b-48eb-88bc-0d4506579320",
        "callbackUserName": name,
        "callbackNumbers": [phone],
        "callbackScheduledTime": utcDate1,
        "routingData": {
            "skillIds": ["ee307d00-58ab-4a49-91bb-241a97705b48"]
         },
    };
    var requestBodyJson = JSON.stringify(requestBody);

    // Ouvrir la requête avec la méthode "POST" et l'URL
    xhr.open("POST", url);

    // Définir les en-têtes appropriées
    var authToken = "7DwJq-47vnNpYVBZULZNuEFvW2rwr2RjsdPa6UZmVCHoWa8di6NNJdqVnAY1pOsOVoC3layo7nX5pf2sqAKL-Q";
    xhr.setRequestHeader("Authorization", "Bearer " + authToken);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");

    // Gérer l'événement de réponse
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // La requête a réussi, gérer la réponse ici si nécessaire
            var response = JSON.parse(xhr.responseText);
            console.log(response);
        } else {
            // La requête a échoué, gérer l'erreur ici si nécessaire
            console.error("La requête a échoué avec le statut :", xhr.status);
        }
    };

    // Gérer l'erreur de la requête
    xhr.onerror = function () {
        console.error("Erreur de requête");
    };

    // Envoyer la requête avec le corps JSON
    xhr.send(requestBodyJson);
});
