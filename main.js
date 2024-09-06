import * as THREE from 'three';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'OrbitControls';

const scene = new THREE.Scene();
scene.background = new THREE.Color(16491380);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 16770484 } );
const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

camera.position.set(0, 3, 7);

const floor = new THREE.Mesh(
	new THREE.PlaneGeometry(10,10),
	new THREE.MeshStandardMaterial({
		color: '#444444',
		metalness: 0,
		roughness: 0.5,
	})
);

// floor.receiveShadow = true;
// floor.rotation.x = -Math.PI * 0.5;
// scene.add(floor);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemiLight.position.set(0, 50, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
dirLight.position.set(-8, 12, 8);
dirLight.castShadow = true;
dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
scene.add(dirLight);

const loader = new GLTFLoader();

loader.load(
	'lily.glb',
	(gltf) => {
		console.log('success');
		console.log(gltf);
		gltf.scene.scale.set(.02, .02, .02);
		scene.add(gltf.scene);
	}
	// (progress) => {
	// 	console.log('progress');
	// 	console.log(progress);
	// },
	// (error) => {
	// 	console.log('error');
	// 	console.log(error);
	// },
);

//OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
            controls.autoRotate = true;
            controls.autoRotateSpeed = 5;
            controls.enableDamping = true;


function animate() {

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	controls.update();
	renderer.render( scene, camera );

}