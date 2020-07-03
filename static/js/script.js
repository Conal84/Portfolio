// Function to animate skills progress circle
function Circle(el) {
  $(el)
    .circleProgress({ fill: { color: "#ffcd24" } })
    .on("circle-animation-progress", function (event, progress, stepValue) {
      $(this)
        .find("strong")
        .text(String(stepValue.toFixed(2)).substr(2) + "%");
    });
}

// Circle function call
Circle(".round");

// Initialise emailjs
(function () {
  emailjs.init("user_E43Rn5N9bcNkea4Jd11HC");
})();

// On form submit send email via emailjs
window.onload = function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      emailjs.sendForm("contact_service", "contact_form", this);
    });
};

// On successful form submit close the modal
$("#contact-form").submit(function(){
    $("#contactModal").modal('hide');
    $("#email-toast").toast('show');
    return false;
});