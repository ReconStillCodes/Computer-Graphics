import * as THREE from "../threejs/build/three.module.js";
import { OrbitControls } from "../threejs/examples/jsm/controls/OrbitControls.js";

var scene, camera, renderer, control;

const init = () => {
  scene = new THREE.Scene();

  let fov = 75;
  let w = window.innerWidth;
  let h = window.innerHeight;
  let near = 0.1;
  let far = 0.001;
  camera = new THREE.PerspectiveCamera(fov, w / h, near, far);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  renderer.setClearColor(0xcfcfcfc);
  document.body.appendChild(renderer.domElement);

  control = new OrbitControls(camera, renderer.domElement);
};

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  control.update();
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
