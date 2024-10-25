import * as THREE from "../threejs/build/three.module.js";
import { OrbitControls } from "../threejs/examples/jsm/controls/OrbitControls.js";
//Import relevant module, such as three.module.js and orbitControls.js
//Pastikan path benar

var scene, renderer, camera, control; //Buat global variable ini
var group, group2;

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
  camera.position.set(3, 3, 3);
  camera.lookAt(0, 0, 0);

  //Create Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  renderer.setClearColor(0xcfcfcf);
  document.body.appendChild(renderer.domElement);

  //Create Control
  control = new OrbitControls(camera, renderer.domElement);

  createObject();
};

let render = () => {
  requestAnimationFrame(render);
  animate();
  renderer.render(scene, camera);
  control.update();
};

//Animate =========================================

const animate = () => {
  group.rotation.y += 0.01;
  group2.rotation.y += 0.01;
};

//Objects ============================================

const createBox = () => {
  let geometry = new THREE.BoxGeometry(1, 1, 1);
  let material = new THREE.MeshNormalMaterial({ wireframe: true });
  let mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

const createSphere = (color) => {
  let geometry = new THREE.SphereGeometry(2);
  let material = new THREE.MeshBasicMaterial({
    color: color,
  });
  let mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

const createCylinder = () => {
  let geometry = new THREE.CylinderGeometry(1.5, 1, 3);
  let material = new THREE.MeshBasicMaterial({
    color: "yellow",
  });
  let mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

const createCone = () => {
  let geometry = new THREE.ConeGeometry(1, 3);
  let material = new THREE.MeshBasicMaterial({
    color: "green",
  });
  let mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

const createWireframe = (geometry) => {
  let wireframe = new THREE.WireframeGeometry(geometry);
  let material = new THREE.LineBasicMaterial({ color: "purple" });

  let line = new THREE.LineSegments(wireframe, material);
  return line;
};

const createGroup = () => {
  group = new THREE.Group();

  let coor = [
    new THREE.Vector3(3, 0, 0),
    new THREE.Vector3(-3, 0, 0),
    new THREE.Vector3(0, 0, 3),
    new THREE.Vector3(0, 0, -3),
  ];

  let color = ["red", "yellow", "blue", "green"];

  coor.forEach((pos, idx) => {
    let sphere = createSphere(color[idx]);
    sphere.position.copy(pos);
    console.log(sphere);
    group.add(sphere);
  });

  group.position.set(10, 0, 0);
};

const createObject = () => {
  let box = createBox();
  box.position.set(2, 1, 2);
  box.scale.set(0.5, 2, 1);

  let sphere = createSphere();
  sphere.scale.set(0.5, 0.5, 0.5);

  let cylinder = createCylinder();
  cylinder.position.set(-4, 0, 0);
  cylinder.rotation.set(0, 0, Math.PI / 4);
  cylinder.rotation.x = Math.PI / 8;

  let cone = createCone();
  cone.position.set(0, 0, -4);

  let wireframe = createWireframe(cylinder.geometry);
  wireframe.position.set(0, 3, 0);

  //Create A group
  createGroup();

  let sun = createSphere("black");
  group2 = new THREE.Group();
  group2.add(sun);
  group2.add(group);

  let objects = [
    //box, sphere, cylinder, cone, wireframe,
    group2,
  ];

  objects.forEach((obj) => {
    scene.add(obj);
  });
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
