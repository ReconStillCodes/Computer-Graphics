import * as THREE from "../threejs/build/three.module.js";
import { OrbitControls } from "../threejs/examples/jsm/controls/OrbitControls.js";

var scene, camera, renderer, control;

const init = () => {
  scene = new THREE.Scene();

  var fov = 75;
  var w = window.innerWidth;
  var h = window.innerHeight;
  var aspect = w / h;
  var near = 0.001;
  var far = 1000;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 10);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGL1Renderer({ antialias: true });
  renderer.setSize(w, h);
  renderer.setClearColor("grey");

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
  var w = window.innerWidth;
  var h = window.innerHeight;
  var aspect = w / h;

  camera.aspect = aspect;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);
};
