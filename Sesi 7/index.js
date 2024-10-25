import * as THREE from "../threejs/build/three.module.js";
import { OrbitControls } from "../threejs/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "../threejs/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "../threejs/examples/jsm/geometries/TextGeometry.js";

var scene, camera, renderer, control;

const init = () => {
  scene = new THREE.Scene();

  let fov = 75;
  let w = window.innerWidth;
  let h = window.innerHeight;
  let near = 0.1;
  let far = 1000;
  camera = new THREE.PerspectiveCamera(fov, w / h, near, far);
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  renderer.setClearColor("grey");
  document.body.appendChild(renderer.domElement);

  control = new OrbitControls(camera, renderer.domElement);

  createText("Hello World", 15, 4, 0, 0, 0);
  //createBox();
};

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  control.update();
};

const createText = (text, size, height, posX, posY, posZ) => {
  let loader = new FontLoader();

  loader.load(
    "../threejs/examples/fonts/helvetiker_regular.typeface.json",
    (font) => {
      let geometry = new TextGeometry(text, {
        font: font,
        size: size,
        height: height,
        //curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 5,
        bevelSize: 0.1,
        bevelOffset: 2,
        bevelSegments: 100,
      });

      geometry.center();

      let material = new THREE.MeshNormalMaterial({
        color: "black",
      });

      let mesh = new THREE.Mesh(geometry, material);
      console.log(mesh);
      camera.lookAt(mesh.position);
      mesh.position.set(posX, posY, posZ);
      scene.add(mesh);
    }
  );
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
