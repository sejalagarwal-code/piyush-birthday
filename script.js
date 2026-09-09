/* =========================================
GET ELEMENTS
========================================= */

const page1 =
document.getElementById("page1");

const page2 =
document.getElementById("page2");


const yesButton =
document.getElementById("yesButton");

const noButton =
document.getElementById("noButton");


const balloons =
document.querySelectorAll(".balloon");


const balloonCount =
document.getElementById("balloonCount");


const specialMessage =
document.getElementById("specialMessage");


const effects =
document.getElementById("effects");


/* =========================================
MUSIC VARIABLES
========================================= */

let audioContext = null;

let musicStarted = false;

let musicInterval = null;


/* =========================================
PAGE TRANSITION
========================================= */

function showPage(page) {

document
.querySelectorAll(".page")
.forEach(function(section) {

section.classList.remove("active");

});


page.classList.add("active");
}


/* =========================================
HAPPY BIRTHDAY MUSIC
========================================= */

function startBirthdayMusic() {

if (musicStarted) {
return;
}


musicStarted = true;


const AudioContext =
window.AudioContext ||
window.webkitAudioContext;


if (!AudioContext) {
return;
}


audioContext =
new AudioContext();


/*
Simple Happy Birthday melody.

It begins ONLY when YES is tapped,
which allows the browser to play
audio on mobile devices.
*/


const melody = [

261.63,
261.63,
293.66,
261.63,
349.23,
329.63,

261.63,
261.63,
293.66,
261.63,
392.00,
349.23,

261.63,
261.63,
523.25,
440.00,
349.23,
329.63,
293.66,

466.16,
466.16,
440.00,
349.23,
392.00,
349.23

];


let note = 0;


function playNote() {

if (!audioContext) {
return;
}


const oscillator =
audioContext.createOscillator();


const gain =
audioContext.createGain();


oscillator.type =
"sine";


oscillator.frequency.value =
melody[note];


gain.gain.setValueAtTime(
0,
audioContext.currentTime
);


gain.gain.linearRampToValueAtTime(
0.13,
audioContext.currentTime + 0.03
);


gain.gain.exponentialRampToValueAtTime(
0.001,
audioContext.currentTime + 0.48
);


oscillator.connect(gain);

gain.connect(
audioContext.destination
);


oscillator.start();


oscillator.stop(
audioContext.currentTime + 0.5
);


note++;


if (note >= melody.length) {
note = 0;
}
}


playNote();


musicInterval =
setInterval(
playNote,
500
);
}


/* =========================================
YES BUTTON
========================================= */

yesButton.addEventListener(
"click",
function() {

/*
Music starts immediately
from this user interaction.
*/

startBirthdayMusic();


/*
Move from Page 1
to Page 2.
*/

showPage(page2);

}
);


/* =========================================
NO BUTTON
========================================= */

function moveNoButton() {

const buttonWidth =
noButton.offsetWidth;


const buttonHeight =
noButton.offsetHeight;


/*
Keep the button away from
the edges of the screen.
*/

const margin = 25;


const maxX =
window.innerWidth -
buttonWidth -
margin;


const maxY =
window.innerHeight -
buttonHeight -
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


noButton.style.zIndex =
"100";
}


/* Desktop */

noButton.addEventListener(
"mouseenter",
moveNoButton
);


/* Mobile */

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


/* Pointer devices */

noButton.addEventListener(
"pointerdown",
function(event) {

event.preventDefault();

moveNoButton();

}
);


/* =========================================
BALLOONS
========================================= */

let popped =
0;


balloons.forEach(
function(balloon) {

balloon.addEventListener(
"click",
function() {

/*
Don't allow an already
popped balloon to pop again.
*/

if (
balloon.classList.contains(
"popped"
)
) {

return;
}


/*
Pop balloon.
*/

balloon.classList.add(
"popped"
);


popped++;


/*
Update counter.
*/

balloonCount.textContent =
popped;


/*
Create little heart
explosion.
*/

createPopEffect(
balloon
);


/*
ONLY after all four
balloons are popped...
*/

if (popped === 4) {

setTimeout(
function() {

specialMessage
.classList
.add("show");

},
350
);

}

}
);

}
);


/* =========================================
BALLOON POP HEART EFFECT
========================================= */

function createPopEffect(
balloon
) {

const rect =
balloon.getBoundingClientRect();


const centerX =
rect.left +
rect.width / 2;


const centerY =
rect.top +
rect.height / 2;


const symbols = [
"💗",
"💕",
"💖",
"✨",
"♥"
];


for (
let i = 0;
i < 16;
i++
) {

const heart =
document.createElement(
"div"
);


heart.className =
"pop-heart";


heart.textContent =
symbols[
Math.floor(
Math.random() *
symbols.length
)
];


heart.style.left =
centerX + "px";


heart.style.top =
centerY + "px";


heart.style.setProperty(
"--move-x",
(
Math.random() *
180 -
90
) + "px"
);


heart.style.setProperty(
"--move-y",
(
Math.random() *
180 -
90
) + "px"
);


heart.style.setProperty(
"--rotate",
(
Math.random() *
180 -
90
) + "deg"
);


effects.appendChild(
heart
);


setTimeout(
function() {

heart.remove();

},
1100
);

}
}
