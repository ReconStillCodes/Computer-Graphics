import * as THREE from "../threejs/build/three.module.js";
import { OrbitControls } from "../threejs/examples/jsm/controls/OrbitControls.js";

var scene, camera, renderer, control;

const init = () => {
  scene = new THREE.Scene();

  let w = window.innerWidth;
  let h = window.innerHeight;
  let fov = 75;
  let aspect = w / h;
  let near = 0.1;
  let far = 1000;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(10, 10, 10);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  renderer.setClearColor("lightgrey");

  document.body.appendChild(renderer.domElement);

  control = new OrbitControls(camera, renderer.domElement);
};

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  control.update();
};

const createPoint = (points) => {
  let geometry = new THREE.BufferGeometry();
  geometry.setFromPoints(points);

  let material = new THREE.PointsMaterial({
    color: "red",
  });

  let point = new THREE.Points(geometry, material);
  return point;
};

const createLine = (points) => {
  let geometry = new THREE.BufferGeometry();
  geometry.setFromPoints(points);

  let material = new THREE.LineBasicMaterial({
    color: "green",
  });

  //Membuat Line yang tidak looping
  //Berakhir di titik akhir
  // let line = new THREE.Line(geometry, material);

  //Membuat Line yang looping
  //Berakhir di titik pertama
  let line = new THREE.LineLoop(geometry, material);
  return line;
};

const createPlane = () => {
  let geometry = new THREE.PlaneGeometry(5, 5);

  let material = new THREE.MeshBasicMaterial({
    color: "blue",
    side: THREE.DoubleSide, //Membuat kedua sisi plane memiliki warna
  });

  let plane = new THREE.Mesh(geometry, material);
  return plane;
};

const createObject = () => {
  let points = [
    new THREE.Vector3(3, 0, 3),
    new THREE.Vector3(-3, 0, 3),
    new THREE.Vector3(-3, 0, -3),
    new THREE.Vector3(3, 0, -3),
  ];

  let point = createPoint(points);
  let line = createLine(points);
  let plane = createPlane();
  plane.rotation.set(Math.PI / 2, 0, 0);
  plane.scale.set(0.5, 1);
  plane.position.set(0, 0, 0);

  let objects = [point, line, plane];

  objects.forEach((obj) => {
    scene.add(obj);
  });
};

window.onload = () => {
  init();
  createObject();
  render();
};

window.onresize = () => {
  let w = window.innerWidth;
  let h = window.innerHeight;

  renderer.setSize(w, h);

  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};
