import * as THREE from "../threejs/build/three.module.js";
import { OrbitControls } from "../threejs/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "../threejs/examples/jsm/loaders/GLTFLoader.js";

var scene, camera, renderer, control;
var model;
var speed = 0.05;
var rotate = 0.005;

var keyPressed = {
  w: false,
  a: false,
  d: false,
  space: false,
  s: false,
};

const init = () => {
  scene = new THREE.Scene();

  var fov = 75;
  var w = window.innerWidth;
  var h = window.innerHeight;
  var aspect = w / h;
  var near = 0.001;
  var far = 1000;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 10);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGL1Renderer({ antialias: true });
  renderer.setSize(w, h);
  renderer.setClearColor("grey");

  document.body.appendChild(renderer.domElement);

  control = new OrbitControls(camera, renderer.domElement);
};

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  animate();
  control.update();
};

window.onload = () => {
  init();
  //load3DModel("./airplane/scene.gltf");
  createObject();
  render();
};

window.onresize = () => {
  var w = window.innerWidth;
  var h = window.innerHeight;
  var aspect = w / h;

  camera.aspect = aspect;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);
};

/*
const load3DModel = (url) => {
  let object = null;

  let loader = new GLTFLoader();
  loader.load(url, (gltf) => {
    object = gltf.scene;

    object.position.set(0, 0, 0);
    object.scale.set(2, 2, 2);
    let light = new THREE.AmbientLight("#FFFFFF", 2.5);
    scene.add(object);
    scene.add(light);
  });
};
*/

const load3DModel = (url) => {
  return new Promise((resolve, reject) => {
    let loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => resolve(gltf.scene),
      undefined,
      (error) => reject(error)
    );
  });
};

const createObject = async () => {
  let light = new THREE.AmbientLight("#FFFFFF", 2.5);
  scene.add(light);

  try {
    model = await load3DModel("./airplane/scene.gltf");
    model.position.set(0, 0, 0);
    // console.log(model.position);
    scene.add(model);
  } catch (error) {
    console.error("Error loading model, ", error);
  }
};

const animate = () => {
  if (keyPressed.w) {
    moveForward();
  }

  if (keyPressed.a) {
    rotateLeft();
  }

  if (keyPressed.d) {
    rotateRight();
  }

  if (keyPressed.space) {
    rotateUp();
  }

  if (keyPressed.s) {
    rotateDown();
  }
};

// window.addEventListener("keydown", (event) => {
//   if (event.key === "w" || event.key === "W") {
//     moveForward();
//   } else if (event.key === "a" || event.key === "A") {
//     rotateLeft();
//   } else if (event.key === "d" || event.key === "D") {
//     rotateRight();
//   }
// });

window.addEventListener("keydown", (event) => {
  if (event.key === "w" || event.key === "W") {
    keyPressed.w = true;
  } else if (event.key === "a" || event.key === "A") {
    keyPressed.a = true;
  } else if (event.key === "d" || event.key === "D") {
    keyPressed.d = true;
  } else if (event.key === " " || event.key === "Spacebar") {
    keyPressed.space = true;
  } else if (event.key === "s" || event.key === "S") {
    keyPressed.s = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === "w" || event.key === "W") {
    keyPressed.w = false;
  } else if (event.key === "a" || event.key === "A") {
    keyPressed.a = false;
  } else if (event.key === "d" || event.key === "D") {
    keyPressed.d = false;
  } else if (event.key === " " || event.key === "Spacebar") {
    keyPressed.space = false;
  } else if (event.key === "s" || event.key === "S") {
    keyPressed.s = false;
  }
});

const moveForward = () => {
  const direction = new THREE.Vector3(-1, 0, 0); // Arah default "maju"
  direction.applyQuaternion(model.quaternion); // Sesuaikan arah dengan orientasi model
  model.position.add(direction.multiplyScalar(speed));
};

const rotateLeft = () => {
  model.rotation.y += rotate;
};

const rotateRight = () => {
  model.rotation.y -= rotate;
};

const rotateUp = () => {
  model.rotation.z -= rotate;
};

const rotateDown = () => {
  model.rotation.z += rotate;
};
