import { CameraActor } from '@core/LifeCoreObject/CameraActor';
import { PerspectiveCamera } from 'three';

export class PerspectiveCameraActor extends CameraActor {
  
  private camera: PerspectiveCamera;
  
  constructor(private fieldOfView: number, private aspect: number, near: number, far: number) {
    super(near, far);
    this.camera = new PerspectiveCamera(this.fieldOfView, this.aspect, near, far);
  }
  
  public updateAspect(val: number): void {
    this.camera.aspect = val;
    this.updateMatrix();
  }
  
  private updateMatrix(): void {
    this.camera.updateProjectionMatrix();
  }
  
}
