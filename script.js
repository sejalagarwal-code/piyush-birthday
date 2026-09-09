/* =========================================
PAGE CONTROL
========================================= */

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");
const page4 = document.getElementById("page4");

function showPage(page) {
if (!page) return;

document.querySelectorAll(".page").forEach(function (p) {
p.classList.remove("active");
});

page.classList.add("active");
}


/* =========================================
MUSIC
========================================= */

const birthdayMusic =
document.getElementById("birthdayMusic");


/* =========================================
PAGE 1 — YES
========================================= */

const yesButton =
document.getElementById("yesButton");

if (yesButton) {

yesButton.addEventListener("click", function () {

if (birthdayMusic) {

birthdayMusic.volume = 0.4;

birthdayMusic.play().catch(function (error) {
console.log("Music could not start:", error);
});

}

showPage(page2);

});

}


/* =========================================
PAGE 1 — NO
========================================= */

const noButton =
document.getElementById("noButton");

function moveNoButton() {

if (!noButton) return;

noButton.style.position = "fixed";

const buttonWidth =
noButton.offsetWidth;

const buttonHeight =
noButton.offsetHeight;

const padding = 25;

const maxX = Math.max(
padding,
window.innerWidth -
buttonWidth -
padding
);

const maxY = Math.max(
padding,
window.innerHeight -
buttonHeight -
padding
);

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

if (noButton) {

noButton.addEventListener(
"mouseenter",
moveNoButton
);

noButton.addEventListener(
"touchstart",
function (event) {

event.preventDefault();

moveNoButton();

},
{
passive: false
}
);

}


/* =========================================
PAGE 2 — BALLOONS
========================================= */

const balloons =
document.querySelectorAll(".balloon");

const balloonCount =
document.getElementById("balloonCount");

const specialMessage =
document.getElementById("specialMessage");

let popped = 0;


function createPopEffect(balloon) {

const rect =
balloon.getBoundingClientRect();

const centerX =
rect.left +
rect.width / 2;

const centerY =
rect.top +
rect.height / 2;

const effects =
document.getElementById("effects");

if (!effects) return;

for (let i = 0; i < 7; i++) {
balloons.forEach(function (balloon) {

balloon.addEventListener(
"click",
function () {

if (
balloon.classList.contains("popped")
) {
return;
}

popped++;

createPopEffect(balloon);

balloon.classList.add("popped");

if (balloonCount) {
balloonCount.textContent =
popped;
}

if (popped === 4 && specialMessage) {

setTimeout(function () {

specialMessage
.classList
.add("show");

}, 450);

}

}
);

});


/* =========================================
PAGE 2 — CONTINUE
========================================= */

const continueButton =
document.getElementById("continueButton");

if (continueButton) {

continueButton.addEventListener(
"click",
function () {

showPage(page3);

}
);

}


/* =========================================
PAGE 3 — SWIPE
========================================= */

const swipeTrack =
document.getElementById("swipeTrack");

const swipeButton =
document.getElementById("swipeButton");

const flame =
document.getElementById("flame");

const wishMessage =
document.getElementById("wishMessage");

let isDragging = false;
let startX = 0;
let currentX = 0;
let candleBlown = false;


function getMaxSwipe() {

if (!swipeTrack || !swipeButton) {
return 0;
}

return Math.max(
0,
swipeTrack.offsetWidth -
swipeButton.offsetWidth -
12
);

}


if (swipeButton) {

swipeButton.addEventListener(
"pointerdown",
function (event) {

if (candleBlown) return;

isDragging = true;

startX =
event.clientX -
currentX;

swipeButton.setPointerCapture(
event.pointerId
);

}
);


maxSwipe > 0
? currentX / maxSwipe
: 0;

if (progress >= 0.78) {
finishCandle();
}

}
);


swipeButton.addEventListener(
"pointerup",
function () {

if (candleBlown) return;

isDragging = false;

swipeButton.style.transition =
"transform 0.3s ease";

currentX = 0;

swipeButton.style.transform =
"translateX(0)";

setTimeout(function () {

swipeButton.style.transition =
"";

}, 300);

}
);


swipeButton.addEventListener(
"pointercancel",
function () {

isDragging = false;

}
);


swipeButton.addEventListener(
"contextmenu",
function (event) {

event.preventDefault();

}
);

}


/* =========================================
BLOW CANDLE
========================================= */

function finishCandle() {

if (candleBlown) return;

candleBlown = true;
isDragging = false;

currentX = getMaxSwipe();

if (swipeButton) {

swipeButton.style.transition =
"transform 0.25s ease";

swipeButton.style.transform =
"translateX(" +
currentX +
"px)";

}


setTimeout(function () {

if (flame) {
flame.classList.add("off");
}

}, 120);


setTimeout(function () {

if (wishMessage) {
wishMessage.classList.add("show");
}

}, 500);


setTimeout(function () {

const blowText =
document.querySelector(".blow-text");

if (blowText) {
blowText.textContent =
"Wish made ✨";
}

}, 400);


setTimeout(function () {

if (page3) {
page3.classList.add("leaving");
}

}, 900);


setTimeout(function () {

if (page3) {
if (!envelope || !typedMessage) return;

envelopeOpened = true;

envelope.classList.add("opened");

if (openEnvelope) {
openEnvelope.classList.add("hidden");
}

if (letterHint) {
letterHint.classList.add("hidden");
}

setTimeout(function () {

startTyping();

}, 1100);

}


if (envelope) {

envelope.addEventListener(
"click",
openTheEnvelope
);

}


if (openEnvelope) {

openEnvelope.addEventListener(
"click",
openTheEnvelope
);

}


/* =========================================
TYPING EFFECT
========================================= */

function startTyping() {

if (!typedMessage) return;

typedMessage.textContent = "";

let index = 0;


function typeNextCharacter() {

if (index >= message.length) {
return;
}

const character =
message.charAt(index);

typedMessage.textContent +=
character;

index++;

let delay = 32;

if (
character === "." ||
character === "," ||
character === "!"
) {
delay = 130;
}

if (character === "?") {
delay = 180;
}

if (character === "\n") {
delay = 300;
}

setTimeout(
typeNextCharacter,
delay
);

}

typeNextCharacter();

}

});
