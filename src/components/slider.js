export function createSlider(sliderEl, settings) {

  const slider = document.querySelector(sliderEl);
  const sliderContent = slider.querySelector('.slider__content');
  const slides = slider.querySelectorAll('.slide');
  const prevButton = document.querySelector(settings.prevEl);
  const nextButton = document.querySelector(settings.nextEl);
  const activeSlidesClass = 'slide__active';

  const slideCount = slides.length;
  let enable = true, slidesPerView, currentSlide, sliderWidth, slideWidth, translateX;

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
      slides.forEach((slide) => {
        slide.style.removeProperty('min-width');
      });
      return;
    }

    currentSlide = 0;
    translateX = 0;
    sliderWidth = slider.offsetWidth;
    slideWidth = sliderWidth / slidesPerView;

    slides.forEach((slide) => {
      slide.style.setProperty('min-width', `${slideWidth}px`);
    });

    updateSlider();
  }

  function updateSlider() {
    if (settings.loop) {
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
    sliderContent.style.setProperty('transform', `translateX(${translateX}px)`);
    settings.onSlideChanged(currentSlide);
  }

  function nextSlide() {
    if (currentSlide < slideCount - 1) {
      currentSlide++;
      let rightVPIndex = (Math.abs(translateX) + sliderWidth) / slideWidth - 1;
      if (currentSlide > rightVPIndex) {
        translateX -= slideWidth;
      }
    } else {
      currentSlide = 0;
      translateX = 0;
    }
    updateSlider();
  }

  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      let leftVPIndex = Math.abs(translateX) / slideWidth;
      if (currentSlide < leftVPIndex) {
        translateX += slideWidth;
      }
    } else {
      currentSlide = slideCount - 1;
      translateX = -slideWidth * (slideCount - slidesPerView);
    }
    updateSlider();
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
}
