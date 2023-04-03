const score = document.getElementById("score");

let scorecount = parseInt(sessionStorage.getItem("scorecount"))|| 0;
let playerX = 0;
let playerY = 0;



sessionStorage.setItem("scorecount", scorecount);
score.innerHTML = `Score: ${scorecount}`;

 // canvas
 const canvas = document.getElementById("canvas");
 const ctx = canvas.getContext("2d");
 
canvas.width= window.innerWidth;
canvas.height= window.innerHeight;

// eventlistener pro pohyb playera
document.addEventListener("keydown", event => {
  if (event.code === "ArrowUp" && player.y > 0) {
    player.y -= 10;
    playerImg.src = "./res/imgs/rocket.png";
  }
  if (event.code === "ArrowDown" && player.y < canvas.height - player.size) {
    player.y += 10;
    playerImg.src = "./res/imgs/rocket-dolu.png";

  }
  if (event.code === "ArrowLeft" && player.x > 0) {
    player.x -= 10;
    playerImg.src = "./res/imgs/rocket-leva.png";

  }
  if (event.code === "ArrowRight" && player.x < canvas.width - player.size) {
    player.x += 10;
    playerImg.src = "./res/imgs/rocket-prava.png";


  }
});

 const playerImg = new Image();
    playerImg.src = "./res/imgs/rocket.png";

 // parametry playera
 let player = {
   x: 150,
   y: 150,
   size: 50,
   image: playerImg
 };

 let objects = [];
 let blackholes = [];
 
 const mercurImg = new Image();
 mercurImg.src = "./res/imgs/uranus.png";
 
 function createObject() {
   if (objects.length < 3) {
     let object = {
       x: Math.random() * canvas.width,
       y: Math.random() * canvas.height,
       size: 60,
       image: mercurImg,
     };
     objects.push(object);
   }
 }
 
 const blackholeImg = new Image();
 blackholeImg.src = "./res/imgs/blackhole.png";
 
 function createBlackhole() {
   if (blackholes.length < 15) {
     let blackhole = {
       x: Math.random() * canvas.width,
       y: Math.random() * canvas.height,
       size: 100,
       image: blackholeImg,
     };
     blackholes.push(blackhole);
   }
 }
 
 function gameLoop() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.drawImage(player.image, player.x, player.y, player.size, player.size);
 
   if (Math.random() < 0.2) {
     createObject();
     if (Math.random() < 0.05) {
       createBlackhole();
     }
   }
 
   for (let i = 0; i < objects.length; i++) {
     let object = objects[i];
     ctx.drawImage(object.image, object.x, object.y, object.size, object.size);
 
     if (
       player.x < object.x + object.size &&
       player.x + player.size > object.x &&
       player.y < object.y + object.size &&
       player.y + player.size > object.y
     ) {
       objects.splice(i, 1);
       scorecount += 1;
       score.innerHTML = `Score: ${scorecount}`;
       sessionStorage.setItem("scorecount", scorecount);
     }
   }
 
   for (let i = 0; i < blackholes.length; i++) {
     let blackhole = blackholes[i];
     ctx.drawImage(blackhole.image, blackhole.x, blackhole.y, blackhole.size, blackhole.size);
 
     if (
       player.x < blackhole.x + blackhole.size &&
       player.x + player.size > blackhole.x &&
       player.y < blackhole.y + blackhole.size &&
       player.y + player.size > blackhole.y
     ) {
      scorecount = 0;
      sessionStorage.setItem("scorecount", scorecount);
       window.location.href = "index.html";
     }
   }
 
   requestAnimationFrame(gameLoop);
 }
 
 requestAnimationFrame(gameLoop);