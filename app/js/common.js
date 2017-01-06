$(function () {

    $(".services .service-item h4").equalHeights();
    $(".news .new-item-text").equalHeights();
    $(".link-item").equalHeights();

    //OwlCarousel2
    var owl = $(".slider");
    owl.owlCarousel({
        loop: true,
        items: 1,
        itemClass: "slide-wrap",
        nav: true,
        navText: ''
    });
    $(".next").on("click", function () {
        owl.trigger("next.owl.carousel");
    });
    $(".prev").on("click", function () {
        owl.trigger("prev.owl.carousel");
    });


    //SVG Fallback
    if (!Modernizr.svg) {
        $("img[src*='svg']").attr("src", function () {
            return $(this).attr("src").replace(".svg", ".png");
        });
    }

    //Superfish Menu
    $(".top-line .sf-menu").superfish({
        cssArrows: false,
        hoverClass: 'no-class',
        delay: 200
    });


    //Mobile menu
    $(".sf-menu").after("<div id='my-menu'>");
    $(".sf-menu").clone().appendTo("#my-menu");
    $("#my-menu").find("*").attr("style", "");
    $("#my-menu").find("ul").removeClass("sf-menu");
    $("#my-menu").mmenu({
        extensions: ['widescreen', 'theme-white', 'effect-menu-slide', 'pagedim-black'],
        navbar: {
            title: "Меню"
        }
    });
    //Закрытие кнопки
    var api = $("#my-menu").data("mmenu");
    api.bind("closed", function () {
        $(".toggle-mnu").removeClass("on");
    });

    $(".mobile-mnu")
        .click(function () {
            var mmAPI = $("#my-menu").data("mmenu");
            mmAPI.open();
            var thiss = $(this).find(".toggle-mnu");
            thiss.toggleClass("on");
            $(".main-mnu").slideToggle();
            return false;
        });


    //E-mail Ajax Send
    //Documentation & Example: https://github.com/agragregra/uniMail
    $("form").submit(function () { //Change
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function () {
            alert("Thank you!");
            setTimeout(function () {
                // Done Functions
                th.trigger("reset");
            }, 1000);
        });
        return false;
    });

    //Chrome Smooth Scroll
    try {
        $.browserSelector();
        if ($("html").hasClass("chrome")) {
            $.smoothScroll();
        }
    } catch (err) {

    }

    $("img, a").on("dragstart", function (event) {
        event.preventDefault();
    });

});
