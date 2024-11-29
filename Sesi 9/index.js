import * as THREE from "../threejs/build/three.module.js";
import { OrbitControls } from "../threejs/examples/jsm/controls/OrbitControls.js";

var scene, camera, renderer, control;
var box1, box2, box3, box4, group;
var posZbox1, scaleYbox2, rotateXbox3, rotateYbox4;

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

//Animation
const animate = () => {
  if (box1.position.z <= -4 || box1.position.z >= 4) {
    posZbox1 *= -1;
  }
  box1.position.z += posZbox1;

  if (box2.scale.y <= 0.5 || box2.scale.y >= 4) {
    scaleYbox2 *= -1;
  }
  box2.scale.y += scaleYbox2;

  box3.rotation.x += rotateXbox3;

  box4.rotation.y += rotateYbox4;
  group.rotation.y += 0.01;
};

//Object Creation
const createObject = () => {
  box1 = createBox(-5, 0, 0);
  box2 = createBox(0, 0, 0);
  box3 = createBox(5, 0, 0);

  posZbox1 = 0;
  scaleYbox2 = 0;
  rotateXbox3 = 0;

  //Materi tambahan
  rotateYbox4 = 0.05;
  box4 = createBox(14, 0, 0);
  group = new THREE.Group();
  group.add(box4);

  let objects = [box1, box2, box3, group];

  objects.forEach((obj) => {
    scene.add(obj);
  });
};

const createBox = (posX, posY, posZ) => {
  let geometry = new THREE.BoxGeometry(2, 2, 2);
  //geometry.translate(0, 1, 0);
  let material = new THREE.MeshBasicMaterial({ color: "red" });
  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(posX, posY, posZ);
  return mesh;
};

//Raycsting

window.onmousemove = (event) => {
  const mouse = new THREE.Vector2();

  //Nomalization

  // 0 / 1000 * 2 - 1 = 0 -1 = -1
  // 1000 / 1000 * 2 -1 = 2 - 1 = 2
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;

  // -0 / 600 * 2 + 1 = 1
  // -600 / 600 * 2 + 1 = -2 + 1 = -1
  mouse.y = (-event.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects([box1, box2, box3, box4]);

  //rest color
  box1.material.color.set("red");
  box2.material.color.set("red");
  box3.material.color.set("red");
  box4.material.color.set("red");

  if (intersects.length > 0) {
    intersects[0].object.material.color.set(0xffffff);
  }
};

window.onmousedown = (event) => {
  console.log("click");
  const mouse = new THREE.Vector2();

  //Nomalization
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = (-event.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects([box1, box2, box3, box4]);

  if (intersects.length > 0) {
    if (intersects[0].object === box3) {
      if (rotateXbox3 == 0) {
        rotateXbox3 = 0.05;
      } else {
        rotateXbox3 = 0;
      }
    }

    if (intersects[0].object == box1) {
      if (posZbox1 == 0) {
        posZbox1 = 0.05;
      } else {
        posZbox1 = 0;
      }
    }

    if (intersects[0].object == box2) {
      if (scaleYbox2 == 0) {
        scaleYbox2 = 0.05;
      } else {
        scaleYbox2 = 0;
      }
    }

    if (intersects[0].object == box4) {
      if (rotateYbox4 == 0.05) {
        rotateYbox4 = 1;
      } else {
        rotateYbox4 = 0.05;
      }
    }
  }
};
