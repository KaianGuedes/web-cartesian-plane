import "./style.css";
import {DrawLoop, Renderer, Grid, Camera, type Drawable, Vector2 } from "./engine"

const canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement;
if (!canvas) {
    throw new Error("HTMLCanvasElement não disponível");
}

const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
if (!ctx) {
    throw new Error("CanvasRenderingContext2D não disponível");
}


/**
 * @param deltaTime Tempo desde o último frame.
 */
const update = () => {
    mount();
}

const draw = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderer.render(objects);
}

const dl: DrawLoop = new DrawLoop(update, draw);
const camera: Camera = new Camera(canvas.width / 2, canvas.height / 2, 1);
const renderer: Renderer = new Renderer(ctx);

let objects: Drawable[] = [];

const grid = new Grid(100, camera);
objects.push(grid);

dl.start();

const resizeCanvas = () => {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

let mounted: boolean = false;

function mount() {
    if (mounted) return;
    mounted = true;
    resizeCanvas()
}

window.addEventListener("resize", resizeCanvas);

canvas.addEventListener("wheel", (event) => {
    const center = new Vector2(
        canvas.width / 2,
        canvas.height / 2
    )

    const oldScale = camera.scale;

    let newScale: number = oldScale;

    if (event.deltaY < 0) {
        newScale *= 1.12;
    } else {
        newScale /= 1.12;
    }

    if (newScale < 0.1) newScale = 0.1;

    const worldCenter: Vector2 = camera.toWorld(center.x, center.y);
    const displacement = new Vector2(camera.position.x - worldCenter.x, camera.position.y - worldCenter.y);

    camera.scale = newScale;

    // camera axis = world center axis + displacement axis * (newScale / oldScale)
    camera.position.set(
        worldCenter.x + displacement.x * (newScale / oldScale),
        worldCenter.y + displacement.y * (newScale / oldScale)
    )
})

let isPanning = false;
let panningPos = new Vector2();

canvas.addEventListener("mousedown", (event) => {
    if (isPanning) return;
    if (event.button === 0) {
        isPanning = true;
        panningPos.x = event.clientX;
        panningPos.y = event.clientY;
    }
})

canvas.addEventListener("mousemove", (event) => {
    if (!isPanning) return;

    const displacement = new Vector2(
        panningPos.x - event.clientX,
        panningPos.y - event.clientY
    );

    camera.position.set(
        camera.position.x + displacement.x / camera.scale,
        camera.position.y + displacement.y / camera.scale
    )

    panningPos.set(
        event.clientX,
        event.clientY
    )
})

canvas.addEventListener("mouseup", () => {
    if (!isPanning) return;
    isPanning = false;
})