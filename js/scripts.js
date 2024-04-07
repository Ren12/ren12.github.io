document.addEventListener("DOMContentLoaded", function() {

    //========= для кастомных селектов =========
    if ($('.js-choice').length) {
        const selects = document.querySelectorAll('.js-choice');
        selects.forEach(function (select) {
            const choices = new Choices(select, {
                searchEnabled: false,
                itemSelectText: ''
            });
        });
    }

    //========= подключение слайдера =========
    if ($('.js-slider').length) {
        $('.js-slider').slick({
            infinite: false,
            slidesToShow: 3,
            prevArrow: `<button type="button" class="slider__prev"></button>`,
            nextArrow: `<button type="button" class="slider__next"></button>`,
            variableWidth: true,
            responsive: [{
                breakpoint: 1440,
                settings: {
                    arrows: false
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    arrows: false
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    arrows: false
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            }]
        });
    }

    if ($('.js-tags-slider').length) {
        function countVisibleTags() {
            // Находим блок .tags
            const tagsContainer = document.querySelector('.tags');
            // Получаем горизонтальную позицию скролла и размеры контейнера
            const scrollLeft = tagsContainer.scrollLeft;
            const containerRect = tagsContainer.getBoundingClientRect();

            // Получаем все дочерние .tag элементы
            const tags = tagsContainer.querySelectorAll('.tag');
            let visibleCount = 0;

            tags.forEach(tag => {
                const tagRect = tag.getBoundingClientRect();

                // Проверяем, не выходит ли элемент за границы слева или справа от видимой области контейнера
                const isFullyVisible = (tagRect.left >= containerRect.left) && (tagRect.right <= containerRect.right);

                // Если элемент полностью видим, учитываем его
                if (isFullyVisible) {
                    visibleCount++;
                }
            });

            return visibleCount;
        }

        console.log(countVisibleTags());

        $('.js-tags-slider').slick({
            infinite: false,
            slidesToShow: countVisibleTags(),
            prevArrow: `<button type="button" class="tags__prev"></button>`,
            nextArrow: `<button type="button" class="tags__next"></button>`,
            variableWidth: true
        });

        $('.js-tags-slider').on('afterChange', function(event, slick, currentSlide){
            $(this).slick('slickSetOption', 'slidesToShow', countVisibleTags(), true);

            console.log('Новое значение slidesToShow:', countVisibleTags());
        });
    }


    $('.js-search__form').click(function() {
        $('.js-search__list').addClass('active')
    });

    $('.js-search__button').click(function(e) {
        if(!$('.js-search').hasClass('active')) {
            $('.js-search').addClass('active')
        } else {
            window.location.href='search-page.html';
        }
    });

    
    $(document).mouseup(function (e){ 
        let div = $(".search:not(.opened)"); 
        if (!div.is(e.target)
            && div.has(e.target).length === 0) { 
            
            $('.search__list').removeClass('active')
            setTimeout(() => {
                div.removeClass('active');
            }, 300);
            
    }

    });


    if ($('.main-posts__slider').length) {
        $('.main-posts__slider').slick({
            dots: true,
            arrows: false
        });
    }

    $('.nav-toggler').click(function () {
        $(this).toggleClass('active');
        $('nav, .header').toggleClass('active')
    })


    let posts = $('.posts').html();

    $('.more-posts').click(function() {
        // console.log(posts);
        $('.posts').append(posts);
    })
    
    
    
    
    
    // подключение видео

    const videoFrame = document.querySelector('.js-video-frame') || false;

    if (videoFrame) {
        const videoId = videoFrame.dataset.id;

        function loadVideo() {
            console.info(`loadVideo called`);

            (function loadYoutubeIFrameApiScript() {
                const tag = document.createElement("script");
                tag.src = "https://www.youtube.com/iframe_api";

                const firstScriptTag = document.getElementsByTagName("script")[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                tag.onload = setupPlayer;
            })();

            let player = null;

            function setupPlayer() {
                window.YT.ready(function() {
                    player = new window.YT.Player('js-video-frame', {
                        height: '714',
                        width: '1272',
                        videoId: videoId,
                        playerVars: {
                            'autoplay': 0, // Автовоспроизведение отключено
                            'controls': 0, // Скрытие элементов управления
                            'showinfo': 0, // Не показывать информацию о видео
                            'modestbranding': 1, // Уменьшенный логотип YouTube
                            'fs': 0, // Скрыть кнопку полноэкранного режима
                            'rel': 0, // Не показывать рекомендованные видео при завершении
                            'iv_load_policy': 3 // Скрыть аннотации в видео
                        },
                        events: {
                            onReady: onPlayerReady,
                            onStateChange: onPlayerStateChange
                        }
                    });
                });
            }

            function onPlayerReady(event) {
                // подставляем картинку-превью
                const imgPreview = document.createElement('img');
                const imgSrc = `http://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                imgPreview.classList.add('office__video-preview');
                imgPreview.setAttribute('src', imgSrc);
                const videoPlaceholder = document.querySelector('.js-video-placeholder');
                videoPlaceholder.insertAdjacentElement('beforebegin', imgPreview);


                let playButton = document.getElementById('js-play-button');

                playButton.addEventListener("click", function() {
                    player.playVideo();
                    setTimeout(function () {
                        videoPlaceholder.classList.add('hidden');
                        imgPreview.classList.add('hidden');
                    }, 300);

                });
            }

            function onPlayerStateChange(event) {
                let videoStatuses = Object.entries(window.YT.PlayerState);
                let status = videoStatuses.find(status => status[1] === event.data)[0];
                if (status === 'PAUSED') {
                    document.querySelector('.js-video-placeholder').classList.remove('hidden');
                }
            }
        }

        if (document.readyState !== "loading") {
            console.info(`document.readyState ==>`, document.readyState);
            loadVideo();
        } else {
            document.addEventListener("DOMContentLoaded", function() {
                console.info(`DOMContentLoaded ==>`, document.readyState);
                loadVideo();
            });
        }

        function get_youtube_thumbnail(url, quality){
            if(url){
                var video_id, thumbnail, result;
                if(result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))
                {
                    video_id = result.pop();
                }
                else if(result = url.match(/youtu.be\/(.{11})/))
                {
                    video_id = result.pop();
                }

                if(video_id){
                    if(typeof quality == "undefined"){
                        quality = 'high';
                    }

                    var quality_key = 'maxresdefault'; // Max quality
                    if(quality == 'low'){
                        quality_key = 'sddefault';
                    }else if(quality == 'medium'){
                        quality_key = 'mqdefault';
                    } else if (quality == 'high') {
                        quality_key = 'hqdefault';
                    }

                    var thumbnail = "http://img.youtube.com/vi/"+video_id+"/"+quality_key+".jpg";
                    return thumbnail;
                }
            }
            return false;
        }
    }

    $('[data-fancybox]').fancybox({
        loop: false,
        buttons: [],
        transitionEffect: "fade",
        infobar: false,
        hideScrollbar: false,
        baseTpl:
            '<div class="fancybox-container fancybox-custom" role="dialog" tabindex="-1">' +
            '<div class="fancybox-bg"></div>' +
            '<div class="fancybox-inner">' +
            '<div class="fancybox-stage"></div>' +
            '</div>' +
        '</div>',
        afterShow: function(instance, current) {
            if (current.isComplete) {
                if (current.$slide.find('.fancybox-custom__close').length) {
                    current.$slide.find('.fancybox-custom__close').remove();
                }

                current.$slide.find('.fancybox-content').append(' ' +
                    '<button data-fancybox-close class="fancybox-custom__close"></button>');

            }

        },
        clickContent: function(current, event) {
            return false;
        },
    });
});
