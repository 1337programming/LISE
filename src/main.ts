import './styles/main.scss';

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Fog,
  HemisphereLight,
  Raycaster,
  PlaneGeometry,
  Vector3,
  Color,
  Face3,
  VertexColors,
  MeshPhongMaterial,
  FlatShading,
  Intersection
} from 'three';
import { PointerLockControls } from './runtime/actor/controls/PointerLockControls';

// Mock Game
function main() {
  
}

main();

let camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer;
let geometry: PlaneGeometry, material, mesh;
let controls: PointerLockControls;

let objects: Mesh[] = [];

let raycaster: Raycaster;

let blocker: HTMLElement = document.getElementById('blocker');
let instructions: HTMLElement = document.getElementById('instructions');
let havePointerLock: boolean = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

if (havePointerLock) {
  let element: HTMLElement = document.body;
  
  let pointerlockchange = (event) => {
    if (document.pointerLockElement === element) {
      
      controlsEnabled = true;
      controls.enabled = true;
      
      blocker.style.display = 'none';
      
    } else {
      
      controls.enabled = false;
      
      blocker.style.display = '-webkit-box';
      blocker.style.display = '-moz-box';
      blocker.style.display = 'box';
      
      instructions.style.display = '';
      
    }
  };
  
  let pointerlockerror = function (event) {
    
    instructions.style.display = '';
    
  };
  
  // Hook pointer lock state change events
  document.addEventListener('pointerlockchange', pointerlockchange, false);
  document.addEventListener('mozpointerlockchange', pointerlockchange, false);
  document.addEventListener('webkitpointerlockchange', pointerlockchange, false);
  
  document.addEventListener('pointerlockerror', pointerlockerror, false);
  document.addEventListener('mozpointerlockerror', pointerlockerror, false);
  document.addEventListener('webkitpointerlockerror', pointerlockerror, false);
  
  instructions.addEventListener('click', function (event) {
    
    instructions.style.display = 'none';
    
    // Ask the browser to lock the pointer
    element.requestPointerLock = element.requestPointerLock;
    element.requestPointerLock();
    
  }, false);
} else {
  instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
}

init();
animate();

let controlsEnabled: boolean = false;

let moveForward: boolean = false;
let moveBackward: boolean = false;
let moveLeft: boolean = false;
let moveRight: boolean = false;
let canJump: boolean = false;

let prevTime: number = performance.now();
let velocity = new Vector3();

