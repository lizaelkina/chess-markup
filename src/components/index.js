import '../pages/index.css';
import {createSlider} from './slider';

document.addEventListener('DOMContentLoaded', function () {

  const counter = document.querySelector('.controls__counter_left');
  createSlider('.players__slider', {
    slidesPerView: 1,
    breakpoints: [
      {
        width: 744,
        slidesPerView: 2,
      },
      {
        width: 1190,
        slidesPerView: 3,
      }
    ],
    nextEl: '.players__button-next',
    prevEl: '.players__button-prev',
    autoplay: true,
    autoplayDelay: 4000,
    loop: true,
    onSlideChanged: function (slideIndex) {
      counter.textContent = `${slideIndex + 1}`;
    }
  });

  const radioButtons = document.querySelectorAll('.controls__button_radio');
  const stepsSlider = createSlider('.steps__slider', {
    slidesPerView: 1,
    enable: true,
    breakpoints: [
      {
        enable: false,
        width: 744,
        slidesPerView: 2,
      },
      {
        enable: false,
        width: 1190,
        slidesPerView: 3,
      }
    ],
    nextEl: '.steps__button-next',
    prevEl: '.steps__button-prev',
    onSlideChanged: function (slideIndex) {
      radioButtons.forEach((button, index) => {
        if (index === slideIndex) {
          button.setAttribute('aria-current', 'true');
        } else {
          button.removeAttribute('aria-current');
        }
      });
    }
  });

  radioButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      stepsSlider.goToSlide(index);
    })
  })
});
