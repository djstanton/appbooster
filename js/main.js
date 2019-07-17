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

    generateNav();

    var menuBtns = document.querySelectorAll('.js-toggle-menu');
    var items = document.querySelectorAll('.js-section');
    var links = document.querySelectorAll('.js-nav-link');
    var topCutBtn = document.querySelector('.js-cut-top-btn');
    var topCutBtn2 = document.querySelector('.js-cut-btn');
    var topCut = document.querySelector('.js-cut-top');
    var topCut2 = document.querySelector('.js-cut');
    var actionBtn = document.querySelectorAll('.js-action');
    var ppCloseBtn = document.querySelector('.js-close-pp');
    var ppAcceptBtn = document.querySelector('.js-accept-pp');
    var ppWrap = document.querySelector('.js-pp-wrap');
    var timeout = 0;

    if(!sessionStorage.getItem('ppAccepted')) {
        ppWrap.classList.add('shown');
    }

    parts = document.querySelectorAll('.js-part');

    links[0].classList.add('active');

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

    document.addEventListener("scroll", function() {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            if(!links.length) {
                return;
            }

            links.forEach(function (value) {
                value.classList.remove('active');
            });


            var height = 0;

            // switch

            if(window.scrollY < 750) {
                links[0].classList.add('active')
            }

            if(window.scrollY >= 750 && window.scrollY <= 1700) {
                links[1].classList.add('active')
            }

            if(window.scrollY >= 1700 && window.scrollY <= 3455) {
                links[2].classList.add('active')
            }

            if(window.scrollY >= 3455 && window.scrollY <= 6100) {
                links[3].classList.add('active')
            }

            if(window.scrollY >= 6100 && window.scrollY <= 7000) {
                links[4].classList.add('active')
            }

            if(window.scrollY >= 7000 && window.scrollY <= 7615) {
                links[5].classList.add('active')
            }

            if(window.scrollY >= 7615 && window.scrollY <= 8500) {
                links[6].classList.add('active')
            }

            if(window.scrollY >= 8500 && window.scrollY <= 9500) {
                links[7].classList.add('active')
            }

            if(window.scrollY >= 9500 && window.scrollY <= 10148) {
                links[8].classList.add('active')
            }

            // items.forEach(function (value) {
            //     var inView = isAnyPartOfElementInViewport(value);
            //
            //     if(inView) {
            //         var idx = value.dataset.section;
            //         var clientRect = value.getBoundingClientRect();
            //         if(height < (clientRect.height - Math.abs((clientRect.top)))) {
            //             if(parseInt(idx) > 0) {
            //                 links[idx - 1].classList.remove('active');
            //                 links[idx].classList.add('active');
            //             } else {
            //                 links[idx].classList.add('active');
            //             }
            //         } else {
            //             if(parseInt(idx) > 0) {
            //                 links[idx - 1].classList.add('active');
            //             }
            //             links[idx].classList.remove('active');
            //         }
            //
            //         height = clientRect.height - Math.abs((clientRect.top));
            //     }
            // })

            if(isMobile) {
                checkThingItem();
            }
        }, 20)
    });
    
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

function generateNav() {
    var sections = document.querySelectorAll('.js-section');
    var sectionsCount = sections.length;
    var navContainer = document.querySelector('.js-nav-wrap');
    var navList = document.createDocumentFragment();

    for(var i = 0; i < sectionsCount; i++) {
        var li = document.createElement('li');
        li.dataset.idx = i;
        li.classList.add('js-nav-link','ab__section-nav-link');
        li.onclick = function () {
            var target = sections[this.dataset.idx];

            animate(document.scrollingElement || document.documentElement, "scrollTop", "", window.scrollY, target.offsetTop, 300, true);
        };
        navList.appendChild(li);
    }

    navContainer.appendChild(navList);
}

function isAnyPartOfElementInViewport(el) {

    const rect = el.getBoundingClientRect();
    // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 100);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 100);

    if(vertInView && horInView) {
        return {el: el, vertInView: vertInView};
    } else {
        return (vertInView && horInView);
    }

}

function animate(elem, style, unit, from, to, time, prop) {
    if (!elem) {
        return;
    }
    var start = new Date().getTime(),
        timer = setInterval(function () {
            var step = Math.min(1, (new Date().getTime() - start) / time);
            if (prop) {
                elem[style] = (from + step * (to - from))+unit;
            } else {
                elem.style[style] = (from + step * (to - from))+unit;
            }
            if (step === 1) {
                clearInterval(timer);
            }
        }, 25);
    if (prop) {
        elem[style] = from+unit;
    } else {
        elem.style[style] = from+unit;
    }
}
