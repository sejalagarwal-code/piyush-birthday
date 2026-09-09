/* =====================================================
PAGE CONTROL
===================================================== */

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

const birthdayMusic = document.getElementById("birthdayMusic");


function showPage(page) {

document.querySelectorAll(".page").forEach(function(section) {
section.classList.remove("active");
});

page.classList.add("active");
}


/* =====================================================
PAGE 1 — YES BUTTON
===================================================== */

yesButton.addEventListener("click", function() {

birthdayMusic.volume = 0.4;

birthdayMusic.play().catch(function(error) {
console.log("Music could not start:", error);
});

showPage(page2);
});


/* =====================================================
PAGE 1 — NO BUTTON
===================================================== */

function moveNoButton() {

noButton.style.position = "fixed";

const buttonWidth = noButton.offsetWidth;
const buttonHeight = noButton.offsetHeight;

const padding = 25;

const maxX =
window.innerWidth -
buttonWidth -
padding;

const maxY =
window.innerHeight -
buttonHeight -
padding;

const randomX =
Math.floor(
Math.random() *
(maxX - padding + 1)
) + padding;

const randomY =
Math.floor(
Math.random() *
(maxY - padding + 1)
) + padding;

noButton.style.left =
randomX + "px";

noButton.style.top =
randomY + "px";
}


noButton.addEventListener(
"mouseenter",
moveNoButton
);

noButton.addEventListener(
"touchstart",
function(event) {

event.preventDefault();

moveNoButton();
},
{
passive: false
}
);


/* =====================================================
PAGE 2 — BALLOONS
===================================================== */

const balloons =
document.querySelectorAll(".balloon");

const balloonCounter =
document.getElementById("balloonCounter");

const specialMessage =
document.getElementById("specialMessage");

const balloonContinue =
document.getElementById("balloonContinue");

let popped = 0;


balloons.forEach(function(balloon) {

balloon.addEventListener("click", function() {

if (balloon.classList.contains("popped")) {
return;
}

balloon.classList.add("popped");

popped++;

balloonCounter.textContent =
popped + " / 4 popped";

createPopEffect(balloon);


if (popped === 4) {

setTimeout(function() {

specialMessage.classList.add("show");

}, 400);

}

});

});


/* =====================================================
BALLOON POP EFFECT
===================================================== */

function createPopEffect(balloon) {

const rect =
balloon.getBoundingClientRect();

for (let i = 0; i < 8; i++) {

const heart =
document.createElement("span");

heart.textContent = "♥";

heart.style.position = "fixed";

heart.style.left =
rect.left +
rect.width / 2 +
"px";

heart.style.top =
rect.top +
rect.height / 2 +
"px";

heart.style.fontSize =
Math.random() * 10 + 10 + "px";

heart.style.color =
"#e95d91";

heart.style.pointerEvents =
"none";

heart.style.zIndex = "100";

const angle =
Math.random() *
Math.PI *
2;

const distance =
Math.random() * 70 + 30;

const x =
Math.cos(angle) *
distance;

const y =
Math.sin(angle) *
distance;

heart.animate(
[
{
transform:
"translate(-50%, -50%) scale(1)",
opacity: 1
},
{
transform:
`translate(
calc(-50% + ${x}px),
calc(-50% + ${y}px)
)
scale(0)`,
opacity: 0
}
],
{
duration: 650,

easing: "ease-out"
}
);

document.body.appendChild(heart);

setTimeout(function() {
heart.remove();
}, 700);
}
}


/* =====================================================
PAGE 2 → PAGE 3
===================================================== */

balloonContinue.addEventListener(
"click",
function() {

showPage(page3);

resetCandle();

}
);


/* =====================================================
PAGE 3 — CANDLE
===================================================== */

const flame =
document.getElementById("flame");

const birthdayCandle =
document.getElementById("birthdayCandle");

const swipeTrack =
document.getElementById("swipeTrack");

const swipeButton =
document.getElementById("swipeButton");

const swipeProgress =
document.getElementById("swipeProgress");


let isDragging = false;

let startX = 0;

let currentX = 0;

let swipeCompleted = false;


/* =====================================================
SWIPE START
===================================================== */

function startSwipe(event) {

if (swipeCompleted) {
return;
}

isDragging = true;

if (event.type === "touchstart") {

startX =
event.touches[0].clientX;

} else {

startX =
event.clientX;
}

swipeButton.style.transition =
"none";
}


