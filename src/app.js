// Get the text element
const textElements = document.querySelectorAll('.text>*');

let randomOpacity, randomBlur;

// Start the animation in an endless loop
setInterval(() => {
    [...textElements].forEach(el => {
        randomOpacity = Math.random();
        randomBlur = Math.random();

        el.style.opacity = `${randomOpacity}`;
        el.style.filter = `blur(${Math.abs(randomBlur)}px)`;
    });
    // Update opacity and blur filter properties randomly
}, 100);