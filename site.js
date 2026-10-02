(() => {
  const button = document.querySelector(".menu-toggle");
  const navigation = document.getElementById("main-navigation");
  if (button && navigation) {
    document.documentElement.classList.add("menu-ready");
    const smallScreen = window.matchMedia("(max-width: 700px)");
    const closeMenu = () => {
      navigation.hidden = smallScreen.matches;
      button.setAttribute("aria-expanded", String(!navigation.hidden));
      button.textContent = "Menu";
    };
    closeMenu();
    smallScreen.addEventListener("change", closeMenu);
    button.addEventListener("click", () => {
      navigation.hidden = !navigation.hidden;
      button.setAttribute("aria-expanded", String(!navigation.hidden));
      button.textContent = navigation.hidden ? "Menu" : "Chiudi";
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && smallScreen.matches && !navigation.hidden) {
        closeMenu();
        button.focus();
      }
    });
  }

  const update = () => {
    const counter = document.querySelector("[data-countdown]");
    if (counter) {
      // Compare calendar dates in Italy, independent of the guest's time zone.
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Rome",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }).formatToParts(new Date());
      const get = (type) =>
        Number(parts.find((part) => part.type === type).value);
      const today = Date.UTC(get("year"), get("month") - 1, get("day"));
      const days = Math.max(
        0,
        Math.round((Date.UTC(2027, 4, 29) - today) / 86400000),
      );
      counter.textContent = days;
      const label = document.querySelector("[data-countdown-label]");
      if (label)
        label.textContent =
          days === 1 ? "giorno al nostro sì" : "giorni al nostro sì";
    }
  };
  update();
  document.addEventListener("wedding:page", update);
  setInterval(update, 60000);
})();
