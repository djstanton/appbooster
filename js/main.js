var vidElem = null;

document.addEventListener("DOMContentLoaded", function(event) {
    var slider = tns({
        container: '.js-top-slider',
        items: 1,
        slideBy: 'page',
        autoplay: true,
        controls: false
    });

    generateNav();

    var items = document.querySelectorAll('.js-section');
    var links = document.querySelectorAll('.js-nav-link');
    var timeout = 0;

    document.addEventListener("scroll", function() {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            links.forEach(function (value) {
                value.classList.remove('active');
            });

            var height = 0;

            items.forEach(function (value) {
                var inView = isAnyPartOfElementInViewport(value);


                if(isAnyPartOfElementInViewport(value)) {
                    var idx = value.dataset.section;

                    if(height < (value.getBoundingClientRect().height - Math.abs((value.getBoundingClientRect().top)))) {
                        if(parseInt(idx) > 0) {
                            links[idx - 1].classList.remove('active');
                            links[idx].classList.add('active');
                        } else {
                            links[idx].classList.add('active');
                        }
                    } else {
                        if(parseInt(idx) > 0) {
                            links[idx - 1].classList.add('active');
                        }
                        links[idx].classList.remove('active');
                    }

                    height = value.getBoundingClientRect().height - Math.abs((value.getBoundingClientRect().top));
                }
            })

        }, 20)
    });
    
    vidElem = document.getElementsByTagName('video')[0];
    vidElem.addEventListener("ended", function () {
            vidElem.currentTime = 2.07;
            vidElem.play();
    }, false);
});

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
