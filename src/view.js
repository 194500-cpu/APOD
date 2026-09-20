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
  "neptune": "Planet: Neptune <br> Diameter: 49244 km <br> Mass: 1.02 x 10²⁶ kg <br> Strength of Gravity: 11.15 m/s² <br> Day duration: 16 hours <br> Distance from the Sun: 4,500,000,000 km <br> <br> <strong>Description:</strong> <br> The most distant planet from the Sun, Neptune is a deep blue<br> ice giant named after the Roman god of the sea. It experiences<br> the strongest, most ferocious winds in the solar system.",
  "trappist1b": "Planet: TRAPPIST-1b <br> Diameter: 14236 km <br> Mass: 2.45 x 10²⁴ kg <br> Strength of Gravity: 10.8 m/s² <br> Day duration: Tidally Locked (1.5 Earth Days) <br> Distance from the Sun: 1,720,000 km (From Host Star) <br> <br> <strong>Description</strong>: <br> The innermost planet in the TRAPPIST-1 system, TRAPPIST-1b <br>is a scorching rocky world. James Webb observations <br>suggest it lacks any substantial atmosphere.",
  "trappist1c": "Planet: TRAPPIST-1c <br> Diameter: 14030 km <br> Mass: 2.33 x 10²⁴ kg <br> Strength of Gravity: 10.65 m/s² <br> Day duration: Tidally Locked (2.4 Earth Days) <br> Distance from the Sun: 2,360,000 km (From Host Star) <br> <br> <strong>Description</strong>: <br> Often called a 'Venus twin' due to its similar size and <br>radiation levels, TRAPPIST-1c is a heavily radiated rocky <br>world with a bare surface or a very thin atmosphere.",
  "trappist1d": "Planet: TRAPPIST-1d <br> Diameter: 10045 km <br> Mass: 7.16 x 10²³ kg <br> Strength of Gravity: 4.73 m/s² <br> Day duration: Tidally Locked (4.0 Earth Days) <br> Distance from the Sun: 3,330,000 km (From Host Star) <br> <br> <strong>Description:</strong> <br> Skirting the inner edge of its star's habitable zone, <br>TRAPPIST-1d is a lightweight world depicted with a <br>narrow band of liquid water along its terminator line.",
  "trappist1e": "Planet: TRAPPIST-1e <br> Diameter: 11735 km <br> Mass: 1.43 x 10²⁴ kg <br> Strength of Gravity: 9.12 m/s² <br> Day duration: Tidally Locked (6.1 Earth Days) <br> Distance from the Sun: 4,380,000 km (From Host Star) <br> <br> <strong>Description:</strong> <br> Sitting squarely in the system's habitable zone, TRAPPIST-1e <br>is considered one of the most Earth-like exoplanets found. <br>It may hold a compact atmosphere and liquid water oceans.",
  "trappist1f": "Planet: TRAPPIST-1f <br> Diameter: 13320 km <br> Mass: 1.31 x 10²⁴ kg <br> Strength of Gravity: 7.35 m/s² <br> Day duration: Tidally Locked (9.2 Earth Days) <br> Distance from the Sun: 5,540,000 km (From Host Star) <br> <br> <strong>Description:</strong> <br> A potentially ocean-bearing planet within the habitable zone, <br>TRAPPIST-1f is likely an ice-rich rocky world with a tight <br>atmosphere, locked in permanent day and night sides.",
  "trappist1g": "Planet: TRAPPIST-1g <br> Diameter: 14450 km <br> Mass: 2.33 x 10²⁴ kg <br> Strength of Gravity: 11.08 m/s² <br> Day duration: Tidally Locked (12.4 Earth Days) <br> Distance from the Sun: 6,830,000 km (From Host Star) <br> <br> <strong>Description:</strong> <br> The second largest world in the system, TRAPPIST-1g orbits <br>near the outer edge of the habitable zone. It is heavily <br>shrouded and likely colder than Earth.",
  "trappist1h": "Planet: TRAPPIST-1h <br> Diameter: 9880 km <br> Mass: 6.56 x 10²³ kg <br> Strength of Gravity: 5.39 m/s² <br> Day duration: Tidally Locked (18.8 Earth Days) <br> Distance from the Sun: 9,270,000 km (From Host Star) <br> <br> <strong>Description:</strong> <br> The most distant planet from its host dwarf star, <br>TRAPPIST-1h is a freezing, sub-Earth sized desert world <br>hypothesised to be covered in an absolute shell of ice.",
  "proximab": "Planet: Proxima Centauri b <br> Diameter: 13130 km <br> Mass: 6.39 x 10²⁴ kg <br> Strength of Gravity: 10.3 m/s² <br> Day duration: Tidally Locked (11.2 Earth Days) <br> Distance from the Sun: 7,500,000 km (From Host Star) <br> <br> <strong>Description:</strong> <br> Orbiting inside the habitable zone of the closest star to our <br>Solar System, Proxima Centauri b experiences extreme stellar <br>radiation that may strip away volatile elements like water."

  
}

