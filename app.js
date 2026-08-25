const form = document.getElementById("registrationForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!REGISTRATION_ENDPOINT) {
    message.textContent = "D'Umeldungsform ass prett. Fir d'Umeldungen ze späicheren, muss nach de gratis Google-Sheet-Link agefouert ginn.";
    message.style.color = "#b54708";
    return;
  }

  const data = Object.fromEntries(new FormData(form).entries());
  data.timestamp = new Date().toISOString();

  const button = form.querySelector("button");
  button.disabled = true;
  button.textContent = "Gëtt geschéckt…";
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
    message.textContent = "Merci! Är Umeldung ass ukomm.";
    message.style.color = "#087443";
  } catch (error) {
    message.textContent = "Et ass e Feeler opgetrueden. Probéiert w.e.g. nach eng Kéier.";
    message.style.color = "#b42318";
  } finally {
    button.disabled = false;
    button.textContent = "Umeldung ofschécken";
  }
});
