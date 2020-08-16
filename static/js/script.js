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

  class DrawLine {
    constructor(startX, startY, endX, endY, width, color) {
      this.startX = startX;
      this.startY = startY;
      this.endX = endX;
      this.endY = endY;
      this.num = 1;
      this.slope = (endY - startY) / (endX - startX);
      this.width = width;
      this.color = color;
      this.points = [];
    }

    // Method to calculate points on the line
    calcpoints() {
      let interval = 10;
      this.points.push({ x: this.startX, y: this.startY });
      for (let i = 1; i <= interval; i++) {
        let x = (this.endX / interval) * i;
        let y = this.slope * x + this.startY;
        this.points.push({ x: x, y: y });
      }
      console.log(this.points);
    }
  }

  let num = 1;

  function animate() {
    if (num < line1.points.length - 1) {
      requestAnimationFrame(animate);
      c.beginPath();
      c.moveTo(line1.points[num - 1].x, line1.points[num - 1].y);
      c.lineTo(line1.points[num].x, line1.points[num].y);
      c.strokeStyle = line1.color;
      c.lineWidth = line1.width;
      c.stroke();
      num++;
    }
  }

  let line1 = new DrawLine(0, 400, 1500, 300, 10, "#FF0000");
  line1.calcpoints();
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
