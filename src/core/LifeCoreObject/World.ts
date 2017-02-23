import { Actor } from '@core/LifeCoreObject/Actor';
import { Scene, Object3D, Fog } from 'three';

export class World extends Actor {
  
  public frameTime: number;
  private time: number;
  private scene: Scene;
  
  constructor() {
    super();
    this.frameTime = performance.now();
    this.time = performance.now();
    this.scene = new Scene();
  }
  
  // @TODO should load this from a manifest instead of directly
  public addObject(object: Object3D): void {
    this.scene.add(object);
  }
  
  public setFog(color: number, near: number, far: number): void {
    this.scene.fog = new Fog(color, near, far);
  }
  
  public getScene(): Scene {
    return this.scene;
  }
  
  private getTotalTime(): number {
    return this.time;
  }
}
