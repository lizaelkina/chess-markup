import '../pages/index.css';

import {
  controlCounterLeft,
  nextButton,
  prevButton,
  slider,
  sliderContent,
  slides,
  activeSlidesClass} from './utils';

document.addEventListener('DOMContentLoaded', function () {
  const BREAKPOINT_FOR_3 = 1190;
  const BREAKPOINT_FOR_2 = 744;

  const slideCount = slides.length;
  let slidesPerView, currentSlide, sliderWidth, slideWidth, translateX;

  function initSlider() {
    currentSlide = 0;
    translateX = 0;
    sliderWidth = slider.offsetWidth;

    if (document.documentElement.clientWidth > BREAKPOINT_FOR_3) {
      slidesPerView = 3;
    } else if (document.documentElement.clientWidth > BREAKPOINT_FOR_2) {
      slidesPerView = 2;
    } else {
      slidesPerView = 1;
    }

    slideWidth = sliderWidth / slidesPerView;

    slides.forEach((slide) => {
      slide.style.setProperty('min-width', `${slideWidth}px`);
    });

    updateSlider();
  }

  function updateSlider() {
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.add(activeSlidesClass);
      } else {
        slide.classList.remove(activeSlidesClass);
      }
    });
    sliderContent.style.setProperty('transform', `translateX(${translateX}px)`);
    controlCounterLeft.textContent = `${currentSlide + 1}`;
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

  setInterval(() => {
    nextSlide();
  }, 4000);

});
