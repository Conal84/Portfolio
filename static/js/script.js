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
//   c.globalAlpha = 0.4;

  class DrawLine {
      constructor(startX, startY, endX, endY, width, color) {
          this.startX = startX;
          this.startY = startY;
          this.endX = endX;
          this.endY = endY;
          this.delta = 50;
          this.slope = (endY - startY) / (endX - startX);
          this.width = width;
          this.color = color;
      }

      draw() {
          c.beginPath();
          c.moveTo(this.startX, this.startY);
          c.lineTo((this.startX + this.delta), (this.startY + (this.slope * this.delta)));
          c.lineWidth = this.width;
          c.strokeStyle = this.color;
          c.stroke();
      }

      update() {
          
      }
  }

  // A class to create particles on the canvas
//   class Particle {
//     constructor(minRadius, maxRadius) {
//       this.dx = Math.random() - 0.5;
//       this.dy = Math.random() - 0.5;
//       this.dr = 0.05;
//       this.minRadius = minRadius;
//       this.maxRadius = maxRadius;
//       this.radius = Math.round(
//         Math.random() * (this.maxRadius - this.minRadius + 1) + this.minRadius
//       );
//       this.deltaOpacity = 1 / (this.maxRadius - this.minRadius);
//       this.currentOpacity = (this.radius - this.minRadius) * this.deltaOpacity;
//       this.x = Math.random() * (canv.width - this.radius * 2) + this.radius;
//       this.y = Math.random() * (canv.height - this.radius * 2) + this.radius;
//     }
//     // Method to draw a circle
//     draw() {
//       c.beginPath();
//       c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//       c.fillStyle = `rgba(245, 245, 245, ${this.currentOpacity})`;
//       c.fill();
//     }
//     // Method to update the circle
//     update() {
//       this.draw();
//       if (this.x + this.radius > canv.width || this.x - this.radius < 0) {
//         this.dx = -this.dx;
//       }

//       if (this.y + this.radius > canv.height || this.y - this.radius < 0) {
//         this.dy = -this.dy;
//       }

//       if (this.radius > this.maxRadius || this.radius < this.minRadius) {
//         this.dr = -this.dr;
//       }

//       this.x += this.dx;
//       this.y += this.dy;
//       this.radius += this.dr;
//       this.currentOpacity = (this.radius - this.minRadius) * this.deltaOpacity;
//     }
//   }

  // A class to create small particles on the canvas
  class SmallParticle {
    constructor(radius) {
      this.radius = radius;
      this.x = Math.random() * (canv.width - this.radius * 2) + this.radius;
      this.y = Math.random() * (canv.height - this.radius * 2) + this.radius;
      this.dx = Math.random() - 0.5;
      this.dy = Math.random() - 0.5;
    }
    // Method to draw a circle
    draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.strokeStyle = "#f5f5f5";
      c.stroke();
    }
    // Method to update the circle
    update() {
      this.draw();
      if (this.x + this.radius > canv.width || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }

      if (this.y + this.radius > canv.height || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;
    }
  }

  // Array to store particle objects
  let particleArray = [];

  // Function to create Particles and push them into the particleArray
  function initParticles() {
    for (let i = 0; i < 20; i++) {
      let minRadius = 10;
      let maxRadius = 40;
      particleArray.push(new Particle(minRadius, maxRadius));
    }
    for (let i = 0; i < 10; i++) {
      let minRadius = 20;
      let maxRadius = 40;
      particleArray.push(new Particle(minRadius, maxRadius));
    }
    for (let i = 0; i < 40; i++) {
      let radius = 3;
      particleArray.push(new SmallParticle(radius));
    }
  }
  
  // Function to animate Particles by clearing the canvas and updating Particles
  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canv.width, canv.height);
    // For each particle in the array call the update function
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
