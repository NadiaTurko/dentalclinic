document.addEventListener("DOMContentLoaded", function () {
  function initSwiper(selector, options) {
    return new Swiper(selector, options);
  }

  initSwiper(".blog__slider", {
    loop: true,
    pagination: {
      el: ".blog__pagination",
      clickable: true,
    },
    breakpoints: {
      500: { slidesPerView: 1, spaceBetween: 10 },
      700: { slidesPerView: 2, spaceBetween: 20 },
      1050: { slidesPerView: 3, spaceBetween: 30 },
      1250: { slidesPerView: 3, spaceBetween: 30 },
    },
  });

  initSwiper(".team__slider", {
    slidesPerView: 3,
    spaceBetween: 20,
    pagination: {
      el: ".team-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1200: { slidesPerView: 4 },
    },
  });

  if (!window.modalSliderInitialized) {
    window.modalSliderInitialized = true;
    initSwiper(".modal__slider", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      pagination: {
        el: ".modal__pagination",
        clickable: true,
      },
      breakpoints: {
        320: { slidesPerView: 1 },
        768: { slidesPerView: 1 },
        1024: { slidesPerView: 2 },
      },
    });
  }

  // ✅ Слайдер для .preference__slider — завжди 1 слайд
  initSwiper(".preference__slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: ".preference__pagination", // додай у HTML, якщо потрібно
      clickable: true,
    },
    on: {
      slideChange: function () {
        const images = document.querySelectorAll(".preference__image");
        images.forEach((img) => img.classList.remove("active"));

        const realIndex = this.realIndex; // реальний індекс у циклічному режимі
        const activeImg = document.querySelector(
          `.preference__image[data-index="${realIndex}"]`
        );
        if (activeImg) activeImg.classList.add("active");
      },
    },
  });
});
