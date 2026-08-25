let currentLang = localStorage.getItem("secherheetsdag-lang") || "lb";

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-lb][data-fr]").forEach(el => {
    el.textContent = el.dataset[lang];
  });

  document.querySelectorAll("[data-lb-placeholder][data-fr-placeholder]").forEach(el => {
    el.placeholder = lang === "lb" ? el.dataset.lbPlaceholder : el.dataset.frPlaceholder;
  });

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  const title = lang === "lb"
    ? "Sécherheetsdag 2026 – Biekerech"
    : "Journée de la sécurité 2026 – Beckerich";
  document.title = title;
  localStorage.setItem("secherheetsdag-lang", lang);
}

document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
});

applyLanguage(currentLang);

const form = document.getElementById("registrationForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!REGISTRATION_ENDPOINT) {
    message.textContent = currentLang === "lb"
      ? "D'Umeldungsform ass prett. Fir d'Umeldungen ze späicheren, muss nach de gratis Google-Sheet-Link agefouert ginn."
      : "Le formulaire est prêt. Pour enregistrer les inscriptions, le lien gratuit vers Google Sheets doit encore être configuré.";
    message.style.color = "#b54708";
    return;
  }

  const data = Object.fromEntries(new FormData(form).entries());
  data.timestamp = new Date().toISOString();
  data.language = currentLang;

  const button = form.querySelector("button");
  button.disabled = true;
  button.textContent = currentLang === "lb" ? "Gëtt geschéckt…" : "Envoi…";
  message.textContent = "";

  try {
    await fetch(REGISTRATION_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    form.reset();
    form.querySelector('[name="extinguishers"]').value = 1;
    message.textContent = currentLang === "lb"
      ? "Merci! Är Umeldung ass ukomm."
      : "Merci ! Votre inscription a bien été enregistrée.";
    message.style.color = "#087443";
  } catch (error) {
    message.textContent = currentLang === "lb"
      ? "Et ass e Feeler opgetrueden. Probéiert w.e.g. nach eng Kéier."
      : "Une erreur s'est produite. Veuillez réessayer.";
    message.style.color = "#b42318";
  } finally {
    button.disabled = false;
    button.textContent = currentLang === "lb" ? "Umeldung ofschécken" : "Envoyer l'inscription";
  }
});
