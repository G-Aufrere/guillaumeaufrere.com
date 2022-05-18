import gsap from 'gsap';
import {
    ScrollTrigger
} from "gsap/ScrollTrigger";
import {
    ScrollToPlugin
} from "gsap/ScrollToPlugin";
import $ from "jquery";

import "../fonts/Avalors.woff2"
import "../fonts/Avalors.woff"
import "../fonts/Avalors.ttf"
import "../fonts/Excon-Regular.ttf"
import "../fonts/Excon-Regular.woff"
import "../fonts/Excon-Regular.woff2"

import LocomotiveScroll from 'locomotive-scroll';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const locoScroll = new LocomotiveScroll({
    el: document.querySelector('.project-container'),
    smooth: true
});

// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".project-container", {
    scrollTop(value) {
        return arguments.length ?
            locoScroll.scrollTo(value, 0, 0) :
            locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".project-container").style.transform ?
        "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


const blackPage = document.querySelector('.preload-black')
const yellowPage = document.querySelector('.preload-yellow')

$(window).on("load", function () {
    $(".loader-wrapper").fadeOut("slow");
    $("body").removeClass("preload");
    const tlLoader = gsap.timeline()

    tlLoader.to(yellowPage, {
        xPercent: -100,
        duration: 1.4,
        ease: "power2.inOut",
    }, ">")
    tlLoader.to(blackPage, {
        xPercent: -100,
        duration: 1.1,
        ease: "power4.inOut"
    }, "<")

    tlLoader.fromTo(".vertical-content", {
        xPercent: -100
    }, {
        xPercent: 0,
        duration: 0.3,
        ease: "power2.inOut"
    }, "<")
});

var hamburger = document.querySelector('.hamburger');
let navLink = document.querySelectorAll('.nav__link');

gsap.set('.line01', {
    x: 40
});
gsap.set('.line03', {
    x: -40
});
gsap.set('.nav', {
    xPercent: -50,
    yPercent: -50
})
gsap.set('.nav li', {
    x: -1500
});

if (window.matchMedia("(min-width: 1281px)").matches) {
    var hamburgerMotion = gsap.timeline()
        .to('.line03', {
            duration: 0.2,
            x: '-=40'
        }, 0)
        .to('.line01', {
            duration: 0.2,
            x: '+=40'
        }, 0)
        .from('.menu', {
            xPercent: -100,
            duration: 0.3
        }, 0.5)
        .to('.menu', {
            xPercent: 100,
            duration: 0.3,
            autoAlpha: 1,
            //x: -500
        }, 0.5)
        .to('.home', {
            duration: 0.2,
            x: -400,
            ease: "sine.out",
            stagger: 0.2
        }, ">")
        .to('.about', {
            duration: 0.2,
            x: -150,
            ease: "sine.out",
            stagger: 0.2
        }, ">")
        .to('.works', {
            duration: 0.2,
            x: 100,
            ease: "sine.out",
            stagger: 0.2
        }, ">")
        .to('.contact', {
            duration: 0.2,
            x: 350,
            ease: "sine.out",
            stagger: 0.2
        }, ">")
        .to('.nav li', {
            duration: 0.3,
            marginBottom: '40px'
        })
        .reverse()
    hamburger.addEventListener('click', function (e) {
        hamburgerMotion.reversed(!hamburgerMotion.reversed());
    });
} else if (window.matchMedia("(min-width: 1200px)").matches) {
    var hamburgerMotion = gsap.timeline()
        .to('.line03', {
            duration: 0.2,
            x: '-=40'
        }, 0)
        .to('.line01', {
            duration: 0.2,
            x: '+=40'
        }, 0)
        .from('.menu', {
            xPercent: -100,
            duration: 0.3
        }, 0.5)
        .to('.menu', {
            xPercent: 100,
            duration: 0.3,
            autoAlpha: 1,
            //x: -500
        }, 0.5)
        .to('.home', {
            duration: 0.2,
            x: -325,
            ease: "sine.out",
            stagger: 0.2
        }, ">")
        .to('.about', {
            duration: 0.2,
            x: -175,
            ease: "sine.out",
            stagger: 0.2
        }, ">")
        .to('.works', {
            duration: 0.2,
            x: 15,
            ease: "sine.out",
            stagger: 0.2
        }, ">")
        .to('.contact', {
            duration: 0.2,
            x: 230,
            ease: "sine.out",
            stagger: 0.2
        }, ">")
        .to('.nav li', {
            duration: 0.3,
            marginBottom: '40px'
        })
        .reverse()
    hamburger.addEventListener('click', function (e) {
        hamburgerMotion.reversed(!hamburgerMotion.reversed());
    });

} else {
    var hamburgerMotion = gsap.timeline()
        .to('.line03', {
            duration: 0.4,
            x: '-=40'
        }, 0)
        .to('.line01', {
            duration: 0.4,
            x: '+=40'
        }, 0)
        .from('.menu', {
            xPercent: -100,
            duration: 0.5
        }, 0.5)
        .to('.menu', {
            xPercent: 100,
            duration: 0.5,
            autoAlpha: 1,
            //x: -500
        }, 0.5)
        .to('.home', {
            duration: 0.4,
            x: 0,
            ease: "sine.out",
            stagger: 0.2
        }, ">")
        .to('.about', {
            duration: 0.4,
            x: 0,
            ease: "sine.out",
            stagger: 0.2
        }, ">")
        .to('.works', {
            duration: 0.4,
            x: 0,
            ease: "sine.out",
            stagger: 0.2
        }, ">")
        .to('.contact', {
            duration: 0.4,
            x: 0,
            ease: "sine.out",
            stagger: 0.2
        }, ">")
        .to('.nav li', {
            duration: 0.5,
            marginBottom: '40px'
        })
        .reverse()

    hamburger.addEventListener('click', function (e) {
        hamburgerMotion.reversed(!hamburgerMotion.reversed());
    });
}

