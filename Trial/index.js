import * as THREE from "./three.js-r145-compressed/build/three.module.js";
import { OrbitControls } from "./three.js-r145-compressed/examples/jsm/controls/OrbitControls.js";

var scene, camera, renderer;
var controls;

const init = () => {
  scene = new THREE.Scene();

  let fov = 45;
  let w = window.innerWidth;
  let h = window.innerHeight;
  let near = 0.1;
  let far = 1000;

  camera = new THREE.PerspectiveCamera(fov, w / h, near, far);
  camera.position.set(60, 30, 0);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  document.body.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;

  controls = new OrbitControls(camera, renderer.domElement);
  createObjects();
  // createStars();
};

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

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

const createObjects = () => {
  let pointLight = createPointlight();
  pointLight.position.set(100, 100, 100);

  let ambient = new THREE.AmbientLight("#ffffff", 0.2);

  let plane = createPlane(75, 75, "#ffffff");
  plane.rotation.set(-Math.PI / 2, 0, 0);

  let fire = createSphere(1, 10, 10, "#FDCF19", "#DB1D1D");
  fire.material.wireframe = true;
  fire.position.set(0, 3, 0);

  let thruster = createCylinder(1, 1.3, 2, 100, 10, false, "#676B6F", 0.2, 0.8);
  thruster.position.set(0, 4, 0);

  let tail = createCylinder(3, 2, 2, 100, 10, false, "#ffffff", 0.2, 0.5);
  tail.position.set(0, 6, 0);

  let body = createCylinder(3, 3, 6, 100, 10, false, "#ffffff", 0.2, 0.5);
  body.position.set(0, 10, 0);
  // body.rotation.set(Math.PI / 2, 0, 0);

  let head = createCylinder(2, 3, 3, 100, 10, false, "#ffffff", 0.2, 0.5);
  head.position.set(0, 14.5, 0);

  let window = createSphere(1.5, 20, 20, "#004E8A", "#553300");
  window.position.set(2, 11, 0);

  let nose = createCone(2, 4.5, 100, 5, false, "#B01D11", 50);
  nose.position.set(0, 18.25, 0);

  let leg1 = createLeg();
  leg1.position.set(-4, 0, 4);
  leg1.rotation.set(0, (135 * Math.PI) / 180, 0);

  let leg2 = createLeg();
  leg2.position.set(4, 0, 4);
  leg2.rotation.set(0, (225 * Math.PI) / 180, 0);

  let leg3 = createLeg();
  leg3.position.set(4, 0, -4);
  leg3.rotation.set(0, (315 * Math.PI) / 180, 0);

  let leg4 = createLeg();
  leg4.position.set(-4, 0, -4);
  leg4.rotation.set(0, (45 * Math.PI) / 180, 0);

  let spotlight = createSpotLight();
  spotlight.position.set(0, 30, 0);
  spotlight.castShadow = true;

  let objects = [
    // pointLight,
    spotlight,
    plane,
    ambient,
    fire,
    thruster,
    tail,
    body,
    head,
    window,
    nose,
    leg1,
    leg2,
    leg3,
    leg4,
  ];
  objects.forEach((obj) => {
    scene.add(obj);
  });
};

const createSpotLight = () => {
  let spotlight = new THREE.SpotLight("white", 2, 10000, Math.PI / 8);
  let helper = new THREE.SpotLightHelper(spotlight);
  scene.add(helper);
  return spotlight;
};

const createPointlight = () => {
  let light = new THREE.PointLight("#ffffff", 1, 1000, 0);
  let helper = new THREE.PointLightHelper(light);
  scene.add(helper);
  light.castShadow = true;
  return light;
};

const createPlane = (width, height, color) => {
  let loader = new THREE.TextureLoader();
  let texture = loader.load("./asset/moon_texture.jpg");
  let normal = loader.load("./asset/normal_moon_texture.jpg");

  let geometry = new THREE.PlaneGeometry(width, height);
  let material = new THREE.MeshStandardMaterial({
    color: color,
    map: texture,
    normalMap: normal,
  });

  let mesh = new THREE.Mesh(geometry, material);
  mesh.receiveShadow = true;
  return mesh;
};

const createSphere = (radius, widthSeg, heightSeg, color, emissive) => {
  let geometry = new THREE.SphereGeometry(radius, widthSeg, heightSeg);
  let material = new THREE.MeshLambertMaterial({
    color: color,
    emissive: emissive,
  });
  let mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  return mesh;
};

const createCylinder = (
  radTop,
  radBot,
  height,
  radSeg,
  heightSeg,
  openEnded,
  color,
  roughness,
  metalness
) => {
  let geometry = new THREE.CylinderGeometry(
    radTop,
    radBot,
    height,
    radSeg,
    heightSeg,
    openEnded
  );
  let material = new THREE.MeshStandardMaterial({
    color: color,
    roughness: roughness,
    metalness: metalness,
  });
  let mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  return mesh;
};

const createCone = (
  radius,
  height,
  radialSeg,
  heightSeg,
  openEnded,
  color,
  shininess
) => {
  let geometry = new THREE.ConeGeometry(
    radius,
    height,
    radialSeg,
    heightSeg,
    openEnded
  );
  let material = new THREE.MeshPhongMaterial({
    color: color,
    shininess: shininess,
  });
  let mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

const createLeg = () => {
  let bottom = createCylinder(0.8, 0.5, 2, 100, 1, false, "#B01D11", 0.2, 1);
  bottom.position.set(0, 1, 0);

  let body = createCylinder(0.8, 0.8, 6, 100, 1, false, "#B01D11", 0.2, 1);
  body.position.set(0, 5, 0);

  let top = createCone(0.8, 2, 100, 10, false, "#540600", 0.5);
  top.position.set(0, 9, 0);

  let connector = createBox(0.5, 1.5, 4, "#540600", 0.5);
  connector.position.set(0, 6.5, 1.5);
  connector.rotation.set(-Math.PI / 6, 0, 0);

  let group = new THREE.Group();
  group.add(bottom);
  group.add(body);
  group.add(top);
  group.add(connector);

  return group;
};

const createBox = (width, height, depth, color, shininess) => {
  let geometry = new THREE.BoxGeometry(width, height, depth);
  let material = new THREE.MeshPhongMaterial({
    color: color,
    shininess: shininess,
  });

  let mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  return mesh;
};

const createStars = () => {
  let vertices = [
    new THREE.Vector3(3, 10, 8),
    new THREE.Vector3(5, 20, 3),
    new THREE.Vector3(4, 15, -6),
    new THREE.Vector3(4, 15, 4),
  ];
  let geometry = new THREE.BufferGeometry();
  geometry.setFromPoints(vertices);

  let lineGeo = new THREE.BufferGeometry();
  lineGeo.setFromPoints(vertices);
  let linemat = new THREE.LineBasicMaterial();
  let line = new THREE.Line(lineGeo, linemat);

  let material = new THREE.PointsMaterial();
  let mesh = new THREE.Points(geometry, material);

  let group = new THREE.Group();
  group.add(line);
  group.add(mesh);

  scene.add(group);
  group.position.set(0, 9, 9);
  group.scale.set(0.5, 0.5, 0.5);
};
