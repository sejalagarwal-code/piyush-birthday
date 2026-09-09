/* =========================================
PAGE CONTROL
========================================= */

const pages = {
page1: document.getElementById("page1"),
page2: document.getElementById("page2"),
page3: document.getElementById("page3"),
page4: document.getElementById("page4")
};

function showPage(page) {

Object.values(pages).forEach((p) => {
p.classList.remove("active");
});

setTimeout(() => {
page.classList.add("active");
}, 80);
}


/* =========================================
MUSIC
========================================= */

const birthdayMusic =
document.getElementById("birthdayMusic");


function startMusic() {

birthdayMusic.volume = 0.75;

const playPromise = birthdayMusic.play();

if (playPromise !== undefined) {

playPromise.catch(() => {
// Browser may block autoplay until user interaction.
});

}
}


/* =========================================
PAGE 1 — YES BUTTON
========================================= */

const yesButton =
document.getElementById("yesButton");

yesButton.addEventListener("click", () => {

startMusic();

showPage(pages.page2);

});


/* =========================================
PAGE 1 — NO BUTTON
========================================= */

const noButton =
document.getElementById("noButton");

function moveNoButton() {

const padding = 20;

const buttonWidth =
noButton.offsetWidth;

const buttonHeight =
noButton.offsetHeight;

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
Math.random() *
(maxX - minX) +
minX;

const randomY =
Math.random() *
(maxY - minY) +
minY;

noButton.style.position = "fixed";

noButton.style.left =
`${randomX}px`;

noButton.style.top =
`${randomY}px`;

noButton.style.zIndex = "50";
}

noButton.addEventListener(
"mouseenter",
moveNoButton
);

noButton.addEventListener(
"touchstart",
(event) => {

event.preventDefault();

moveNoButton();

},
{ passive: false }
);


/* =========================================
PAGE 2 — BALLOONS
========================================= */

const balloons =
document.querySelectorAll(".balloon");

const specialMessage =
document.getElementById("specialMessage");

let poppedBalloons = 0;

balloons.forEach((balloon) => {

balloon.addEventListener("click", () => {

if (balloon.classList.contains("popped")) {
return;
}

balloon.classList.add("popped");

poppedBalloons++;

createPopEffect(balloon);

if (poppedBalloons === 4) {

setTimeout(() => {
specialMessage.classList.add("show");
}, 350);

}

});

});


/* Balloon pop effect */

function createPopEffect(balloon) {

const rect =
balloon.getBoundingClientRect();

for (let i = 0; i < 9; i++) {

const particle =
document.createElement("span");

particle.style.position = "fixed";

particle.style.left =
`${rect.left + rect.width / 2}px`;

particle.style.top =
`${rect.top + rect.height / 2}px`;

particle.style.width = "5px";
particle.style.height = "5px";

particle.style.borderRadius = "50%";

particle.style.background =
"rgba(255,255,255,0.8)";

particle.style.pointerEvents =
"none";

particle.style.zIndex = "100";

const angle =
Math.random() * Math.PI * 2;

const distance =
30 + Math.random() * 45;

const x =
Math.cos(angle) * distance;

const y =
Math.sin(angle) * distance;

particle.animate(
[
{
transform: "translate(0,0)",
opacity: 1
},
{
transform:
`translate(${x}px, ${y}px)`,
opacity: 0
}
],
{
duration:
550 + Math.random() * 250,

easing: "ease-out",

fill: "forwards"
}
);

document.body.appendChild(particle);

setTimeout(() => {
particle.remove();
}, 900);

}

}


/* =========================================
PAGE 2 — CONTINUE
========================================= */

const balloonContinue =
document.getElementById("balloonContinue");

balloonContinue.addEventListener("click", () => {

showPage(pages.page3);

});


/* =========================================
PAGE 3 — SWIPE TO BLOW CANDLE
========================================= */

const swipeTrack =
document.getElementById("swipeTrack");

const swipeThumb =
document.getElementById("swipeThumb");

const flame =
document.getElementById("flame");

let dragging = false;
let startX = 0;
let currentX = 0;

const thumbPadding = 4;


function getMaxSwipe() {

return (
swipeTrack.clientWidth -
swipeThumb.clientWidth -
thumbPadding * 2
);

}


/* Pointer start */

swipeThumb.addEventListener(
"pointerdown",
(event) => {

dragging = true;

startX = event.clientX;

swipeThumb.setPointerCapture(
event.pointerId
);

}
);


/* Pointer movement */

swipeThumb.addEventListener(
"pointermove",
(event) => {

if (!dragging) {
return;
}

const difference =
event.clientX - startX;

const maxSwipe =
getMaxSwipe();

currentX =
Math.max(
0,
Math.min(
difference,
maxSwipe
)
);

swipeThumb.style.transform =
`translateX(${currentX}px)`;

}
);


