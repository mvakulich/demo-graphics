
export default class Implant {
    constructor(img, parent) {
        this.img = img;
        this.parent = parent;
        this.position = {x: 0.5, y: 0.5}
        this.container = this._container();
        this.container.transform.position.x = window.innerWidth / 2;
        this.container.transform.position.y = window.innerHeight / 2;
        
    }

    get parentBounds() {
        const transform = this.parent.transform;
        return {
            x: transform.position.x,
            y: transform.position.y,
            width: this.parent.width,
            height: this.parent.height,
        }
    }
    _container() {
        const container = new PIXI.Container();
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xFFFFFF, 1);
        graphics.beginFill(0xFFFFFF, 1);
        graphics.drawCircle(0, -this.img.width / 4 * 3, 7);
        graphics.moveTo(0, -this.img.width / 4 * 3 - 7);
        graphics.lineTo(0, - this.img.width / 2 - 6);
        graphics.endFill();
        graphics.drawRect(-this.img.width/2 - 6, -this.img.height / 2 - 6, this.img.width + 12, this.img.height + 12);
        graphics.interactive = true;
        graphics.buttonMode = true;
        graphics
            .on('pointerdown', this.onRotateStart)
            .on('pointerup', this.onRotateEnd)
            .on('pointerupoutside', this.onRotateEnd)
            .on('pointermove', this.onRotateMove);

        const texture = PIXI.Texture.from(this.img);


        const bunny = new PIXI.Sprite(texture);
        bunny.anchor.set(0.5);
        bunny.interactive = true;
        bunny.buttonMode = true;
        bunny
            .on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove);
        container.addChild(bunny, graphics);
        return container;
    }

    onRotateEnd = () => {
        this.rotating = false;
    }

    onRotateStart = (event) => {
        this.rotating = true;
    }

    onRotateMove = (event) => {
        if (this.rotating) {
            const cursor = event.data.global;
            const position = this.container.transform.position;
            this.container.transform.rotation = Math.atan2((cursor.x - position.x), -(cursor.y - position.y));
        }
    }

    onDragStart = () => {
        this.dragging = true;
        this.container.alpha = 0.5;
    }

    onDragEnd = () => {
        this.dragging = false;
        this.container.alpha = 1;
    }

    onDragMove = (event) => {
        if (this.dragging) {
            const parentBounds = this.parentBounds;
            const cursor = event.data.global;
            this.container.transform.position.x = cursor.x;
            this.container.transform.position.y = cursor.y;
            this.position.x = (cursor.x - parentBounds.x) / parentBounds.width;
            this.position.y = (cursor.y - parentBounds.y) / parentBounds.height;
        }
    }

    scale = (scale, offset) => {
        const scaleTransform = this.container.transform.scale;
        const positionTransform = this.container.transform.position;
        scaleTransform.x = scaleTransform.y = scale;
        positionTransform.x += offset.x * (this.position.x - 0.5);
        positionTransform.y += offset.y * (this.position.y);
    }

    


}