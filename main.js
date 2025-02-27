import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm//loaders/GLTFLoader";
import { gsap } from "gsap/gsap-core";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100000
);
scene.add(camera);
const myCanvas = document.getElementById("myCanvasId");
// scene.backgroundBlurriness = 0.5;
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: myCanvas,
  alpha: true,
});
renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

camera.position.z = 100;
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;


const isConstObjectAdded = true;
if (isConstObjectAdded) {
  const changeBgImage = () => {
    let bgImage = document.getElementById('bgImage')
    const allImage = [
      'dist/assets/cod1.1bffb0ed.jpg',
      'dist/assets/cod2.c4cc0be0.jpg',
      'dist/assets/cod3.6c699fde.jpg',
      'cod4.png',
      'cod5.jpg',
      'dune.jpg',
      'marvel.jpg',
      'onimusha.jpg',
      'elden.jpg',
    ]
    setInterval(() => {
      const random = Math.floor(Math.random() * allImage.length);
      if(bgImage) bgImage.src = allImage[random]
    }, 3000);
  }
  changeBgImage()

  const ambLight = new THREE.AmbientLight('white', 1);
  // scene.add(ambLight);

  const dirKight = new THREE.DirectionalLight('white', 1)
  scene.add(dirKight);
  let mesh;
  new GLTFLoader().load('assets/gun1.glb', (x) => {
    debugger;
    mesh = x.scene.children[0];
    mesh.scale.set(8, 8, 8)
    dirKight.target = mesh;
    scene.add(mesh);
  })


  const sectionIn = () => {
    let curSection;
    
    const allSections = document.querySelectorAll("section");
    allSections.forEach((element) => {
      const box = element.getBoundingClientRect();
      if (box.top < window.innerHeight / 3) {
        curSection = element;
      }
    });
    console.log("curSection", curSection.className);
    return curSection;
  };

  const isPage1SectionActive = (curSectionClass) => {
    return curSectionClass.className === "page1";
  };
  const isPage2SectionActive = (curSectionClass) => {
    return curSectionClass.className === "page2";
  };
  const isPage3SectionActive = (curSectionClass) => {
    return curSectionClass.className === "page3";
  };

  window.addEventListener("scroll", () => {
    const curSectionClass = sectionIn();
    if (mesh) {
      if (isPage1SectionActive(curSectionClass)) {
        mesh.material.color.set("blue");
      } else if (isPage2SectionActive(curSectionClass)) {
        mesh.material.color.set("yellow");
      } else if (isPage3SectionActive(curSectionClass)) {
        mesh.material.color.set("green");
      }
    }
  });
}

function animate() {
  // group.rotateY(-0.001);
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
  renderer.clearDepth();
}
animate();
