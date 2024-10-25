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
  camera.position.set(4, 4, 4);
  camera.lookAt(0, 0, 0);

  //   let box = createBox();
  //   box.position.set(0, 1, 0);

  let plane = createPlane();
  plane.rotation.set(-Math.PI / 2, 0, 0);
  scene.add(plane);

  //   let light = new THREE.AmbientLight("white", 0.5);
  //   scene.add(light);

  // directional
  //   let directional = new THREE.DirectionalLight("yellow", 1);
  //   directional.position.set(10, 5, 0);
  //   scene.add(directional);
  //   let helper = new THREE.DirectionalLightHelper(directional);

  //   let pointlight = new THREE.PointLight(0xff0000, 1);
  //   pointlight.position.set(3, 5, 0);
  //   let pointehelper = new THREE.PointLightHelper(pointlight);
  //   scene.add(pointlight);
  //   scene.add(pointehelper);
  let geometry = new THREE.BoxGeometry(1, 1, 1);
  let basic = new THREE.MeshLambertMaterial({ color: "yellow" });
  let box1 = new THREE.Mesh(geometry, basic);
  box1.position.set(0, 1, 0);
  //   box1.castShadow = true;
  console.log("Box 1");

  let lambert = new THREE.MeshLambertMaterial({ color: "red" });
  let box2 = new THREE.Mesh(geometry, lambert);
  box2.position.set(2, 1, 0);
  console.log("Box 2");

  let phong = new THREE.MeshPhongMaterial({
    color: "blue",
    shininess: 100,
    // specular: 0x888888,
  });
  let box3 = new THREE.Mesh(geometry, phong);
  box3.position.set(4, 1, 0);
  console.log("Box 3");

  let boxes = [box1, box2, box3];

  boxes.forEach((box) => {
    box.castShadow = true;
    scene.add(box);
  });

  let spotlight = new THREE.SpotLight("yellow", 1, 10, Math.PI / 8);
  spotlight.position.set(4, 5, 0); // Initial position
  spotlight.target = box3; // Set the target to box2
  spotlight.castShadow = true;
  scene.add(spotlight); // Add spotlight to the scene

  let helper = new THREE.SpotLightHelper(spotlight);
  scene.add(helper);
  helper.update();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.setClearColor(0xdfdfdf);

  controls = new OrbitControls(camera, renderer.domElement);
};

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

window.onload = () => {
  init();
  createBox();
  render();
};

// const createLight = () => {
//   //color, intensity
//   let light = new THREE.AmbientLight(0xfe2020, 1);
//   return light;
// };

const createBox = () => {};

const createPlane = () => {
  let geometry = new THREE.PlaneGeometry(10, 10);
  let material = new THREE.MeshLambertMaterial({
    color: "grey",
    side: THREE.DoubleSide,
  });
  let mesh = new THREE.Mesh(geometry, material);
  mesh.receiveShadow = true;
  return mesh;
};
