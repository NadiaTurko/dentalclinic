document.addEventListener("DOMContentLoaded", function () {
  function showModalAlert(message, title = "Відправлено успішно!") {
    const alertModal = document.getElementById("customAlert");
    if (!alertModal) return;

    alertModal.querySelector("#alertTitle").textContent = title;
    alertModal.querySelector("#alertMessage").textContent = message;
    alertModal.classList.add("active");

    const closeModal = () => alertModal.classList.remove("active");
    alertModal
      .querySelector(".close-btn__alert")
      .addEventListener("click", closeModal);
    window.addEventListener("click", (e) => {
      if (e.target === alertModal) closeModal();
    });
  }

  function closeFormModal() {
    document.getElementById("formModal")?.classList.remove("active");
  }

  const TOKEN = "7228190854:AAGGWAfwmymI30ebTZWwAf7F1v9kVD6kfgo";
  const CHAT_ID = "5388421067";
  const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  function initPhoneInput(selector) {
    const phoneInput = document.querySelector(selector);
    if (!phoneInput) return null;

    const allowedCountries = [
      "ua", // Україна (пріоритет)
      "pl", // Польща (пріоритет)
      "at",
      "be",
      "bg",
      "ch",
      "cy",
      "cz",
      "de",
      "dk",
      "ee",
      "es",
      "fi",
      "fr",
      "gb",
      "gr",
      "hr",
      "hu",
      "ie",
      "is",
      "it",
      "lt",
      "lu",
      "lv",
      "mt",
      "nl",
      "no",
      "pt",
      "ro",
      "se",
      "si",
      "sk",
      "us",
      "ca",
    ]; // Країни Європи + США + Канада

    const iti = window.intlTelInput(phoneInput, {
      initialCountry: "ua",
      preferredCountries: ["ua", "pl"],
      onlyCountries: allowedCountries,
      separateDialCode: true,
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.8/build/js/utils.js",
    });

    // Маска (XX) XXX-XX-XX
    const mask = IMask(phoneInput, { mask: "(00) 000-00-00" });

    return { iti, mask, phoneInput };
  }

  // Ініціалізація для обох телефонних полів
  const phone1 = initPhoneInput("#phone1");
  const phone2 = initPhoneInput("#phone2");

  function handleFormSubmission(formId, phoneObj) {
    const form = document.getElementById(formId);
    if (!form || !phoneObj) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.querySelector('[name="name"]');
      const phoneField = form.querySelector('[name="phone"]');
      const messageField = form.querySelector('[name="message"]');
      const consentCheckbox = form.querySelector(
        `#consentCheckbox${formId.charAt(formId.length - 1)}`
      );

      if (!consentCheckbox.checked) {
        showModalAlert(
          "Ви повинні погодитися на обробку персональних даних.",
          "Помилка!"
        );
        return;
      }

      const fullPhoneNumber = phoneObj.iti.getNumber();

      if (!phoneObj.iti.isValidNumber()) {
        showModalAlert(
          "Будь ласка, введіть правильний номер телефону.",
          "Помилка!"
        );
        return;
      }

      let message = `🦷 <b>Форма з сайту RONEVICH!</b>\n\n`;
      message += `👤 <b>Ім'я клієнта:</b> <i>${name.value}</i>\n`;
      message += `📞 <b>Контактний номер:</b> <i>${fullPhoneNumber}</i>\n`;
      message += `✉️ <b>Повідомлення:</b> <i>${
        messageField.value || "Клієнт не залишив повідомлення."
      }</i>\n\n`;
      message += `🕒 <b>Дата та час запиту:</b> <i>${new Date().toLocaleString()}</i>\n`;
      message += `📍 <b>Джерело:</b> <i>RONEVICH клініка стоматології</i>`;

      axios
        .post(URI_API, {
          chat_id: CHAT_ID,
          parse_mode: "html",
          text: message,
        })
        .then(() => {
          name.value = "";
          phoneField.value = "";
          messageField.value = "";

          closeFormModal();
          showModalAlert(
            "Дякуємо! Ми зв’яжемося з вами найближчим часом.",
            "Відправлено успішно!"
          );
        })
        .catch((err) => {
          console.warn(err);
          showModalAlert("Щось пішло не так, спробуйте ще раз.", "Помилка!");
        });
    });
  }

  // Прив'язуємо функції до кожної форми та відповідного інпуту
  handleFormSubmission("consultationForm1", phone1);
  handleFormSubmission("consultationForm2", phone2);
});