function init(): void {
  
  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  
  scene = new Scene();
  scene.fog = new Fog(0xffffff, 0, 750);
  
  let light: HemisphereLight = new HemisphereLight(0xeeeeff, 0x777788, 0.75);
  light.position.set(0.5, 1, 0.75);
  scene.add(light);
  
  controls = new PointerLockControls(camera);
  scene.add(controls.getObject());
  
  let onKeyDown = (event: KeyboardEvent) => {
    
    switch (event.keyCode) {
      
      case 38: // up
      case 87: // w
        moveForward = true;
        break;
      
      case 37: // left
      case 65: // a
        moveLeft = true;
        break;
      
      case 40: // down
      case 83: // s
        moveBackward = true;
        break;
      
      case 39: // right
      case 68: // d
        moveRight = true;
        break;
      
      case 32: // space
        if (canJump === true) velocity.y += 350;
        canJump = false;
        break;
      
    }
    
  };
  
  let onKeyUp = (event: KeyboardEvent) => {
    
    switch (event.keyCode) {
      
      case 38: // up
      case 87: // w
        moveForward = false;
        break;
      
      case 37: // left
      case 65: // a
        moveLeft = false;
        break;
      
      case 40: // down
      case 83: // s
        moveBackward = false;
        break;
      
      case 39: // right
      case 68: // d
        moveRight = false;
        break;
      
    }
    
  };
  
  document.addEventListener('keydown', onKeyDown, false);
  document.addEventListener('keyup', onKeyUp, false);
  
  raycaster = new Raycaster(new Vector3(), new Vector3(0, -1, 0), 0, 10);
  
  // floor
  
  geometry = new PlaneGeometry(2000, 2000, 100, 100);
  geometry.rotateX(-Math.PI / 2);
  
  for (let i: number = 0, l = geometry.vertices.length; i < l; i++) {
    
    let vertex: Vector3 = geometry.vertices[i];
    vertex.x += Math.random() * 20 - 10;
    vertex.y += Math.random() * 2;
    vertex.z += Math.random() * 20 - 10;
    
  }
  
  for (let i: number = 0, l = geometry.faces.length; i < l; i++) {
    
    let face: Face3 = geometry.faces[i];
    face.vertexColors[0] = new Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
    face.vertexColors[1] = new Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
    face.vertexColors[2] = new Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
    
  }
  
  material = new MeshBasicMaterial({vertexColors: VertexColors});
  
  mesh = new Mesh(geometry, material);
  scene.add(mesh);
  
  // objects
  
  geometry = new BoxGeometry(20, 20, 20);
  
  for (let i: number = 0, l = geometry.faces.length; i < l; i++) {
    
    let face: Face3 = geometry.faces[i];
    face.vertexColors[0] = new Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
    face.vertexColors[1] = new Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
    face.vertexColors[2] = new Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
    
  }
  
  for (let i: number = 0; i < 500; i++) {
    
    material = new MeshPhongMaterial({specular: 0xffffff, shading: FlatShading, vertexColors: VertexColors});
    
    let mesh: Mesh = new Mesh(geometry, material);
    mesh.position.x = Math.floor(Math.random() * 20 - 10) * 20;
    mesh.position.y = Math.floor(Math.random() * 20) * 20 + 10;
    mesh.position.z = Math.floor(Math.random() * 20 - 10) * 20;
    scene.add(mesh);
    
    material.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
    
    objects.push(mesh);
    
  }
  
  //
  
  renderer = new WebGLRenderer();
  renderer.setClearColor(0xffffff);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  //
  
  window.addEventListener('resize', onWindowResize, false);
  
}

function onWindowResize(): void {
  
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  
}

function animate(): void {
  
  requestAnimationFrame(animate);
  
  if (controlsEnabled) {
    raycaster.ray.origin.copy(controls.getObject().position);
    raycaster.ray.origin.y -= 10;
    
    let intersections: Intersection[] = raycaster.intersectObjects(objects);
    
    let isOnObject: boolean = intersections.length > 0;
    
    let time: number = performance.now();
    let delta: number = ( time - prevTime ) / 1000;
    
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;
    
    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
    
    if (moveForward) velocity.z -= 400.0 * delta;
    if (moveBackward) velocity.z += 400.0 * delta;
    
    if (moveLeft) velocity.x -= 400.0 * delta;
    if (moveRight) velocity.x += 400.0 * delta;
    
    if (isOnObject === true) {
      velocity.y = Math.max(0, velocity.y);
      
      canJump = true;
    }
    
    controls.getObject().translateX(velocity.x * delta);
    controls.getObject().translateY(velocity.y * delta);
    controls.getObject().translateZ(velocity.z * delta);
    
    if (controls.getObject().position.y < 10) {
      
      velocity.y = 0;
      controls.getObject().position.y = 10;
      
      canJump = true;
      
    }
    
    prevTime = time;
    
  }
  
  renderer.render(scene, camera);
  
}

/**
 * LOADING STATE
 * 1. Check if Browser Supports Pointerlock
 * 2. Load HTML
 * 3. Add Pointerlock Events
 *
 * IDLE STATE
 * 4. Menu Screen
 * 5. Init World:
 *    Create Camera, Scene, and lights
 *    Load Key Events
 *    Set RayCaster
 *    Set Geometry
 *    Load Boxes
 *    Init Renderer
 *    Append renderer domElement
 *    Add On Window Resize Event
 * 6. Animate (Game Loop)
 *    requestAnimationFrame load animate to start loop
 *    a. Check if controls enabled
 *    b. Character Events
 *    c. Track time
 *    d. Render Scene and Camera
 *
 */

