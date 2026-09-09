/* ================= PAGE CONTROL ================= */

const pages = document.querySelectorAll(".page");

function showPage(pageNumber) {
pages.forEach(page => {
page.classList.remove("active");
});

const target = document.getElementById(`page${pageNumber}`);

if (target) {
target.classList.add("active");
}
}


/* ================= PAGE 1 ================= */

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const birthdayMusic = document.getElementById("birthdayMusic");

yesBtn.addEventListener("click", () => {

birthdayMusic.currentTime = 0;

birthdayMusic.play().catch(() => {});

showPage(2);
});


function moveNoButton() {

const buttonWidth = noBtn.offsetWidth;
const buttonHeight = noBtn.offsetHeight;

const maxX = window.innerWidth - buttonWidth - 15;
const maxY = window.innerHeight - buttonHeight - 15;

const x = Math.max(10, Math.random() * maxX);
const y = Math.max(10, Math.random() * maxY);

noBtn.style.position = "fixed";
noBtn.style.left = `${x}px`;
noBtn.style.top = `${y}px`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);


/* Floating hearts */

const heartsContainer = document.querySelector(".hearts-container");

function createFloatingHeart() {

if (!heartsContainer) return;

const heart = document.createElement("div");

heart.className = "floating-heart";

heart.textContent = Math.random() > 0.5 ? "♥" : "♡";

heart.style.left = `${Math.random() * 100}%`;
heart.style.fontSize = `${12 + Math.random() * 18}px`;

const duration = 6 + Math.random() * 5;

heart.style.animationDuration = `${duration}s`;

heartsContainer.appendChild(heart);

setTimeout(() => {
heart.remove();
}, duration * 1000);
}

setInterval(createFloatingHeart, 750);


/* ================= PAGE 2 ================= */

const balloons = document.querySelectorAll(".balloon");
const balloonCounter = document.getElementById("balloonCounter");
const balloonComplete = document.getElementById("balloonComplete");
const continueBtn = document.getElementById("continueBtn");

let poppedBalloons = 0;

balloons.forEach(balloon => {

balloon.addEventListener("click", () => {

if (balloon.classList.contains("popped")) {
return;
}

balloon.classList.add("popped");

poppedBalloons++;

balloonCounter.textContent = `${poppedBalloons} / 4`;

createPopHearts(balloon);

if (poppedBalloons === 4) {

setTimeout(() => {

balloonComplete.classList.add("show");
continueBtn.classList.add("show");

}, 350);
}
});

});


function createPopHearts(balloon) {

const rect = balloon.getBoundingClientRect();

for (let i = 0; i < 8; i++) {

const heart = document.createElement("div");

heart.className = "pop-heart";

heart.textContent = Math.random() > 0.5 ? "♥" : "♡";

heart.style.left =
`${rect.left + rect.width / 2}px`;

heart.style.top =
`${rect.top + rect.height / 2}px`;

heart.style.setProperty(
"--x",
`${(Math.random() - 0.5) * 130}px`
);

heart.style.setProperty(
"--y",
`${(Math.random() - 0.5) * 130}px`
);

document.body.appendChild(heart);

setTimeout(() => {
heart.remove();
}, 900);
}
}


continueBtn.addEventListener("click", () => {
showPage(3);
});


/* ================= PAGE 3 ================= */

const swipeTrack = document.getElementById("swipeTrack");
const swipeButton = document.getElementById("swipeButton");
const flame = document.getElementById("flame");
const wishMessage = document.getElementById("wishMessage");
const blowText = document.querySelector(".blow-text");

let isSwiping = false;
let startX = 0;
let currentX = 0;
let finishedCandle = false;


function getMaxSwipe() {
return swipeTrack.offsetWidth - swipeButton.offsetWidth - 10;
}


swipeButton.addEventListener("pointerdown", event => {

if (finishedCandle) return;

isSwiping = true;

startX = event.clientX - swipeButton.offsetLeft;

swipeButton.setPointerCapture(event.pointerId);
});


