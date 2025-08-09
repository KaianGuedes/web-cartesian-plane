import { Vector2 } from "./Vector2.ts";

export class Camera {
    position: Vector2;
    scale: number;

    constructor(x: number = 0, y: number = 0, scale: number = 1) {
        this.position = new Vector2(x, y);
        this.scale = scale;
    }

    toScreen(x: number, y: number) {
        return new Vector2(
            (x - this.position.x) * this.scale + window.innerWidth / 2,
            (y - this.position.y) * this.scale + window.innerHeight / 2
        );
    }

    toWorld(x: number, y: number) {
        return new Vector2(
            (x - window.innerWidth / 2) / this.scale + this.position.x,
            (y - window.innerHeight / 2) / this.scale + this.position.y
        );
    }
}