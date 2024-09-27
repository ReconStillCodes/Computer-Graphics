import * as THREE from "./threejs/build/three.module.js";
import { OrbitControls } from "./threejs/examples/jsm/controls/OrbitControls.js";

var scene, camera, renderer;
var control;

const init = () => {
  //Buat scene
  scene = new THREE.Scene();

  //Buat camera
  let fov = 75;
  let w = window.innerWidth; //innerWidh = full width of browser
  let h = window.innerHeight; //innerHeight = full height of browser
  let aspect = w / h;
  let near = 0.1;
  let far = 1000;

  //Perspective Camera
  //-> Camera yang bekerja seperti mata kita
  //-> Object semakin dekat, semakin kecil, dan vice verca
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  //Orthographic Camera
  //-> Object size statis
  //-> Object dekat atau jauh masih memiliki size yang sama
  //camera = new THREE.OrthographicCamera(-10, 5, 5, -5, near, far);
  //(left, right, top, bottom, near, far)

  camera.position.set(2, 0, 0);
  camera.lookAt(0, 0, 0);

  //Buat renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  renderer.setClearColor("lightgrey");
  document.body.appendChild(renderer.domElement);

  //Buat control
  control = new OrbitControls(camera, renderer.domElement);
};

const render = () => {
  requestAnimationFrame(render);

  //render scene & camera
  renderer.render(scene, camera);

  //Update control
  control.update();
};

const createBox = () => {
  //Buat geometry -> Tentuin bentuk Object
  let geometry = new THREE.BoxGeometry(1, 1, 1);

  //Buat material -> material untuk object
  let material = new THREE.MeshBasicMaterial({ color: "red" });

  //Buat Mesh -> Gabungan geometry & material
  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0); //(x-axis, y-axis, z-axis)
  scene.add(mesh);
};

window.onload = () => {
  init();
  createBox();
  render();
};

window.onresize = () => {
  let w = window.innerWidth; //innerWidh = full width of browser
  let h = window.innerHeight; //innerHeight = full height of browser

  //Update Renderer
  renderer.setSize(w, h);

  //Update camera
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};
