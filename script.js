/* =========================================
PAGE CONTROL
========================================= */

const page1 =
document.getElementById("page1");

const page2 =
document.getElementById("page2");

const page3 =
document.getElementById("page3");

const page4 =
document.getElementById("page4");


function showPage(page) {

document
.querySelectorAll(".page")
.forEach(function (p) {

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


yesButton.addEventListener(
"click",
function () {

birthdayMusic.volume = 0.4;


birthdayMusic
.play()
.catch(function (error) {

console.log(
"Music could not start:",
error
);

});


showPage(page2);

}
);



/* =========================================
PAGE 1 — NO
========================================= */

const noButton =
document.getElementById("noButton");


function moveNoButton() {

noButton.style.position =
"fixed";


const buttonWidth =
noButton.offsetWidth;


const buttonHeight =
noButton.offsetHeight;


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
document.querySelectorAll(
".balloon"
);


const balloonCount =
document.getElementById(
"balloonCount"
);


const specialMessage =
document.getElementById(
"specialMessage"
);


let popped = 0;



/* =========================================
BALLOON POP EFFECT
========================================= */

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
document.getElementById(
"effects"
);


for (
let i = 0;
i < 7;
i++
) {

const heart =
document.createElement(
"div"
);


heart.className =
"pop-heart";


heart.innerHTML =
Math.random() > 0.5
? "♥"
: "♡";


heart.style.left =
centerX + "px";


heart.style.top =
centerY + "px";


heart.style.setProperty(
"--x",
(
Math.random() * 100 -
50
) + "px"
);


heart.style.setProperty(
"--y",
(
Math.random() * -100 -
30
) + "px"
);


effects.appendChild(
heart
);


setTimeout(
function () {

heart.remove();

},
900
);

}

}



/* =========================================
POP BALLOONS
========================================= */

balloons.forEach(
function (balloon) {

balloon.addEventListener(
"click",
function () {


if (
balloon.classList.contains(
"popped"
)
) {

return;

}


popped++;


createPopEffect(
balloon
);


balloon.classList.add(
"popped"
);


balloonCount.textContent =
popped;



if (popped === 4) {

setTimeout(
function () {

specialMessage
.classList
.add("show");

},
450
);

}

}
);

}
);



/* =========================================
PAGE 2 — CONTINUE
========================================= */

const continueButton =
document.getElementById(
"continueButton"
);


continueButton.addEventListener(
"click",
function () {

showPage(page3);

}
);



/* =========================================
PAGE 3 — SWIPE
========================================= */

const swipeTrack =
document.getElementById(
"swipeTrack"
);


const swipeButton =
document.getElementById(
"swipeButton"
);


const flame =
document.getElementById(
"flame"
);


const wishMessage =
document.getElementById(
"wishMessage"
);


let isDragging = false;

let startX = 0;

let currentX = 0;

let candleBlown = false;



function getMaxSwipe() {

return (
swipeTrack.offsetWidth -
swipeButton.offsetWidth -
12
);

}



/* =========================================
START SWIPE
========================================= */

swipeButton.addEventListener(
"pointerdown",
function (event) {


if (candleBlown) {
return;
}


isDragging = true;


startX =
event.clientX -
currentX;


swipeButton.setPointerCapture(
event.pointerId
);

}
);



/* =========================================
MOVE SWIPE
========================================= */

swipeButton.addEventListener(
"pointermove",
function (event) {


if (
!isDragging ||
candleBlown
) {

return;

}


let newX =
event.clientX -
startX;


const maxSwipe =
getMaxSwipe();


newX =
Math.max(
0,
Math.min(
newX,
maxSwipe
)
);


currentX =
newX;


swipeButton.style.transform =
"translateX(" +
currentX +
"px)";



const progress =
currentX /
maxSwipe;


if (
progress >= 0.78
) {

finishCandle();

}

}
);



/* =========================================
END SWIPE
========================================= */

swipeButton.addEventListener(
"pointerup",
function () {


if (candleBlown) {
return;
}


isDragging = false;


swipeButton.style.transition =
"transform 0.3s ease";


currentX = 0;


swipeButton.style.transform =
"translateX(0)";


setTimeout(
function () {

swipeButton.style.transition =
"";

},
300
);

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


currentX =
getMaxSwipe();


swipeButton.style.transition =
"transform 0.25s ease";


swipeButton.style.transform =
"translateX(" +
currentX +
"px)";



/*
Flame goes out
*/

setTimeout(
function () {

flame.classList.add(
"off"
);

},
120
);



/*
Wish message
*/

setTimeout(
function () {

wishMessage.classList.add(
"show"
);

},
500
);



/*
Change text
*/

setTimeout(
function () {

const blowText =
document.querySelector(
".blow-text"
);


if (blowText) {

blowText.textContent =
"Wish made ✨";

}

},
400
);



/*
Begin transition
*/

setTimeout(
function () {

page3.classList.add(
"leaving"
);

},
900
);



/*
Move to envelope
*/

setTimeout(
function () {

page3.classList.remove(
"leaving"
);


showPage(page4);

},
1500
);

}



/* =========================================
PAGE 4 — ENVELOPE
========================================= */

const envelope =
document.getElementById(
"envelope"
);


const openEnvelope =
document.getElementById(
"openEnvelope"
);


const letterHint =
document.getElementById(
"letterHint"
);


const typedMessage =
document.getElementById(
"typedMessage"
);


let envelopeOpened = false;



/* =========================================
LETTER MESSAGE
========================================= */

const message =
`Happy Birthday Chotu ❤️

Who knew one random, unplanned coffee date would bring you into my life? 🥹

Since then, you’ve filled my life with so many laughs, memories, adventures, and little moments that mean more than you know.

I hope this year brings you everything you wish for and I hope I get to be beside you through all of it. ❤️

More memories, more adventures, more us.

Love you always`;



/* =========================================
OPEN ENVELOPE
========================================= */

function openTheEnvelope() {


if (envelopeOpened) {
return;
}


envelopeOpened = true;


envelope.classList.add(
"opened"
);


openEnvelope.classList.add(
"hidden"
);


letterHint.classList.add(
"hidden"
);



/*
Let the envelope open and
letter rise first.
*/

setTimeout(
function () {

startTyping();

},
1100
);

}



/* Envelope itself */

envelope.addEventListener(
"click",
openTheEnvelope
);



/* Button */

openEnvelope.addEventListener(
"click",
openTheEnvelope
);



/* =========================================
TYPING EFFECT
========================================= */

function startTyping() {


typedMessage.textContent =
"";


let index = 0;



function typeNextCharacter() {


if (
index >=
message.length
) {

return;

}


const character =
message.charAt(index);


typedMessage.textContent +=
character;


index++;



/*
Normal typing speed
*/

let delay = 32;



/*
Natural pauses
*/

if (
character === "." ||
character === "," ||
character === "!"
) {

delay = 130;

}


if (
character === "?"
) {

delay = 180;

}


if (
character === "\n"
) {

delay = 300;

}


setTimeout(
typeNextCharacter,
delay
);

}



typeNextCharacter();

}



/* =========================================
PREVENT CONTEXT MENU
========================================= */

swipeButton.addEventListener(
"contextmenu",
function (event) {

event.preventDefault();

}
);
