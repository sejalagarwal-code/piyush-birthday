/* =====================================================
PIYUSH BIRTHDAY WEBSITE
PAGE 1 → PAGE 2 → PAGE 3
===================================================== */


/* =====================================================
PAGE SWITCHING
===================================================== */

function showPage(number) {

document.querySelectorAll(".page").forEach(function(page) {

page.classList.remove("active");

});


const targetPage =
document.getElementById("page" + number);


if (targetPage) {

targetPage.classList.add("active");

}

}


/* =====================================================
MUSIC
===================================================== */

const music =
document.getElementById("birthdayMusic");


music.volume = 0.65;


/* =====================================================
PAGE 1 — YES
===================================================== */

const yesButton =
document.getElementById("yesButton");


yesButton.addEventListener("click", function() {

/*
The music is started directly inside
the YES click so the browser allows it.
*/

music.play()
.then(function() {

console.log(
"Birthday music started 🎵"
);

})
.catch(function(error) {

console.log(
"Music could not start:",
error
);

});


/*
Move to Page 2.
*/

showPage(2);

});


/* =====================================================
PAGE 1 — NO
===================================================== */

const noButton =
document.getElementById("noButton");


function moveNoButton() {

const buttonWidth =
noButton.offsetWidth;

const buttonHeight =
noButton.offsetHeight;


const maxX =
Math.max(
10,
window.innerWidth -
buttonWidth -
15
);


const maxY =
Math.max(
10,
window.innerHeight -
buttonHeight -
15
);


const x =
10 +
Math.random() *
(maxX - 10);


const y =
10 +
Math.random() *
(maxY - 10);


noButton.style.position =
"fixed";

noButton.style.left =
x + "px";

noButton.style.top =
y + "px";

noButton.style.zIndex =
"9999";

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

}
);


/* =====================================================
PAGE 2 — BALLOONS
===================================================== */

const balloons =
document.querySelectorAll(".balloon");


const balloonCount =
document.getElementById("balloonCount");


const specialMessage =
document.getElementById("specialMessage");


let poppedBalloons = 0;

let allBalloonsPopped = false;


/* =====================================================
BALLOON CLICK
===================================================== */

balloons.forEach(function(balloon) {

balloon.addEventListener(
"click",
function() {


/*
Prevent the same balloon from
being counted twice.
*/

if (
balloon.classList.contains("popped")
) {

return;

}


/*
Pop balloon.
*/

balloon.classList.add("popped");


/*
Increase counter.
*/

poppedBalloons++;


balloonCount.textContent =
poppedBalloons +
" / 4 popped";


/*
Small pop celebration.
*/

createPopConfetti(balloon);


/* =================================================
IMPORTANT:

DO NOT SHOW THE SPECIAL MESSAGE
UNTIL ALL 4 BALLOONS ARE POPPED.
================================================= */

if (
poppedBalloons === 4 &&
!allBalloonsPopped
) {

allBalloonsPopped = true;


/*
Give the final balloon time
to disappear.
*/

setTimeout(
function() {


/*
NOW reveal:

"You are so special"
*/

specialMessage.classList.add(
"show"
);


createBigConfetti();


/*
Keep the message visible
for 3 seconds.

Then Page 3.
*/

setTimeout(
function() {

showPage(3);

},
3000
);


},
450
);

}

}
);

});


/* =====================================================
POP CONFETTI
===================================================== */

function createPopConfetti(balloon) {

const rect =
balloon.getBoundingClientRect();


const container =
document.getElementById("confetti");


for (
let i = 0;
i < 12;
i++
) {

const piece =
document.createElement("div");


piece.className =
"confetti-piece";


piece.style.left =
(
rect.left +
rect.width / 2
) + "px";


piece.style.top =
(
rect.top +
rect.height / 2
) + "px";


piece.style.background =
[
"#e889a7",
"#b978a4",
"#f4b6c8",
"#d98ca7"
][
Math.floor(
Math.random() * 4
)
];


piece.style.transform =
"rotate(" +
Math.random() * 360 +
"deg";


container.appendChild(piece);


setTimeout(
function() {

piece.remove();

},
1800
);

}

}


/* =====================================================
BIG CONFETTI
===================================================== */

function createBigConfetti() {

const container =
document.getElementById("confetti");


for (
let i = 0;
i < 55;
i++
) {

const piece =
document.createElement("div");


piece.className =
"confetti-piece";


piece.style.left =
Math.random() * 100 +
"vw";


piece.style.top =
Math.random() * 25 +
"vh";


piece.style.background =
[
"#e889a7",
"#b978a4",
"#f4b6c8",
"#d98ca7",
"#efc5d2"
][
Math.floor(
Math.random() * 5
)
];


piece.style.animationDuration =
(
1.5 +
Math.random() * 1.5
) + "s";


container.appendChild(piece);


setTimeout(
function() {

piece.remove();

},
3500
);

}

}


/* =====================================================
PAGE 3 — CANDLE
===================================================== */

const blowButton =
document.getElementById("blowButton");


const flame =
document.getElementById("flame");


const wishText =
document.getElementById("wishText");


blowButton.addEventListener(
"click",
function() {


/*
Extinguish flame.
*/

flame.style.opacity = "0";

flame.style.transform =
"scale(0)";


/*
Hide blow button.
*/

blowButton.style.display =
"none";


/*
Show wish message.
*/

wishText.textContent =
"Wish made? ✨ ❤️";


wishText.classList.add(
"show"
);


/*
Little celebration.
*/

createBigConfetti();

}
);
