import * as PIXI from 'pixi.js';

(async () => {
    const app = new PIXI.Application();

    await app.init({
        width: 800,
        height: 600,
        backgroundColor: 0x1099bb,
    })
    document.body.appendChild(app.canvas);
})();