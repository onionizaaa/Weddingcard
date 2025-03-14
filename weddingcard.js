// ปรับ weddingcard.js ให้รองรับ Safari และมือถือ
import gsap from 'https://cdn.skypack.dev/gsap@3.12.0';
import ScrollTrigger from 'https://cdn.skypack.dev/gsap@3.12.0/ScrollTrigger';

let scalerTl;
let layersTl;

const hasScrollSupport = CSS.supports('(animation-timeline: view()) and (animation-range: 0 100%)') || 
                         CSS.supports('(-webkit-animation-timeline: view()) and (-webkit-animation-range: 0 100%)');

const config = {
  theme: 'system',
  enhanced: true,
  stick: true,
  layers: true,
  center: true,
  stagger: 'range',
};

console.log(document.head)


if (!hasScrollSupport) {
  gsap.registerPlugin(ScrollTrigger);
  console.info('GSAP ScrollTrigger registered for fallback');
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
  const isMobile = windowWidth <= 768;
  const imageScale = isMobile ? 0.8 : 1;
  const layerScale = isMobile ? 0.3 : 0.5;

  if (config.enhanced && !hasScrollSupport) {
    scalerTl = gsap.timeline({
      scrollTrigger: {
        trigger: 'main section:first-of-type',
        start: 'top -10%',
        end: 'bottom 80%',
        scrub: true,
      },
    }).from('.scaler img', {
      height: windowHeight * 0.9,
      width: windowWidth * imageScale,
      ease: 'power1.inOut',
    }, 0);

    layersTl = gsap.timeline({
      scrollTrigger: {
        trigger: 'main section:first-of-type',
        start: 'top -40%',
        end: 'bottom bottom',
        scrub: true,
      },
    }).from('.layer', {
      opacity: 0, scale: layerScale, ease: 'power1.inOut', stagger: 0.2
    }, 0);
  } else {
    gsap.set(['.scaler img', '.layer'], { attr: { style: undefined } });
    scalerTl?.kill();
    layersTl?.kill();
  }
};

update();
window.addEventListener('resize', update);

const targets = document.querySelectorAll('.timeline ol li');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    } else {
      entry.target.classList.remove('in-view');
    }
  });
}, { threshold: 0.5 });

targets.forEach(target => observer.observe(target));

