import { type Drawable, Camera, Vector2 } from "./";

export class Grid implements Drawable {
    private readonly cellSize: number;
    private camera: Camera

    constructor(cellSize: number, camera: Camera) {
        this.cellSize = cellSize;
        this.camera = camera;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const scaledCellSize = this.cellSize * this.camera.scale;

        const topLeftWorld = this.camera.toWorld(0, 0);

        const offset = new Vector2(
            ((topLeftWorld.x % this.cellSize) + this.cellSize) % this.cellSize,
            ((topLeftWorld.y % this.cellSize) + this.cellSize) % this.cellSize
        );

        const start = new Vector2(
            -offset.x * this.camera.scale,
            -offset.y * this.camera.scale
        );

        ctx.strokeStyle = "black";

        for (let x = start.x; x < ctx.canvas.width; x += scaledCellSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, ctx.canvas.height);
            ctx.stroke();
        }

        for (let y = start.y; y < ctx.canvas.height; y += scaledCellSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(ctx.canvas.width, y);
            ctx.stroke();
        }
    }
}