import { Vector3, Object3D } from 'three';
import { Controller } from '@Engine/CoreObject/Controller';
import { PerspectiveCameraActor } from '@Engine/CoreObject/PerspectiveCameraActor';
import { PointerLockControls } from '@Engine/CoreObject/PointerLockControls';

/**
 * PlayerControllers are used by human players to control Pawns.
 *
 * ControlRotation (accessed via GetControlRotation()), determines the aiming orientation of the controlled Pawn.
 *
 * In networked games, PlayerControllers exist on the server for every player-controlled pawn, and also on the
 * controlling client's machine. They do NOT exist on a client's machine for pawns controlled by remote players
 * elsewhere on the network.
 */
export class PlayerController extends Controller {
  
  // @TODO move this class into here
  private pointerLockControls: PointerLockControls;
  
  constructor(camera: PerspectiveCameraActor) {
    super();
    // @TODO Not always perspective, make dynamic
    this.pointerLockControls = new PointerLockControls(camera.transport());
  }
  
  public translateX(distance: number): void {
    this.pointerLockControls.getObject().translateX(distance);
  }
  
  public translateY(distance: number): void {
    this.pointerLockControls.getObject().translateY(distance);
  }
  
  public translateZ(distance: number): void {
    this.pointerLockControls.getObject().translateZ(distance);
  }
  
  public translate(vec: Vector3): void {
    this.pointerLockControls.getObject().translateX(vec.x);
    this.pointerLockControls.getObject().translateY(vec.y);
    this.pointerLockControls.getObject().translateZ(vec.z);
  }
  
  public getPosition(): Vector3 {
    return this.pointerLockControls.getObject().position;
  }
  
  public setPosition(position: Vector3): void {
    this.pointerLockControls.getObject().position = position;
  }
  
  public enable(): void {
    this.pointerLockControls.enabled = true;
  }
  
  public disable(): void {
    this.pointerLockControls.enabled = false;
  }
  
  public transport(): Object3D {
    return this.pointerLockControls.getObject();
  }
}
