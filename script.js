/* =====================================================
PAGE REFERENCES
===================================================== */

const page1 =
document.getElementById("page1");

const page2 =
document.getElementById("page2");

const page3 =
document.getElementById("page3");

const page4 =
document.getElementById("page4");


/* =====================================================
PAGE NAVIGATION
===================================================== */

let currentPage = page1;


function showPage(nextPage) {

currentPage.classList.remove("active");

nextPage.classList.add("active");

currentPage = nextPage;

}


/* =====================================================
HAPPY BIRTHDAY MUSIC
===================================================== */

/*
We use the browser's Web Audio system instead of
requiring an MP3 file.

Music starts when YES is clicked because that is a
user interaction, which allows the browser to play it.
*/

let audioContext = null;

let musicStarted = false;

let musicTimer = null;

let musicStep = 0;


/* Happy Birthday melody */

const melody = [

[261.63, 0.35],
[261.63, 0.35],
[293.66, 0.7],
[261.63, 0.7],
[349.23, 0.7],
[329.63, 1.2],

[261.63, 0.35],
[261.63, 0.35],
[293.66, 0.7],
[261.63, 0.7],
[392.00, 0.7],
[349.23, 1.2],

[261.63, 0.35],
[261.63, 0.35],
[523.25, 0.7],
[440.00, 0.7],
[349.23, 0.7],
[329.63, 0.7],
[293.66, 1.2],

[466.16, 0.35],
[466.16, 0.35],
[440.00, 0.7],
[349.23, 0.7],
[392.00, 0.7],
[349.23, 1.2]

];


function playNote(frequency, duration) {

if (!audioContext) return;


const oscillator =
audioContext.createOscillator();

const gain =
audioContext.createGain();


oscillator.type = "sine";

oscillator.frequency.value =
frequency;


oscillator.connect(gain);

gain.connect(
audioContext.destination
);


const now =
audioContext.currentTime;


gain.gain.setValueAtTime(
0,
now
);

gain.gain.linearRampToValueAtTime(
0.12,
now + 0.03
);

gain.gain.setValueAtTime(
0.12,
now + duration - 0.08
);

gain.gain.linearRampToValueAtTime(
0,
now + duration
);


oscillator.start(now);

oscillator.stop(
now + duration + 0.03
);

}


function playNextNote() {

if (!musicStarted) return;


const note =
melody[musicStep];


playNote(
note[0],
note[1]
);


musicStep++;


if (musicStep >= melody.length) {

musicStep = 0;

}


/*
Schedule the next note.

The short gap keeps the melody sounding
continuous instead of creating silence.
*/

musicTimer =
setTimeout(
playNextNote,
note[1] * 1000 + 70
);

}


function startMusic() {

if (musicStarted) return;


try {

audioContext =
new (
window.AudioContext ||
window.webkitAudioContext
)();


audioContext.resume();


musicStarted = true;

musicStep = 0;

playNextNote();

}

catch (error) {

console.log(
"Music could not start:",
error
);

}

}


/* =====================================================
PAGE 1 — YES
===================================================== */

const yesButton =
document.getElementById("yesButton");


yesButton.addEventListener(
"click",
function() {

/*
IMPORTANT:
Music starts from the YES tap.
*/

startMusic();


/*
Go directly to Page 2.
*/

showPage(page2);

}
);


/* =====================================================
PAGE 1 — NO
===================================================== */

const noButton =
document.getElementById("noButton");


function moveNoButton() {

const width =
noButton.offsetWidth;

const height =
noButton.offsetHeight;


const margin = 20;


const maxX =
window.innerWidth -
width -
margin;


const maxY =
window.innerHeight -
height -
margin;


const x =
margin +
Math.random() *
Math.max(
1,
maxX - margin
);


const y =
margin +
Math.random() *
Math.max(
1,
maxY - margin
);


noButton.style.position =
"fixed";

noButton.style.left =
x + "px";

noButton.style.top =
y + "px";

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


noButton.addEventListener(
"pointerdown",
function(event) {

event.preventDefault();

moveNoButton();

}
);


/* =====================================================
PAGE 2 — BALLOONS
===================================================== */

const balloons =
document.querySelectorAll(
".balloon"
);


const balloonArea =
document.getElementById(
"balloonArea"
);


const balloonCount =
document.getElementById(
"balloonCount"
);


const confetti =
document.getElementById(
"confetti"
);


let popped = 0;


balloons.forEach(
function(balloon) {


balloon.addEventListener(
"click",
function() {


if (
balloon.classList.contains(
"popped"
)
) {

return;

}


balloon.classList.add(
"popped"
);


popped++;


balloonCount.textContent =
popped;


createPopConfetti(
balloon
);


/*

IMPORTANT:

The special message does NOT
appear after 1, 2 or 3 balloons.

It appears ONLY after balloon 4.

*/

if (popped === 4) {

balloonArea.classList.add(
"all-popped"
);


/*
Give the final balloon time
to finish popping before
showing the message.
*/

setTimeout(
function() {

/*
Message is now visible
through CSS.
*/

},
500
);


/*
Stay on Page 2.

We will connect Page 3
after the message has been
shown as part of the next
build step.
*/

}

}
);

}
);


/* =====================================================
BALLOON POP EFFECT
===================================================== */

function createPopConfetti(balloon) {

const rect =
balloon.getBoundingClientRect();


const centerX =
rect.left +
rect.width / 2;


const centerY =
rect.top +
rect.height / 2;


const pieces = [
"💗",
"💕",
"✨",
"♥",
"💖"
];


for (
let i = 0;
i < 14;
i++
) {


const piece =
document.createElement(
"div"
);


piece.className =
"confetti-piece";


piece.textContent =
pieces[
Math.floor(
Math.random() *
pieces.length
)
];


piece.style.left =
centerX + "px";


piece.style.top =
centerY + "px";


piece.style.setProperty(
"--x",
(
Math.random() * 180 -
90
) + "px"
);


piece.style.setProperty(
"--y",
(
Math.random() * 180 -
90
) + "px"
);


confetti.appendChild(
piece
);


setTimeout(
function() {

piece.remove();

},
1100
);

}

}


/* =====================================================
PAGE 3 — BLOW CANDLE
===================================================== */

const blowButton =
document.getElementById(
"blowButton"
);


const candleScene =
document.querySelector(
".candle-scene"
);


const wishText =
document.getElementById(
"wishText"
);


let candleBlown = false;


blowButton.addEventListener(
"click",
function() {


if (candleBlown) {
return;
}


candleBlown = true;


/*
Put out flame.
*/

candleScene.classList.add(
"blown"
);


/*
Change the message.
*/

wishText.textContent =
"Wish made! ✨❤️";


wishText.classList.add(
"blow"
);


/*
Prevent another tap.
*/

blowButton.classList.add(
"hidden"
);


/*
Page 4 will be connected
after the candle animation.
*/

setTimeout(
function() {

showPage(page4);

},
1500
);

}
);
