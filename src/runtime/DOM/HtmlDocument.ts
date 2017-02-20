import { Html } from './Html';
import { HtmlElementManager } from './HtmlElementManager';
import { HtmlElement } from './HtmlElement';
import { HtmlEventManager } from './HtmlEventManager';

/**
 * @description Static class to Handle all Document events
 * @module DOM
 * @singleton
 * @author Patrick Opie
 */
export class HtmlDocument extends Html {
  
  constructor(private htmlElementManager: HtmlElementManager, private htmlEventManager: HtmlEventManager) {
    super();
  }
  
  public getElement(id: string, elementRef: HtmlElement): HTMLElement {
    this.htmlElementManager.addElement(elementRef);
    return document.getElementById(id);
  }
  
  public getBody(elementRef: HtmlElement): HTMLElement {
    this.htmlElementManager.addElement(elementRef, true);
    return document.body;
  }
  
  public addEventListener(key: string, listener: (env: any) => any, target: Document | Window | HTMLElement | Element = document, useCapture: boolean = false): void {
    this.htmlEventManager.addEvent(key, listener, target, useCapture)
  }
  
  public havePointerLock(): boolean {
    return 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
  }
  
  public isPointerLockElement(element: HTMLElement): boolean {
    return document.pointerLockElement === element;
  }
  
}
