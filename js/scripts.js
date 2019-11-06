$(document).ready(function () {
    // слайдеры
    if ($("#owl-slider1").length) {
        $("#owl-slider1").owlCarousel({
            nav : true, // Show next and prev buttons
            dots : true,
            slideSpeed : 400,
            paginationSpeed : 400,
            animateOut : "fadeOutRight",
            animateIn : "fadeInLeft",
            singleItem : true,
            items : 1,
            loop : true,
            navText : ['<i class="fal fa-long-arrow-left"></i>','<i class="fal fa-long-arrow-right"></i>']
        });
    }

    if ($("#owl-slider2").length) {
        $("#owl-slider2").owlCarousel({
            nav : true, // Show next and prev buttons
            dots : false,
            slideSpeed : 100,
            paginationSpeed : 100,
            singleItem : true,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            mouseDrag : false,
            touchDrag : false,
            items : 1,
            navText : ['<i class="fal fa-long-arrow-left"></i>','<i class="fal fa-long-arrow-right"></i>'],
            onInitialized  : slider2Counter,
            onTranslated : slider2Counter
        });

        function slider2Counter(event) {
            var element   = event.target;         // DOM element, in this example .owl-carousel
            var items     = event.item.count;     // Number of items
            var item      = event.item.index + 1;     // Position of the current item

            // it loop is true then reset counter from 1
            if(item > items) {
                item = item - items
            }
            $('.slide-counts').html('<span>'+(item < 10 ? '0'+item : item)+'</span><span class="text-white">'+(items < 10 ? '0'+items : items)+'</span>');
        }
    }

    if ($(".owl-slider3").length) {
        $(".owl-slider3").owlCarousel({
            nav : true, // Show next and prev buttons
            dots : true,
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem : true,
            items : 1,
            navText : ['←','→'],
            onInitialized  : slider3Counter,
            onTranslated : slider3Counter
        });

        function slider3Counter(event) {
            var element   = event.target;
            var items     = event.item.count;
            var item      = event.item.index + 1;
            var current = event.item.index;
            var label = $(event.target).find(".owl-item").eq(current).find("img").attr('data-title');

            // it loop is true then reset counter from 1
            if(item > items) {
                item = item - items
            }
            $('.slider-counter').html(item+"/"+items);

            $(".owl-slider3").parents('.slider-wrapper').find('.slider-label').html(label);

        }
    }

    // смена заголовка страницы по вкладкам на странице structure
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $('.page-title').text(e.target.innerHTML);
        // e.relatedTarget // previous active tab
    });


    // подключение ползунков на странице projects
    $(".range-input").asRange({
        range: true,
        limit: false
    });

    // клики по аккордеону
    $('.accordion-item-head').on('click', function () {
       $(this).parent().toggleClass('opened');
    });

    // делаем активными ссылки в header
    $(function() {
        if (window.location.href.indexOf("structure") > -1) {
            $('.header-navigation').find('a[href="structure.html"]').addClass('active').siblings('a').removeClass('active');
        }else
        if (window.location.href.indexOf("magazine") > -1) {
            $('.header-navigation').find('a[href="magazine.html"]').addClass('active').siblings('a').removeClass('active');
        }else
        if (window.location.href.indexOf("projects") > -1) {
            $('.header-navigation').find('a[href="projects.html"]').addClass('active').siblings('a').removeClass('active');
        }else
        if (window.location.href.indexOf("project") > -1) {
            $('.header-navigation').find('a[href="project.html"]').addClass('active').siblings('a').removeClass('active');
        }else
        if (window.location.href.indexOf("contacts") > -1) {
            $('.header-navigation').find('a[href="contacts.html"]').addClass('active').siblings('a').removeClass('active');
        }else
        if (window.location.href.indexOf("events") > -1) {
            $('.header-navigation').find('a[href="events.html"]').addClass('active').siblings('a').removeClass('active');
        }else
        if (window.location.href.indexOf("services") > -1) {
            $('.header-navigation').find('a[href="services.html"]').addClass('active').siblings('a').removeClass('active');
        }else
        if (window.location.href.indexOf("service") > -1) {
            $('.header-navigation').find('a[href="services.html"]').addClass('active').siblings('a').removeClass('active');
        }else
        if (window.location.href.indexOf("order") > -1) {
            $('.header-navigation').find('a[href="services.html"]').addClass('active').siblings('a').removeClass('active');
        }
    });

    // показ/прятание header
    $(function() {
        var prevScrollPos = window.pageYOffset;
        window.onscroll = function() {
            var currentScrollPos = window.pageYOffset;
            if ((prevScrollPos > currentScrollPos) || (currentScrollPos < 91)) {
                document.querySelector(".header-wrapper").classList.remove("hidden");
            } else {
                document.querySelector(".header-wrapper").classList.add("hidden");
            }
            prevScrollPos = currentScrollPos;
        }
    });

    // управление мобильным меню
    $('.mobile-menu-toggler').on('click', function () {
        $('.circle').addClass('expand');
        $('.mobile-menu').addClass('opened');
        $('body').addClass('overflow-hidden');
    });

    $('.mobile-menu__close').on('click', function () {
        $('.circle').removeClass('expand');
        $('.mobile-menu').removeClass('opened');
        $('body').removeClass('overflow-hidden');
    });

    $('.top-menu-toggler').on('click', function () {
        $('.top-menu').toggleClass('show');
    });

    $('.filters-toggler').on('click', function (e) {
        e.preventDefault();
        $('.filters-block').toggleClass('show');
        return false
    });

    $(function () {
        $('select').selectpicker();
    });

    // Скрипты для страницы Статья
    if ($('.similar-articles').length) {
        var wrapperHeight;
        var $wrapper = document.querySelector('.wrapper');
        var $pageReadInfo = document.querySelector('.page-read-info');

        (function(){

            // Really basic check for the ios platform
            // https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
            var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

            // Get the device pixel ratio
            var ratio = window.devicePixelRatio || 1;

            // Define the users device screen dimensions
            var screen = {
                width : window.screen.width * ratio,
                height : window.screen.height * ratio
            };

            // iPhone X Detection
            if (iOS && screen.width == 1125 && screen.height === 2436) {
                $('.page-read-info').addClass('big');
            }
        })();

        $(document).scroll(function(){
            wrapperHeight = $wrapper.offsetHeight - $pageReadInfo.offsetHeight  - document.documentElement.clientHeight;
            var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            if (winScroll < wrapperHeight) {
                var count = Math.ceil(winScroll/(wrapperHeight/10));
                $('.page-read-info .count').text(10 - count);
            }
            var scrolled = (winScroll / wrapperHeight) * 100;
            $('.page-read-info .timeline').css('width', (scrolled > 100 ? 100 : scrolled) + '%');
        });

        // показать тултип
        $('.tooltip-link').on('click', function () {
            $(this).find('.tooltip').addClass('show');
        });

        // спрятать тултип
        $('.tooltip-link .close-tooltip').on('click', function (e) {
            e.stopPropagation();
            $(this).parents('.tooltip').removeClass('show');
        });

        $(document).on('click',function (e) {
            e.stopPropagation();
            if (($(e.target).hasClass('tooltip-link') || $(e.target).hasClass('tooltip')) && $('.tooltip').hasClass('show') ) {
                return
            }
            if ($('.tooltip').hasClass('show')) {
                $('.tooltip').removeClass('show');
            }

        });
    }

    // Появление столбцов диаграмы на стр Проекта
    if ($('.bar').length) {
        $.fn.isInViewport = function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            return elementBottom > viewportTop && elementTop < viewportBottom;
        };

        $(window).on('resize scroll', function() {
            $('.bar').each(function () {
                if ($(this).isInViewport()) {
                    $(this).addClass('show');
                    var _this = $(this);
                    setTimeout(function () {
                        _this.find('.count').addClass('visible');
                    }, 1000);

                }
            });
        });

    }

    // вкладка Табличный вид
    $('.tabs-header .nav-link, .view-controls-mobile .nav-link').on('click', function () {
        setTimeout(function () {
            $('.tab-pane.active').find('.grid').masonry({
                // options
                itemSelector: '.grid-item',
                gutter: 24
            });
        },300);

    });

    // вкладка Карточный вид
    $('#pills-favorites-tab2').on('click', function () {
        setTimeout(function () {
            $('.tab-pane.active').find('.grid').masonry({
                // options
                itemSelector: '.grid-item',
                gutter: 24
            });
        },300);

    });

    // красивые появления блоков
    $(function () {
        new WOW().init();
    });

    // кнопка Написать  в свернутом виде - клик
    $('.feedback-button').on('click', function (e) {
        if ($(this).parents('.contact-block').hasClass('collapsed')) {
            e.stopPropagation();
            e.preventDefault();
            $(this).parents('.contact-block').removeClass('collapsed');
        }
    });

    // Masonry для блоков проектов
    if ($('.grid').length) {
        $grid = $('.grid');
        $grid.imagesLoaded(function(){
            $grid.masonry({
                // options
                itemSelector: '.grid-item',
                gutter: 24
            });
        });
    }


    // Переопределение поведения карты на странице Контакты
    if ($('#mapDiv').length) {
        var myMap = document.querySelector('#mapDiv');

        myMap.behaviors.disable('scrollZoom');

        var ctrlKey = false;
        var ctrlMessVisible = false;
        var timer;

        // Отслеживаем скролл мыши на карте, чтобы показывать уведомление
        myMap.events.add(['wheel', 'mousedown'], function(e) {
            if (e.get('type') == 'wheel') {
                if (!ctrlKey) { // Ctrl не нажат, показываем уведомление
                    $('#ymap_ctrl_display').fadeIn(300);
                    ctrlMessVisible = true;
                    clearTimeout(timer); // Очищаем таймер, чтобы продолжать показывать уведомление
                    timer = setTimeout(function() {
                        $('#ymap_ctrl_display').fadeOut(300);
                        ctrlMessVisible = false;
                    }, 1500);
                }
                else { // Ctrl нажат, скрываем сообщение
                    $('#ymap_ctrl_display').fadeOut(100);
                }
            }
            if (e.get('type') == 'mousedown' && ctrlMessVisible) { // Скрываем уведомление при клике на карте
                $('#ymap_ctrl_display').fadeOut(100);
            }
        });

        // Обрабатываем нажатие на Ctrl
        $(document).keydown(function(e) {
            if (e.which === 17 && !ctrlKey) { // Ctrl нажат: включаем масштабирование мышью
                ctrlKey = true;
                myMap.behaviors.enable('scrollZoom');
            }
        });
        $(document).keyup(function(e) { // Ctrl не нажат: выключаем масштабирование мышью
            if (e.which === 17) {
                ctrlKey = false;
                myMap.behaviors.disable('scrollZoom');
            }
        });
    }

    // верхний поиск - десктоп
    $('.header-search .icon-zoom').on('click', function () {
        $('.header-search').addClass('show');
        $('.header-search input').focus();
    });

    $('.header-search .icon-e-remove').on('click', function () {
        $('.header-search').removeClass('show');
        $('.header-search input').val('');
    });

    $('.header-search input').on('keyup', function (e) {
        if ($(this).val() !== '' && e.keyCode === 13) {
            window.location.href = "/search.html";
        }
    });


    // мобильный поиск
    $('.mobile-menu .search-link').on('click', function () {
        $(this).hide();
        $('.mobile-menu .mobile-search-input').addClass('d-flex');
        $('.mobile-search-input input').focus();
    });

    $('.mobile-search-input .icon-zoom').on('click', function () {
        if ($('.mobile-search-input input').val() !== '') {
            window.location.href = "/search.html";
        }
    });

    $('.mobile-search-input input').on('keyup', function (e) {
        if ($(this).val() !== '' && e.keyCode === 13) {
            window.location.href = "/search.html";
        }
    });

    // Управление схемой на странице Проект
    $('.scheme-controls .control').on('click', function () {
        var currentLayer = $(this).attr('data-control');
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $('.'+currentLayer).addClass('show');
        } else {
            $('.'+currentLayer).removeClass('show');
        }
    });


    // горизонтальный скролл меню вкладок
    $.fn.hScroll = function (amount) {
        amount = amount || 120;
        $(this).bind("DOMMouseScroll mousewheel", function (event) {
            var oEvent = event.originalEvent,
                direction = oEvent.detail ? oEvent.detail * -amount : oEvent.wheelDelta,
                position = $(this).scrollLeft();
            position += direction > 0 ? -amount : amount;
            $(this).scrollLeft(position);
            event.preventDefault();
        })
    };

    $(function() {
        $('.nav-tabs').hScroll(100);
    });

    //  Нажатие на якорную ссылку -ссфлку с классом .anchor

    $('.anchor').click(function() {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top + "px"
        }, {
            duration: 500,
            easing: 'swing'
        });
        return false;
    });
});