swipeButton.addEventListener("pointermove", event => {

if (!isSwiping || finishedCandle) return;

currentX =
event.clientX - swipeTrack.getBoundingClientRect().left - startX;

const maxSwipe = getMaxSwipe();

currentX = Math.max(0, Math.min(currentX, maxSwipe));

swipeButton.style.left = `${5 + currentX}px`;

const progress = currentX / maxSwipe;

if (progress >= 0.78) {
finishCandle();
}
});


function resetSwipe() {

if (finishedCandle) return;

isSwiping = false;

swipeButton.style.transition =
"left .35s ease";

swipeButton.style.left = "5px";

setTimeout(() => {
swipeButton.style.transition = "";
}, 350);
}


swipeButton.addEventListener("pointerup", resetSwipe);
swipeButton.addEventListener("pointercancel", resetSwipe);


function finishCandle() {

if (finishedCandle) return;

finishedCandle = true;
isSwiping = false;

const maxSwipe = getMaxSwipe();

swipeButton.style.left =
`${5 + maxSwipe}px`;

flame.classList.add("off");

blowText.textContent = "Wish made ✨";

wishMessage.classList.add("show");

setTimeout(() => {
showPage(4);
}, 1150);
}


/* ================= PAGE 4 ================= */

const envelope = document.getElementById("envelope");
const letterIntro = document.getElementById("letterIntro");
const tapToOpen = document.getElementById("tapToOpen");
const letterPaper = document.getElementById("letterPaper");
const finalLetterStage = document.getElementById("finalLetterStage");
const typedMessage = document.getElementById("typedMessage");


const messageText = `Happy Birthday Chotu ❤️

Who knew one random, unplanned coffee date would bring you into my life? 🥹

Since then, you’ve filled my life with so many laughs, memories, adventures, and little moments that mean more than you know.

I hope this year brings you everything you wish for, and I hope I get to be beside you through all of it. ❤️

More memories, more adventures, more us.

Love you always ❤️`;


let envelopeOpened = false;


function openEnvelope() {

if (envelopeOpened) return;

envelopeOpened = true;

envelope.classList.add("open");

tapToOpen.style.opacity = "0";

setTimeout(() => {

letterIntro.classList.add("hidden");

finalLetterStage.appendChild(letterPaper);

letterPaper.classList.add("final-letter-paper");

setTimeout(() => {
typeLetter();
}, 500);

}, 850);
}


envelope.addEventListener("click", openEnvelope);


envelope.addEventListener("keydown", event => {

if (
event.key === "Enter" ||
event.key === " "
) {

event.preventDefault();

openEnvelope();
}

});


/* ================= LETTER TYPING ================= */

function typeLetter() {

typedMessage.textContent = "";

let index = 0;

function typeNext() {

if (index >= messageText.length) {

setTimeout(() => {
createKissShower();
}, 500);

return;
}

const character = messageText[index];

typedMessage.textContent += character;

index++;

let delay = 28;

if (
character === "." ||
character === "!" ||
character === "?"
) {
delay = 260;
}

if (character === ",") {
delay = 140;
}

if (character === "\n") {
delay = 400;
}

setTimeout(typeNext, delay);
}

typeNext();
}


/* ================= KISS SHOWER ================= */

function createKissShower() {

const kissCount = 14;

for (let i = 0; i < kissCount; i++) {

setTimeout(() => {

const kiss = document.createElement("div");

kiss.className = "kiss";

kiss.textContent =
Math.random() > 0.5 ? "💋" : "😘";

kiss.style.left =
`${10 + Math.random() * 80}%`;

kiss.style.bottom =
`${10 + Math.random() * 20}%`;

kiss.style.animationDuration =
`${2 + Math.random() * 1.2}s`;

document.body.appendChild(kiss);

setTimeout(() => {
kiss.remove();
}, 3500);

}, i * 130);
}
}
