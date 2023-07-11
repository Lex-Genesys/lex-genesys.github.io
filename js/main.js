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
    alert('Le bouton de rappel a été cliqué !');
    var headers = {
        "Authorization": "bearer HsGsMX51Y1CpbF2LgaS_AYYa0uHIdN8lS8fOSqQxx13_M6mGxwtTkW56twC94ApPMKTCNE1GBwTccq3UUPYgqg",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

const request = new Request("https://api.mypurecloud.de/api/v2/conversations/callbacks", {
        method: "POST",
        body: '{"queueId": "636f560a-bc92-45e4-a8c3-79b53dd7f817", "callbackUserName": "Alvyn", "callbackNumbers":["0000"]}',
        headers: headers

    })
    fetch(request)
.then((response) => {
    console.log(request.json())
}) 

    //PureCloud.notificationChannel.addNotificationCallback('button.callback.clicked', handleCallback);
  });