import * as THREE from "./threejs/build/three.module.js";
import { OrbitControls } from "./threejs/examples/jsm/controls/OrbitControls.js";

var scene, camera, renderer;
var control;

const init = () => {
  //Buat scene
  scene = new THREE.Scene();

  //Buat camera
  let fov = 75;
  let w = window.innerWidth; //innerWidh = full width of browser
  let h = window.innerHeight; //innerHeight = full height of browser
  let aspect = w / h;
  let near = 0.1;
  let far = 1000;

  //Perspective Camera
  //-> Camera yang bekerja seperti mata kita
  //-> Object semakin dekat, semakin kecil, dan vice verca
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  //Orthographic Camera
  //-> Object size statis
  //-> Object dekat atau jauh masih memiliki size yang sama
  //camera = new THREE.OrthographicCamera(-10, 5, 5, -5, near, far);
  //(left, right, top, bottom, near, far)

  camera.position.set(2, 0, 0);
  camera.lookAt(0, 0, 0);

  //Buat renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  renderer.setClearColor("lightgrey");
  document.body.appendChild(renderer.domElement);

  //Buat control
  control = new OrbitControls(camera, renderer.domElement);
};

const render = () => {
  requestAnimationFrame(render);

  //render scene & camera
  renderer.render(scene, camera);

  //Update control
  control.update();
};

const createBox = () => {
  //Buat geometry -> Tentuin bentuk Object
  let geometry = new THREE.BoxGeometry(1, 1, 1);

  //Buat material -> material untuk object
  let material = new THREE.MeshBasicMaterial({ color: "red" });

  //Buat Mesh -> Gabungan geometry & material
  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0); //(x-axis, y-axis, z-axis)
  scene.add(mesh);
};

//Skybox creation =================================================

const initSkyboxSide = (path) => {
  let textureLoader = new THREE.TextureLoader();

  let texture = textureLoader.load(path);

  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: texture,
    side: THREE.BackSide,
  });

  return material;
};

const initSkybox = () => {
  let skybox = new THREE.BoxGeometry(100, 100, 100); //Pastikan sizenya besar sehingga semua object bisa dimasukan

  let sidesPath = [
    //masukan semua Directory asset untuk setiap sisi dari skybok
    "./assets/Daylight Box_Pieces/Daylight Box_Right.bmp", //right
    "./assets/Daylight Box_Pieces/Daylight Box_Left.bmp", //left
    "./assets/Daylight Box_Pieces/Daylight Box_Top.bmp", //top
    "./assets/Daylight Box_Pieces/Daylight Box_Bottom.bmp", //bottom
    "./assets/Daylight Box_Pieces/Daylight Box_Front.bmp", //front
    "./assets/Daylight Box_Pieces/Daylight Box_Back.bmp", //back
  ];

  const rtMat = initSkyboxSide(sidesPath[0]);
  const lfMat = initSkyboxSide(sidesPath[1]);
  const upMat = initSkyboxSide(sidesPath[2]);
  const dnMat = initSkyboxSide(sidesPath[3]);
  const ftMat = initSkyboxSide(sidesPath[4]);
  const bkMat = initSkyboxSide(sidesPath[5]);

  let skyboxMesh = new THREE.Mesh(skybox, [
    rtMat,
    lfMat,
    upMat,
    dnMat,
    ftMat,
    bkMat,
  ]);

  scene.add(skyboxMesh);
};

// Model Creation =============================================

import { GLTFLoader } from "./threejs/examples/jsm/loaders/GLTFLoader.js";
//Import library "GTLFLoader.js"
//Pastikan Path benar

const createAmbientLight = () => {
  //Buat lighting terlebih dahulu, karena biasa model terefek oleh light

  //Create Lighting
  let light = new THREE.AmbientLight(0xffffff, 0.5);

  scene.add(light);
};

const createModel = () => {
  let gltfLoader = new GLTFLoader();

  gltfLoader.load("./assets/desert__rocks__stones__pack/scene.gltf", (gltf) => {
    let model = gltf.scene;
    model.scale.set(0.1, 0.1, 0.1); //OPastikan scale kecil, karena biasa model defaultnya besar banget
    model.position.set(3, -5, 3);
    scene.add(model);
  });
};

//Object Creation ====================================================

const createBall = (radius, color) => {
  let geometry = new THREE.SphereGeometry(radius);
  let material = new THREE.MeshBasicMaterial({ color: color });
  let mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

const createObject = () => {
  let ball1 = createBall(1, "red");
  let ball2 = createBall(2, "blue");
  let ball3 = createBall(3, "yellow");
  let ball4 = createBall(4, "green");

  let object = [ball1, ball2, ball3, ball4];

  let pos = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(10, 0, 0),
    new THREE.Vector3(0, 0, 10),
    new THREE.Vector3(0, 10, 0),
  ];

  let idx = 0;

  object.forEach((obj) => {
    obj.position.copy(pos[idx++]);
    scene.add(obj);
  });
};

// =======================================================================

window.onload = () => {
  init();
  createAmbientLight();
  createObject();
  initSkybox();
  createModel();
  render();
};

window.onresize = () => {
  let w = window.innerWidth; //innerWidh = full width of browser
  let h = window.innerHeight; //innerHeight = full height of browser

  //Update Renderer
  renderer.setSize(w, h);

  //Update camera
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};
