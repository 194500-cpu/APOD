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
        { id: "proximab", name: "Proxima Centauri b" }
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
const navbar = document.getElementById("navbar");
navbar.addEventListener("click", () => {
  window.location.href = `./index.html`;
});

const params = new URLSearchParams(window.location.search);

const currentSystem = params.get("system");

console.log(currentSystem);

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