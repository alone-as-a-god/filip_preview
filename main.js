import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setClearColor(new THREE.Color(0x4F759B));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);



const loader = new GLTFLoader();
let object = new THREE.Object3D();
loader.load(
    "model/scene.gltf", // Path to your GLTF file
    function (gltf) {
        object.add(gltf.scene);
        scene.add(object);

        const box = new THREE.Box3().setFromObject(object);
        const center = new THREE.Vector3();
        box.getCenter(center);

        gltf.scene.position.x -= center.x +2.2;

        gltf.scene.scale.set(2,2,2)

    },
    undefined,
    function (error) {
        console.error(error);
    }
);

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

camera.position.z = 5;
camera.position.y = 5;
camera.position.x = 5;

camera.lookAt(new THREE.Vector3(0, 0, 0));

function animate() {
    requestAnimationFrame(animate);

    if(object) {
       object.rotation.y += 0.005;
    }

    renderer.render(scene, camera);

}

animate();