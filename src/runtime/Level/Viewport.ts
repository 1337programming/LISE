import { WebGLRenderer, Scene, Camera } from 'three';

/**
 * @module Level
 * @description Viewport Base Class
 *
 */
export class Viewport {
  
  private renderer: WebGLRenderer;
  
  constructor() {
    this.renderer = new WebGLRenderer();
  }
  
  public setClearColor(color: number, alpha?: number): void {
    this.renderer.setClearColor(color, alpha);
  }
  
  public setPixelRatio(value: number): void {
    this.renderer.setPixelRatio(value);
  }
  
  public setSize(width, height): void {
    this.renderer.setSize(width, height);
  }
  
  public render(scene: Scene, camera: Camera): void {
    this.renderer.render(scene, camera);
  }
}
