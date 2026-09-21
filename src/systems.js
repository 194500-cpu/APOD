import '../systems.css'


const canvas = document.getElementById("constellation-bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

const constellations = [];

function createConstellation() {

    const points = [];

    const pointCount = Math.floor(Math.random() * 4) + 4;

    const centerX = Math.random() * canvas.width;
    const centerY = Math.random() * canvas.height;

    for (let i = 0; i < pointCount; i++) {

        points.push({
            x: centerX + (Math.random() - 0.5) * 180,
            y: centerY + (Math.random() - 0.5) * 180
        });

    }

    constellations.push({
        points,

        opacity: 0,

        state: "fadeIn",

        life: 0,

        maxLife: 250 + Math.random() * 200,

        driftX: (Math.random() - 0.5) * 0.03,
        driftY: (Math.random() - 0.5) * 0.03
    });
}

function drawConstellation(c) {

    ctx.strokeStyle = `rgba(130, 170, 255, ${c.opacity * 0.25})`;

    ctx.lineWidth = 1;

    ctx.beginPath();

    for (let i = 0; i < c.points.length - 1; i++) {

        ctx.moveTo(
            c.points[i].x,
            c.points[i].y
        );

        ctx.lineTo(
            c.points[i + 1].x,
            c.points[i + 1].y
        );

    }

    ctx.stroke();


    for (const point of c.points) {

        ctx.beginPath();

        ctx.arc(
            point.x,
            point.y,
            1.8,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(210, 225, 255, ${c.opacity})`;

        ctx.fill();

    }

}

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    for (let i = constellations.length - 1; i >= 0; i--) {

        const c = constellations[i];


        for (const point of c.points) {

            point.x += c.driftX;
            point.y += c.driftY;

        }


        if (c.state === "fadeIn") {

            c.opacity += 0.005;

            if (c.opacity >= 0.7) {
                c.state = "visible";
            }

        }



        else if (c.state === "visible") {

            c.life++;

            if (c.life > c.maxLife) {
                c.state = "fadeOut";
            }

        }


        else if (c.state === "fadeOut") {

            c.opacity -= 0.004;

            if (c.opacity <= 0) {

                constellations.splice(i, 1);

                continue;
            }

        }


        drawConstellation(c);

    }


    requestAnimationFrame(animate);
}

animate();

for (let i = 0; i < 25; i++) {
    createConstellation();
}

setInterval(() => {

    if (constellations.length < 25) {
        createConstellation();
    }

}, 2200);



const helpButton = document.getElementById("helpbutton");

helpButton.addEventListener("click", () => {
    const currentPage =
        window.location.pathname.split("/").pop() +
        window.location.search;

    window.location.href =
        `./help.html?return=${encodeURIComponent(currentPage)}`;
});