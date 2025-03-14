import gsap from 'https://cdn.skypack.dev/gsap@3.12.0';
import ScrollTrigger from 'https://cdn.skypack.dev/gsap@3.12.0/ScrollTrigger';

let scalerTl;
let layersTl;

const hasScrollSupport = CSS.supports(
  '(animation-timeline: view()) and (animation-range: 0 100%)'
);

// กำหนดค่า config คงที่ (เดิมเคยปรับจาก UI)
const config = {
  theme: 'system',
  enhanced: true,
  stick: true,
  layers: true,
  center: true,
  stagger: 'range',
};

if (!hasScrollSupport) {
  gsap.registerPlugin(ScrollTrigger);
  console.info('GSAP ScrollTrigger registered');
}

const update = () => {
  document.documentElement.dataset.theme = config.theme;
  document.documentElement.dataset.enhanced = config.enhanced;
  document.documentElement.dataset.stick = config.stick;
  document.documentElement.dataset.center = config.center;
  document.documentElement.dataset.layers = config.layers;
  document.documentElement.dataset.stagger = config.stagger;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Adjust scaling logic for images and layers
  const imageScale = windowWidth <= 430 ? 0.8 : 1; // Scale down for small screens
  const layerScale = windowWidth <= 430 ? 0.3 : 0.5; // Adjust layer scale for small screens

  if (config.enhanced && !hasScrollSupport) {
    // Handle scaling of image on scroll
    scalerTl = gsap
      .timeline({
        scrollTrigger: {
          trigger: 'main section:first-of-type',
          start: 'top -10%',
          end: 'bottom 80%',
          scrub: true,
        },
      })
      .from(
        '.scaler img',
        {
          height: windowHeight * 0.9, // scale relative to 90% of viewport height
          width: windowWidth * imageScale, // scale relative to adjusted width for small screens
          ease: 'power1.inOut',
        },
        0
      );

    // Handle animation of layers with responsive scaling
    layersTl = gsap
      .timeline({
        scrollTrigger: {
          trigger: 'main section:first-of-type',
          start: 'top -40%',
          end: 'bottom bottom',
          scrub: true,
        },
      })
      .from('.layer:nth-of-type(1)', { opacity: 0, ease: 'sine.out' }, 0)
      .from('.layer:nth-of-type(1)', { scale: layerScale, ease: 'power1.inOut' }, 0)
      .from('.layer:nth-of-type(2)', { opacity: 0, ease: 'sine.out' }, 0)
      .from('.layer:nth-of-type(2)', { scale: layerScale, ease: 'power3.inOut' }, 0)
      .from('.layer:nth-of-type(3)', { opacity: 0, ease: 'sine.out' }, 0)
      .from('.layer:nth-of-type(3)', { scale: layerScale, ease: 'power4.inOut' }, 0);
  } else {
    gsap.set(['.scaler img', '.layer'], {
      attr: {
        style: undefined,
      },
    });
    scalerTl?.kill();
    layersTl?.kill();
    scalerTl = undefined;
    layersTl = undefined;
  }
};

// เรียกใช้ update() เพื่อใช้ค่าที่ตั้งไว้
update();

// Add window resize listener to handle screen resizing dynamically
window.addEventListener('resize', () => {
  update(); // Recalculate and update the animations when the window is resized
});

const targets = document.querySelectorAll(".timeline ol li");
const threshold = 0.5;
const ANIMATED_CLASS = "in-view";

function callback(entries, observer) {
  entries.forEach((entry) => {
    const elem = entry.target;
    if (entry.intersectionRatio >= threshold) {
      elem.classList.add(ANIMATED_CLASS);
      observer.unobserve(elem);
    } else {
      elem.classList.remove(ANIMATED_CLASS);
    }
  });
}

const observer = new IntersectionObserver(callback, { threshold });
for (const target of targets) {
  observer.observe(target);
}
  
const scroller = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
  });

  module.exports = {
    plugins: [
      require('autoprefixer'),
      require('cssnano')
    ]
  }

"use strict";
(function () {
	window.onload = () => {
		const obj = document.querySelector("#gallery");
		const time = 10000;
		function animStart() {
			if (obj.classList.contains("active") == false) {
				obj.classList.add("active");
				setTimeout(() => {
					animEnd();
				}, time);
			}
		}
		function animEnd() {
			obj.classList.remove("active");
			obj.offsetWidth;
		}
		document.addEventListener("scroll", function () {
			// scroll or scrollend
			animStart();
		});
		window.addEventListener("resize", animStart);
		animStart();
	};
})();