navLink.forEach(function (elem) {
    elem.addEventListener('click', function (e) {
        hamburgerMotion.reversed(true);
    })
});

// CUSTOM CURSOR //

const cursor = document.querySelector('#cursor');
const cursorCircle = cursor.querySelector('.cursor__circle');

const mouse = {
    x: -100,
    y: -100
}; // mouse pointer's coordinates
const pos = {
    x: 0,
    y: 0
}; // cursor's coordinates
const speed = 0.1; // between 0 and 1

const updateCoordinates = e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

window.addEventListener('mousemove', updateCoordinates);

function getAngle(diffX, diffY) {
    return Math.atan2(diffY, diffX) * 180 / Math.PI;
}

function getSqueeze(diffX, diffY) {
    const distance = Math.sqrt(
        Math.pow(diffX, 2) + Math.pow(diffY, 2)
    );
    const maxSqueeze = 0.15;
    const accelerator = 1500;
    return Math.min(distance / accelerator, maxSqueeze);
}


const updateCursor = () => {
    const diffX = Math.round(mouse.x - pos.x);
    const diffY = Math.round(mouse.y - pos.y);

    pos.x += diffX * speed;
    pos.y += diffY * speed;

    const angle = getAngle(diffX, diffY);
    const squeeze = getSqueeze(diffX, diffY);

    const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) + ')';
    const rotate = 'rotate(' + angle + 'deg)';
    const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

    cursor.style.transform = translate;
    cursorCircle.style.transform = rotate + scale;
};

function loop() {
    updateCursor();
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

const cursorModifiers = document.querySelectorAll('[cursor-class]');

cursorModifiers.forEach(curosrModifier => {
    curosrModifier.addEventListener('mouseenter', function () {
        const className = this.getAttribute('cursor-class');
        cursor.classList.add(className);
    });

    curosrModifier.addEventListener('mouseleave', function () {
        const className = this.getAttribute('cursor-class');
        cursor.classList.remove(className);
    });
});

// DARK MODE

const label = document.querySelector('.label');
const darkPara = document.querySelector('.dark-para');
const button = document.querySelector('#checkbox');

label.addEventListener('mouseover', () => {
    darkPara.style.display = 'block';
});

label.addEventListener('mouseleave', () => {
    darkPara.style.display = 'none';
});

if (localStorage.getItem('mode')) {
    if (localStorage.getItem('mode') == 'dark') {
        modeSombre();
    }
}

button.addEventListener('change', () => {
    if (document.body.classList.contains('dark')) {
        document.body.className = '';
        darkPara.textContent = 'Dark mode';
        localStorage.setItem('mode', 'light');
    }
    else {
        modeSombre();
    }
});

function modeSombre() {
    document.body.className = 'dark';
    darkPara.textContent = 'Light mode';
    localStorage.setItem('mode', 'dark');
}