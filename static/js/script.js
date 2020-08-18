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
    constructor(startX, startY, endX, endY, segments) {
      this.startX = startX;
      this.startY = startY;
      this.endX = endX;
      this.endY = endY;
      this.slope = (endY - startY) / (endX - startX);
      this.segments = segments;
      this.points = [];
    }

    // Method to calculate points on the line
    calcpoints() {
      let interval = 20;
      this.points.push({ x: this.startX, y: this.startY });
      for (let i = 1; i <= interval; i++) {
        let x = (this.endX / interval) * i;
        let y = this.slope * x + this.startY;
        this.points.push({ x: x, y: y });
      }
      console.log(this.points);
    }
  }

  let line1 = new DrawLine(0, 400, 1500, 300, 20);
  //   let line2 = new DrawLine(0, 600, 1400, 200, 3, "#1478a3");
  line1.calcpoints();
  //   line2.calcpoints();

  function draw(coords, color, width, speed) {
    let num = 1;
    inter = setInterval(change, 100);

    function change() {
      if (num === 19) {
        console.log("hello");
        clearInterval(inter);
      } else {
        c.beginPath();
        c.moveTo(coords[num - 1].x, coords[num - 1].y);
        c.lineTo(coords[num].x, coords[num].y);
        console.log(color);
        c.strokeStyle = color;
        console.log(width);
        c.lineWidth = width;
        c.stroke();
        num++;
      }
    }
  }

  draw(line1.points, "#FF0000", 10, 20);

  //   let num = 1;

  //   inter1 = setInterval(function () {
  //     c.beginPath();
  //     c.moveTo(line1.points[num - 1].x, line1.points[num - 1].y);
  //     c.lineTo(line1.points[num].x, line1.points[num].y);
  //     c.strokeStyle = line1.color;
  //     c.lineWidth = line1.width;
  //     c.stroke();
  //     num++;
  //     if (num >= 19) {
  //       clearInterval(inter1);
  //     }
  //   }, 10);

  //   let num2 = 1;
  //   inter2 = setInterval(function () {
  //     c.beginPath();
  //     c.moveTo(line2.points[num2 - 1].x, line2.points[num2 - 1].y);
  //     c.lineTo(line2.points[num2].x, line2.points[num2].y);
  //     c.strokeStyle = line2.color;
  //     c.lineWidth = line2.width;
  //     c.stroke();
  //     num2++;
  //     if (num2 >= 19) {
  //       clearInterval(inter2);
  //     }
  //   }, 40);

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
