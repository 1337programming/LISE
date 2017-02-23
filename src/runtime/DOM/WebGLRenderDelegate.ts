import { WebGLRenderer, Scene, Camera, RenderTarget } from 'three';
import { WebGLDelegate } from './WebGLDelegate';
import { HtmlWindow } from './HtmlWindow';

/**
 * Responsible for all WebGL rendering
 */
export class WebGLRenderDelegate extends WebGLDelegate {
  
  private htmlWindow: HtmlWindow;
  private renderer: WebGLRenderer;
  
  constructor() {
    super();
    this.renderer = new WebGLRenderer();
  }
  
  public setClearColor(color: number, alpha?: number): void {
    this.renderer.setClearColor(color, alpha);
  }
  
  public setPixelRatio(ratio: number = HtmlWindow.getPixelRation()): void {
    this.renderer.setPixelRatio(ratio);
  }
  
  public setSize(width: number = HtmlWindow.getScreenWidth(), height: number = HtmlWindow.getScreenHeight()): void {
    this.renderer.setSize(width, height);
  }
  
  public render(scene: Scene, camera: Camera, renderTarget?: RenderTarget, forceClear?: boolean): void {
    this.renderer.render(scene, camera, renderTarget, forceClear)
  }
  
  public requestAnimationFrame(callback: FrameRequestCallback): number {
    return requestAnimationFrame(callback);
  }
  
  public getCanvas() {
    return this.renderer.domElement;
  }
  
}
