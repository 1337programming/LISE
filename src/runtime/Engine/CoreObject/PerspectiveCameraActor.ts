import { PerspectiveCamera, Camera } from 'three';
import { CameraActor } from '@Engine/CoreObject/CameraActor';

export class PerspectiveCameraActor extends CameraActor {
  
  private perspectiveCameraDelegate: PerspectiveCamera;
  
  constructor(private fieldOfView: number, private aspect: number, near: number, far: number) {
    super(near, far);
    this.perspectiveCameraDelegate = new PerspectiveCamera(this.fieldOfView, this.aspect, near, far);
  }
  
  public updateAspect(val: number): void {
    this.perspectiveCameraDelegate.aspect = val;
    this.updateMatrix();
  }
  
  public transport(): Camera {
    return this.perspectiveCameraDelegate;
  }
  
  private updateMatrix(): void {
    this.perspectiveCameraDelegate.updateProjectionMatrix();
  }
  
}
