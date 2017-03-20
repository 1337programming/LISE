import { Html } from './Html';
import { HtmlElementManager } from './HtmlElementManager';
import { HtmlElement } from './HtmlElement';
import { HtmlEventManager } from './HtmlEventManager';
import { DebugLogger } from '@Engine/Logging/DebugLogger';
import { BodyElement } from '@Engine/DOM/BodyElement';

/**
 * Static class to Handle all Document events
 * @module DOM
 * @singleton
 * @author Patrick Opie
 */
export class HtmlDocument extends Html {
  
  constructor(private htmlElementManager: HtmlElementManager, private htmlEventManager: HtmlEventManager) {
    super();
  }
  
  public getElement(id: string, elementRef: HtmlElement): HTMLElement {
    this.checkRegisterElement(id, elementRef);
    if (!document.getElementById(id)) {
      DebugLogger.errorThrow(`No element found with id:'${id}'.`);
    }
    return document.getElementById(id);
  }
  
  public getBody(elementRef: HtmlElement): HTMLElement {
    this.checkRegisterElement('body', elementRef, true);
    this.htmlElementManager.addElement(elementRef, true);
    return document.body;
  }
  
  public addEventListener(key: string, listener: (env: any) => any, useCapture: boolean = false): void {
    this.htmlEventManager.addEvent(key, listener, document, useCapture);
  }
  
  public havePointerLock(): boolean {
    return 'pointerLockElement' in document || 'mozPointerLockElement' in document ||
      'webkitPointerLockElement' in document;
  }
  
  public isPointerLockElement(element: HTMLElement): boolean {
    return document.pointerLockElement === element;
  }
  
  public checkRegisterElement(id: string, elementRef: HtmlElement, body: boolean = false): boolean {
    if (!this.htmlElementManager.elementExist(id)) {
      this.htmlElementManager.addElement(elementRef, body);
      return false; // Was not registered and now has
    } else {
      return true; // Was registered
    }
  }
  
}
