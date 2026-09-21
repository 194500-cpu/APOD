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
  "proximab": "Planet: Proxima Centauri b <br> Diameter: 13130 km <br> Mass: 6.39 x 10²⁴ kg <br> Strength of Gravity: 10.3 m/s² <br> Day duration: Tidally Locked (11.2 Earth Days) <br> Distance from the Sun: 7,500,000 km (From Host Star) <br> <br> <strong>Description:</strong> <br> Orbiting inside the habitable zone of the closest star to our <br>Solar System, Proxima Centauri b experiences extreme stellar <br>radiation that may strip away volatile elements like water.",
  "taucetif": "Planet: Tau Ceti f <br> Diameter: 23000 km <br> Mass: 2.35 x 10²⁵ kg <br> Strength of Gravity: 11.78 m/s² <br> Day duration: UNKNOWN <br> Distance from the Sun: 199,600,000 km (From Host Star) <br> <br> <strong>Description:</strong> <br> A super-Earth exoplanet, Tau Ceti f was analyzed using radial velocity data.",
  "taucetig": "Planet: Tau Ceti g <br> Diameter: ~15036 km <br> Mass: 1.05 x 10²⁵ kg <br> Strength of Gravity: ~12.33 m/s² <br> Day duration: UNKNOWN <br> Distance from the Sun: 19,900,000 km (From Host Star) <br> <br> <strong>Description:</strong> <br> Tau Ceti g is a possible super-Earth orbiting the nearby <br>Sun-like star Tau Ceti. Detected through radial velocity data, <br>its existence remains controversial and is not yet fully certain.",
  "taucetih": "Planet: Tau Ceti h <br> Diameter: ~15163 km <br> Mass: 1.09 x 10²⁵ kg <br> Strength of Gravity: ~12.67 m/s² <br> Day duration: UNKNOWN <br> Distance from the Sun: 36,400,000 km (From Host Star) <br> <br> <strong>Description:</strong> <br> Tau Ceti h is a possible super-Earth with an orbital period <br>of about 49 days. Like the other proposed Tau Ceti planets, <br>its detection remains controversial and requires confirmation.",
  "cancrib": "Planet: 55 Cancri b <br> Diameter: ~173377 km <br> Mass: 1.58 x 10²⁷ kg <br> Strength of Gravity: ~13.39 m/s² <br> Day duration: UNKNOWN <br> Distance from the Sun: ~17,700,000 km (From Host Star) <br> <br> <strong>Description:</strong> <br> 55 Cancri b is a hot gas giant orbiting extremely close to <br>its host star. Similar in mass to Jupiter, it completes an <br>entire orbit in only about 14.7 Earth days.",
  "cancric": "Planet: 55 Cancri c <br> Diameter: ~106263 km <br> Mass: 3.25 x 10²⁶ kg <br> Strength of Gravity: ~7.36 m/s² <br> Day duration: UNKNOWN <br> Distance from the Sun: ~37,000,000 km (From Host Star) <br> <br> <strong>Description:</strong> <br> 55 Cancri c is a gas giant significantly less massive than <br>Jupiter. It races around its star every 44 days and is one <br>of several giant planets packed into the 55 Cancri system.",
  "cancrid": "Planet: 55 Cancri d <br> Diameter: ~162191 km <br> Mass: 7.36 x 10²⁷ kg <br> Strength of Gravity: ~71.44 m/s² <br> Day duration: UNKNOWN <br> Distance from the Sun: ~838,000,000 km (From Host Star) <br> <br> <strong>Description:</strong> <br> 55 Cancri d is a massive outer gas giant several times the <br>mass of Jupiter. Unlike the system's tightly packed inner planets, <br>it takes roughly 13 years to complete one orbit of its star.",
  "cancrie": "Planet: 55 Cancri e <br> Diameter: ~23891 km <br> Mass: 4.77 x 10²⁵ kg <br> Strength of Gravity: ~22.29 m/s² <br> Day duration: ~18 hours (Possibly Tidally Locked) <br> Distance from the Sun: 2,310,000 km (From Host Star) <br> <br> <strong>Description:</strong> <br> 55 Cancri e is an extremely hot rocky super-Earth orbiting <br>so close to its star that a year lasts less than 18 hours. <br>Its surface may contain vast regions of molten rock.",
  "cancrif": "Planet: 55 Cancri f <br> Diameter: ~94658 km <br> Mass: 2.68 x 10²⁶ kg <br> Strength of Gravity: ~7.63 m/s² <br> Day duration: UNKNOWN <br> Distance from the Sun: ~120,000,000 km (From Host Star) <br> <br> <strong>Description:</strong> <br> 55 Cancri f is a gas giant orbiting farther from its star than <br>the system's tightly packed inner planets. Its 260-day orbit <br>places it near the outer region of the star's habitable zone.",
  "proximac": "Planet: Proxima Centauri c <br> Diameter: 15000 km <br> Mass: 7.0 x 10²⁴ kg <br> Strength of Gravity: 9.8 m/s² <br> Day duration: Tidally Locked (11.2 Earth Days) <br> Distance from the Sun: 1,480,000,000 km (From Host Star) <br> <br> <strong>Description:</strong> <br> Proxima Centauri c is a super-Earth exoplanet orbiting <br> the closest star to our Solar System. It is located in <br> the outer region of its star's habitable zone and may <br> have a thick atmosphere.",
  "proximad": "Planet: Proxima Centauri d <br> Diameter: 12000 km <br> Mass: 3.0 x 10²⁴ kg <br> Strength of Gravity: 8.5 m/s² <br> Day duration: Tidally Locked (11.2 Earth Days) <br> Distance from the Sun: 1,000,000 km (From Host Star) <br> <br> <strong>Description:</strong> <br> Proxima Centauri d is a small rocky exoplanet <br> orbiting very close to its host star. It is likely tidally <br> locked and experiences extreme stellar radiation, making it <br> inhospitable for life as we know it."

}

