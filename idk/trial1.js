import * as THREE from "./../three.js-r145/build/three.module.js";

import { OrbitControls } from "./../three.js-r145/examples/jsm/controls/OrbitControls.js";
var camera, scene, renderer;
var controls;

const init = () => {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(8, 8, 8);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;

  controls = new OrbitControls(camera, renderer.domElement);

  createObject();

  //   let ambient = new THREE.AmbientLight(0xffffff, 1);
  //   scene.add(ambient);

  let pointlight = new THREE.PointLight("yellow", 1, 100);
  scene.add(pointlight);
  pointlight.position.set(2, 8, 0);
  pointlight.castShadow = true;

  let helper = new THREE.PointLightHelper(pointlight);
  scene.add(helper);

  //   let spotlight = new THREE.SpotLight("yellow", 1, 100, Math.PI / 8);
  //   spotlight.position.set(0, 10, 0);
  //   scene.add(spotlight);

  //   let helper = new THREE.SpotLightHelper(spotlight);
  //   scene.add(helper);
};

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

window.onload = () => {
  init();
  render();
};

const createObject = () => {
  let box = createBox();
  box.position.set(0, 3, 0);

  let plane = createPlane();
  plane.rotation.set(-Math.PI / 2, 0, 0);

  let objects = [box, plane];

  objects.forEach((obj) => {
    scene.add(obj);
  });
};

const createBox = () => {
  let geometry = new THREE.BoxGeometry(2, 2, 2);
  //   let material = new THREE.MeshPhongMaterial({ color: "red", shininess: 100 });
  let material = new THREE.MeshStandardMaterial({
    color: "red",
    roughness: 0.3,
    metalness: 1,
    emissive: 0x142439,
  });
  let mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  return mesh;
};

const createPlane = () => {
  let geometry = new THREE.PlaneGeometry(10, 10);
  let material = new THREE.MeshLambertMaterial({ color: "grey" });
  let mesh = new THREE.Mesh(geometry, material);
  mesh.receiveShadow = true;
  return mesh;
};
