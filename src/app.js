// Get the text element
const textElements = document.querySelectorAll('.text>*');

let randomOpacity, randomBlur;

// Start the animation in an endless loop
setInterval(() => {
  const flickerTime = Math.random() * 500 + 200; // Adjust the minimum and maximum flicker times
  setTimeout(() => {
    [...textElements].forEach(el => {
      randomOpacity = Math.random();
      randomBlur = Math.random();

      el.style.opacity = `${randomOpacity}`;
      el.style.filter = `blur(${Math.abs(randomBlur)}px)`;

      // Reset the opacity and blur filter properties after a short while
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.filter = 'none';
      }, flickerTime - 100);
    });
  }, flickerTime);
}, 100);