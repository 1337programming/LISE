import { Html } from './Html';
import { HtmlElement } from './HtmlElement';
import { DebugLogger } from '@Engine/Logging/DebugLogger';

/**
 * @module DOM
 * Manages all HtmlElements
 * @singleton
 * @author Patrick Opie
 */
export class HtmlElementManager extends Html {
  
  private elements: HtmlElement[];
  private hasBody: boolean;
  
  constructor() {
    super();
    this.elements = [];
    this.hasBody = false;
  }
  
  public addElement(element: HtmlElement, body: boolean = false): void {
    // @TODO remove duplicates
    if (body) {
      if (this.hasBody) {
        DebugLogger.warning(`Body Element is being over written`);
      }
    }
    this.elements.push(element);
  }
  
  public removeElement(id: string): void {
    let index: number = this.findElementIndex(id);
    if (index > -1) {
      this.elements.splice(index, 1);
    } else {
      DebugLogger.warning(`Could not remove element with id: ${id}`, this.elements);
    }
  }
  
  public removeAllElements(): void {
    this.elements = [];
  }
  
  public elementExist(id: string): boolean {
    return this.findElementIndex(id) > -1;
  }
  
  private findElementIndex(id: string): number {
    for (let i: number = 0; i < this.elements.length; i++) {
      if (this.elements[i].getId() === id) {
        return i;
      }
    }
    return -1;
  }
}
