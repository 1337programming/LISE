import { Pawn } from './Pawn';
import { PlayerController } from '@core/LifeCoreObject/PlayerController';
import { PerspectiveCameraActor } from '@core/LifeCoreObject/PerspectiveCameraActor';
import { HtmlWindow } from '../../runtime/DOM/HtmlWindow';
import { Vector3, Raycaster, Intersection, Mesh } from 'three';
import { World } from '@core/LifeCoreObject/World';
import Camera = THREE.Camera;
import PerspectiveCamera = THREE.PerspectiveCamera;
import Object3D = THREE.Object3D;

/**
 * Characters are Pawns that have a mesh, collision, and built-in movement logic. They are responsible
 * for all physical interaction between the player or AI and the world, and also implement basic networking and input
 * models. They are designed for a vertically-oriented player representation that can walk, jump, fly, and swim through
 * the world using CharacterMovementComponent.
 * @module LifeCoreObject
 */
export class Character extends Pawn {
  
  private controller: PlayerController;
  private cameraActor: PerspectiveCameraActor; // @TODO can be Orthogonal, switch to base
  private keyMap: CharacterKeyMap;
  private moveForward: boolean;
  private moveBackward: boolean;
  private moveLeft: boolean;
  private moveRight: boolean;
  private canJump: boolean;
  private velocity: Vector3;
  
  // @TODO review default values
  constructor(private worldRef: World, fieldOfView: number = 75, aspect: number = HtmlWindow.getScreenAspect(), near: number = 1, far: number = 1000) {
    super();
    this.velocity = new Vector3(0, 0, 0);
    this.cameraActor = new PerspectiveCameraActor(fieldOfView, aspect, near, far);
    this.controller = new PlayerController(this.cameraActor);
    this.keyMap = {
      onKeyDown: {
        'w': () => this.moveForward = true,
        's': () => this.moveBackward = true,
        'a': () => this.moveLeft = true,
        'd': () => this.moveRight = true,
        ' ': () => {
          if (this.canJump === true) {
            this.velocity.y += 350;
          }
          this.canJump = false;
        }
      },
      onKeyUp: {
        'w': () => this.moveForward = false,
        's': () => this.moveBackward = false,
        'a': () => this.moveLeft = false,
        'd': () => this.moveRight = false,
      }
    }
  }
  
  public updateCamera(aspect: number): void {
    this.cameraActor.updateAspect(aspect);
  }
  
  public keyUp(event: KeyboardEvent): void {
    if (this.keyMap.onKeyUp[event.key]) {
      this.keyMap.onKeyUp[event.key]();
    }
  }
  
  public keyDown(event: KeyboardEvent): void {
    if (this.keyMap.onKeyDown[event.key]) {
      this.keyMap.onKeyDown[event.key]();
    }
  }
  
  public getPosition(): Vector3 {
    return this.controller.getPosition();
  }
  
  // @TOOD review animate pattern as we don't want to include intersection checks for all frames
  public animate(raycaster: Raycaster, objects: Mesh[]): number {
    raycaster.ray.origin.copy(this.controller.getPosition());
    raycaster.ray.origin.y -= 10;
    
    let intersections: Intersection[] = raycaster.intersectObjects(objects);
    let isOnObject: boolean = intersections.length > 0;
    
    let time: number = performance.now();
    let delta: number = (time - this.worldRef.frameTime) / 1000;
    
    this.velocity.x -= this.velocity.x * 10.0 * delta;
    this.velocity.z -= this.velocity.z * 10.0 * delta;
    
    this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
    
    if (this.moveForward) this.velocity.z -= 400.0 * delta;
    if (this.moveBackward) this.velocity.z += 400.0 * delta;
    
    if (this.moveLeft) this.velocity.x -= 400.0 * delta;
    if (this.moveRight) this.velocity.x += 400.0 * delta;
    
    if (isOnObject === true) {
      this.velocity.y = Math.max(0, this.velocity.y);
      
      this.canJump = true;
    }
    
    this.controller.translateX(this.velocity.x * delta);
    this.controller.translateY(this.velocity.y * delta);
    this.controller.translateZ(this.velocity.z * delta);
    
    if (this.controller.getPosition().y < 10) {
      this.velocity.y = 0;
      this.controller.getPosition().y = 10;
      this.canJump = true;
    }
    return time;
  }
  
  public getCamera(): Camera {
    return this.cameraActor.transport();
  }
  
  public enableControls(): void {
    this.controller.enable();
  }
  
  public disableControls(): void {
    this.controller.disable();
  }
  
  public transportController(): Object3D {
    return this.controller.transport();
  }
}

interface CharacterKeyMap {
  onKeyUp: {
    [name: string]: () => void;
  },
  onKeyDown: {
    [name: string]: () => void;
  }
}
