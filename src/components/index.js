import '../pages/index.css';

document.addEventListener('DOMContentLoaded', function () {
  const players = document.querySelector('.players')
  const slider = players.querySelector('.slider');
  const sliderContent = slider.querySelector('.slider__content');
  const controls = players.querySelector('.controls');
  const slides = slider.querySelectorAll('.slide');
  const prevButton = controls.querySelector('.controls__button_icon_prev');
  const nextButton = controls.querySelector('.controls__button_icon_next');
  const controlCounterLeft = controls.querySelector('.controls__counter_left');

  const SWITCH_OFF_BREAKPOINT= 700;

  const activeSlidesClass = 'slide__active';
  const slideCount = slides.length;
  let isShowOneSlide, currentSlide, sliderWidth, slideWidth, translateX;

  function initSlider() {
    isShowOneSlide = document.documentElement.clientWidth > SWITCH_OFF_BREAKPOINT;
    currentSlide = 0;
    translateX = 0;
    sliderWidth = slider.offsetWidth;
    if (isShowOneSlide) {
      slideWidth = sliderWidth / 3;
    } else {
      slideWidth = sliderWidth;

    }
    slides.forEach((slide) => {
      slide.style.setProperty('min-width', slideWidth + 'px');
    })
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
      translateX = -slideWidth * (slideCount - 3)
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
