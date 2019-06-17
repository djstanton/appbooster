var vidElem = null;
var isMobile = window.innerWidth < 721;
var parts = null;

document.addEventListener("DOMContentLoaded", function(event) {
    var slider = tns({
        container: '.js-top-slider',
        items: 1,
        slideBy: 'page',
        autoplay: true,
        controls: false,
        mouseDrag: true,
        speed: 800
    });

    generateNav();

    var items = document.querySelectorAll('.js-section');
    var links = document.querySelectorAll('.js-nav-link');
    var timeout = 0;

    parts = document.querySelectorAll('.js-part');

    links[0].classList.add('active');

    document.addEventListener("scroll", function() {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            links.forEach(function (value) {
                value.classList.remove('active');
            });

            var height = 0;

            // switch

            if(window.scrollY < 500) {
                links[0].classList.add('active')
            }

            if(window.scrollY >= 750 && window.scrollY <= 1200) {
                links[1].classList.add('active')
            }

            if(window.scrollY >= 1700 && window.scrollY <= 3327) {
                links[2].classList.add('active')
            }

            if(window.scrollY >= 3455 && window.scrollY <= 5900) {
                links[3].classList.add('active')
            }

            if(window.scrollY >= 6100 && window.scrollY <= 7000) {
                links[4].classList.add('active')
            }

            if(window.scrollY >= 7000 && window.scrollY <= 7400) {
                links[5].classList.add('active')
            }

            if(window.scrollY >= 7615 && window.scrollY <= 8433) {
                links[6].classList.add('active')
            }

            if(window.scrollY >= 8500 && window.scrollY <= 9206) {
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
    vidElem.addEventListener("ended", function () {
            vidElem.currentTime = 2.11;
            vidElem.play();
    }, false);
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
