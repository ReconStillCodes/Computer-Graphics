import * as THREE from "../threejs/build/three.module.js";
import { OrbitControls } from "../threejs/examples/jsm/controls/OrbitControls.js";

var scene, camera, renderer, control;
var box1, box2, box3;
var raycaster1, raycaster2, raycaster3; //buat ngatur raycasting
var rotate1, rotate2, rotate3; //buat speed rotation

const init = () => {
  scene = new THREE.Scene();

  let fov = 75;
  let w = window.innerWidth;
  let h = window.innerHeight;
  let near = 0.1;
  let far = 1000;

  camera = new THREE.PerspectiveCamera(fov, w / h, near, far);
  camera.position.set(0, 10, 10);
  camera.lookAt(0, 0, 0);

  //   Camera bisa access setiap layer tambahan
  camera.layers.enable(1);
  camera.layers.enable(2);
  camera.layers.enable(3);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  renderer.setClearColor("grey");

  document.body.appendChild(renderer.domElement);

  control = new OrbitControls(camera, renderer.domElement);

  //Init raycaster
  raycaster1 = new THREE.Raycaster();
  raycaster2 = new THREE.Raycaster();
  raycaster3 = new THREE.Raycaster();

  //Init rotation speed
  rotate1 = rotate2 = rotate3 = 0.05;
};

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  animate();
  control.update();
};

const animate = () => {
  /*rotate jaddin global variable, dmn dijadikan rotation
speed kayak gini*/
  box1.rotation.y += rotate1;
  box2.rotation.y += rotate2;
  box3.rotation.y += rotate3;
};

const createObject = () => {
  /*
    Ini bagian create boxes (jadiin global variable)
    Setiap object yang ingin di raycast di taruh di layer yang
    berbeda-beda agar tidak tabrakan
   */
  box1 = createBox(-5);
  box2 = createBox(0);
  box3 = createBox(5);

  box1.layers.set(1);
  box2.layers.set(2);
  box3.layers.set(3);

  let objects = [box1, box2, box3];

  objects.forEach((obj) => {
    scene.add(obj);
  });
};

const createBox = (posX) => {
  let geometry = new THREE.BoxGeometry(2, 2, 2);
  let material = new THREE.MeshBasicMaterial({ color: "red" });
  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = posX;
  return mesh;
};

window.onload = () => {
  init();
  createObject();
  render();
};

window.onresize = () => {
  let w = window.innerWidth;
  let h = window.innerHeight;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);
};

window.addEventListener("mousemove", (event) => {
  /*
    Ini bagian raycast buat hover.
    Kita mau kalo hover, warnanya berubah jadi putih

    Ini rumusnya udh harus kayak gini.
    Basically ini buat pastiin ration dan posisi object sesuai
    dengan layar kita
    */
  const pointer = new THREE.Vector2();

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  /*
  Masing2 raycast diset ke masing2 layer
  */
  raycaster1.setFromCamera(pointer, camera);
  raycaster1.layers.set(1);

  raycaster2.setFromCamera(pointer, camera);
  raycaster2.layers.set(2);

  raycaster3.setFromCamera(pointer, camera);
  raycaster3.layers.set(3);

  /*
  Kita taruh semua object yang ditangkap oleh raycast ke satu
  array.
  */
  const objects1 = raycaster1.intersectObjects(scene.children);
  const objects2 = raycaster2.intersectObjects(scene.children);
  const objects3 = raycaster3.intersectObjects(scene.children);

  initHover(objects1, box1);
  initHover(objects2, box2);
  initHover(objects3, box3);
});

/*
Funsgi ini buat ganti warna aja. Kalo mouse kita di area object,
warna ganti jadi putih. Kalo nggak ubah ke warna merah.
*/
const initHover = (objects, targetObj) => {
  if (objects.length > 0) {
    targetObj.material.color.set(0xffffff);
  } else {
    targetObj.material.color.set("red");
  }
};

/*
Event Listener buat pencet object raycast,
*/
window.addEventListener("click", (event) => {
  const pointer = new THREE.Vector2();

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster1.setFromCamera(pointer, camera);
  raycaster1.layers.set(1);

  raycaster2.setFromCamera(pointer, camera);
  raycaster2.layers.set(2);

  raycaster3.setFromCamera(pointer, camera);
  raycaster3.layers.set(3);

  const objects1 = raycaster1.intersectObjects(scene.children);
  const objects2 = raycaster2.intersectObjects(scene.children);
  const objects3 = raycaster3.intersectObjects(scene.children);

  /*
  Ini tempat pengaturan speednya. Setiap array object yang 
  ada di area raycast yg di pencet, speed berubah
  */
  if (objects1.length > 0) {
    if (rotate1 <= 0.05) {
      rotate1 *= 2;
    } else {
      rotate1 /= 2;
    }
  } else if (objects2.length > 0) {
    if (rotate2 <= 0.05) {
      rotate2 *= 4;
    } else {
      rotate2 /= 4;
    }
  } else if (objects3.length > 0) {
    if (rotate3 >= 0.05) {
      rotate3 = 0;
    } else {
      rotate3 = 0.05;
    }
  }
});
