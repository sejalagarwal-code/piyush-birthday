/* =========================================
PAGE CONTROL
========================================= */

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");

function showPage(page) {

document.querySelectorAll(".page").forEach(function (p) {
p.classList.remove("active");
});

page.classList.add("active");
}


/* =========================================
MUSIC
========================================= */

const birthdayMusic = document.getElementById("birthdayMusic");


/* =========================================
PAGE 1 — YES BUTTON
========================================= */

const yesButton = document.getElementById("yesButton");

yesButton.addEventListener("click", function () {

/*
Music starts from the user's click.
This works with iPhone autoplay restrictions
because play() is triggered by a real tap.
*/

birthdayMusic.volume = 0.4;

birthdayMusic.play().catch(function (error) {
console.log("Music could not start:", error);
});

showPage(page2);
});


/* =========================================
PAGE 1 — NO BUTTON
========================================= */

const noButton = document.getElementById("noButton");

function moveNoButton() {

/*
Make the button fixed so it can move
anywhere within the screen.
*/

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

const minX = padding;
const minY = padding;

const randomX =
Math.floor(
Math.random() *
(maxX - minX + 1)
) + minX;

const randomY =
Math.floor(
Math.random() *
(maxY - minY + 1)
) + minY;

noButton.style.left = randomX + "px";
noButton.style.top = randomY + "px";
}


/*
Desktop
*/

noButton.addEventListener(
"mouseenter",
moveNoButton
);


/*
Mobile
*/

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


/* =========================================
BALLOON POP EFFECT
========================================= */

function createPopEffect(balloon) {

const rect =
balloon.getBoundingClientRect();

const centerX =
rect.left + rect.width / 2;

const centerY =
rect.top + rect.height / 2;

const effects =
document.getElementById("effects");

for (let i = 0; i < 7; i++) {

const heart =
document.createElement("div");

heart.className = "pop-heart";

heart.innerHTML =
Math.random() > 0.5 ? "♥" : "♡";

heart.style.left =
centerX + "px";

heart.style.top =
centerY + "px";

heart.style.setProperty(
"--x",
(Math.random() * 100 - 50) + "px"
);

heart.style.setProperty(
"--y",
(Math.random() * -100 - 30) + "px"
);

effects.appendChild(heart);

setTimeout(function () {
heart.remove();
}, 900);
}
}


/* =========================================
POP EACH BALLOON
========================================= */

balloons.forEach(function (balloon) {

balloon.addEventListener("click", function () {

if (balloon.classList.contains("popped")) {
return;
}

popped++;

createPopEffect(balloon);

balloon.classList.add("popped");

balloonCount.textContent = popped;


/*
Once all 4 are popped,
reveal the message.
*/

if (popped === 4) {

setTimeout(function () {

specialMessage.classList.add("show");

}, 450);
}

});

});


/* =========================================
PAGE 2 — CONTINUE
========================================= */

const continueButton =
document.getElementById("continueButton");

continueButton.addEventListener(
"click",
function () {

showPage(page3);

}
);


/* =========================================
PAGE 3 — SWIPE CANDLE
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


/* =========================================
GET MAXIMUM SWIPE DISTANCE
========================================= */

function getMaxSwipe() {

return (
swipeTrack.offsetWidth -
swipeButton.offsetWidth -
12
);
}


/* =========================================
POINTER DOWN
========================================= */

swipeButton.addEventListener(
"pointerdown",
function (event) {

if (candleBlown) {
return;
}

isDragging = true;

startX = event.clientX - currentX;

swipeButton.setPointerCapture(
event.pointerId
);

}
);


/* =========================================
POINTER MOVE
========================================= */

swipeButton.addEventListener(
"pointermove",
function (event) {

if (!isDragging || candleBlown) {
return;
}

let newX =
event.clientX - startX;

const maxSwipe =
getMaxSwipe();


/*
Keep button completely inside
the swipe track.
*/

newX =
Math.max(
0,
Math.min(
newX,
maxSwipe
)
);

currentX = newX;

swipeButton.style.transform =
"translateX(" + currentX + "px)";


/*
If dragged far enough,
blow the candle.
*/

const progress =
currentX / maxSwipe;

if (progress >= 0.78) {

finishCandle();

}

}
);


/* =========================================
POINTER UP
========================================= */

swipeButton.addEventListener(
"pointerup",
function () {

if (candleBlown) {
return;
}

isDragging = false;

/*
If candle wasn't blown,
smoothly return the button.
*/

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


/* =========================================
BLOW CANDLE
========================================= */

function finishCandle() {

if (candleBlown) {
return;
}

candleBlown = true;

isDragging = false;


/*
Push button to the end.
*/

currentX = getMaxSwipe();

swipeButton.style.transition =
"transform 0.25s ease";

swipeButton.style.transform =
"translateX(" + currentX + "px)";


/*
Blow out flame.
*/

setTimeout(function () {

flame.classList.add("off");

}, 120);


/*
Update text.
*/

setTimeout(function () {

wishMessage.classList.add("show");

}, 550);


/*
Change the instruction.
*/

setTimeout(function () {

const blowText =
document.querySelector(".blow-text");

if (blowText) {

blowText.textContent =
"Wish made ✨";

}

}, 400);
}


/* =========================================
PREVENT CONTEXT MENU ON SWIPE BUTTON
========================================= */

swipeButton.addEventListener(
"contextmenu",
function (event) {

event.preventDefault();

}
);
