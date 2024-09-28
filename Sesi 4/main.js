import * as THREE from "../threejs/build/three.module.js";
import { OrbitControls } from "../threejs/examples/jsm/controls/OrbitControls.js";
//Import relevant module, such as three.module.js and orbitControls.js
//Pastikan path benar

var scene, renderer, camera, control; //Buat global variable ini

let init = () => {
  //Create Scene
  scene = new THREE.Scene();

  //Create Camera
  let w = window.innerWidth;
  let h = window.innerHeight;

  let aspect = w / h;
  let fov = 75;
  let near = 0.1;
  let far = 1000;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  //Create Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(w, h);
  renderer.setClearColor(0xcfcfcf);
  document.body.appendChild(renderer.domElement);

  //Create Control
  control = new OrbitControls(camera, renderer.domElement);
};

let render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  control.update();
};

//Memastikan bahwa init() dan renderer() dijalankan saat membuka window
window.onload = () => {
  init();
  render();
};

//Memastikan bahwa width & height window selalu keupdate
window.onresize = () => {
  let w = window.innerWidth;
  let h = window.innerHeight;

  //Update renderer
  renderer.setSize(w, h);

  //Update camera
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};
