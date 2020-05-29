function Circle(el) {
  $(el)
    .circleProgress({ fill: { color: "#ff5c5c" } })
    .on("circle-animation-progress", function (event, progress, stepValue) {
      $(this)
        .find("strong")
        .text(String(stepValue.toFixed(2)).substr(2) + "%");
    });
}

Circle(".round");

(function () {
  emailjs.init("user_E43Rn5N9bcNkea4Jd11HC");
})();

window.onload = function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      emailjs.sendForm("contact_service", "contact_form", this);
    });
};
