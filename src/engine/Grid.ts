import { type Drawable, Camera, Vector2 } from "./";

export class Grid implements Drawable {
    private readonly cellSize: number;
    private camera: Camera

    constructor(cellSize: number, camera: Camera) {
        this.cellSize = cellSize;
        this.camera = camera;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        let currentPos = new Vector2();
        let scaledCellSize = this.cellSize * this.camera.scale;
        ctx.strokeStyle = "white"

        for (let i = 0; i < (window.innerWidth / scaledCellSize); i++) {
            ctx.beginPath();
            ctx.moveTo(currentPos.x, 0);
            ctx.lineTo(currentPos.x, window.innerHeight);
            ctx.stroke()

            currentPos.x += scaledCellSize;
        }
        for (let i = 0; i < (window.innerHeight / scaledCellSize); i++) {
            ctx.beginPath();
            ctx.moveTo(0, currentPos.y);
            ctx.lineTo(window.innerWidth, currentPos.y);
            ctx.stroke()

            currentPos.y += scaledCellSize;
        }
    }
}