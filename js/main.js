// SLIDING MENU FROM RIGHT TO THE LEFT WITH GSAP

var $hamburger = $('.hamburger');

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
        x: -400,
        ease: Sine.Out,
        stagger: 0.2
    }, ">")
    .to('.about', {
        duration: 0.4,
        x: -150,
        ease: Sine.Out,
        stagger: 0.2
    }, ">")
    .to('.works', {
        duration: 0.4,
        x: 100,
        ease: Sine.Out,
        stagger: 0.2
    }, ">")
    .to('.contact', {
        duration: 0.4,
        x: 350,
        ease: Sine.Out,
        stagger: 0.2
    }, ">")
    .to('.nav li', {
        duration: 0.5,
        marginBottom: '40px'
    })
    .reverse()

$hamburger.on('click', function (e) {
    hamburgerMotion.reversed(!hamburgerMotion.reversed());
});