var vidElem = null;
var isMobile = window.innerWidth < 721;
var parts = null;

document.addEventListener("DOMContentLoaded", function(event) {
    var sliderContainer = document.querySelector('.js-top-slider');

    if(sliderContainer) {
        var slider = tns({
            container: '.js-top-slider',
            items: 1,
            slideBy: 'page',
            autoplay: true,
            controls: false,
            mouseDrag: true,
            speed: 800
        });
    }

    var chartContainer = document.querySelector('#container');

    if(chartContainer) {
        Highcharts.chart('container', {
            title: {
                text: ''
            },
            yAxis: {
                max: 7,
                visible: false,
                labels: {
                    enabled: false
                },
            },
            credits: {
                enabled: false
            },
            xAxis: {
                visible: false,
                labels: {
                    enabled: false
                },
            },

            legend: {
                enabled: false
            },
            exporting: {
                enabled: false,
            },
            series: [{
                title: 'Рейтинг',
                data: [2, 2.7, 2.7, 3.7, 4.1, 4.7],
                tooltip: {
                    headerFormat: '',
                    pointFormat: '<div class="svg-icon svg-star-orange svg-star-orange-dims">  <b>{point.y}</b><br/>'
                }
            }],
            chart: {
                backgroundColor: 'transparent'
            },
            plotOptions: {

                line: {
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: true,
                                fillColor: '#ffffff'
                            }
                        }
                    },
                    color: '#f5a623',
                    label: {
                        enabled: false
                    }
                },
                series: {
                    shadow: true
                },
                bullet: {
                    visible: false
                }
            },

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });
    }

    var menuBtns = document.querySelectorAll('.js-toggle-menu');
    var topCutBtn = document.querySelector('.js-cut-top-btn');
    var topCutBtn2 = document.querySelector('.js-cut-btn');
    var topCut = document.querySelector('.js-cut-top');
    var topCut2 = document.querySelector('.js-cut');
    var actionBtn = document.querySelectorAll('.js-action');
    var ppCloseBtn = document.querySelector('.js-close-pp');
    var ppAcceptBtn = document.querySelector('.js-accept-pp');
    var ppWrap = document.querySelector('.js-pp-wrap');

    if(!sessionStorage.getItem('ppAccepted')) {
        ppWrap.classList.add('shown');
    }

    parts = document.querySelectorAll('.js-part');


    if(menuBtns.length) {
        for (var i = 0; i < menuBtns.length; i++) {
            menuBtns[i].addEventListener("click", toggleMenu);
        }
    }

    if(actionBtn.length) {
        for (var i = 0; i < actionBtn.length; i++) {
            actionBtn[i].addEventListener("click", toggleRegistrationPopup);
        }
    }


    if(topCutBtn) {
        topCutBtn.addEventListener("click", function () {
            topCut.classList.add('shown');
            topCutBtn.classList.add('hidden');
        });

    }

    if(ppCloseBtn) {
        ppCloseBtn.addEventListener("click", function () {
            ppWrap.classList.remove('shown');
        });
    }

    if(ppAcceptBtn) {
        ppAcceptBtn.addEventListener("click", function () {
            ppWrap.classList.remove('shown');
            sessionStorage.setItem('ppAccepted', true);
        });
    }

    if(topCutBtn2) {
        topCutBtn2.addEventListener("click", function () {
            topCut2.classList.add('shown');
            topCutBtn2.classList.add('hidden');
        });
    }
    
    vidElem = document.getElementsByTagName('video')[0];

    if(vidElem) {
        vidElem.addEventListener("ended", function () {
            vidElem.currentTime = 2.11;
            vidElem.play();
        }, false);
    }
});

function checkThingItem() {
    if(parts) {
        var itemHeight = 117;
        var point = (window.scrollY + window.innerHeight/2) + itemHeight;

        parts.forEach(function(value) {
            value.classList.remove('active');
            var boundsTop = value.offsetParent.offsetTop + value.offsetTop;
            var boundsBottom = value.offsetParent.offsetTop + value.offsetTop + value.offsetHeight;

            if(boundsBottom > point && boundsTop < point) {
                if(!value.classList.contains('active')) {
                    value.classList.add('active');
                }
            } else {
                value.classList.remove('active');
            }


            // console.log(boundsTop, boundsBottom, window.scrollY + window.innerHeight/2);
        });
    }
}

function toggleMenu() {
    var overlay = document.querySelector('.js-menu-overlay');

    if(overlay.classList.contains('shown')) {
        overlay.classList.remove('shown');
    } else {
        overlay.classList.add('shown');
    }
}

function toggleRegistrationPopup() {
    var overlay = document.querySelector('.js-reg-overlay');

    if(overlay.classList.contains('shown')) {
        overlay.classList.remove('shown');
    } else {
        overlay.classList.add('shown');
    }
}