const params = new URLSearchParams(window.location.search);
const currentPlanet = params.get("planet");
let text = document.getElementById("inforight");
text.innerHTML = planetinfo[currentPlanet];
const system = params.get("system");

const backbutton = document.getElementById("back");
backbutton.addEventListener("click", () => {
  window.location.href = `./catalog.html?system=${system}`;
});

const navbar = document.getElementById("navbar");
navbar.addEventListener("click", () => {
  window.location.href = `./catalog.html?system=${system}`;
});

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


const nebulaGeometry = new THREE.SphereGeometry(50, 64, 64);

const nebulaMaterial = new THREE.ShaderMaterial({
  side: THREE.BackSide,
  depthWrite: false,

  uniforms: {
    time: { value: 0 }
  },

  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;

      gl_Position = projectionMatrix *
                    modelViewMatrix *
                    vec4(position, 1.0);
    }
  `,

  fragmentShader: `
    varying vec2 vUv;

    uniform float time;


    float random(vec2 st) {
      return fract(
        sin(dot(st.xy, vec2(12.9898, 78.233)))
        * 43758.5453
      );
    }


    float noise(vec2 st) {

      vec2 i = floor(st);
      vec2 f = fract(st);

      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));

      vec2 u = f * f * (3.0 - 2.0 * f);

      return mix(
        a,
        b,
        u.x
      ) +
      (c - a) * u.y * (1.0 - u.x) +
      (d - b) * u.x * u.y;
    }


    float fbm(vec2 st) {

      float value = 0.0;
      float amplitude = 0.5;

      for(int i = 0; i < 6; i++) {

        value += amplitude * noise(st);

        st *= 2.0;

        amplitude *= 0.5;
      }

      return value;
    }


    void main() {

      vec2 uv = vUv;


      vec2 pos = uv * 5.0;


      pos.x += time * 0.01;
      pos.y += time * 0.005;

      float cloud = fbm(pos);

      cloud = smoothstep(
        0.35,
        0.8,
        cloud
      );

      vec3 blue =
        vec3(0.05, 0.12, 0.35);

      vec3 purple =
        vec3(0.22, 0.05, 0.32);

      vec3 black =
        vec3(0.001, 0.002, 0.008);


      vec3 colour =
        mix(
          black,
          blue,
          cloud
        );

      colour =
        mix(
          colour,
          purple,
          cloud * cloud
        );


      colour *= 0.65;


      gl_FragColor =
        vec4(colour, 1.0);
    }
  `
});

const nebula = new THREE.Mesh(
  nebulaGeometry,
  nebulaMaterial
);

scene.add(nebula);



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

  nebulaMaterial.uniforms.time.value += 0.01;

  renderer.render(scene, camera);
}
planet.add(rings);
animate();
