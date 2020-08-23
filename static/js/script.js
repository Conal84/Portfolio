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
    constructor(startX, startY, endX, endY) {
      this.startX = startX;
      this.startY = startY;
      this.endX = endX;
      this.endY = endY;
      this.slope = (endY - startY) / (endX - startX);
      this.intercept = startY - this.slope * startX;
      this.points = [];
    }

    // Method to calculate points on the line
    calcpoints() {
      let interval = 20;
      for (let i = 0; i <= interval; i++) {
        let x = this.startX + ((this.endX - this.startX) / interval) * i;
        let y = this.startY + ((this.endY - this.startY) / interval) * i;
        this.points.push({ x: x, y: y });
      }
      console.log(this.points);
    }
  }

  let maxHeight = window.innerHeight;
  let maxWidth = window.innerWidth;
  let line1 = new DrawLine(0, maxHeight * 0.7, maxWidth, maxHeight * 0.4);
  let line2 = new DrawLine(maxWidth * 0.3, 0, maxWidth * 0.8, maxWidth);
  line1.calcpoints();
  line2.calcpoints();

  function draw(coords, color, width, speed, segments) {
    let num = 1;
    inter = setInterval(change, speed);

    function change() {
      if (num === segments + 1) {
        clearInterval(inter);
      } else {
        c.beginPath();
        c.moveTo(coords[num - 1].x, coords[num - 1].y);
        c.lineTo(coords[num].x, coords[num].y);
        c.strokeStyle = color;
        c.lineWidth = width;
        c.stroke();
        num++;
      }
    }
  }

  function findIntercept(slope1, slope2, c1, c2) {
    let point = [];
    let x = (c2 - c1) / (slope1 - slope2);
    let y = slope1 * x + c1;
    point.push({x: x, y: y});
    return point;
  }

  function drawPoly(point1, point2, point3, point4, color) {
    c.fillStyle = color;
    c.beginPath();
    console.log(point1)
    console.log(point2)
    console.log(point3)
    console.log(point4)
    c.moveTo(point1.x, point1.y);
    c.lineTo(point2.x, point2.y);
    c.lineTo(point3.x, point3.y);
    c.lineTo(point4.x, point4.y);
    c.closePath();
    c.fill();
  }

  let interPoint = findIntercept(line1.slope, line2.slope, line1.intercept, line2.intercept);
  console.log(interPoint);

  let canvCorners = [{x: 0, y: maxHeight}, {x: maxWidth, y: maxHeight}, {x: maxWidth, y: 0}];

  drawPoly(line1.points[0], canvCorners[0], line2.points[line2.points.length - 1], interPoint[0], "#FFF");

  let typed = new Typed("#typed", {
    stringsElement: "#typed-strings",
    typeSpeed: 60,
    showCursor: false,
  });

  draw(line1.points, "#FF0000", 8, 20, 20);
  draw(line2.points, "#FFFFFF", 5, 20, 20);

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
