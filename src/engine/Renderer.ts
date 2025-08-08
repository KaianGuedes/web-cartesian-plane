import type { Drawable } from "./Drawable.ts";

export class Renderer {
    private readonly ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    render(objects: Drawable[]) {
        objects.forEach((obj: Drawable) => {
            obj.draw(this.ctx);
        })
    }
}