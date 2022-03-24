// Section Pinning
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
                scrub: 1,
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
            scrub: 1,
            pin: false,
            anticipatePin: 1,
            //pinSpacing: true
        });

    }

});