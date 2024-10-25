import * as THREE from "../threejs/build/three.module.js";

var scene, camera, renderer;

const init = () => {
  scene = new THREE.Scene();

  let fov = 75;
  let w = window.innerWidth;
  let h = window.innerHeight;
  let near = 0.1;
  let far = 1000;
  camera = new THREE.PerspectiveCamera(fov, w / h, near, far);
  camera.position.set(0, 34, 30);
  camera.lookAt(0, 10, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  renderer.setClearColor("#EEEEEE");
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  createObject();
};

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

//Object ================================

const createObject = () => {
  let ambientLight = createAmbientLight("#FFFFFF", 0.2);

  let pointLight = createPointLight("#FFFFFF", 1, 10000, 0);
  pointLight.position.set(80, 100, 100);
  pointLight.castShadow = true;

  let plane = createPlane(100, 100, "#EFDBB9");
  plane.position.set(0, -1, 0);
  plane.rotation.set(Math.PI / 2, 0, 0);
  plane.receiveShadow = true;

  let floor = createBox(9, 2, 9, "#888888");
  floor.position.set(0, 0, 0);
  floor.castShadow = true;

  let body = createCylinder(2.6, 4, 20, 100, 1, false, "#FFFFFF");
  body.position.set(0, 10, 0);
  body.castShadow = true;

  let neck = createCylinder(3.6, 3.6, 0.5, 20, 1, false, "#AC443C");
  neck.position.set(0, 20, 0);
  neck.castShadow = true;

  let fence = createCylinderWireframe(
    3.2,
    3.2,
    1,
    10,
    1,
    true,
    "#5C0000",
    true,
    0.3,
    0.7
  );
  fence.position.set(0, 21, 0);
  fence.castShadow = true;

  let head = createCylinder(2.2, 2.2, 3, 30, 1, false, "#FFFFFF", 2);
  head.position.set(0, 22, 0);
  head.castShadow = true;

  let roof = createCone(3.5, 3.5, 100, 1, false, "#AC443C", 0.6, 1);
  roof.position.set(0, 25, 0);
  roof.castShadow = true;

  let top = createSphere(0.5, "#AC443C", 0.6, 1);
  top.position.set(0, 26.5, 0);
  top.castShadow = true;

  let objects = [
    ambientLight,
    pointLight,
    plane,
    floor,
    body,
    neck,
    fence,
    head,
    roof,
    top,
  ];

  objects.forEach((obj) => {
    scene.add(obj);
  });
};

const createPlane = (width, height, color) => {
  let geometry = new THREE.PlaneGeometry(width, height);
  let material = new THREE.MeshLambertMaterial({
    color: color,
    side: THREE.DoubleSide,
  });
  let mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

const createBox = (width, height, depth, color) => {
  let geometry = new THREE.BoxGeometry(width, height, depth);
  let material = new THREE.MeshLambertMaterial({
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
  HeightSegment,
  isOpen,
  color
) => {
  let geometry = new THREE.CylinderGeometry(
    radiusTop,
    radiusBot,
    height,
    radialSegment,
    HeightSegment,
    isOpen
  );
  let material = new THREE.MeshStandardMaterial({ color: color });
  let mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

const createCylinderWireframe = (
  radiusTop,
  radiusBot,
  height,
  radialSegment,
  HeightSegment,
  isOpen,
  color,
  isWirefame,
  roughness,
  metalness
) => {
  let geometry = new THREE.CylinderGeometry(
    radiusTop,
    radiusBot,
    height,
    radialSegment,
    HeightSegment,
    isOpen
  );
  let material = new THREE.MeshStandardMaterial({
    color: color,
    wireframe: isWirefame,
    roughness: roughness,
    metalness: metalness,
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
  color,
  roughness,
  metalness
) => {
  let geometry = new THREE.ConeGeometry(
    radius,
    height,
    radialSegment,
    heightSegment,
    isOpen
  );
  let material = new THREE.MeshStandardMaterial({
    color: color,
    roughness: roughness,
    metalness: metalness,
  });
  let mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

const createSphere = (radius, color, roughness, metalness) => {
  let geometry = new THREE.SphereGeometry(radius);
  let material = new THREE.MeshBasicMaterial({
    color: color,
    roughness: roughness,
    metalness: metalness,
  });
  let mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

//Lighthing ===============================================
const createAmbientLight = (color, intensity) => {
  let light = new THREE.AmbientLight(color, intensity);
  return light;
};

const createPointLight = (color, intensity, distance, decay) => {
  let light = new THREE.PointLight(color, intensity, distance, decay);

  let helper = new THREE.PointLightHelper(light);
  scene.add(helper);

  return light;
};

//Window =======================================

window.onload = () => {
  init();
  render();
};

window.onresize = () => {
  let w = window.innerWidth;
  let h = window.innerHeight;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);
};
