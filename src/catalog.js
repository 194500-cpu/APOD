import '../catalog.css'

const systemscatalog = {

    solar: [
        { id: "mercury", name: "Mercury" },
        { id: "venus", name: "Venus" },
        { id: "earth", name: "Earth" },
        { id: "mars", name: "Mars" },
        { id: "jupiter", name: "Jupiter" },
        { id: "saturn", name: "Saturn" },
        { id: "uranus", name: "Uranus" },
        { id: "neptune", name: "Neptune" }
    ],

    trappist: [
        { id: "trappist1b", name: "TRAPPIST-1b" },
        { id: "trappist1c", name: "TRAPPIST-1c" },
        { id: "trappist1d", name: "TRAPPIST-1d" },
        { id: "trappist1e", name: "TRAPPIST-1e" },
        { id: "trappist1f", name: "TRAPPIST-1f" },
        { id: "trappist1g", name: "TRAPPIST-1g" },
        { id: "trappist1h", name: "TRAPPIST-1h" }
    ],

    alphacentauri: [
        { id: "proximab", name: "Proxima Centauri b" },
        { id: "proximac", name: "Proxima Centauri c" },
        { id: "proximad", name: "Proxima Centauri d" }
    ],

    tauceti: [
        { id: "taucetif", name: "Tau Ceti f"},
        { id: "taucetig", name: "Tau Ceti g"},
        { id: "taucetih", name: "Tau Ceti h"}
        
    ],
    cancri: [
        { id: "cancrib", name: "55 Cancri b"},
        { id: "cancric", name: "55 Cancri c"},
        { id: "cancrid", name: "55 Cancri d"},
        { id: "cancrie", name: "55 Cancri e"},
        { id: "cancrif", name: "55 Cancri f"}
        


    ]
};
const systemNames = {
  solar: "Solar System",
  trappist: "TRAPPIST-1",
  alphacentauri: "Alpha Centauri",
  tauceti: "Tau Ceti",
  cancri: "55 Cancri"
};
const helpButton = document.getElementById("helpbutton");

helpButton.addEventListener("click", () => {
    const currentPage =
        window.location.pathname.split("/").pop() +
        window.location.search;

    window.location.href =
        `./help.html?return=${encodeURIComponent(currentPage)}`;
});
const backButton = document.getElementById("backbutton");

backButton.addEventListener("click", () => {
  window.location.href = "./index.html";
});
const params = new URLSearchParams(window.location.search);

const currentSystem = params.get("system");

document.getElementById("system").textContent = systemNames[currentSystem];


const planets = systemscatalog[currentSystem];

const catalog = document.getElementById("catalog");

for (const planet of planets) {

    const card = document.createElement("a");

    card.className = "item";

    card.href =
        "./planets.html?planet=" +
        planet.id +
        "&system=" +
        currentSystem;


    const image = document.createElement("img");

    image.src =
        import.meta.env.BASE_URL +
        "textures/view" +
        planet.id +
        ".png";

    image.alt = planet.name;


    const title = document.createElement("h2");

    title.textContent = planet.name;


    card.appendChild(image);

    card.appendChild(title);

    catalog.appendChild(card);

}



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

