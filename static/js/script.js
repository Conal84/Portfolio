$(document).ready(function () {
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

  // Canvas
  let canv = document.getElementById("hero");
  canv.width = window.innerWidth;
  canv.height = window.innerHeight - $(".navbar").height();
  let c = canv.getContext("2d");

  function Particle(x, y, dx, dy, radius, dr) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.dr = dr;
  }

  Particle.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "#f5f5f5";
    c.fillStyle = "rgba(245, 245, 245, 0.5";
    c.fill();
    c.stroke();
  };

  Particle.prototype.update = function () {
    this.draw();

    if (this.x + this.radius > canv.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > canv.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.r += this.dr;
  };

  let particleArray = [];

  function initParticles() {
    for (let i = 0; i < 50; i++) {
      let radius = 30;
      let x = Math.random() * (canv.width - radius * 2) + radius;
      let y = Math.random() * (canv.height - radius * 2) + radius;
      let dx = (Math.random() - 0.5) * 8;
      let dy = (Math.random() - 0.5) * 8;
      particleArray.push(new Particle(x, y, dx, dy, radius));
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canv.width, canv.height);

    particleArray.forEach((particle) => particle.update());
  }

  initParticles();
  animate();

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

  // On successful form submit remove hide-me class to show email confirmation, then close modal
  $("#contact-form").submit(function () {
    $("#thumb-confirm").show();
    setTimeout(function () {
      $("#contactModal").modal("hide");
      $("#thumb-confirm").hide();
    }, 3000);
  });
});
