(function () {
  const cfg = window.SITE_CONFIG || {};

  // Fill text from config.js
  document.querySelectorAll("[data-bind]").forEach((el) => {
    const value = cfg[el.dataset.bind];
    if (value) el.textContent = value;
  });
  document.querySelectorAll("[data-price]").forEach((el) => {
    const value = cfg.prices && cfg.prices[el.dataset.price];
    if (value) el.textContent = value;
  });

  // Links built from config.js
  const links = {
    tel: cfg.phone && "tel:" + cfg.phone.replace(/\s+/g, ""),
    mailto: cfg.email && "mailto:" + cfg.email,
    instagram: cfg.instagram && "https://instagram.com/" + cfg.instagram,
    whatsapp: cfg.whatsapp && "https://wa.me/" + cfg.whatsapp,
  };
  document.querySelectorAll("[data-bind-href]").forEach((el) => {
    const href = links[el.dataset.bindHref];
    if (href) el.href = href;
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  // Mobile menu
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-links");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  // Services tabs
  document.querySelectorAll(".tab").forEach((tab) =>
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t === tab));
      document.querySelectorAll("[data-panel]").forEach((p) => {
        p.hidden = p.dataset.panel !== tab.dataset.tab;
      });
    })
  );

  // Portfolio filter
  document.querySelectorAll(".filter").forEach((btn) =>
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === btn));
      document.querySelectorAll(".gallery figure").forEach((fig) => {
        fig.hidden = btn.dataset.filter !== "all" && fig.dataset.cat !== btn.dataset.filter;
      });
    })
  );

  // Missing photo -> styled placeholder showing which file to add
  document.querySelectorAll(".gallery img").forEach((img) => {
    const showPlaceholder = () => {
      const fig = img.parentElement;
      fig.classList.add("placeholder", fig.dataset.cat);
      fig.setAttribute("data-file", img.getAttribute("src"));
      img.remove();
    };
    if (img.complete && img.naturalWidth === 0) showPlaceholder();
    else img.addEventListener("error", showPlaceholder);
  });

  // Booking form -> WhatsApp message (no server needed)
  const form = document.getElementById("booking-form");
  const note = document.getElementById("form-note");
  const dateInput = form.elements.date;
  dateInput.min = new Date().toISOString().split("T")[0];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      note.textContent = "Please fill in your name, phone, service and date.";
      note.className = "form-note error";
      form.reportValidity();
      return;
    }
    const d = Object.fromEntries(new FormData(form));
    const text =
      `Hi! I'd like to book an appointment.\n` +
      `Name: ${d.name}\nPhone: ${d.phone}\nService: ${d.service}\nDate: ${d.date}` +
      (d.message ? `\nDetails: ${d.message}` : "");
    window.open(`https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    note.textContent = "Opening WhatsApp with your booking details…";
    note.className = "form-note ok";
    form.reset();
  });
})();
