import {
  Object3D,
  Raycaster,
  Vector3,
  PlaneGeometry,
  Face3,
  Color,
  MeshBasicMaterial,
  VertexColors,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  FlatShading,
  HemisphereLight
} from 'three';
import { Actor } from '@Engine/CoreObject/Actor';
import { World } from '@Engine/CoreObject/World';
import { Character } from '@Engine/CoreObject/Character';
import { WebGLRenderDelegate } from '@Engine/DOM/WebGLRenderDelegate';
import { HtmlElementManager } from '@Engine/DOM/HtmlElementManager';
import { HtmlEventManager } from '@Engine/DOM/HtmlEventManager';
import { HtmlDocument } from '@Engine/DOM/HtmlDocument';
import { HtmlWindow } from '@Engine/DOM/HtmlWindow';

/**
 * Handles Game Creation
 */
export class GameInstance extends Actor {
  
  private world: World;
  private player: Character;
  private webGLRenderDelegate: WebGLRenderDelegate;
  private elementManager: HtmlElementManager;
  private eventManager: HtmlEventManager;
  private htmlDocument: HtmlDocument;
  private controlsEnabled: boolean;
  
  private raycaster: Raycaster; // @TODO Where should this go?
  private objects: Mesh[];
  
  private blocker: HTMLElement;
  private instructions: HTMLElement;
  
  constructor() {
    super();
    this.elementManager = new HtmlElementManager();
    this.eventManager = new HtmlEventManager();
    this.htmlDocument = new HtmlDocument(this.elementManager, this.eventManager);
    this.webGLRenderDelegate = new WebGLRenderDelegate();
    this.raycaster = new Raycaster(new Vector3(), new Vector3(0, -1, 0), 0, 10);
    this.objects = [];
  }
  
  public init(): void {
    this.eventManager.removeAllEvents();
    this.elementManager.removeAllElements();
    this.checkCompatibility();
    this.world = new World();
    this.player = new Character(this.world);
    
    // Prep Controls
    this.prepWorld();
    
    // Keyboard Events
    this.setKeyboardBindings();
    
    // @TODO gameInstance shouldn't build world within class
    this.buildWorld();
    
    // @TODO expose render settings in editor
    this.morphRenderer();
    
    // Set window size
    this.setResize();
  }
  
  public animate(): void {
    
    let animate = () => {
      requestAnimationFrame(animate);
      if (this.controlsEnabled) {
        let time: number = this.player.animate(this.raycaster, this.objects);
        this.world.frameTime = time;
        this.webGLRenderDelegate.render(this.world.getScene(), this.player.getCamera());
      }
    };
    
    animate();
    
  }
  
  // @TODO should not add objects manually, should load from a management source
  public addObject(object: Object3D): void {
    this.world.addObject(object);
  }
  
  private checkCompatibility(): void {
    // @TODO use the DOM Class
    this.blocker = document.getElementById('blocker');
    this.instructions = document.getElementById('instructions');
    let havePointerLock: boolean = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
    
    if (havePointerLock) {
      let element: HTMLElement = document.body;
      
      let pointerlockchange = (event) => {
        if (document.pointerLockElement === element) {
          
          this.controlsEnabled = true;
          this.player.enableControls();
          
          this.blocker.style.display = 'none';
          
        } else {
          
          this.player.disableControls();
          
          this.blocker.style.display = '-webkit-box';
          this.blocker.style.display = '-moz-box';
          this.blocker.style.display = 'box';
          
          this.instructions.style.display = '';
          
        }
      };
      
      let pointerlockerror = (event) => {
        
        this.instructions.style.display = '';
        
      };
      
      // this.htmlDocument.addEventListener('pointerlockchange', pointerlockchange, )
      
      this.htmlDocument.addEventListener('pointerlockchange', pointerlockchange, false);
      this.htmlDocument.addEventListener('mozpointerlockchange', pointerlockchange, false);
      this.htmlDocument.addEventListener('webkitpointerlockchange', pointerlockchange, false);
  
      this.htmlDocument.addEventListener('pointerlockerror', pointerlockerror, false);
      this.htmlDocument.addEventListener('mozpointerlockerror', pointerlockerror, false);
      this.htmlDocument.addEventListener('webkitpointerlockerror', pointerlockerror, false);
      
      // Hook pointer lock state change events
      
      this.instructions.addEventListener('click', (event) => {
        
        this.instructions.style.display = 'none';
        
        // Ask the browser to lock the pointer
        element.requestPointerLock();
        
      }, false);
    } else {
      this.instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
    }
  }
  
  // @TODO make this optional
  private setResize(): void {
    // Gets called every on window resize event
    let onWindowResize: () => void = () => {
      this.player.updateCamera(HtmlWindow.getScreenAspect()); // @TODO params?
      this.webGLRenderDelegate.setSize();
    };
    this.eventManager.addEvent('resize', onWindowResize, window, false);
  }
  
  // @TODO deprecate this once editor is complete
  private morphRenderer(): void {
    this.webGLRenderDelegate.setClearColor(0xffffff);
    this.webGLRenderDelegate.setPixelRatio();
    this.webGLRenderDelegate.setSize();
    
    // @TODO secure this
    document.body.appendChild(this.webGLRenderDelegate.getCanvas());
  }
  
  // @TODO deprecate this once editor is complete
  private setKeyboardBindings(): void {
    
    let onKeyDown = (event: KeyboardEvent) => {
      this.player.keyDown(event);
    };
    
    let onKeyUp = (event: KeyboardEvent) => {
      this.player.keyUp(event);
    };
    
    this.eventManager.addEvent('keydown', onKeyDown, document, false);
    this.eventManager.addEvent('keyup', onKeyUp, document, false);
  }
  
  // @TODO deprecate this once editor is complete
  private prepWorld(): void {
    this.world.setFog(0xffffff, 0, 750);
    let light: HemisphereLight = new HemisphereLight(0xeeeeff, 0x777788, 0.75);
    light.position.set(0.5, 1, 0.75);
    this.world.addObject(light);
    this.world.addObject(this.player.transportController());
  }
  
  // @TODO deprecate this once editor is complete
  private buildWorld(): void {
    this.buildFloor();
    this.buildObjects();
  }
  
  private buildFloor(): void {
    // Build Floor
    let geometry: PlaneGeometry = new PlaneGeometry(2000, 2000, 100, 100);
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
    
    let material = new MeshBasicMaterial({vertexColors: VertexColors});
    let mesh = new Mesh(geometry, material);
    this.world.addObject(mesh);
    
  }
  
  private buildObjects(): void {
    let geometry = new BoxGeometry(20, 20, 20);
    
    for (let i: number = 0, l = geometry.faces.length; i < l; i++) {
      
      let face: Face3 = geometry.faces[i];
      face.vertexColors[0] = new Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
      face.vertexColors[1] = new Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
      face.vertexColors[2] = new Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
      
    }
    
    for (let i: number = 0; i < 500; i++) {
      
      let material = new MeshPhongMaterial({specular: 0xffffff, shading: FlatShading, vertexColors: VertexColors});
      
      let mesh: Mesh = new Mesh(geometry, material);
      mesh.position.x = Math.floor(Math.random() * 20 - 10) * 20;
      mesh.position.y = Math.floor(Math.random() * 20) * 20 + 10;
      mesh.position.z = Math.floor(Math.random() * 20 - 10) * 20;
      this.world.addObject(mesh);
      
      material.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
      
      this.objects.push(mesh);
    }
  }
}
