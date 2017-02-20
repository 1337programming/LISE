import { Viewport } from './Viewport';
import { CoreObject } from '@core/LifeCoreObject/CoreObject';
import { Scene, Light, Fog, HemisphereLight, Mesh, Object3D } from 'three';

export class LevelScene extends Viewport {
  
  private objects: CoreObject[];
  private playerController: Object3D; // @TODO review
  private scene: Scene;
  
  constructor() {
    super();
    this.scene = new Scene();
    this.objects = [];
  }
  
  public addMesh(mesh: Mesh): void {
    this.scene.add(mesh);
  }
  
  public addLight(color: number|string, intensity: number): void {
    this.scene.add(new Light(color, intensity));
  }
  
  public addHemisphereLight(skyColor: number|string, groundColor: number|string, intensity: number): void {
    this.scene.add(new HemisphereLight(skyColor, groundColor, intensity));
  }
  
  // @TODO review
  public addController(controlsObject: Object3D): void {
    this.scene.add(controlsObject);
  }
  
  public setFog(color: number, near: number, far: number) {
    this.scene.fog = new Fog(color, near, far);
  }
}
