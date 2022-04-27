import gsap from 'gsap';
import {
    ScrollTrigger
} from "gsap/ScrollTrigger";
import {
    ScrollToPlugin
} from "gsap/ScrollToPlugin";
import CSSRulePlugin from 'gsap/CSSRulePlugin';
import $ from "jquery";

import Accueil_Rmstudio from '../medias/Accueil_Rmstudio.mp4';
import Scrolldown from '../medias/Scrolldown.mp4';
import openProjects from '../medias/openProjects.mp4';
import Accueil_Pegaseprod from '../medias/Accueil_Pegaseprod.mp4';
import Locaux_Pegaseprod from '../medias/Locaux_Pegaseprod.mp4';
import Decors_Pegaseprod from '../medias/Decors_Pegaseprod.mp4';

import "../fonts/Avalors.woff2"
import "../fonts/Avalors.woff"
import "../fonts/Avalors.ttf"
import "../fonts/Excon-Regular.ttf"
import "../fonts/Excon-Regular.woff"
import "../fonts/Excon-Regular.woff2"

import "../css/app.scss"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CSSRulePlugin);

//Section Pinning
ScrollTrigger.matchMedia({
    "(min-width: 1200px)": function () {
        gsap.utils.toArray(".section").forEach((section) => {
                if (section.classList.contains('horizontal')) {
                    const containersWrap = section.querySelector('.section__containers')
                    const oneContainer = section.querySelector('.section__container')
                    gsap.to(containersWrap, {
                        //x: () => { return -( (cardsWrap.scrollWidth - window.innerWidth + window.innerWidth*0.05) + (window.innerWidth/2 - oneCard.offsetWidth/2) ) },
                        x: () => {
                            return -(containersWrap.scrollWidth - oneContainer.offsetWidth)
                        },
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: () => "center center",
                            end: () => "+=" + (containersWrap.scrollWidth - oneContainer.offsetWidth),
                            scrub: 2,
                            pin: true,
                            invalidateOnRefresh: true,
                            anticipatePin: 0,
                        },
                    });
                } else {
                    ScrollTrigger.create({
                        trigger: section,
                        start: () => "top top",
                        end: "+=100px",
                        scrub: 2,
                        pin: true,
                        anticipatePin: 0,
                        //pinSpacing: true
                    });
                }
            }),
            gsap.to('.about_title', {
                scrollTrigger: {
                    trigger: '#about',
                    start: 'top center',
                },
                x: 900,
                duration: 0.8,
            }),
            gsap.to('.work_title', {
                scrollTrigger: {
                    trigger: '#works',
                    start: 'top center',
                },
                x: 850,
                duration: 0.9,
            })

        //TIMELINE WORKS SECTION

        const tlWorks = gsap.timeline({
            scrollTrigger: {
                trigger: '#works',
                start: 'top center-=200px'
            }
        })

        tlWorks.fromTo(".img-project", {
            xPercent: 150
        }, {
            xPercent: 0,
            duration: 1,
            ease: "power2.inOut"
        })

        tlWorks.fromTo(".title-first-project", {
            xPercent: 150
        }, {
            xPercent: 0,
            duration: 0.8,
            ease: "power2.inOut"
        }, ">-0.3")

        tlWorks.fromTo(".button--surtur", {
            xPercent: 150
        }, {
            xPercent: 0,
            duration: 0.8,
            ease: "power2.inOut"
        }, ">-0.3")
    },
    "(min-width: 2000px)": function () {
        gsap.to('.about_title', {
                scrollTrigger: {
                    trigger: '#about',
                    start: 'top center',
                },
                x: 1450,
                duration: 0.8,
            }),
            gsap.to('.work_title', {
                scrollTrigger: {
                    trigger: '#works',
                    start: 'top center',
                },
                x: 1450,
                duration: 0.9,
            })
    }
});


//TIMELINE ABOUT SECTION

const tlAbout = gsap.timeline({
    scrollTrigger: {
        trigger: '#about',
        start: 'top center'
    }
});

// tlAbout.to("#about", {
//     duration: 1,
//     backgroundColor: "#dfb018",
//     ease: "none"
// })

tlAbout.to(".first_para", {
    opacity: 1,
    duration: 0.3,
}, ">-0.5")

tlAbout.to(".second_para", {
    opacity: 1,
    duration: 0.3,
})

tlAbout.to(".third_para", {
    opacity: 1,
    duration: 0.3,
})

gsap.to('#works', {
    scrollTrigger: {
        trigger: '#works',
        start: 'top center'
    },
    duration: 1,
    //backgroundColor: "#faf9f9",
    //backgroundColor: "#e1dfdd",
    ease: "none"
})

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

//SKEW IMAGES

let proxy = {
        skew: 0
    },
    skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"), // fast
    clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees. 

ScrollTrigger.create({
    onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -300);
        // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
                skew: 0,
                duration: 0.8,
                ease: "power3",
                overwrite: true,
                onUpdate: () => skewSetter(proxy.skew)
            });
        }
    }
});

/*make the right edge "stick" to the scroll bar. force3D: true improves performance*/
gsap.set(".skewElem", {
    transformOrigin: "right center",
    force3D: true
});

//TEXT ACCUEIL ANIMATION

if (window.matchMedia("(min-width: 1200px)").matches) {
    let elements = document.querySelectorAll('.rolling-text');

    elements.forEach(element => {
        let innerText = element.innerText;
        element.innerHTML = '';

        let textContainer = document.createElement('div');
        textContainer.classList.add('block');

        for (let letter of innerText) {
            let span = document.createElement('span');
            span.innerText = letter.trim() === '' ? '\xa0' : letter;
            span.classList.add('letter');
            textContainer.appendChild(span);
        }

        element.appendChild(textContainer);
        element.appendChild(textContainer.cloneNode(true));
    });

    elements.forEach(element => {
        element.addEventListener('mouseover', () => {
            element.classList.remove('play');
        });
    });
}

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

    tlLoader.fromTo(".title_top", {
        autoAlpha: 0
    }, {
        autoAlpha: 1,
        duration: 0.4
    }, ">")

    tlLoader.fromTo(".title_midtop", {
        autoAlpha: 0
    }, {
        autoAlpha: 1,
        duration: 0.4
    }, ">-0.2")

    tlLoader.fromTo(".title_midbottom", {
        autoAlpha: 0
    }, {
        autoAlpha: 1,
        duration: 0.4
    }, ">-0.2")

    tlLoader.fromTo(".title_bottom", {
        autoAlpha: 0
    }, {
        autoAlpha: 1,
        duration: 0.4
    }, ">-0.2")

    tlLoader.fromTo(".vertical-content", {
        xPercent: -100
    }, {
        xPercent: 0,
        duration: 0.3,
        ease: "power2.inOut"
    }, "<")

    tlLoader.fromTo(".btn-circle", {
        xPercent: 120
    }, {
        xPercent: 0,
        duration: 0.5,
        ease: "power2.inOut"
    })
});