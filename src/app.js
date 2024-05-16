// Get the text element
const textElements = document.querySelectorAll('.text>*');

let randomOpacity, randomBlur;

// Start the animation in an endless loop
setInterval(() => {
    const patterns = ['fade-in', 'pulse', 'flicker', 'strobe'];
    const patternIndex = Math.floor(Math.random() * patterns.length);
    const pattern = patterns[patternIndex];

    switch (pattern) {
        case 'fade-in':
            [...textElements].forEach(el => {
                randomOpacity = Math.random();
                el.style.opacity = `${randomOpacity}`;
            });
            break;
        case 'pulse':
            [...textElements].forEach(el => {
                randomOpacity = Math.random();
                setTimeout(() => {
                    el.style.opacity = `${randomOpacity}`;
                }, 500);
            });
            break;
        case 'flicker':
            [...textElements].forEach(el => {
                const currentOpacity = parseFloat(window.getComputedStyle(el).opacity);
                randomOpacity = Math.random() * 2 - 1;
                el.style.opacity = `${currentOpacity + randomOpacity}`;
            });
            setTimeout(() => {
                [...textElements].forEach(el => {
                    el.style.opacity = '1';
                });
            }, 2000);
            break;
        case 'strobe':
            [...textElements].forEach(el => {
                const currentBlur = parseInt(window.getComputedStyle(el).filter.match(/blur\(([^)]+)\)/)[1]);
                randomBlur = Math.random() * 2 - 1;
                el.style.filter = `blur(${Math.abs(currentBlur + randomBlur)}px)`;
            });
            setTimeout(() => {
                [...textElements].forEach(el => {
                    el.style.filter = 'none';
                });
            }, 2000);
            break;
        default:
            // Flicker the text randomly
            [...textElements].forEach(el => {
                randomOpacity = Math.random();
                randomBlur = Math.random();

                el.style.opacity = `${randomOpacity}`;
                el.style.filter = `blur(${Math.abs(randomBlur)}px)`;
            });
    }
}, 100);