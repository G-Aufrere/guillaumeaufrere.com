import gsap from 'gsap';
import {
    ScrollTrigger
} from "gsap/ScrollTrigger";
import {
    ScrollToPlugin
} from "gsap/ScrollToPlugin";
import CSSRulePlugin from 'gsap/CSSRulePlugin';
import $ from "jquery";
import * as THREE from 'three';
import images from './images'
import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';

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

import LocomotiveScroll from 'locomotive-scroll';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CSSRulePlugin);

const locoScroll = new LocomotiveScroll({
    el: document.querySelector('#mainContent'),
    smooth: true
});

// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#mainContent", {
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
    pinType: document.querySelector("#mainContent").style.transform ?
        "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


ScrollTrigger.matchMedia({
    "(min-width: 1200px)": function () {

        gsap.to('.about_title', {
                scrollTrigger: {
                    trigger: '#about',
                    start: 'top center',
                    scroller: '#mainContent',
                },
                x: 900,
                duration: 0.8,
                opacity: 1
            }),
            gsap.to('.work_title', {
                scrollTrigger: {
                    trigger: '#works',
                    start: 'top center',
                    scroller: '#mainContent',
                },
                x: -850,
                duration: 0.9,
                opacity: 1
            });

        const tlBigText = gsap.timeline({
            scrollTrigger: {
                trigger: '.sliding-text',
                scroller: '#mainContent',
                start: 'bottom bottom',
            }
        });

        tlBigText.fromTo('.title-slide', {
            y: '120%'
        }, {
            y: '0%',
            stagger: 0.2,
            duration: 1,
            ease: 'power3.inOut'
        })

        //TIMELINE ABOUT SECTION

        const tlAbout = gsap.timeline({
            scrollTrigger: {
                trigger: '#about',
                start: 'top bottom',
                end: 'center center-=100px',
                scroller: '#mainContent',
                scrub: 1
            }
        });

        tlAbout.from(".grid2", {
            y: -100,
            duration: 1,
            ease: "power2.inOut",
        }, "<")

        tlAbout.from(".grid3", {
            y: -150,
            duration: 1,
            ease: "power2.inOut",
        }, "<")

        tlAbout.from(".grid4", {
            y: -250,
            duration: 1,
            ease: "power2.inOut",
        }, "<")

        tlAbout.from(".grid5", {
            y: -250,
            duration: 1,
            ease: "power2.inOut",
        }, "<")

        tlAbout.from(".grid6", {
            y: -350,
            duration: 1,
            ease: "power2.inOut",
        }, "<")

        //TIMELINE WORKS SECTION

        const tlWorks = gsap.timeline({
            scrollTrigger: {
                trigger: '#works',
                scroller: '#mainContent',
                start: 'top center',
            }
        })

        tlWorks.fromTo('.span-works', {
            y: '180%'
        }, {
            y: '0%',
            stagger: 0.20,
            duration: 1,
            ease: 'power3.inOut'
        })

        //TIMELINE CONTACT SECTION

        const tlContact = gsap.timeline({
            scrollTrigger: {
                trigger: '#contact',
                start: 'top bottom-=50px',
                scroller: '#mainContent',
            }
        })

        tlContact.fromTo('.span-contact', {
            y: '100%'
        }, {
            y: '0%',
            stagger: 0.05,
            duration: 1,
            ease: 'power3.inOut'
        })
        tlContact.fromTo('.span-question', {
            y: '110%'
        }, {
            y: '0%',
            stagger: 0.1,
            duration: 0.5,
            ease: 'power2.inOut'
        }, ">-0.8")
    },
    "(min-width: 2000px)": function () {
        gsap.to('.about_title', {
                scrollTrigger: {
                    trigger: '#about',
                    start: 'top center',
                    scroller: '#mainContent'
                },
                x: 1450,
                duration: 0.8,
            }),
            gsap.to('.work_title', {
                scrollTrigger: {
                    trigger: '#works',
                    start: 'top center',
                    scroller: '#mainContent'
                },
                x: -1250,
                duration: 0.9,
            });

        const tlBigText = gsap.timeline({
            scrollTrigger: {
                trigger: '.sliding-text',
                scroller: '#mainContent',
                start: 'bottom bottom',
                scrub: 1
            }
        });

        // tlBigText.fromTo('.sliding-text', {
        //     x: 2800
        // }, {
        //     x: -5000,
        //     ease: "none",
        // })
    }
});

gsap.to('#works', {
    scrollTrigger: {
        trigger: '#works',
        start: 'top center'
    },
    duration: 1,
    ease: "none"
})

var hamburger = document.querySelector('.hamburger');
let navLink = document.querySelectorAll('.nav__link');


//LINKS SCROLLTO

const home = document.querySelector('#home')
const about = document.querySelector('#about')
const works = document.querySelector('#works')
const contact = document.querySelector('#contact')

