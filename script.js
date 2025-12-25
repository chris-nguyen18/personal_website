const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');
let points = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Point {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
}

function init() {
    resize();
    for(let i=0; i<80; i++) points.push(new Point());
    animate();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points.forEach(p => {
        p.update();
        points.forEach(p2 => {
            let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if(dist < 150) {
                ctx.strokeStyle = `rgba(0, 242, 255, ${1 - dist/150})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        });
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
init();