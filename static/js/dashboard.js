let viewsChartElement = document.getElementById('views') || false;
let jobsChartElement = document.getElementById('jobs') || false;

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
    document.getElementById('views-count').innerHTML = totalViewsSum + '<span class="green">+12</span>';
}


if (jobsChartElement) {
    var ctxJobsChart = document.getElementById('jobs').getContext('2d');
    var jobsChart = new Chart(ctxJobsChart, {
        type: 'line',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                data: [6, 6, 7, 23, 2, 22, 7],
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

    var totalJobsSum = jobsChart.data.datasets[0].data.reduce((a, b) => a + b, 0);
    document.getElementById('jobs-count').innerHTML = totalJobsSum + '<span class="red">-4</span>';
}




$('.js-more').on('click', function () {
    $(this).toggleClass('active');
    $('.js-actions').hide();
    $(this).siblings('.js-actions').toggle();
});

$(document).mouseup( function(e){
    let div = $('.js-actions');
    if ( !div.is(e.target) && div.has(e.target).length === 0 ) {
        div.hide();
    }
});

