import utils, { randomColor } from "./utils";
const { noise } = require("@chriscourses/perlin-noise");
const canvas = document.querySelector("canvas");
const body = document.querySelector("body");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;
canvas.style.backgroundColor = "black";
body.style.overflow = "hidden";
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#000000","#d68910", "#000000", "#00ffcd", "#000000","#ec7063","#000000","#a569bd","#000000"];

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

// Objects
class Circle {
  constructor(x, y, radius, color,offset) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.offset = offset;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
  }
}


let circleArrya = [];
for (let i = 0; i < 200; i++) {
  const radius = 30;
  // const color = colors[Math.floor(Math.random() * colors.length)];
  const color = randomColor(colors)
  // const color = "hsl(200,50,50)"
  const x = canvas.width / 2 -radius;
  const y = canvas.height / 2-radius;
  circleArrya.push(new Circle(x, y, radius, color,i*0.01));
}
let time = 0;
// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  circleArrya.forEach((jam) => {
    jam.draw();
    jam.y = noise(time + jam.offset +20) * canvas.height;
    jam.x = noise(time+jam.offset) * canvas.width;
    console.log(time);
  });
  
  time += 0.005;
}

animate();
