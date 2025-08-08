import { Vector2 } from "./Vector2.ts";

export class Camera {
    position: Vector2;
    scale: number;

    constructor(x: number, y: number, scale: number = 1) {
        this.position = new Vector2(x, y);
        this.scale = scale;
    }
}