jQuery(document).ready(function($) {

  // Header fixed and Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#header').removeClass('header-fixed');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the AOS animation library
  AOS.init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smoth scroll on page hash links
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Gallery - uses the magnific popup jQuery plugin
  $('.gallery-popup').magnificPopup({
    type: 'image',
    removalDelay: 300,
    mainClass: 'mfp-fade',
    gallery: {
      enabled: true
    },
    zoom: {
      enabled: true,
      duration: 300,
      easing: 'ease-in-out',
      opener: function(openerElement) {
        return openerElement.is('img') ? openerElement : openerElement.find('img');
      }
    }
  });

  // custom code

  function background(i) {
    return (i % 2 == 0) ? " section-bg" : "";
  }

  function half(i) {
    return ((i == "true") ? "<div class=\"star\"><i class=\"ion-ios-star-half\"></i></div>" : "")

  }

  function beginning(i) {
    return "<div class=\"features-row" + background(i) + "\"><div class=\"container\"><div class=\"row\"><div class=\"col-lg-6 col-sm-12\" overflow=\"hidden\"><h2>";
  }

  function stars(i, review) {
    return "<div class=\"star\"><i class=\"ion-ios-star\"></i></div>".repeat(parseInt(review.rating));
  }

  function spacer1() {
    return "<div class=\"spacer1\"></div>"
  }

  function spacer() {
    return "<div class=\"spacer\"></div>"
  }

  function goodreads(value) {
    return "<div class=\"spacer1\"></div><center><div id=\"Goodreads\">Goodreads Rating: " + value  + "</div></center></div>";
  }

  function review(intro, review) {
    return "<div class=\"col-lg-6 col-sm-12\"><div class=\"spacer2\"></div><div class=\"review-body\"><p>" + intro + "</p></p>" + review + "</div></div>"
  }

  $.post("/ajaxTarget",function(data){
      console.log("hello");
      console.log(data);
      console.log(data[0]["name"])
      console.log(data[0].name)
      console.log(Object.keys(data).length)
      for (i = 0; i < Object.keys(data).length; i++) {
        $("#advanced-features").append(beginning(i) + data[i].name + "</h2><h3>" + data[i].author + "</h3>" + stars(i, data[i]) + half(data[i].half_star) + spacer() + "<img  class=\"rounded mx-auto d-block\" style=\"margin: 0 auto\" src=\"img/" + data[i].image + "\" alt=\"\">" + goodreads(data[i].goodreads_rating) + review(data[i].intro, data[i].review) + "</div></div></div")
      }
  });


  $( ":submit" ).click(function() {
    $( this ).slideUp();
  });
});