swipeButton.addEventListener(
"mousedown",
startSwipe
);

swipeButton.addEventListener(
"touchstart",
startSwipe,
{
passive: true
}
);


/* =====================================================
SWIPE MOVE
===================================================== */

function moveSwipe(event) {

if (!isDragging || swipeCompleted) {
return;
}

if (event.type === "touchmove") {

currentX =
event.touches[0].clientX;

} else {

currentX =
event.clientX;
}

let distance =
currentX - startX;

if (distance < 0) {
distance = 0;
}

const trackWidth =
swipeTrack.offsetWidth;

const buttonWidth =
swipeButton.offsetWidth;

const maxDistance =
trackWidth -
buttonWidth -
10;

if (distance > maxDistance) {
distance = maxDistance;
}

swipeButton.style.transform =
`translateX(${distance}px)`;

const percentage =
(distance / maxDistance) * 100;

swipeProgress.style.width =
percentage + "%";


/* Candle blows out when swipe reaches end */

if (percentage >= 90) {

completeSwipe();

}
}


document.addEventListener(
"mousemove",
moveSwipe
);

document.addEventListener(
"touchmove",
moveSwipe,
{
passive: true
}
);


/* =====================================================
SWIPE END
===================================================== */

function endSwipe() {

if (!isDragging) {
return;
}

isDragging = false;

if (swipeCompleted) {
return;
}

swipeButton.style.transition =
"transform 0.3s ease";

swipeButton.style.transform =
"translateX(0)";

swipeProgress.style.transition =
"width 0.3s ease";

swipeProgress.style.width =
"0%";
}


document.addEventListener(
"mouseup",
endSwipe
);

document.addEventListener(
"touchend",
endSwipe
);


/* =====================================================
CANDLE BLOWN OUT
===================================================== */

function completeSwipe() {

if (swipeCompleted) {
return;
}

swipeCompleted = true;

isDragging = false;

flame.classList.add("blown-out");

birthdayCandle.classList.add("candle-blown");

swipeButton.style.transition =
"transform 0.25s ease";

const trackWidth =
swipeTrack.offsetWidth;

const buttonWidth =
swipeButton.offsetWidth;

const finalPosition =
trackWidth -
buttonWidth -
10;

swipeButton.style.transform =
`translateX(${finalPosition}px)`;

swipeProgress.style.transition =
"width 0.25s ease";

swipeProgress.style.width =
"100%";


/* Tiny celebration */

createCandleEffect();


/*
Wait briefly so the user sees
the flame go out before Page 4.
*/

setTimeout(function() {

showPage(
document.getElementById("page4")
);

}, 850);
}


/* =====================================================
RESET CANDLE
===================================================== */

function resetCandle() {

swipeCompleted = false;

isDragging = false;

flame.classList.remove(
"blown-out"
);

birthdayCandle.classList.remove(
"candle-blown"
);

swipeButton.style.transform =
"translateX(0)";

swipeProgress.style.width =
"0%";
}


/* =====================================================
CANDLE EFFECT
===================================================== */

function createCandleEffect() {

const rect =
flame.getBoundingClientRect();

for (let i = 0; i < 12; i++) {

const particle =
document.createElement("span");

particle.textContent =
Math.random() > 0.5
? "✨"
: "♡";

particle.style.position =
"fixed";

particle.style.left =
rect.left +
rect.width / 2 +
"px";

particle.style.top =
rect.top +
rect.height / 2 +
"px";

particle.style.fontSize =
Math.random() * 8 + 10 +
"px";

particle.style.pointerEvents =
"none";

particle.style.zIndex =
"200";

const angle =
Math.random() *
Math.PI *
2;

const distance =
Math.random() * 80 +
40;

const x =
Math.cos(angle) *
distance;

const y =
Math.sin(angle) *
distance;

particle.animate(
[
{
transform:
"translate(-50%, -50%) scale(1)",
opacity: 1
},
{
transform:
`translate(
calc(-50% + ${x}px),
calc(-50% + ${y}px)
)
scale(0)`,
opacity: 0
}
],
{
duration: 700,

easing: "ease-out"
}
);

document.body.appendChild(
particle
);

setTimeout(function() {
particle.remove();
}, 750);
}
}
