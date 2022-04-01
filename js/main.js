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

// make the right edge "stick" to the scroll bar. force3D: true improves performance
gsap.set(".skewElem", {
    transformOrigin: "right center",
    force3D: true
});



//TEXT ACCUEIL ANIMATION

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


function largerBtn() {
    this.roundedBtn.style.width = "200px";
}

let roundedBtn = document.querySelector('rounded_button')
let buttonForm = document.querySelector('button_form')


if (roundedBtn) {
    buttonForm.addEventListener("mouseover", largerBtn())
}
//roundedBtn.addEventListener("mouseover", largerBtn())