const params = new URLSearchParams(window.location.search);
const currentPlanet = params.get("planet");
let text = document.getElementById("inforight");
text.innerHTML = planetinfo[currentPlanet];
const toggleInfo = document.getElementById("toggleinfo");

toggleInfo.addEventListener("click", () => {

  text.classList.toggle("hidden");

  if (text.classList.contains("hidden")) {
    toggleInfo.textContent = "INFO +";
  } else {
    toggleInfo.textContent = "INFO −";
  }

});
const system = params.get("system");
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
if (currentPlanet == "saturn" || currentPlanet == "cancrid") {
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
    varying vec3 vPosition;

    void main() {
      vPosition = position;

      gl_Position = projectionMatrix *
                    modelViewMatrix *
                    vec4(position, 1.0);
    }
  `,

  fragmentShader: `
    varying vec3 vPosition;

    uniform float time;

    float random(vec3 p) {
      return fract(
        sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453
      );
    }

    float noise(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);

      vec3 u = f * f * (3.0 - 2.0 * f);

      float n000 = random(i + vec3(0.0, 0.0, 0.0));
      float n100 = random(i + vec3(1.0, 0.0, 0.0));
      float n010 = random(i + vec3(0.0, 1.0, 0.0));
      float n110 = random(i + vec3(1.0, 1.0, 0.0));
      float n001 = random(i + vec3(0.0, 0.0, 1.0));
      float n101 = random(i + vec3(1.0, 0.0, 1.0));
      float n011 = random(i + vec3(0.0, 1.0, 1.0));
      float n111 = random(i + vec3(1.0, 1.0, 1.0));

      return mix(
        mix(
          mix(n000, n100, u.x),
          mix(n010, n110, u.x),
          u.y
        ),
        mix(
          mix(n001, n101, u.x),
          mix(n011, n111, u.x),
          u.y
        ),
        u.z
      );
    }

    float fbm(vec3 p) {
      float value = 0.0;
      float amplitude = 0.5;

      for (int i = 0; i < 6; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
      }

      return value;
    }

    void main() {

      vec3 pos = vPosition * 0.05;


      pos.x += time * 0.01;
      pos.y += time * 0.005;

      float cloud = fbm(pos);

      cloud = smoothstep(
        0.35,
        0.8,
        cloud
      );

      vec3 blue = vec3(0.05, 0.12, 0.35);
      vec3 purple = vec3(0.22, 0.05, 0.32);
      vec3 black = vec3(0.001, 0.002, 0.008);

      vec3 colour = mix(
        black,
        blue,
        cloud
      );

      colour = mix(
        colour,
        purple,
        cloud * cloud
      );

      colour *= 0.65;

      gl_FragColor = vec4(colour, 1.0);
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

controls.enableDamping = true;
controls.dampingFactor = 0.05;

controls.minDistance = 1.7;
controls.maxDistance = 6;
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
