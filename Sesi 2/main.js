import * as THREE from "./threejs/build/three.module.js";
import { OrbitControls } from "./threejs/examples/jsm/controls/OrbitControls.js"; //Import Orbit Controls

var scene, camera, renderer, controls;

const init = () => {
  scene = new THREE.Scene();

  let fov = 75;
  let aspect = window.innerWidth / window.innerHeight;
  let near = 0.1; //Default = 0.1
  let far = 1000; //Default = 1000

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far); //paramaeter : fov, aspcet ratio, near, far

  //camera = new THREE.OrthographicCamera(-20, 20, 10, -10, 1, 1000); //left, right, top, bottom, near, far

  camera.position.set(4, 4, 4); //For perspective camera
  //camera.position.set(0, 0, 2); //For Orthographic Camera
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xcfcfcf);
  //Render akan mengembalikan sebuah canvas

  document.body.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement); //Tambah control untuk camera
};

const render = () => {
  requestAnimationFrame(render); //Buat animate
  renderer.render(scene, camera);
  controls.update();
};

//Akan diajarikan sesi 4, cuman sekilas aja
const createBox = () => {
  let geometry = new THREE.BoxGeometry(1, 1, 1);
  let material = new THREE.MeshBasicMaterial({ color: "red" });
  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  scene.add(mesh);
};

window.onload = () => {
  init();
  createBox();
  render();
};

window.onresize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
