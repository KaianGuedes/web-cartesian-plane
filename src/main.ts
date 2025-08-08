import "./style.css";
import { DrawLoop, Renderer, Grid, Camera, type Drawable } from "./engine"

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
const camera: Camera = new Camera(0, 0, 1);
const renderer: Renderer = new Renderer(ctx);

const grid = new Grid(48, camera);

let objects: Drawable[] = [];

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
