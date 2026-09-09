const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");


// ========================================
// YES BUTTON
// ========================================

yesButton.addEventListener("click", function () {

// For now, this confirms the button works.
// We will replace this with the balloon page.
alert("YES! ❤️");

});


// ========================================
// NO BUTTON — MOVE AWAY
// ========================================

function escapeNoButton() {

// Make the button independent of the card
noButton.style.position = "fixed";

// Get its size
const buttonWidth = noButton.offsetWidth;
const buttonHeight = noButton.offsetHeight;

// Keep it safely inside the screen
const margin = 20;

const availableWidth =
window.innerWidth -
buttonWidth -
margin * 2;

const availableHeight =
window.innerHeight -
buttonHeight -
margin * 2;

// Random position
const randomX =
margin +
Math.random() * availableWidth;

const randomY =
margin +
Math.random() * availableHeight;

noButton.style.left = randomX + "px";
noButton.style.top = randomY + "px";

}


// ========================================
// COMPUTER
// ========================================

noButton.addEventListener(
"mouseenter",
escapeNoButton
);


// ========================================
// PHONE
// ========================================

noButton.addEventListener(
"touchstart",
function (event) {

event.preventDefault();

escapeNoButton();

},
{ passive: false }
);


// ========================================
// PHONE / TABLET POINTER
// ========================================

noButton.addEventListener(
"pointerdown",
function (event) {

event.preventDefault();

escapeNoButton();

}
);
