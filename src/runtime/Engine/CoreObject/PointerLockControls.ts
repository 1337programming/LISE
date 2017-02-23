import { Camera, Object3D, Vector3, Euler } from 'three';
import { Controller } from '@Engine/CoreObject/Controller';
import { PI_2 } from '@Engine/Constants/Math';


export class PointerLockControls extends Controller {
  
  public enabled: boolean;
  private pitchObject: Object3D;
  private yawObject: Object3D;
  private dispose: () => void;
  
  constructor(private camera: Camera) {
    super();
    let scope: any = this; // Reference to class
    this.camera.rotation.set(0, 0, 0);
    
    this.pitchObject = new Object3D();
    this.pitchObject.add(camera);
    
    this.yawObject = new Object3D();
    this.yawObject.position.y = 10;
    this.yawObject.add(this.pitchObject);
    
    let onMouseMove = (event: MouseEvent): void => {
      if (scope.enabled === false) {
        console.log(scope);
        return;
      }
      
      let movementX: number = event.movementX ? event.movementX : 0;
      let movementY: number = event.movementY ? event.movementY : 0;
      
      scope.yawObject.rotation.y -= movementX * 0.002;
      scope.pitchObject.rotation.x -= movementY * 0.002;
      
      scope.pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, scope.pitchObject.rotation.x));
    };
    this.dispose = () => {
      document.removeEventListener('mousemove', onMouseMove, false);
    };
    document.addEventListener('mousemove', onMouseMove, false);
    this.enabled = false;
    
    this.getDirection();
    
  }
  
  public getObject(): Object3D {
    return this.yawObject;
  }
  
  private getDirection(): (v: Vector3) => Vector3 {
    // assumes the camera itself is not rotated
    
    let direction: Vector3 = new Vector3(0, 0, -1);
    let rotation: Euler = new Euler(0, 0, 0, 'YXZ');
    
    return (vector: Vector3): Vector3 => {
      
      rotation.set(this.pitchObject.rotation.x, this.yawObject.rotation.y, 0);
      
      vector.copy(direction).applyEuler(rotation);
      
      return vector;
      
    };
  }
  
  private onMouseMove(event: MouseEvent): void {
    if (this.enabled === false) return;
    
    let movementX: number = event.movementX ? event.movementX : 0;
    let movementY: number = event.movementY ? event.movementY : 0;
    
    this.yawObject.rotation.y -= movementX * 0.002;
    this.pitchObject.rotation.x -= movementY * 0.002;
    
    this.pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, this.pitchObject.rotation.x));
  }
  
}
