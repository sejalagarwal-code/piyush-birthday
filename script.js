/* =====================================================
PIYUSH BIRTHDAY WEBSITE
PAGE 1 → PAGE 2 → PAGE 3
===================================================== */


/* =====================================================
PAGE SWITCHING
===================================================== */

function showPage(number) {

const pages =
document.querySelectorAll(".page");

pages.forEach(function(page) {

page.classList.remove("active");

});


const target =
document.getElementById("page" + number);

if (target) {

target.classList.add("active");

}

}


/* =====================================================
MUSIC
===================================================== */

const music =
document.getElementById("birthdayMusic");


/*
Keep volume comfortable.
*/

music.volume = 0.65;


/* =====================================================
PAGE 1 — YES
===================================================== */

const yesButton =
document.getElementById("yesButton");


yesButton.addEventListener("click", function() {

/*
IMPORTANT:

The music starts INSIDE the user's
YES click.

This is required by browser autoplay rules.
*/

music.currentTime = 0;

music.play()
.then(function() {

console.log(
"Birthday music started successfully 🎵"
);

})
.catch(function(error) {

console.log(
"Music playback error:",
error
);

});


/*
Move immediately to Page 2.
*/

showPage(2);

});


/* =====================================================
PAGE 1 — NO BUTTON
===================================================== */

const noButton =
document.getElementById("noButton");


function moveNoButton() {

const buttonWidth =
noButton.offsetWidth;

const buttonHeight =
noButton.offsetHeight;


/*
Keep the button completely
inside the screen.
*/

const maxX =
Math.max(
10,
window.innerWidth -
buttonWidth -
10
);

const maxY =
Math.max(
10,
window.innerHeight -
buttonHeight -
10
);


const randomX =
10 +
Math.random() *
(maxX - 10);

const randomY =
10 +
Math.random() *
(maxY - 10);


noButton.style.position =
"fixed";

noButton.style.left =
randomX + "px";

noButton.style.top =
randomY + "px";

noButton.style.zIndex =
"9999";

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

let finishedBalloons = false;


/*
Add click event to all 4 balloons.
*/

balloons.forEach(function(balloon) {

balloon.addEventListener(
"click",
function() {


/*
Don't allow a popped balloon
to be counted again.
*/

if (
balloon.classList.contains("popped")
) {

return;

}


/*
Pop it.
*/

balloon.classList.add("popped");


/*
Increase count.
*/

poppedBalloons++;


balloonCount.textContent =
poppedBalloons + " / 4 popped";


/*
Pop confetti.
*/

createPopConfetti(balloon);


/*
=====================================
CRITICAL:

NOTHING happens to the special
message until ALL FOUR balloons
have been popped.
=====================================
*/

if (
poppedBalloons === 4 &&
!finishedBalloons
) {

finishedBalloons = true;


/*
Wait for the final balloon
pop animation.
*/

setTimeout(
function() {


/*
NOW show the message.
*/

specialMessage.classList.add(
"show"
);


/*
Celebrate.
*/

createBigConfetti();


/*
Keep the message visible
before going to Page 3.
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
BALLOON POP CONFETTI
===================================================== */

function createPopConfetti(balloon) {

const rect =
balloon.getBoundingClientRect();


const container =
document.getElementById("confetti");


for (
let i = 0;
i < 14;
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
"deg)";


container.appendChild(piece);


setTimeout(
function() {

piece.remove();

},
2000
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
Math.random() * 30 +
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
PAGE 3 — BLOW CANDLE
===================================================== */

const blowButton =
document.getElementById("blowButton");


const flame =
document.getElementById("flame");


const wishText =
document.getElementById("wishText");


const page3Card =
document.querySelector(".page3-card");


blowButton.addEventListener(
"click",
function() {


/*
Put out the flame.
*/

flame.style.opacity = "0";

flame.style.transform =
"scale(0)";


/*
Hide button.
*/

blowButton.style.display =
"none";


/*
Show message.
*/

wishText.textContent =
"Wish made? ✨ ❤️";


wishText.classList.add(
"show"
);


/*
Small celebration.
*/

createBigConfetti();


/*
PAGE 3 IS NOW COMPLETE.

We are intentionally NOT moving
to Page 4 yet.

We'll build Page 4 after you
confirm Pages 1–3 work.
*/

}
);
