export function createSlider(sliderEl, settings) {

  const slider = document.querySelector(sliderEl);
  const sliderContent = slider.querySelector('.slider__content');
  const slides = slider.querySelectorAll('.slide');
  const prevButton = document.querySelector(settings.prevEl);
  const nextButton = document.querySelector(settings.nextEl);
  const activeSlidesClass = 'slide_active';

  const slideCount = slides.length;
  let enable = true, slidesPerView, currentSlide, slidesInViewport, sliderWidth, slideWidth;

  function initSlider() {
    if (typeof settings.enable === 'boolean') {
      enable = settings.enable;
    }

    slidesPerView = settings.slidesPerView;

    if (settings.breakpoints) {
      settings.breakpoints.forEach(breakpoint => {
            if (document.documentElement.clientWidth > breakpoint.width) {
              slidesPerView = breakpoint.slidesPerView;
              if (typeof breakpoint.enable === 'boolean') {
                enable = breakpoint.enable;
              }
            }
          }
      )
    }

    if (!enable) {
      sliderContent.style.removeProperty('transform');
      slides.forEach((slide) => {
        slide.style.removeProperty('min-width');
      });
      return;
    }

    sliderWidth = slider.offsetWidth;
    slideWidth = sliderWidth / slidesPerView;

    slides.forEach((slide) => {
      slide.style.setProperty('min-width', `${slideWidth}px`);
    });

    currentSlide = currentSlide === undefined ? 0 : currentSlide;
    if (slidesInViewport === undefined || slidesPerView !== slidesInViewport.length || !slidesInViewport.includes(currentSlide)) {
      slidesInViewport = [];
      const firstSlideInViewport = Math.min(currentSlide, slideCount - slidesPerView);
      for (let i = 0; i < slidesPerView; i++) {
        slidesInViewport.push(firstSlideInViewport + i);
      }
    }

    updateSlider();
  }

  function updateSlider() {
    if (!settings.loop) {
      prevButton.setAttribute('aria-disabled', currentSlide === 0);
      nextButton.setAttribute('aria-disabled', currentSlide === slideCount - 1);
    }
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.add(activeSlidesClass);
      } else {
        slide.classList.remove(activeSlidesClass);
      }
    });

    const translateX = -slideWidth * slidesInViewport[0];
    sliderContent.style.setProperty('transform', `translateX(${translateX}px)`);
    settings.onSlideChanged(currentSlide);
  }

  function goToSlide(slide) {
    if (slide < 0 || slide >= slideCount) return;

    currentSlide = slide;
    if (!slidesInViewport.includes(currentSlide)) {
      if (currentSlide === slidesInViewport[slidesInViewport.length - 1] + 1) {
        slidesInViewport.push(currentSlide);
        slidesInViewport.shift();
      } else if (currentSlide === slidesInViewport[0] - 1) {
        slidesInViewport.unshift(currentSlide);
        slidesInViewport.pop();
      } else {
        slidesInViewport = [];
        const firstSlideInViewport = Math.min(currentSlide, slideCount - slidesPerView);
        for (let i = 0; i < slidesPerView; i++) {
          slidesInViewport.push(firstSlideInViewport + i);
        }
      }
    }
    updateSlider();
  }

  function nextSlide() {
    if (currentSlide < slideCount - 1) {
      goToSlide(currentSlide + 1);
    } else if (settings.loop) {
      goToSlide(0);
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    } else if (settings.loop) {
      goToSlide(slideCount - 1);
    }
  }

  prevButton.addEventListener('click', prevSlide);

  nextButton.addEventListener('click', nextSlide);

  window.addEventListener('resize', function () {
    initSlider();
  });

  initSlider();

  if (settings.autoplay && settings.autoplayDelay > 0) {
    setInterval(() => {
      nextSlide();
    }, settings.autoplayDelay);
  }

  slider.goToSlide = goToSlide;

  return slider;
}
