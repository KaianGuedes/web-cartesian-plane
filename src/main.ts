import { DrawLoop } from "./engine/DrawLoop";
import "./style.css";

const canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

class Vector2 {
    x: number;
    y: number;
    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}

const line = {
    from: new Vector2((window.innerWidth / 6), window.innerHeight / 2),
    to: new Vector2((window.innerWidth - (window.innerWidth / 6)), window.innerHeight / 2),
};

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

let mounted: boolean = false;

function mount() {
    if (mounted) return;
    mounted = true;
    resizeCanvas()

    console.log("Mounted")
}

window.addEventListener("resize", resizeCanvas);

canvas.addEventListener("mousedown", (event: MouseEvent) => {
    // Botão esquerdo
    if (event.button === 0) {
        console.log("Mouse 0 is down");
        line.from.x = event.clientX;
        line.from.y = event.clientY;
    }

    // Botão do meio (bolinha do mouse)
    if (event.button === 1) {
        console.log("Mouse 1 is down");
        line.to.x = event.clientX;
        line.to.y = event.clientY;
    }
})

/**
* @param deltaTime Tempo desde o último frame.
*/
const update = () => {
    mount();
}

const draw = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(line.from.x, line.from.y);
    ctx.lineTo(line.to.x, line.to.y);
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

const dl = new DrawLoop(update, draw);
dl.start();