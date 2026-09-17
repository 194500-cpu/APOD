import '../view.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
console.log(THREE);


var planets = [
  "mercury",
  "venus",
  "earth",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune"
]

var planetinfo = {
  "mercury": "Planet: Mercury <br> Diameter: 4880 km <br> Mass: 3.30 x 10²³ kg <br> Strength of Gravity: 3.7 m/s² <br> Day duration: 176 Earth Days <br> Distance from the Sun: 58,000,000 km <br> <br> <strong>Description</strong>: <br> The closest planet to the Sun, Mercury was named <br>after the Roman God Mercury. <br> It is also the smallest planet in our Solar System.",
  "venus": "Planet: Venus <br> Diameter: 12104 km <br> Mass: 4.867 x 10²⁴ kg <br> Strength of Gravity: 8.87 m/s² <br> Day duration: 117 Earth Days <br> Distance from the Sun: 108,000,000 km <br> <br> <strong>Description</strong>: <br> Venus spins in a clockwise direction, unlike most planets <br> which spin counter-clockwise. It is by far the hottest planet <br> in our Solar System.",
  "earth": "Planet: Earth <br> Diameter: 12172 km <br> Mass: 5.97 x 10²⁴ kg <br> Strength of Gravity: 9.81 m/s² <br> Day Duration: 1 Earth Day <br> Distance from the Sun: 150,000,000 km <br> <br> <strong>Description:</strong> <br> Our home planet, Earth is the only planet<br>  that we know of containing life. Sitting in the <br> 'Goldilocks Zone', it is suited to support life.",
  "mars": "Planet: Mars <br> Diameter: 6779 km <br> Mass: 6.39 x 10²³ kg <br> Strength of Gravity: 3.71 m/s² <br> Day duration: 24 hours, 40 minutes <br> Distance from the Sun: 228,000,000 km <br> <br> <strong>Description:</strong> <br> Known as the 'Red Planet' due to iron oxide on its surface,<br> Mars has giant volcanoes and polar ice caps. It is named<br> after the Roman god of war.",
  "jupiter": "Planet: Jupiter <br> Diameter: 139820 km <br> Mass: 1.90 x 10²⁷ kg <br> Strength of Gravity: 24.79 m/s² <br> Day duration: 10 hours <br> Distance from the Sun: 778,000,000 km <br> <br> <strong>Description:</strong> <br> Jupiter is the largest planet in our Solar System, more than<br> twice as massive as all other planets combined. It is a gas giant<br> famous for its Great Red Spot storm.",
  "saturn": "Planet: Saturn <br> Diameter: 116460 km <br> Mass: 5.68 x 10²⁶ kg <br> Strength of Gravity: 10.44 m/s² <br> Day duration: 10.7 hours <br> Distance from the Sun: 1,430,000,000 km <br> <br> <strong>Description:</strong> <br> Saturn is a gas giant best known for its spectacular and complex<br> ring system made of ice and rock particles. It is the least dense<br> planet in the solar system.",
  "uranus": "Planet: Uranus <br> Diameter: 50724 km <br> Mass: 8.68 x 10²⁵ kg <br> Strength of Gravity: 8.69 m/s² <br> Day duration: 17 hours <br> Distance from the Sun: 2,870,000,000 km <br> <br> <strong>Description:</strong> <br> Uranus is an ice giant with a distinct pale blue-green color<br> caused by methane gas. It is unique for rotating completely on<br> its side.",
  "neptune": "Planet: Neptune <br> Diameter: 49244 km <br> Mass: 1.02 x 10²⁶ kg <br> Strength of Gravity: 11.15 m/s² <br> Day duration: 16 hours <br> Distance from the Sun: 4,500,000,000 km <br> <br> <strong>Description:</strong> <br> The most distant planet from the Sun, Neptune is a deep blue<br> ice giant named after the Roman god of the sea. It experiences<br> the strongest, most ferocious winds in the solar system."
}

const params = new URLSearchParams(window.location.search);
const currentPlanet = params.get("planet");

let text = document.getElementById("inforight");
text.innerHTML = planetinfo[currentPlanet];


// function cyclePlanets() {
//   console.log(currentplanet);
//   currentplanet++;
//   if (currentplanet >= 8) {
//     currentplanet = 0;
//   }
//   if (currentplanet == 5) {
//     rings.visible = true;
//   } else {
//     rings.visible = false;
//   }


//   planet.material.map = loadPlanetTexture(
//     planets[planet]
//   );

//   planet.material.needsUpdate = true;

// }
// const cycleButton = document.getElementById("cyclebutton");

// cycleButton.addEventListener("click", cyclePlanets);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 3;

const textureLoader = new THREE.TextureLoader();
function loadPlanetTexture(name) {
  return textureLoader.load(
    import.meta.env.BASE_URL +
    "textures/" +
    name.toLowerCase() +
    ".png"
  );
}

const material = new THREE.MeshStandardMaterial({
  map: loadPlanetTexture(planets[0])
});


const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("app").appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(1, 64, 64);

const planet = new THREE.Mesh(geometry, material);

planet.material.map = loadPlanetTexture(
    currentPlanet
  );

  planet.material.needsUpdate = true;


const ringGeometry = new THREE.RingGeometry(
  1.25,
  1.9,
  64
);

const ringTexture = textureLoader.load(
  import.meta.env.BASE_URL + "textures/ringssaturn.png"
);
const ringMaterial = new THREE.MeshBasicMaterial({
  map: ringTexture,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.9
});

const rings = new THREE.Mesh(ringGeometry, ringMaterial);
rings.rotation.x = Math.PI / 2;
if (currentPlanet == "saturn") {
    rings.visible = true;
  } else {
    rings.visible = false;
}


scene.add(planet);
scene.add(rings);
const light = new THREE.DirectionalLight(0xffffff, 3);

light.position.set(5, 3, 5);

scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.3));

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;

camera.setViewOffset(
  window.innerWidth,
  window.innerHeight,
  0,
  70, 
  window.innerWidth,
  window.innerHeight
);
camera.position.y = 2;
function animate() {
  requestAnimationFrame(animate);

  planet.rotation.y += 0.005;

  controls.update();

  renderer.render(scene, camera);
}
planet.add(rings);
animate();
