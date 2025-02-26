import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm//loaders/GLTFLoader";
import { neonCursor } from "threejs-toys";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
// renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

camera.position.z = 100;
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;


const isConstObjectAdded = true;
if (isConstObjectAdded) {
  let mesh;
  // mesh = new THREE.Mesh(
  //   new THREE.BoxGeometry(50, 50, 50),
  //   new THREE.MeshBasicMaterial({ color: "red" })
  // );
  // scene.add(mesh);

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

//#endregion

function animate() {
  // group.rotateY(-0.001);
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
  renderer.clearDepth();
}
animate();
