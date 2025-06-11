const hamburgerMenu = document.querySelector(".hamburger__menu");
const nav = document.querySelector(".nav__menu");
const navLinks = document.querySelectorAll(".nav__link");

hamburgerMenu.addEventListener("click", () => {
  nav.classList.toggle("active");
  hamburgerMenu.classList.toggle("active");

  if (nav.classList.contains("active")) {
    nav.style.display = "flex";
    hamburgerMenu.innerHTML =
      '<img src="images/header/close.svg" alt="close menu">';
  } else {
    nav.style.display = "none";
    hamburgerMenu.innerHTML =
      '<img src="images/header/Buttons.svg" alt="hamburger menu">';
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (nav.classList.contains("active")) {
      nav.classList.remove("active");
      nav.style.display = "none";
      hamburgerMenu.classList.remove("active");
      hamburgerMenu.innerHTML =
        '<img src="images/header/Buttons.svg" alt="hamburger menu">';
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("formModal");

  const openModal = () => {
    modal.style.display = "flex";
  };

  const closeModalFunction = () => {
    modal.style.display = "none";
  };

  document.body.addEventListener("click", (e) => {
    if (e.target.id === "openModalHome" || e.target.id === "openModalNav") {
      e.preventDefault();
      openModal();
    }
  });

  document.body.addEventListener("click", (e) => {
    if (e.target.closest(".close-btn")) {
      closeModalFunction();
    }
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalFunction();
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.createElement("canvas");
  const supportsWebP =
    canvas.getContext &&
    canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;

  const imageMappingDesktop = {
    advantage1: supportsWebP
      ? "images/advantages/11.webp"
      : "images/advantages/11.jpg",
    advantage2: supportsWebP
      ? "images/advantages/2.webp"
      : "images/advantages/2.jpg",
    advantage3: supportsWebP
      ? "images/advantages/1.webp"
      : "images/advantages/1.jpeg",
    advantage4: supportsWebP
      ? "images/advantages/4.webp"
      : "images/advantages/4.jpeg",
    advantage5: supportsWebP
      ? "images/advantages/5.webp"
      : "images/advantages/5.jpg",
    advantage6: supportsWebP
      ? "images/advantages/6.webp"
      : "images/advantages/6.jpeg",
    advantage7: supportsWebP
      ? "images/advantages/7.webp"
      : "images/advantages/7.jpg",
    advantage8: supportsWebP
      ? "images/advantages/8.webp"
      : "images/advantages/8.jpg",
  };

  const imageMappingMobile = {
    advantage1: supportsWebP
      ? "images/advantages/mobile/11.1.webp"
      : "images/advantages/mobile/11.1.jpg",
    advantage2: supportsWebP
      ? "images/advantages/mobile/2.webp"
      : "images/advantages/mobile/2.jpg",
    advantage3: supportsWebP
      ? "images/advantages/mobile/3.webp"
      : "images/advantages/mobile/3.jpg",
    advantage4: supportsWebP
      ? "images/advantages/mobile/4.webp"
      : "images/advantages/mobile/4.jpg",
    advantage5: supportsWebP
      ? "images/advantages/mobile/5.webp"
      : "images/advantages/mobile/5.jpg",
    advantage6: supportsWebP
      ? "images/advantages/mobile/6.webp"
      : "images/advantages/mobile/6.jpeg",
    advantage7: supportsWebP
      ? "images/advantages/mobile/7.webp"
      : "images/advantages/mobile/7.jpg",
    advantage8: supportsWebP
      ? "images/advantages/mobile/8.webp"
      : "images/advantages/mobile/8.jpg",
  };

  const listItems = document.querySelectorAll(".advantage__item");
  const image = document.getElementById("advantage-image");

  if (!listItems.length || !image) {
    // Елементів немає — нічого не робимо, просто вийдемо
    return;
  }

  let activeId = listItems[0].getAttribute("data-id"); // Безпечно

  function getCurrentMapping() {
    return window.innerWidth < 980 ? imageMappingMobile : imageMappingDesktop;
  }

  function changeImage(id) {
    const currentMapping = getCurrentMapping();
    const newSrc = currentMapping[id];

    if (!newSrc) return;

    const tempImage = new Image();
    image.classList.add("fade-out");

    tempImage.src = newSrc;
    tempImage.onload = () => {
      image.src = newSrc;
      image.classList.remove("fade-out");
      image.classList.add("fade-in");

      listItems.forEach((item) => item.classList.remove("active"));
      const activeItem = document.querySelector(`[data-id="${id}"]`);
      if (activeItem) activeItem.classList.add("active");
    };
  }

  listItems.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-id");
      if (id) {
        activeId = id;
        changeImage(id);
      }
    });
  });

  // Початкове зображення
  changeImage(activeId);

  // При зміні розміру — оновити картинку
  window.addEventListener("resize", () => {
    if (activeId) changeImage(activeId);
  });
});

jQuery(function ($) {
  $(document).ready(function () {
    $(".faq__head").click(function () {
      $(".faq__head.active")
        .not(this)
        .removeClass("active")
        .next(".faq__ans")
        .stop()
        .slideUp(300);
      $(".faq__head.active")
        .not(this)
        .find(".faq__head--img svg")
        .css("transform", "rotate(0deg)");

      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).next(".faq__ans").stop().slideUp(300);
        $(this).find(".faq__head--img svg").css("transform", "rotate(0deg)");
      } else {
        $(this).addClass("active");
        $(this).next(".faq__ans").stop().slideDown(300);
        $(this).find(".faq__head--img svg").css("transform", "rotate(45deg)");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const modalTriggers = document.querySelectorAll("[data-modal]");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".close-btn");

  const openModal = (modalId) => {
    const modal = document.querySelector(`#${modalId}`);
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = (modal) => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const modalId = trigger.getAttribute("data-modal");
      openModal(modalId);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const modal = button.closest(".modal");
      closeModal(modal);
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });
});

const servicesItems = document.querySelectorAll(".services__item");

servicesItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.classList.add("active");
  });

  item.addEventListener("mouseleave", () => {
    item.classList.remove("active");
  });
});

const serviceItems = document.querySelectorAll(".services__item");

function applyRandomHoverEffect() {
  const serviceItems = document.querySelectorAll(".service__item");
  if (!serviceItems.length) return;

  const randomIndex = Math.floor(Math.random() * serviceItems.length);

  serviceItems.forEach((item) => item.classList.remove("hover-active"));
  const targetItem = serviceItems[randomIndex];
  if (targetItem) {
    targetItem.classList.add("hover-active");
  }
}

setInterval(applyRandomHoverEffect, 4000);

document.addEventListener("DOMContentLoaded", () => {
  let backgroundVideo = document.getElementById("backgroundVideo");

  if (backgroundVideo) {
    const poster =
      window.innerWidth < 768 ? "images/IMGL1220.jpg" : "images/IMGL1215.jpg";
    backgroundVideo.setAttribute("poster", poster);
  }

  // Додатково — логіка скролу для хедера
  let header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 10);
    });
  }

  updateYearText();
});

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
});

function updateYearText() {
  try {
    const footer = document.getElementById("footerText");

    if (footer) {
      const year = new Date().getFullYear();
      footer.innerHTML = `Стоматологічна клініка RONEVICH, © ${year}. Ліцензія МОЗ України №220 від 08.02.2018`;
    }
  } catch (error) {
    console.log("Year update error:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateYearText();
});