/* Pointer release */

swipeThumb.addEventListener(
"pointerup",
finishSwipe
);

swipeThumb.addEventListener(
"pointercancel",
finishSwipe
);


function finishSwipe() {

if (!dragging) {
return;
}

dragging = false;

const maxSwipe =
getMaxSwipe();

if (currentX >= maxSwipe * 0.72) {

finishCandle();

} else {

swipeThumb.style.transition =
"transform 0.4s ease";

swipeThumb.style.transform =
"translateX(0)";

setTimeout(() => {

swipeThumb.style.transition =
"";

}, 450);

}

}


let candleFinished = false;


function finishCandle() {

if (candleFinished) {
return;
}

candleFinished = true;

swipeThumb.style.transform =
`translateX(${getMaxSwipe()}px)`;

flame.classList.add("off");

/* Small pause after blowing,
then transition to final page */

setTimeout(() => {

showPage(pages.page4);

resetLetterPage();

}, 1150);

}


/* =========================================
PAGE 4 — ENVELOPE
========================================= */

const envelope =
document.getElementById("envelope");

const letterIntro =
document.getElementById("letterIntro");

const tapToOpen =
document.getElementById("tapToOpen");

const letterPaper =
document.getElementById("letterPaper");

const finalLetterStage =
document.getElementById("finalLetterStage");

let envelopeOpened = false;


envelope.addEventListener(
"click",
openEnvelope
);

envelope.addEventListener(
"keydown",
(event) => {

if (
event.key === "Enter" ||
event.key === " "
) {

event.preventDefault();

openEnvelope();

}

}
);


function openEnvelope() {

if (envelopeOpened) {
return;
}

envelopeOpened = true;

envelope.classList.add("open");

tapToOpen.style.opacity = "0";

/*
Let the envelope opening animation
play first.
*/

setTimeout(() => {

letterIntro.classList.add("hide");

/*
Move the SAME letter out of the
envelope and into the final stage.
*/

finalLetterStage.appendChild(
letterPaper
);

letterPaper.classList.add(
"final-letter-paper"
);

/*
Start typing after the letter
reaches the screen.
*/

setTimeout(() => {

typeLetter();

}, 500);

}, 850);

}


/* =========================================
PAGE 4 — LETTER TEXT
========================================= */

const messageText =
`Happy Birthday Chotu ❤️

Who knew one random, unplanned coffee date would bring you into my life? 🥹

Since then, you’ve filled my life with so many laughs, memories, adventures, and little moments that mean more than you know.

I hope this year brings you everything you wish for, and I hope I get to be beside you through all of it. ❤️

More memories, more adventures, more us.

Love you always ❤️`;


let typingStarted = false;


function typeLetter() {

if (typingStarted) {
return;
}

typingStarted = true;

const typedMessage =
document.getElementById("typedMessage");

typedMessage.textContent = "";

let index = 0;

/*
Slightly slower typing makes the
letter feel intentional and personal.
*/

const typingSpeed = 24;


function typeNextCharacter() {

if (index >= messageText.length) {

setTimeout(() => {

createKissShower();

}, 500);

return;
}

typedMessage.textContent +=
messageText.charAt(index);

index++;

setTimeout(
typeNextCharacter,
typingSpeed
);

}

typeNextCharacter();

}


/* =========================================
PAGE 4 — KISS SHOWER
========================================= */

function createKissShower() {

const effects =
document.getElementById("effects");

const kissCount = 14;

for (
let i = 0;
i < kissCount;
i++
) {

setTimeout(() => {

const kiss =
document.createElement("div");

kiss.className = "kiss";

kiss.textContent =
Math.random() > 0.5
? "💋"
: "😘";

kiss.style.left =
`${10 + Math.random() * 80}%`;

kiss.style.top =
`${65 + Math.random() * 25}%`;

kiss.style.fontSize =
`${15 + Math.random() * 9}px`;

kiss.style.animationDelay =
`${Math.random() * 0.25}s`;

effects.appendChild(kiss);

setTimeout(() => {

kiss.remove();

}, 2200);

}, i * 110);

}

}


/* =========================================
PAGE 4 — RESET
========================================= */

function resetLetterPage() {

envelopeOpened = false;
typingStarted = false;

envelope.classList.remove("open");

tapToOpen.style.opacity = "";

letterIntro.classList.remove("hide");

/*
If the letter had previously been moved
to the final stage, return it to envelope.
*/

if (
letterPaper.parentElement !== envelope
) {

envelope.insertBefore(
letterPaper,
envelope.querySelector(
".envelope-front"
)
);

}

letterPaper.classList.remove(
"final-letter-paper"
);

const typedMessage =
document.getElementById("typedMessage");

typedMessage.textContent = "";

}
