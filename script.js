/* =========================
GET ELEMENTS
========================= */

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

const birthdayMusic =
document.getElementById("birthdayMusic");

const balloons =
document.querySelectorAll(".balloon");

const balloonCount =
document.getElementById("balloonCount");

const specialMessage =
document.getElementById("specialMessage");

const continueButton =
document.getElementById("continueButton");

const effects =
document.getElementById("effects");


/* =========================
PAGE SWITCHING
========================= */

function showPage(page) {

document.querySelectorAll(".page").forEach((p) => {
p.classList.remove("active");
});

page.classList.add("active");
}


/* =========================
YES BUTTON
START REAL MUSIC
========================= */

yesButton.addEventListener("click", function () {

birthdayMusic.currentTime = 0;

birthdayMusic.volume = 0.4;

birthdayMusic.play()
.then(() => {
console.log("Birthday music started");
})
.catch((error) => {
console.log(
"Music error:",
error
);
});

showPage(page2);
});


/* =========================
NO BUTTON
NEVER LEAVE SCREEN
========================= */

function moveNoButton() {

const buttonWidth =
noButton.offsetWidth;

const buttonHeight =
noButton.offsetHeight;

const padding = 25;


const maxX =
Math.max(
padding,
window.innerWidth -
buttonWidth -
padding
);


const maxY =
Math.max(
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


noButton.style.position = "fixed";

noButton.style.left =
randomX + "px";

noButton.style.top =
randomY + "px";
}


/* Desktop */

noButton.addEventListener(
"mouseenter",
moveNoButton
);


/* Mobile */

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


/* =========================
BALLOONS
========================= */

let popped = 0;


balloons.forEach((balloon) => {

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


balloon.classList.add(
"popped"
);


popped++;


balloonCount.textContent =
popped;


createPopEffect(balloon);


/* Show message ONLY after all 4 */

if (popped === 4) {

setTimeout(() => {

specialMessage.classList.add(
"show"
);

}, 400);

}

}
);

});


/* =========================
POP EFFECT
========================= */

function createPopEffect(balloon) {

const rect =
balloon.getBoundingClientRect();


const centerX =
rect.left +
rect.width / 2;


const centerY =
rect.top +
rect.height / 2;


const emojis = [
"❤️",
"💕",
"✨",
"💗"
];


for (let i = 0; i < 8; i++) {

const heart =
document.createElement(
"span"
);


heart.className =
"pop-heart";


heart.textContent =
emojis[
Math.floor(
Math.random() *
emojis.length
)
];


heart.style.left =
centerX + "px";


heart.style.top =
centerY + "px";


heart.style.setProperty(
"--x",
(
Math.random() * 160 -
80
) + "px"
);


heart.style.setProperty(
"--y",
(
Math.random() * 160 -
80
) + "px"
);


effects.appendChild(
heart
);


setTimeout(() => {

heart.remove();

}, 900);

}

}


/* =========================
CONTINUE
========================= */

/*
Page 3 will be connected here later.
*/

continueButton.addEventListener(
"click",
function () {

alert(
"Page 3 coming next ❤️"
);

}
);
