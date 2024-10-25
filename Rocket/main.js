import * as THREE from "../threejs/build/three.module.js";
import { OrbitControls } from "../threejs/examples/jsm/controls/OrbitControls.js";
import { TextureLoader } from "../threejs/build/three.module.js";

var scene, camera, renderer, control;

const init = () => {
  scene = new THREE.Scene();

  let fov = 75;
  let w = window.innerWidth;
  let h = window.innerHeight;
  let near = 0.1;
  let far = 1000;
  camera = new THREE.PerspectiveCamera(fov, w / h, near, far);
  camera.position.set(0, 20, 30);
  camera.lookAt(0, 10, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  renderer.setClearColor("#000000");
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  control = new OrbitControls(camera, renderer.domElement);

  createObject();
};

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  control.update();
};

//Object ==================================

const createObject = () => {
  let ambientLight = createAmbient();

  let pointLight = createPoint();
  pointLight.position.set(100, 100, 100);
  pointLight.castShadow = true;

  let SpotLight = createSpot();
  SpotLight.position.set(20, 50, 0);
  SpotLight.castShadow = true;

  let directionalLight = createDirectional();
  // directionalLight.position.set(0, 20, 0);
  directionalLight.castShadow = true;

  let surface = createPlane(75, 75, "#ffffff");
  surface.position.set(0, 0, 0);
  surface.rotation.set(Math.PI / 2, 0, 0);
  surface.receiveShadow = true;

  let body = createCylinder(3, 3, 6, 15, 10, true, "#ffffff", 0.2, 0.5);
  body.position.set(0, 10, 0);
  body.castShadow = true;

  let tail = createCylinder(3, 2, 2, 15, 10, false, "#fffffff", 0.2, 0.5);
  tail.position.set(0, 6, 0);
  tail.castShadow = true;

  let head = createCylinder(2, 3, 3, 15, 10, true, "#ffffff", 0.2, 0.5);
  head.position.set(0, 14.5, 0);
  head.castShadow = true;

  let nose = createCone(2, 4.5, 15, 5, true, "#ff0000", 50);
  nose.position.set(0, 18.25, 0);
  nose.castShadow = true;

  let thruster = createCylinder(1, 1.3, 2, 15, 10, false, "#ffffff", 0.2, 0.8);
  thruster.position.set(0, 4, 0);
  thruster.castShadow = true;

  let fire = createSphere(0.7, 10, 10, "#ff0000", "#ff0000", 0.8, true);
  fire.position.set(0, 3, 0);

  let window1 = createSphere(1.5, 10, 10, "#004e8a", "#ffee00", 0.2, false);
  window1.position.set(0, 11, 2);
  window1.castShadow = true;

  let window2 = createSphere(1.5, 10, 10, "#004e8a", "#ffee00", 0.2, false);
  window2.position.set(0, 11, -2);
  window2.castShadow = true;

  let window3 = createSphere(1.5, 10, 10, "#004e8a", "#ffee00", 0.2, false);
  window3.position.set(2, 11, 0);
  window3.castShadow = true;

  let window4 = createSphere(1.5, 10, 10, "#004e8a", "#ffee00", 0.2, false);
  window4.position.set(-2, 11, 0);
  window4.castShadow = true;

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

  let objects = [
    //ambientLight,
    //pointLight,
    SpotLight,
    //directionalLight,
    surface,
    body,
    tail,
    head,
    nose,
    thruster,
    fire,
    window1,
    window2,
    window3,
    window4,
    leg1,
    leg2,
    leg3,
    leg4,
  ];

  objects.forEach((obj) => {
    scene.add(obj);
  });
};

const createLeg = () => {
  let group = new THREE.Group();

  let connector = createBox(0.5, 1.5, 4, "#ff0000", 0.5);
  connector.position.set(0, 6.5, 1.5);
  connector.rotation.set(-Math.PI / 6, 0, 0);
  connector.castShadow = true;

  let legBody = createCylinder(0.8, 0.8, 6, 10, 10, false, "#ff0000", 0.2, 0.5);
  legBody.position.set(0, 5, 0);
  legBody.castShadow = true;

  let legBottom = createCylinder(
    0.8,
    0.5,
    2,
    10,
    10,
    false,
    "#ff0000",
    0.2,
    0.5
  );
  legBottom.position.set(0, 1, 0);
  legBottom.castShadow = true;

  let legHead = createCone(0.8, 2, 10, 10, false, "#ff0000", 0.5);
  legHead.position.set(0, 9, 0);
  legHead.castShadow = true;

  let objects = [connector, legBody, legBottom, legHead];

  objects.forEach((obj) => {
    group.add(obj);
  });
  return group;
};

const createPlane = (width, height, color) => {
  let geometry = new THREE.PlaneGeometry(width, height);
  let texture = new TextureLoader().load("./asset/moonTexure.jpg");
  let material = new THREE.MeshLambertMaterial({
    color: color,
    side: THREE.DoubleSide,
    map: texture,
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
  roughness,
  metalness
) => {
  let geometry = new THREE.CylinderGeometry(
    radiusTop,
    radiusBot,
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

const createCone = (
  radius,
  height,
  radialSegment,
  heightSegment,
  isOpen,
  color,
  shininess
) => {
  let geometry = new THREE.ConeGeometry(
    radius,
    height,
    radialSegment,
    heightSegment,
    isOpen
  );
  let material = new THREE.MeshPhongMaterial({
    color: color,
    shininess: shininess,
  });
  let mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

const createSphere = (
  radius,
  widthSegment,
  heightSegment,
  color,
  emissive,
  emissiveIntensity,
  isWirefame
) => {
  let geometry = new THREE.SphereGeometry(radius, widthSegment, heightSegment);
  let material = new THREE.MeshStandardMaterial({
    color: color,
    emissive: emissive,
    emissiveIntensity: emissiveIntensity,
    wireframe: isWirefame,
  });
  let mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

const createBox = (width, height, depth, color, shininess) => {
  let geometry = new THREE.BoxGeometry(width, height, depth);
  let material = new THREE.MeshPhongMaterial({
    color: color,
    shininess: shininess,
  });
  let mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

//Lighting =========================

const createAmbient = () => {
  return new THREE.AmbientLight(0xffffff, 0.2);
};

const createPoint = () => {
  let light = new THREE.PointLight("yellow", 1.5, 1000, 0.4);
  let helper = new THREE.PointLightHelper(light);
  scene.add(helper);
  return light;
};

const createSpot = () => {
  let light = new THREE.SpotLight(0xffffff, 4, 100, Math.PI / 8, 0.7, 100);
  let helper = new THREE.SpotLightHelper(light);
  scene.add(helper);
  return light;
};

const createDirectional = () => {
  let light = new THREE.DirectionalLight("yellow", 0.7);
  let helper = new THREE.DirectionalLightHelper(light);
  scene.add(helper);
  return light;
};

//Window ==============================

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
