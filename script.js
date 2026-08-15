const form = document.querySelector(".trial-form");
const note = document.querySelector(".form-note");
const topbar = document.querySelector(".topbar");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

const closeMenu = () => {
  topbar?.classList.remove("is-menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
};

menuToggle?.addEventListener("click", (event) => {
  event.stopPropagation();

  const isOpen = topbar?.classList.toggle("is-menu-open");
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (event) => {
  if (!topbar?.contains(event.target)) {
    closeMenu();
  }
});

document.querySelectorAll(".select-shell").forEach((shell) => {
  const nativeSelect = shell.querySelector("select");
  const trigger = shell.querySelector(".select-button");
  const triggerText = trigger?.querySelector("span");
  const menu = shell.querySelector(".select-menu");
  const options = [...shell.querySelectorAll(".select-menu button")];

  if (!nativeSelect || !trigger || !triggerText || !menu) return;

  const close = () => {
    shell.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
    menu.hidden = true;
  };

  const open = () => {
    shell.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
    menu.hidden = false;
  };

  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    shell.classList.contains("is-open") ? close() : open();
  });

  options.forEach((option) => {
    option.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const value = option.dataset.value || "";

      nativeSelect.value = value;
      triggerText.textContent = value || "Оберіть напрямок";

      options.forEach((item) => {
        item.classList.toggle("is-selected", item === option);
      });

      nativeSelect.dispatchEvent(new Event("change", { bubbles: true }));

      close();
    });
  });

  document.addEventListener("click", (event) => {
    if (!shell.contains(event.target)) {
      close();
    }
  });
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (note) {
    note.textContent = "Надсилаємо заявку...";
  }

  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      form.reset();

      const selectButtonText = form.querySelector(".select-button span");
      if (selectButtonText) {
        selectButtonText.textContent = "Оберіть напрямок";
      }

      form.querySelectorAll(".select-menu button").forEach((button) => {
        button.classList.remove("is-selected");
      });

      if (note) {
        note.textContent = "Дякуємо! Заявку надіслано. Ми зв'яжемося з вами найближчим часом.";
      }
    } else {
      if (note) {
        note.textContent = "Не вдалося надіслати заявку. Спробуйте ще раз.";
      }
    }
  } catch (error) {
    if (note) {
      note.textContent = "Помилка з'єднання. Перевірте інтернет і спробуйте ще раз.";
    }
  }
});