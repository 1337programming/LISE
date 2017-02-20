import { DOM } from './DOM';
import { DebugLogger } from '@core/Logging/DebugLogger';

/**
 * @description Manages DOM events
 * @module DOM
 */
export class EventManager extends DOM {
  
  private eventMap: {[name: string]: DOMEvent};
  private keyStore: string[];
  
  constructor() {
    super();
    this.eventMap = {};
    this.keyStore = [];
  }
  
  /**
   * Add event listeners
   * @param key A String that specifies the name of the event
   * @param listener Specifies the function to run when the event occurs.
   * @param target The event target
   * @param useCapture Indicates that events of this type will be dispatched to the registered listener before being
   * dispatched to any EventTarget beneath it in the DOM tree.
   */
  public addEvent(key: string, listener: (env: any) => any, target: Document | Window | HTMLElement | Element = document, useCapture: boolean = false): void {
    if (this.eventMap[key]) {
      DebugLogger.warning(`DOM Event Listener: ${key} already exists, new event will be overwritten`);
      this.removeKey(key);
    }
    this.eventMap[key] = {
      name: key,
      target: target
    };
    this.keyStore.push(key);
    target.addEventListener(key, listener, useCapture);
  }
  
  /**
   * Remove Event Listener
   * @param key Listener to remove
   * @param listener Optional Listener to replace
   * @param useCapture Indicates that events of this type will be dispatched to the registered listener before being
   * dispatched to any EventTarget beneath it in the DOM tree.
   */
  public removeEvent(key: string, listener?: (env: any) => any, useCapture: boolean = false): void {
    if (!this.eventMap[key]) {
      DebugLogger.warning(`Could not find event with id ${key}.`);
    } else {
      this.removeKey(key);
      this.eventMap[key].target.removeEventListener(key);
    }
  }
  
  /**
   * Remove All Listeners
   */
  public removeAllEvents(): void {
    for (let i: number = 0; i < this.keyStore.length; i++) {
      this.eventMap[this.keyStore[i]].target.removeEventListener(this.eventMap[this.keyStore[i]].name);
    }
  }
  
  private removeKey(key: string): void {
    let index: number = this.findKey(key);
    if (index > -1) {
      this.keyStore.splice(index, 1);
    } else {
      DebugLogger.warning(`EventListener: ${key} was not found in store.`);
    }
  }
  
  private findKey(key: string): number {
    for (let i: number = 0; i < this.keyStore.length; i++) {
      if (this.keyStore[i] === key) {
        return i;
      }
    }
    return -1;
  }
  
}

interface DOMEvent {
  name: string;
  target: Document | Window | HTMLElement | Element;
}
