document.addEventListener('DOMContentLoaded', function (event) {
  //Slider
  if (document.querySelector('.slider')) {
    let position = 0;
    const SLIDES_TO_SHOW = 3;
    const SLIDES_TO_SCROLL = 1;
    const CONTAINER = document.querySelector('.slider');
    const TRACK = document.querySelector('.slider__track');
    const ITEMS = document.querySelectorAll('.slider__item');
    const ITEMS_COUNT = ITEMS.length;
    const BTN_PREV = document.querySelector('.slider__btn--prev');
    const BTN_NEXT = document.querySelector('.slider__btn--next');
    const ITEM_WIDTH = TRACK.clientWidth / SLIDES_TO_SHOW;
    const MOVE_POSITION = SLIDES_TO_SCROLL * ITEM_WIDTH + 30;

    // ITEMS.forEach((item) => {
    //   if (SLIDES_TO_SHOW === 1) {
    //     item.style.minWidth = `${ITEM_WIDTH}` + 'px';
    //   } else {
    //     item.style.minWidth = `${ITEM_WIDTH}` -90 + 'px';
    //   }
    // });

    BTN_NEXT.addEventListener('click', () => {
      const ITEMS_LEFT = ITEMS_COUNT - (Math.abs(position) + SLIDES_TO_SHOW * ITEM_WIDTH) / ITEM_WIDTH;

      position -= ITEMS_LEFT >= SLIDES_TO_SCROLL ? MOVE_POSITION : ITEMS_LEFT * ITEM_WIDTH;


      SET_POSITION();
    });

    BTN_PREV.addEventListener('click', () => {
      const ITEMS_LEFT = Math.abs(position) / ITEM_WIDTH;

      position += ITEMS_LEFT >= SLIDES_TO_SCROLL ? MOVE_POSITION : ITEMS_LEFT * ITEM_WIDTH;


      SET_POSITION();
    });

    const SET_POSITION = () => {
      TRACK.style.transform = `translateX(${position}px)`;
      CHECK_BTNS();
    }

    const CHECK_BTNS = () => {
      function disabler(btnName, bool) {
        btnName.disabled = bool;
        bool ? btnName.classList.add('slider__btn--inactive') : btnName.classList.remove('slider__btn--inactive');
      }

      if (position === 0) {
        disabler(BTN_PREV, true);
      } else {
        disabler(BTN_PREV, false);
      }

      if (position <= -(ITEMS_COUNT - SLIDES_TO_SHOW) * ITEM_WIDTH) {
        disabler(BTN_NEXT, true);
      } else {
        disabler(BTN_NEXT, false);
      }
    }
    CHECK_BTNS();
  }

  //Header dark
  function headerDark() {
    let page = document.title;
    if (page != 'Shelter') {
      document.querySelector('.header').classList.add('header--dark');
    } else {
      document.querySelector('.header').classList.remove('header--dark');
    }
  }

  //Ative link
  function activeLink() {
    let links = document.querySelectorAll('.header__menu-link');

    if (document.title == 'Shelter') {
      links[0].classList.add('header__menu-link--active');
    } else if (document.title == 'Shelter - Our pets') {
      links[1].classList.add('header__menu-link--active');
    }
  }

  //Modal
  if (document.querySelector('.modal-bg')) {
    const MODAL_BTN = document.querySelectorAll('[modal-btn]');
    const MODAL_CLOSE = document.querySelector('.modal__close');
    const MODAL_BG = document.querySelector('.modal-bg');
    const MODAL_TXT = document.querySelector('.modal__txt');
    const MODAL_TITLE = document.querySelector('.modal__title');

    MODAL_BTN.forEach((btn) => {
      btn.addEventListener('click', () => {
        const PET_TXT_DOM = btn.previousSibling;
        const PET_TITLE_DOM = PET_TXT_DOM.previousSibling;

        MODAL_TITLE.innerHTML = PET_TITLE_DOM.textContent;
        MODAL_TXT.innerHTML = PET_TXT_DOM.textContent;

        MODAL_BG.classList.add('modal-bg--active');
      });
    });

    MODAL_CLOSE.addEventListener('click', () => {
      MODAL_BG.classList.remove('modal-bg--active');
    });
  }

  activeLink();
  headerDark();

});
