import * as THREE from "../threejs/build/three.module.js";

var scene, camera, renderer;

const init = () => {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );
  camera.position.set(0, 34, 30);
  camera.lookAt(0, 10, 0);

  createObject();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("#EEEEEE");

  document.body.appendChild(renderer.domElement);
};

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

const createObject = () => {
  let floor = createBox(9, 2, 9, "#888888");
  floor.position.set(0, 0, 0);

  let body = createCylinder(2.6, 4, 20, 100, 1, false, "#FFFFFF", false);
  body.position.set(0, 10, 0);

  let neck = createCylinder(3.6, 3.6, 0.5, 20, 1, false, "#AC443C", false);
  neck.position.set(0, 20, 0);

  let fence = createCylinder(3.2, 3.2, 1, 10, 1, true, "#5C0000", true);
  fence.position.set(0, 21, 0);

  let head = createCylinder(2.2, 2.2, 3, 30, 1, false, "#FFFFFF", false);
  head.position.set(0, 22, 0);

  let roof = createCone(3.5, 3.5, 100, 1, false, "#AC443C");
  roof.position.set(0, 25, 0);

  let topPart = createSphere(0.5, "#AC443C");
  topPart.position.set(0, 26.5, 0);

  let objects = [floor, body, neck, fence, head, roof, topPart];

  objects.forEach((obj) => {
    scene.add(obj);
  });
};

const createBox = (width, height, depth, color) => {
  let geometry = new THREE.BoxGeometry(width, height, depth);

  let material = new THREE.MeshBasicMaterial({
    color: color,
  });

  let mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

const createCylinder = (
  radiusTop,
  radiusBot,
  height,
  radialSegment,
  heightSegment,
  isOpen,
  color,
  isWireframe
) => {
  let geometry = new THREE.CylinderGeometry(
    radiusTop,
    radiusBot,
    height,
    radialSegment,
    heightSegment,
    isOpen
  );

  let material = new THREE.MeshBasicMaterial({
    color: color,
    wireframe: isWireframe,
  });

  let mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

const createCone = (
  radius,
  height,
  radialSegment,
  heightSegment,
  isOpen,
  color
) => {
  let geometry = new THREE.ConeGeometry(
    radius,
    height,
    radialSegment,
    heightSegment,
    isOpen
  );

  let material = new THREE.MeshBasicMaterial({ color: color });

  let mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

let createSphere = (radius, color) => {
  let geometry = new THREE.SphereGeometry(radius);

  let material = new THREE.MeshBasicMaterial({ color: color });

  let mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

window.onload = () => {
  init();
  render();
};

window.onresize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
