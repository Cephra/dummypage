// Get the text element
const textElement = document.querySelector('div.text');

let randomOpacity, randomBlur;

// Start the animation in an endless loop
setInterval(() => {
    // Update opacity and blur filter properties randomly
    randomOpacity = Math.random();
    randomBlur = Math.random();

    textElement.style.opacity = `${randomOpacity}`;
    textElement.style.filter = `blur(${Math.abs(randomBlur)}px)`;

}, 100);