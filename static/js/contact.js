$(document).ready(function () {

  /**
   * A function to initialise EmailJS
   */
  (function () {
    emailjs.init("user_E43Rn5N9bcNkea4Jd11HC");
  })();

  /**
   * On form submit send email via emailjs
   */
  window.onload = function () {
    document
      .getElementById("contact-form")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        emailjs.sendForm("contact_service", "contact_form", this);
      });
  };

  /**
   * On successful form submit remove hide-me class to show email confirmation
   * wait 3 secs, then close modal
   */
  $("#contact-form").submit(function () {
    $("#thumb-confirm").show();
    setTimeout(function () {
      $("#contactModal").modal("hide");
      $("#thumb-confirm").hide();
    }, 3000);
  });
});
