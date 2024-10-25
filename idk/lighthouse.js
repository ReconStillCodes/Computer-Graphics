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
  camera.position.set(30, 30, 30);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;

  controls = new OrbitControls(camera, renderer.domElement);

  createObject();
};

const createObject = () => {
  let plane = createPlane();
  plane.position.set(0, -1, 0);
  plane.rotation.set(Math.PI / 2, 0, 0);
  plane.receiveShadow = true;

  let light = createPoint();
  light.castShadow = true;

  let ambient = new THREE.AmbientLight(0xffffff, 0.2);

  // lighthouse
  let floor = createBox(9, 2, 9, 0x888888);

  let body = createCylinder(2.6, 4, 20, 100, 1, false, 0xffffff);
  body.position.set(0, 10, 0);

  let neck = createCylinder(3.6, 3.6, 0.5, 20, 1, false, 0xac443c);
  neck.position.set(0, 20, 0);

  let fence = createCylinder(3.2, 3.2, 1, 10, 1, true, 0x5c0000);
  fence.material.roughness = 0.3;
  fence.material.metalness = 0.7;
  fence.material.wireframe = true;
  fence.position.set(0, 21, 0);

  let head = createCylinder(2.2, 2.2, 3, 30, 1, false, 0xffffff);
  head.position.set(0, 22, 0);

  let roof = createCone(3.5, 3.5, 100, 1, false, 0xac443c);
  roof.material.roughness = 0.6;
  roof.material.metalness = 1;
  roof.position.set(0, 25, 0);

  let top = createSphere(0.5, 0xac443c);
  top.material.roughness = 0.6;
  top.material.metalness = 1;
  top.position.set(0, 26.5, 0);

  let group = new THREE.Group();
  group.add(floor, body, neck, fence, head, roof, top);
  group.children.forEach((element) => {
    element.castShadow = true;
  });

  let objects = [plane, light, ambient, group];

  objects.forEach((obj) => {
    scene.add(obj);
  });
};

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

window.onload = () => {
  init();
  render();
};

const createPlane = () => {
  let geometry = new THREE.PlaneGeometry(100, 100);
  let material = new THREE.MeshLambertMaterial({
    color: 0xefdbb9,
    side: THREE.DoubleSide,
  });
  let mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

const createPoint = () => {
  let light = new THREE.PointLight(0xffffff, 1, 10000, 0);
  light.position.set(80, 100, 100);

  let helper = new THREE.PointLightHelper(light);
  scene.add(helper);

  return light;
};

const createBox = (width, height, depth, color) => {
  let geo = new THREE.BoxGeometry(width, height, depth);
  let mat = new THREE.MeshLambertMaterial({ color: color });
  let mesh = new THREE.Mesh(geo, mat);

  return mesh;
};

const createCylinder = (
  radiusTop,
  radiusBottom,
  height,
  radSegment,
  heightSegment,
  openEnded,
  color
) => {
  let geo = new THREE.CylinderGeometry(
    radiusTop,
    radiusBottom,
    height,
    radSegment,
    heightSegment,
    openEnded
  );
  let mat = new THREE.MeshStandardMaterial({
    color: color,
  });
  let mesh = new THREE.Mesh(geo, mat);
  return mesh;
};

const createCone = (
  radius,
  height,
  radSegment,
  heightSegment,
  openEnded,
  color
) => {
  let geo = new THREE.ConeGeometry(
    radius,
    height,
    radSegment,
    heightSegment,
    openEnded,
    color
  );
  let mat = new THREE.MeshStandardMaterial({ color: 0xac443c });
  let mesh = new THREE.Mesh(geo, mat);
  return mesh;
};

const createSphere = (radius, color) => {
  let geo = new THREE.SphereGeometry(radius);
  let mat = new THREE.MeshStandardMaterial({ color: color });
  let mesh = new THREE.Mesh(geo, mat);
  return mesh;
};
