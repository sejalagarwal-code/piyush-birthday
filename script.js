/* =========================
GET ELEMENTS
========================= */

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

const birthdayMusic = document.getElementById("birthdayMusic");

const balloons = document.querySelectorAll(".balloon");

const balloonCount = document.getElementById("balloonCount");

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
START MUSIC + PAGE 2
========================= */

yesButton.addEventListener("click", async () => {

birthdayMusic.volume = 0.4;

try {
await birthdayMusic.play();
} catch (error) {
console.log("Music could not start:", error);
}

showPage(page2);
});


/* =========================
NO BUTTON
KEEP INSIDE SCREEN
========================= */

function moveNoButton() {

const button = noButton;

const padding = 20;

const buttonWidth = button.offsetWidth;
const buttonHeight = button.offsetHeight;

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


button.style.position = "fixed";

button.style.left =
randomX + "px";

button.style.top =
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
(event) => {

event.preventDefault();

moveNoButton();

},
{
passive: false
}
);


/* Also handle pointer */

noButton.addEventListener(
"pointerdown",
(event) => {

if (event.pointerType === "touch") {

event.preventDefault();

moveNoButton();
}

}
);


/* =========================
BALLOONS
========================= */

let popped = 0;


balloons.forEach((balloon) => {

balloon.addEventListener("click", () => {

/* Don't pop twice */

if (balloon.classList.contains("popped")) {
return;
}


/* Pop balloon */

balloon.classList.add("popped");

popped++;

balloonCount.textContent = popped;


/* Create pop effect */

createPopEffect(balloon);


/* =========================
ONLY AFTER ALL 4
========================= */

if (popped === 4) {

setTimeout(() => {

specialMessage.classList.add("show");

}, 400);

}

});

});


/* =========================
POP EFFECT
========================= */

function createPopEffect(balloon) {

const rect =
balloon.getBoundingClientRect();

const centerX =
rect.left + rect.width / 2;

const centerY =
rect.top + rect.height / 2;


const emojis = [
"❤️",
"💕",
"✨",
"💗"
];


for (let i = 0; i < 8; i++) {

const heart =
document.createElement("span");

heart.className = "pop-heart";

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
(Math.random() * 160 - 80) + "px"
);


heart.style.setProperty(
"--y",
(Math.random() * 160 - 80) + "px"
);


effects.appendChild(heart);


setTimeout(() => {
heart.remove();
}, 900);

}

}


/* =========================
CONTINUE BUTTON
========================= */

/*
Page 3 will be added here later.
*/

continueButton.addEventListener("click", () => {

alert("Page 3 coming next ❤️");

});
