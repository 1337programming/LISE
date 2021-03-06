import { Html } from './Html';
import { HtmlDocument } from './HtmlDocument';
import { DebugLogger } from '@Engine/Logging/DebugLogger';
import { HtmlElementManager } from '@Engine/DOM/HtmlElementManager';
import { HtmlEventManager } from '@Engine/DOM/HtmlEventManager';

/**
 * HtmlElement Instance Class
 * @module DOM
 */
export class HtmlElement extends Html {
  
  private element: HTMLElement;
  private display: HtmlElementDisplayState;
  
  constructor(private id: string, private htmlDocument: HtmlDocument, private htmlElementManager: HtmlElementManager,
              private htmlEventManager: HtmlEventManager,
              state: HtmlElementDisplayState = HtmlElementDisplayState.Box) {
    super();
    this.setElement(id);
    this.setDisplay(state);
  }
  
  public getId(): string {
    return this.id;
  }
  
  public setDisplay(state: HtmlElementDisplayState): void {
    switch (state) {
      case HtmlElementDisplayState.Box:
        this.writeDisplay('box');
        break;
      case HtmlElementDisplayState.Hidden:
        this.writeDisplay('none');
        break;
      case HtmlElementDisplayState.Empty:
        this.writeDisplay('');
        break;
      default:
        DebugLogger.warning(`HtmlElement: Invalid state`);
        break;
    }
  }
  
  public getDisplay(): HtmlElementDisplayState {
    return this.display;
  }
  
  public overwriteInnerHtml(str: string): void {
    this.element.innerHTML = str;
  }
  
  public addEventListener(key: string, listener: (env: any) => any, useCapture: boolean = false): void {
    this.htmlEventManager.addEvent(key, listener, this.getElement(), useCapture);
  }
  
  protected getElement(): HTMLElement {
    return this.element;
  }
  
  protected setElement(id: string, body: boolean = false): void {
    if (body) {
      this.element = this.htmlDocument.getBody(this);
    } else {
      this.element = this.htmlDocument.getElement(id, this);
    }
  }
  
  private writeDisplay(val: string): void {
    this.element.style.display = val;
  }
  
}

export enum HtmlElementDisplayState {
  Box,
  Hidden,
  Empty
}
