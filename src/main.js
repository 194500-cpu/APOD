import '../style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
console.log(THREE);


var planets = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune"
]


var currentplanet = 0;

function cyclePlanets() {
  console.log(currentplanet);
  currentplanet++;
  if (currentplanet >= 8) {
    currentplanet = 0;
  }

  planet.material.map = loadPlanetTexture(
    planets[currentplanet]
  );

  planet.material.needsUpdate = true;

}
const cycleButton = document.getElementById("cyclebutton");

cycleButton.addEventListener("click", cyclePlanets);

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

scene.add(planet);

const light = new THREE.DirectionalLight(0xffffff, 3);

light.position.set(5, 3, 5);

scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.3));

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;

function animate() {
  requestAnimationFrame(animate);

  planet.rotation.y += 0.005;

  controls.update();

  renderer.render(scene, camera);
}

animate();
