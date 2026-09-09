const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");


// ========================================
// CHANGE PAGE
// ========================================

function showPage(page) {

document.querySelectorAll(".page").forEach(function(item) {
item.classList.remove("active");
});

page.classList.add("active");
}


// ========================================
// YES BUTTON
// ========================================

yesButton.addEventListener("click", function() {

showPage(page2);

});


// ========================================
// NO BUTTON
// ========================================

function escapeNoButton() {

const width = noButton.offsetWidth;
const height = noButton.offsetHeight;

const margin = 20;

const maxX =
window.innerWidth - width - margin;

const maxY =
window.innerHeight - height - margin;

const x =
margin +
Math.random() * Math.max(1, maxX - margin);

const y =
margin +
Math.random() * Math.max(1, maxY - margin);

noButton.style.position = "fixed";

noButton.style.left = x + "px";

noButton.style.top = y + "px";

}

noButton.addEventListener(
"mouseenter",
escapeNoButton
);

noButton.addEventListener(
"touchstart",
function(event) {

event.preventDefault();

escapeNoButton();

},
{ passive: false }
);

noButton.addEventListener(
"pointerdown",
function(event) {

event.preventDefault();

escapeNoButton();

}
);


// ========================================
// PAGE 2 — BALLOONS
// ========================================

const balloons =
document.querySelectorAll(".balloon");

const balloonCount =
document.getElementById("balloonCount");

const balloonArea =
document.querySelector(".balloon-area");

const confetti =
document.getElementById("confetti");

let popped = 0;


// ========================================
// BALLOON POP
// ========================================

balloons.forEach(function(balloon) {

balloon.addEventListener("click", function() {

if (balloon.classList.contains("popped")) {
return;
}

balloon.classList.add("popped");

popped++;

balloonCount.textContent = popped;

balloonArea.classList.add("has-pops");

createPopConfetti(balloon);


// All four popped
if (popped === 4) {

setTimeout(function() {

// Page 3 will be connected here
// after we build the candle scene.

alert("All balloons popped! ❤️");

}, 900);

}

});

});


// ========================================
// POP CONFETTI
// ========================================

function createPopConfetti(balloon) {

const rect =
balloon.getBoundingClientRect();

const centerX =
rect.left + rect.width / 2;

const centerY =
rect.top + rect.height / 2;


const pieces = [
"💗",
"💕",
"✨",
"♥",
"💖"
];


for (let i = 0; i < 12; i++) {

const piece =
document.createElement("div");

piece.className =
"confetti-piece";

piece.textContent =
pieces[
Math.floor(
Math.random() * pieces.length
)
];


piece.style.left =
centerX + "px";

piece.style.top =
centerY + "px";


piece.style.setProperty(
"--x",
(Math.random() * 180 - 90) + "px"
);

piece.style.setProperty(
"--y",
(Math.random() * 180 - 90) + "px"
);


confetti.appendChild(piece);


setTimeout(function() {

piece.remove();

}, 1100);

}

}
