/* =========================================
PAGES
========================================= */

const page1 =
document.getElementById("page1");

const page2 =
document.getElementById("page2");

const page3 =
document.getElementById("page3");


/* =========================================
PAGE 1 BUTTONS
========================================= */

const yesButton =
document.getElementById("yesButton");

const noButton =
document.getElementById("noButton");


/* =========================================
MUSIC
========================================= */

const birthdayMusic =
document.getElementById("birthdayMusic");


/* =========================================
PAGE 2
========================================= */

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


/* =========================================
CHANGE PAGE
========================================= */

function showPage(page) {

document
.querySelectorAll(".page")
.forEach(function (item) {

item.classList.remove("active");

});

page.classList.add("active");
}


/* =========================================
YES BUTTON
MUSIC + PAGE 2
========================================= */

yesButton.addEventListener(
"click",
function () {

/*
* Start the actual MP3 file.
*/

birthdayMusic.volume = 0.4;

birthdayMusic.play()
.then(function () {

console.log(
"Birthday music started"
);

})
.catch(function (error) {

console.log(
"Music could not start:",
error
);

});


/*
* Move to Page 2
*/

showPage(page2);

}
);


/* =========================================
NO BUTTON
STAYS INSIDE SCREEN
========================================= */

function moveNoButton() {

/*
* Change it to fixed positioning
* so it can move anywhere on screen.
*/

noButton.style.position = "fixed";


const buttonWidth =
noButton.offsetWidth;

const buttonHeight =
noButton.offsetHeight;


/*
* Safe distance from every edge.
*/

const padding = 25;


/*
* Calculate the maximum possible
* position while keeping the
* ENTIRE button visible.
*/

const maxX =
window.innerWidth -
buttonWidth -
padding;

const maxY =
window.innerHeight -
buttonHeight -
padding;


/*
* Generate random position.
*/

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


/* =========================================
BALLOONS
========================================= */

let popped = 0;


balloons.forEach(
function (balloon) {

balloon.addEventListener(
"click",
function () {

/*
* Prevent double clicking
* the same balloon.
*/

if (
balloon.classList.contains(
"popped"
)
) {
return;
}


/*
* Pop it.
*/

balloon.classList.add(
"popped"
);


popped++;


/*
* Update counter.
*/

balloonCount.textContent =
popped;


/*
* Little heart burst.
*/

createPopEffect(
balloon
);


/*
* ONLY show the message
* after ALL FOUR balloons.
*/

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
POP EFFECT
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


const emojis = [
"❤️",
"💕",
"✨",
"💗"
];


for (
let i = 0;
i < 8;
i++
) {

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


setTimeout(
function () {

heart.remove();

},
900
);

}
}


/* =========================================
CONTINUE → PAGE 3
========================================= */

continueButton.addEventListener(
"click",
function () {

showPage(page3);

}
);
