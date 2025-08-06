export class DrawLoop {
    private isRunning: boolean;
    private lastTime: number;
    // private timeStep: number;
    private raf: number;
    private readonly update: (deltaTime: number) => void;
    private readonly draw: () => void;

    constructor(update: (deltaTime: number) => void, draw: () => void) {
        this.update = update;
        this.draw = draw;
        this.isRunning = false;
        this.lastTime = 0;
        // this.timeStep = 1000 / 60;
        this.raf = requestAnimationFrame(this.loop.bind(this));
        console.log('[DrawLoop] New instance created');
    }

    private loop(currentTime: number) {
        if (!this.isRunning) return;
        console.log('[DrawLoop] update');
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.update(deltaTime);

        this.draw();
        this.raf = requestAnimationFrame(this.loop.bind(this));
    }

    start() {
        console.log('[DrawLoop] start() method has been called');
        if (this.isRunning) return;
        this.isRunning = true;
        this.raf = requestAnimationFrame(this.loop.bind(this));
    }

    stop() {
        console.log('[DrawLoop] stop() method has been called');
        if (!this.isRunning) return;
        this.isRunning = false;
        cancelAnimationFrame(this.raf);
    }
}