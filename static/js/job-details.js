$(document).ready(function() {
    let $hiddenMedia = $('.hidden-media img');

    if ($hiddenMedia.length > 0) {
        var $cardDetailsImages = $(".card-details__images");
        $cardDetailsImages.append('' +
            '<div class="card-details__images-big">' +
            '   <img src="" id="big-img">' +
            '</div>' +
            '<div class="card-details__images-thumbs mb-16"></div>');

        var $thumbs = $cardDetailsImages.find('.card-details__images-thumbs');
        var extraImagesCount = 0;

        $hiddenMedia.each(function(index) {
            if (index < 5) {
                if ($(this).hasClass('video')) {
                    $thumbs.append('' +
                        '<div class="thumbnail video">' +
                        '   <img src="' + $(this).attr('src') + '">' +
                        '</div>');
                } else {
                    $thumbs.append('' +
                        '<div class="thumbnail">' +
                        '   <img src="' + $(this).attr('src') + '">' +
                        '</div>');
                }

            }
            if (index == 5) {
                if ($(this).hasClass('video')) {
                    $thumbs.append('' +
                        '<div class="thumbnail more video">' +
                        '   <img src="' + $(this).attr('src') + '">' +
                        '   <span class="other-photos-count"></span>' +
                        '</div>');
                } else {
                    $thumbs.append('' +
                        '<div class="thumbnail more">' +
                        '   <img src="' + $(this).attr('src') + '">' +
                        '   <span class="other-photos-count"></span>' +
                        '</div>');
                }

            }
            if (index > 5) {
                extraImagesCount++;
            }
        });

        if (extraImagesCount > 0) {
            $thumbs.find('.other-photos-count').text('+' + extraImagesCount);
        }

        $(".thumbnail").click(function() {
            let imgSrc = $(this).find('img').attr('src');
            $('.card-details__images-big').css('background-image', 'url(' + imgSrc + ')');
            $('#big-img').attr('src', imgSrc);

            if ($(this).hasClass('video')) {
                $('.card-details__images-big').addClass('video');
            } else {
                $('.card-details__images-big').removeClass('video');
            }
        });

        $(".card-details__images-big, .more").click(function() {
            let currentSrc = $('#big-img').attr('src');
            let startIndex = $hiddenMedia.toArray().findIndex(img => $(img).attr('src') === currentSrc);

            $.fancybox.open(
                $hiddenMedia.toArray().map(function(img) {
                    if ($(img).hasClass('video')) {
                        return { src: $(img).data('video') };
                    } else {
                        return { src: $(img).attr('src') };
                    }
                }),
                {
                    loop: true,
                    index: startIndex,
                    buttons: [],
                    transitionEffect: "fade",
                    infobar: true,
                    afterShow: function(instance, current) {
                        if (current.isComplete) {
                            if (current.$slide.find('.custom-addition').length) {
                                current.$slide.find('.custom-addition').remove();
                            }

                            current.$slide.find('.fancybox-content').append('' +
                                '<div class="fancybox-custom__bottom-info custom-addition">' +
                                '   <p>' + $(".card-details__title").text() + '</p>'+
                                '   <div class="d-flex align-items-center justify-content-center gap-10">' +
                                '       <button class="user-info__call">' +
                                '           <img src="/static/images/icons/call-icon.svg" alt="Call">' +
                                '           <span>Call</span>' +
                                '       </button>' +
                                '       <button class="user-info__start-chat">' +
                                '           <img src="/static/images/icons/chat-icon.svg" alt="Start chat">' +
                                '           <span>Start chat</span>' +
                                '       </button>' +
                                '       <button class="user-info__whatsapp">' +
                                '           <img src="/static/images/icons/whatsapp-icon.svg" alt="Whatsapp">' +
                                '       </button>' +
                                '   </div> ' +
                                '</div>');

                            current.$slide.find('.fancybox-content').append('' +
                                '<button data-fancybox-close class="fancybox-custom__close custom-addition">' +
                                '   <img src="/static/images/icons/close-circle.svg" alt="Close">' +
                                '</button>' +
                                '');

                            current.$slide.find('.fancybox-content').append('' +
                                '<button data-fancybox-prev class="fancybox-custom__prev custom-addition">' +
                                '   <img src="/static/images/icons/arrow-right-white.svg">' +
                                '</button>');

                            current.$slide.find('.fancybox-content').append('' +
                                '<button data-fancybox-next class="fancybox-custom__next custom-addition">' +
                                '   <img src="/static/images/icons/arrow-right-white.svg">' +
                                '</button>');
                        }

                    },
                    clickContent: function(current, event) {
                        return false;
                    },
                }
            );
        });

        setTimeout(function() {
            $(".thumbnail:first").trigger('click');
        }, 500);
    } else {
        var $cardDetailsImages = $(".card-details__images");
        $cardDetailsImages.append('' +
            '<div class="card-details__images-big no-image"></div>');
    }

    $('.contractor-modal__phone').click(function() {
        const $this = $(this);
        const phone = $(this).find('span').text();
        let temp = $("<input>");
        $("body").append(temp);
        temp.val(phone).select();
        document.execCommand("copy");
        temp.remove();
        $this.addClass('copied');
        setTimeout(function () {
            $this.removeClass('copied');
        }, 2000);
    });

    const modalOverlay = document.querySelector('.contractor-modal-overlay') || false;

    if (modalOverlay) {
        $('#call-modal-open').on('click', function () {
            $(modalOverlay).addClass('show');
        });

        $('#close-contractor-modal').on('click', function () {
            $(modalOverlay).removeClass('show');
        });

        modalOverlay.addEventListener( 'click', (e) => {
            const withinBoundaries = e.composedPath().includes(modalOverlay.querySelector('.contractor-modal'));

            if (!withinBoundaries) {
                modalOverlay.classList.remove('show');
            }
        });
    }


    let viewsChartElement = document.getElementById('views') || false;
    if (viewsChartElement) {
        let viewsChartData;

        $.ajax({
            url: 'https://everlook.ae/profile/dashboard/?graph=views',
            method: 'GET',
            success: function (data) {
                viewsChartData = data;
            }
        });

        var ctxViewsChart = document.getElementById('views').getContext('2d');
        var viewsChart = new Chart(ctxViewsChart, {
            type: 'line',
            data: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets: [{
                    data: viewsChartData,
                    fill: true,
                    tension: 0.5,
                    backgroundColor: '#DFE9FF',
                    borderColor: '#8CA8E2',
                    borderWidth: 2,
                    pointRadius: 0
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                }
            }
        });

        var totalViewsSum = viewsChart.data.datasets[0].data.reduce((a, b) => a + b, 0);
        document.getElementById('jobs-count').innerHTML = totalViewsSum + '<span class="green">+12</span>';
    }
});