navLink[0].addEventListener('click', function () {
    locoScroll.scrollTo(home)
})
navLink[1].addEventListener('click', function () {
    locoScroll.scrollTo(about)
})
navLink[2].addEventListener('click', function () {
    locoScroll.scrollTo(works)
})
navLink[3].addEventListener('click', function () {
    locoScroll.scrollTo(contact)
})
document.querySelector('.back-arrow').addEventListener('click', function () {
    locoScroll.scrollTo(home)
})
document.querySelector('.btn-circle').addEventListener('click', function () {
    locoScroll.scrollTo(about)
})


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
        xPercent: 140
    }, {
        xPercent: 0,
        duration: 0.5,
        ease: "power2.inOut"
    })
});

//  THREE JS IMAGES MANIPULATION

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

let targetX = 0;
let targetY = 0;

const textureOne = new THREE.TextureLoader().load(images.imageOne);
const textureTwo = new THREE.TextureLoader().load(images.imageTwo);
const textureThree = new THREE.TextureLoader().load(images.imageThree);
const textureFour = new THREE.TextureLoader().load(images.imageFour);


class WebGL {
    constructor() {
        this.container = document.querySelector('.container_webgl');
        this.links = [...document.querySelectorAll('.container__list__item')];
        this.scene = new THREE.Scene();
        this.perspective = 1000;
        this.sizes = new THREE.Vector2(0, 0);
        this.offset = new THREE.Vector2(0, 0); // Positions of mesh on screen. Will be updated below.
        this.uniforms = {
            uTexture: {
                value: new THREE.TextureLoader().load(images.imageThree)
            },
            uAlpha: {
                value: 0.0
            },
            uOffset: {
                value: new THREE.Vector2(0.0, 0.0)
            }
        }
        this.links.forEach((link, idx) => {
            link.addEventListener('mouseenter', () => {

                switch (idx) {
                    case 0:

                        this.uniforms.uTexture.value = textureOne;
                        break;
                    case 1:
                        this.uniforms.uTexture.value = textureTwo;
                        break;
                    case 2:
                        this.uniforms.uTexture.value = textureThree;
                        break;
                    case 3:
                        this.uniforms.uTexture.value = textureFour;
                        break;
                }
            })

            link.addEventListener('mouseleave', () => {
                this.uniforms.uAlpha.value = lerp(this.uniforms.uAlpha.value, 0.0, 0.1);
            });
        })
        this.addEventListeners(document.querySelector('.container__list'));
        this.setUpCamera();
        this.onMouseMove();
        this.createMesh();
        this.render()

    }

    get viewport() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        let aspectRatio = width / height;

        return {
            width,
            height,
            aspectRatio
        }
    }

    addEventListeners(element) {
        element.addEventListener('mouseenter', () => {
            this.linkHovered = true;
        })
        element.addEventListener('mouseleave', () => {
            this.linkHovered = false;
        })
    }

    setUpCamera() {
        window.addEventListener('resize', this.onWindowResize.bind(this))

        let fov = (180 * (2 * Math.atan(this.viewport.height / 2 / this.perspective))) / Math.PI;
        this.camera = new THREE.PerspectiveCamera(fov, this.viewport.aspectRatio, 0.1, 1000);
        this.camera.position.set(0, 0, this.perspective);

        this.renderer = new THREE.WebGL1Renderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.viewport.width, this.viewport.height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement)
    }

    createMesh() {
        this.geometry = new THREE.PlaneGeometry(1, 1, 20, 20);
        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
            // wireframe: true,
            // side: THREE.DoubleSide
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.sizes.set(350, 250, 1);
        this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);

        this.mesh.position.set(this.offset.x, this.offset.y, 0);

        this.scene.add(this.mesh);
    }
    onWindowResize() {

        this.camera.aspect = this.viewport.aspectRatio;
        this.camera.fov = (180 * (2 * Math.atan(this.viewport.height / 2 / this.perspective))) / Math.PI;
        this.renderer.setSize(this.viewport.width, this.viewport.height);
        this.camera.updateProjectionMatrix();
    }

    onMouseMove() {
        window.addEventListener('mousemove', (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
        })
    }

    render() {
        this.offset.x = lerp(this.offset.x, targetX, 0.1);
        this.offset.y = lerp(this.offset.y, targetY, 0.1);
        this.uniforms.uOffset.value.set((targetX - this.offset.x) * 0.0005, -(targetY - this.offset.y) * 0.0005)
        // this.mesh.scale.set(this.sizes.x, this.sizes.y)
        this.mesh.position.set(this.offset.x - (window.innerWidth / 2), -this.offset.y + (window.innerHeight / 2), 0);

        // set uAlpha when list is hovered / unhovered
        this.linkHovered ?
            this.uniforms.uAlpha.value = lerp(this.uniforms.uAlpha.value, 1.0, 0.1) :
            this.uniforms.uAlpha.value = lerp(this.uniforms.uAlpha.value, 0.0, 0.1);


        for (let i = 0; i < this.links.length; i++) {
            if (this.linkHovered) {
                this.links[i].style.opacity = 0.2
            } else {
                this.links[i].style.opacity = 1
            }


        }

        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.render.bind(this));

    }

}

new WebGL()