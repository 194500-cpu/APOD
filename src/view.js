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

const params = new URLSearchParams(window.location.search);
const currentPlanet = params.get("planet");



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
