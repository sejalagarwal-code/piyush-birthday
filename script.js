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

noButton.style.position = "fixed";


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
rect.left +
rect.width / 2;


const centerY =
rect.top +
rect.height / 2;


const effects =
document.getElementById("effects");


for (let i = 0; i < 7; i++) {

const heart =
document.createElement("div");


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
(Math.random() * 100 - 50) + "px"
);


heart.style.setProperty(
"--y",
(Math.random() * -100 - 30) + "px"
);


effects.appendChild(heart);


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
balloon.classList
.contains("popped")
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



/* All 4 balloons */

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
PAGE 2 → PAGE 3
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



/* =========================================
MAXIMUM SWIPE
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


startX =
event.clientX -
currentX;


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


currentX = newX;


swipeButton.style.transform =
"translateX(" +
currentX +
"px)";


const progress =
currentX /
maxSwipe;


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
BLOW OUT CANDLE
========================================= */

function finishCandle() {


if (candleBlown) {
return;
}


candleBlown = true;


isDragging = false;



/* Finish swipe */

currentX =
getMaxSwipe();


swipeButton.style.transition =
"transform 0.25s ease";


swipeButton.style.transform =
"translateX(" +
currentX +
"px)";



/* Flame disappears */

setTimeout(
function () {

flame.classList.add(
"off"
);

},
100
);



/* Change text */

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
350
);



/* Show wish */

setTimeout(
function () {

wishMessage
.classList
.add("show");

},
550
);



/*
Short smooth transition
after flame disappears.
*/

setTimeout(
function () {

showPage(page4);

},
1150
);

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



/* =========================================
PAGE 4 — ENVELOPE
========================================= */

const envelope =
document.getElementById(
"envelope"
);


const letterIntro =
document.getElementById(
"letterIntro"
);


const tapToOpen =
document.getElementById(
"tapToOpen"
);


const letterPaper =
document.getElementById(
"letterPaper"
);


const finalLetterStage =
document.getElementById(
"finalLetterStage"
);


let envelopeOpened = false;

let typingStarted = false;



/* =========================================
LETTER TEXT
========================================= */

const letterText = `Happy Birthday Chotu ❤️

Who knew one random, unplanned coffee date would bring you into my life? 🥹

Since then, you’ve filled my life with so many laughs, memories, adventures, and little moments that mean more than you know.

I hope this year brings you everything you wish for, and I hope I get to be beside you through all of it. ❤️

More memories, more adventures, more us.

Love you always ❤️`;



/* =========================================
OPEN ENVELOPE
========================================= */

function openEnvelope() {


if (envelopeOpened) {
return;
}


envelopeOpened = true;


envelope.classList.add(
"open"
);


tapToOpen.style.opacity =
"0";



/*
Let the envelope open first.
*/

setTimeout(
function () {

letterIntro.classList.add(
"hide"
);


/*
Move the same letter
from the envelope into
the final letter stage.
*/

finalLetterStage.appendChild(
letterPaper
);


letterPaper.classList.add(
"final-letter-paper"
);


setTimeout(
function () {

typeLetter();

},
500
);

},
850
);

}



/* =========================================
TAP / CLICK
========================================= */

envelope.addEventListener(
"click",
openEnvelope
);



/* =========================================
KEYBOARD
========================================= */

envelope.addEventListener(
"keydown",
function (event) {


if (
event.key === "Enter" ||
event.key === " "
) {

event.preventDefault();

openEnvelope();

}

}
);



/* =========================================
TYPING
========================================= */

function typeLetter() {


if (typingStarted) {
return;
}


typingStarted = true;


const message =
document.getElementById(
"typedMessage"
);


message.textContent =
"";


let index = 0;


function typeNextCharacter() {


if (
index >=
letterText.length
) {

/*
Typing finished.
Wait slightly, then
shower kisses.
*/

setTimeout(
function () {

createKissShower();

},
500
);

return;

}


message.textContent +=
letterText.charAt(index);


index++;


let delay = 28;


const character =
letterText.charAt(
index - 1
);



/* Natural pauses */

if (
character === "." ||
character === "!" ||
character === "?"
) {

delay = 260;

}

else if (
character === ","
) {

delay = 140;

}

else if (
character === "\n"
) {

delay = 400;

}


setTimeout(
typeNextCharacter,
delay
);

}


typeNextCharacter();

}



/* =========================================
KISS SHOWER
========================================= */

function createKissShower() {


const effects =
document.getElementById(
"effects"
);


const kissCount = 14;


for (
let i = 0;
i < kissCount;
i++
) {


setTimeout(
function () {


const kiss =
document.createElement(
"div"
);


kiss.className =
"kiss";


kiss.textContent =

Math.random() > 0.5
? "💋"
: "😘";


kiss.style.left =

(
8 +
Math.random() * 84
) + "%";


kiss.style.top =

(
65 +
Math.random() * 25
) + "%";


kiss.style.fontSize =

(
15 +
Math.random() * 9
) + "px";


effects.appendChild(
kiss
);


setTimeout(
function () {

kiss.remove();

},
2200
);


},
i * 110
);

}

}
