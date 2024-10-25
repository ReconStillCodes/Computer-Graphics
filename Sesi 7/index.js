import * as THREE from "../threejs/build/three.module.js";
import { OrbitControls } from "../threejs/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "../threejs/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "../threejs/examples/jsm/geometries/TextGeometry.js";

var scene, camera, renderer, control;
var textList;

const init = () => {
  scene = new THREE.Scene();

  let fov = 75;
  let w = window.innerWidth;
  let h = window.innerHeight;
  let near = 0.1;
  let far = 1000;
  camera = new THREE.PerspectiveCamera(fov, w / h, near, far);
  camera.position.set(0, -50, 50);
  camera.lookAt(0, 100, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  renderer.setClearColor("black");
  document.body.appendChild(renderer.domElement);

  control = new OrbitControls(camera, renderer.domElement);

  textList = new THREE.Group();
  textList.position.set(0, -50, 0);

  let txt = [
    {
      text: "Episode I : The Phantom Menace (1999)",
      size: 5,
      height: 1,
      pos: new THREE.Vector3(0, 0, 0),
    },
    {
      text: "Turmoil has engulfed the Galactic Republic.",
      size: 3.5,
      height: 1,
      pos: new THREE.Vector3(0, -15, 0),
    },
    {
      text: "The taxation of trade routes to outlying",
      size: 3.5,
      height: 1,
      pos: new THREE.Vector3(0, -20, 0),
    },
    {
      text: "star systems is in dispute.",
      size: 3.5,
      height: 1,
      pos: new THREE.Vector3(0, -25, 0),
    },
    {
      text: "Hoping to resolve the matter with a blockade",
      size: 3.5,
      height: 1,
      pos: new THREE.Vector3(0, -40, 0),
    },
    {
      text: "of deadly battleships, the greedy Trade Federation",
      size: 3.5,
      height: 1,
      pos: new THREE.Vector3(0, -45, 0),
    },
    {
      text: "has stopped all shipping to the small planet of Naboo.",
      size: 3.5,
      height: 1,
      pos: new THREE.Vector3(0, -50, 0),
    },

    {
      text: "While the Congress of the Republic endlessly debates",
      size: 3.5,
      height: 1,
      pos: new THREE.Vector3(0, -65, 0),
    },
    {
      text: "this alarming chain of events, the Supreme Chancellor",
      size: 3.5,
      height: 1,
      pos: new THREE.Vector3(0, -70, 0),
    },

    {
      text: "has secretly dispatched two Jedi Knights, the guardians",
      size: 3.5,
      height: 1,
      pos: new THREE.Vector3(0, -75, 0),
    },
    {
      text: "of peace and justice in the galaxy, to settle the conflict...",
      size: 3.5,
      height: 1,
      pos: new THREE.Vector3(0, -80, 0),
    },
  ];

  txt.forEach((t) => {
    createText(t.text, t.size, t.height, t.pos);
  });

  scene.add(textList);
};

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  animate();
  control.update();
};

const createText = (text, size, height, pos) => {
  let loader = new FontLoader();

  loader.load(
    "../threejs/examples/fonts/helvetiker_regular.typeface.json",
    (font) => {
      let geometry = new TextGeometry(text, {
        font: font,
        size: size,
        height: height,
        //curveSegments: 12,
        // bevelEnabled: true,
        // bevelThickness: 2,
        // bevelSize: 0.1,
        // bevelOffset: 0.5,
        // bevelSegments: 100,
      });

      geometry.center();

      let material = new THREE.MeshBasicMaterial({
        color: "orange",
      });

      let mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(pos);
      textList.add(mesh);
      // console.log(mesh);
      // camera.lookAt(mesh.position);
      // //mesh.position.set(posX, posY, posZ);
      // mesh.position.copy(pos);
      // scene.add(mesh);
    }
  );
};

const animate = () => {
  textList.position.y += 0.05;
};

window.onload = () => {
  init();
  render();
};

window.onresize = () => {
  let w = window.innerWidth;
  let h = window.innerHeight;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);
};

window.addEventListener("keydown", function (event) {
  if (event.key === "k" || event.key === "K") {
    const audio = document.getElementById("myAudio");
    audio.volume = 0.5;
    audio.play().catch((error) => {
      console.log("Could not play audio:", error);
    });
  }
});
