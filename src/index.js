import { loadImage } from './image.loader';
import Implant from './implant';

const app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight});
document.body.appendChild(app.view);


function updateBg(taz, background) {
    const scale = Math.min(window.innerWidth/taz.width, window.innerHeight/taz.height);
    const rWidth = taz.width * scale;
    const rHeight = taz.height * scale;
    background.width = taz.width;
    background.height = taz.height;
    const scaleTransform = background.transform.scale;
    scaleTransform.x = scaleTransform.y = scale;
    const centerX = (window.innerWidth - rWidth) / 2;
    const centerY = (window.innerHeight - rHeight) / 2;
    background.transform.position.x = centerX;
    background.transform.position.y = centerY;
    return scale;
}


Promise.all([loadImage('sphere.svg'), loadImage('taz.jpg')]).then(([sphere, taz]) => {
    const background = PIXI.Sprite.from(taz);
    const implant = new Implant(sphere, background);
    app.stage.addChild(background);
    app.stage.addChild(implant.container);
    updateBg(taz, background);

    window.addEventListener("resize", function() {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        const oldScale = background.transform.scale.x;
        const newScale = updateBg(taz, background);
        implant.scale(newScale, {
            x: taz.width * (newScale - oldScale),
            y: taz.height * (newScale - oldScale),
        });

    });
    window.dispatchEvent(new Event('resize'));
})
