import * as THREE from "../threejs/build/three.module.js";
import { OrbitControls } from "../threejs/examples/jsm/controls/OrbitControls.js";

var scene, renderer, camera, control;

let init = () => {
  scene = new THREE.Scene();

  let w = window.innerWidth;
  let h = window.innerHeight;

  let aspect = w / h;
  let fov = 75;
  let near = 0.1;
  let far = 1000;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(w, h);
  document.body.appendChild(renderer.domElement);

  control = new OrbitControls(camera, renderer.domElement);
};

let render = () => {
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

  renderer.setSize(w, h);

  camera.aspect = w / h;
  camera.updateMatrixProjection();
};
