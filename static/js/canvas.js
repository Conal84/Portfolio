$(document).ready(function () {
  let canv = document.getElementById("hero");
  let c = canv.getContext("2d");

  /**
   * A media query function to resize the canvas
   * if the window is less than or equal to view parameter
   * @param {string} - the size of the view ex: (max-width: 420px)
   */
  function initCanvas(view) {
    if (view.matches) {
      let canv = document.getElementById("hero");
      canv.width = window.innerWidth;
      canv.height = canv.width;
    } else {
      let canv = document.getElementById("hero");
      canv.width = window.innerWidth;
      canv.height = window.innerHeight - $(".navbar").height();
    }
  }

  let viewMatch = window.matchMedia("(max-width: 420px)");
  initCanvas(viewMatch);
  viewMatch.addListener(initCanvas);

  /** On window resize run initCanvas */
  window.addEventListener("resize", initCanvas(viewMatch));

  /**
   * Class to take line start and end arguments
   * calculates slope, y-intercept and points on the line
   * @param {number} startX - line start x coordinate
   * @param {number} startY - line start y coordinate
   * @param {number} endX - line end x coordinate
   * @param {number} endY - line end y coordinate
   */
  class DrawLine {
    constructor(startX, startY, endX, endY, segments) {
      this.startX = startX;
      this.startY = startY;
      this.endX = endX;
      this.endY = endY;
      this.segments = segments;
      this.slope = (endY - startY) / (endX - startX);
      this.intercept = startY - this.slope * startX;
      this.points = [];
    }

    /**
     * Method to calculate points on the line
     * and store them in an array
     */
    calcpoints() {
      for (let i = 0; i <= this.segments; i++) {
        let x = this.startX + ((this.endX - this.startX) / this.segments) * i;
        let y = this.startY + ((this.endY - this.startY) / this.segments) * i;
        this.points.push({ x: x, y: y });
      }
    }
  }

  let line1 = new DrawLine(
    0,
    canv.height * 0.7,
    canv.width,
    canv.height * 0.4,
    30
  );
  let line2 = new DrawLine(
    canv.width * 0.3,
    0,
    canv.width * 0.8,
    canv.height,
    30
  );
  line1.calcpoints();
  line2.calcpoints();

  /**
   * Draw a line at a specified speed across the canvas
   * setInterval used as requestAnimationFrame cannot contol line draw speed
   * @param {array} coords - array of line coordinates
   * @param {string} color - hex line stroke color
   * @param {number} width - line width
   * @param {number} speed - the interval in milliseconds to execute change function,
   * the higher the speed value the slower the line is drawn
   * @param {number} segments - the number of segments in the line
   */
  function draw(coords, color, width, speed, segments) {
    let num = 1;
    inter = setInterval(change, speed);

    /**
     * Function to cycle thru line coordinates and draw a line
     */
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

  /**
   * Draw 2 lines on the canvas
   */
  draw(line1.points, "#000", 8, 20, line1.segments);
  draw(line2.points, "#fff", 5, 20, line2.segments);

  /**
   * Find the intersecting point of 2 lines
   * @param {number} slope1 - the slope of line 1
   * @param {number} slope2 - the slope of line 2
   * @param {number} c1 - the y intercept of line 1
   * @param {number} c2 - the y intercept of line 2
   * @return {array} point - array of x, y intersecting coordinate
   */
  function findIntercept(slope1, slope2, c1, c2) {
    let point = [];
    let x = (c2 - c1) / (slope1 - slope2);
    let y = slope1 * x + c1;
    point.push({ x: x, y: y });
    return point;
  }

  /**
   * Draws polygons on the canvas
   * @param {number} point1 - corner 1 of polygon
   * @param {number} point2 - corner 2 of polygon
   * @param {number} point3 - corner 3 of polygon
   * @param {number} point4 - corner 4 of polygon
   * @param {string} color - rgba color of polygon
   */
  function drawPoly(point1, point2, point3, point4, color) {
    c.fillStyle = color;
    c.beginPath();
    c.moveTo(point1.x, point1.y);
    c.lineTo(point2.x, point2.y);
    c.lineTo(point3.x, point3.y);
    c.lineTo(point4.x, point4.y);
    c.closePath();
    c.fill();
  }

  /**
   * Call findIntercept with slopes and y intercepts of line1 and line2 to find x, y intercept
   */
  let interPoint = findIntercept(
    line1.slope,
    line2.slope,
    line1.intercept,
    line2.intercept
  );

  /**
   * An array to hold the corners of the canvas
   */
  let canvCorners = [
    { x: 0, y: 0 },
    { x: canv.width, y: 0 },
    { x: canv.width, y: canv.height },
    { x: 0, y: canv.height },
  ];

  /**
   * Top left Poly Rich Black
   */
  drawPoly(
    canvCorners[0],
    line2.points[0],
    interPoint[0],
    line1.points[0],
    "rgba(11, 10, 7, 1)"
  );

  /**
   * Bottom Left Poly Platinum Grey
   */
  drawPoly(
    line1.points[0],
    canvCorners[3],
    line2.points[line2.points.length - 1],
    interPoint[0],
    "rgba(234, 236, 236, 1)"
  );

  /**
   * Top Right Poly Mustard
   */
  drawPoly(
    line2.points[0],
    canvCorners[1],
    line1.points[line1.points.length - 1],
    interPoint[0],
    "rgba(255, 217, 92, 1)"
  );

  /**
   * Bottom Right Poly Sunglow
   */
  drawPoly(
    line1.points[line1.points.length - 1],
    canvCorners[2],
    line2.points[line2.points.length - 1],
    interPoint[0],
    "rgba(255, 205, 36, 1)"
  );
  });

