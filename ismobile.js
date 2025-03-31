const update = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const isMobile = windowWidth <= 768;
  
    document.documentElement.dataset.enhanced = config.enhanced;
    document.documentElement.dataset.stick = config.stick;
  
    if (config.enhanced && !hasScrollSupport) {
      gsap.set('.scaler img', {
        height: isMobile ? windowHeight * 0.7 : windowHeight * 0.9,
        width: isMobile ? windowWidth * 0.8 : windowWidth * 1,
      });
  
      gsap.set('.calendar-container', {
        scale: isMobile ? 0.9 : 1,
      });
    }
  };
  
  update();
  window.addEventListener('resize', update);
  