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
    

    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
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





callbackButton.addEventListener('click', function() {
    var name = document.getElementById('Name').value;
    var phone = document.getElementById('phone').value;
    var date = document.getElementById('date12').value;
    console.log(date);

    alert('Le bouton de rappel a été cliqué !');

// Création d'une instance de XMLHttpRequest
var xhr = new XMLHttpRequest();

 

// URL de la requête
var url = "https://api.mypurecloud.de/api/v2/conversations/callbacks";

 

// Corps de la requête (converti en JSON)
var requestBody = {
  "queueId": "636f560a-bc92-45e4-a8c3-79b53dd7f817",
  "callbackUserName": name,
  "callbackNumbers": [phone],
  "callbackScheduledTime": date 

};
var requestBodyJson = JSON.stringify(requestBody);

 

// Ouvrir la requête avec la méthode "POST" et l'URL
xhr.open("POST", url);

 

// Définir les en-têtes appropriées
xhr.setRequestHeader("Authorization", "bearer r08njAcY7N_fiOxbcm2IJe4LDai3mGocbGJqb4b2yg6eJxjdX2ayeFIxVmZBQxatppe1EZuSeML6Q4KcOIf_tA"); // Indique que le corps est en JSON
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


/*
    var headers = {
        "Authorization": "bearer r08njAcY7N_fiOxbcm2IJe4LDai3mGocbGJqb4b2yg6eJxjdX2ayeFIxVmZBQxatppe1EZuSeML6Q4KcOIf_tA",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    var jsonBody = JSON.stringify(
        {
            "queueId":"636f560a-bc92-45e4-a8c3-79b53dd7f817",
            "callBackUserName":name,
            "callbackNumbers": [phone]
        }
    )
const request = new Request("https://api.mypurecloud.de/api/v2/conversations/callbacks", {
        method: "POST",
        body: {
            "queueId": "636f560a-bc92-45e4-a8c3-79b53dd7f817",
            "callbackUserName": "Amira",
            "callbackNumbers": ["1234"],
         },
        headers:headers
    })
    fetch(request)
.then((response) => {
}) 
// ,*/
    //PureCloud.notificationChannel.addNotificationCallback('button.callback.clicked', handleCallback);
  });