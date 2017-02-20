import { Html } from './Html';
import { HtmlDocument } from './HtmlDocument';
import { DebugLogger } from '@core/Logging/DebugLogger';

/**
 * @description HtmlElement Instance Class
 * @module DOM
 */
export class HtmlElement extends Html {
  
  private element: HTMLElement;
  private display: HtmlElementDisplayState;
  
  constructor(private id: string, private htmlDocument: HtmlDocument,
              state: HtmlElementDisplayState = HtmlElementDisplayState.Box) {
    super();
    this.setDisplay(state);
  }
  
  public getId(): string {
    return this.id;
  }
  
  public setDisplay(state: HtmlElementDisplayState): void {
    switch (state) {
      case HtmlElementDisplayState.Box:
        this.writeDisplay('box');
      case HtmlElementDisplayState.Hidden:
        this.writeDisplay('none');
      case HtmlElementDisplayState.Empty:
        this.writeDisplay('');
      default:
        DebugLogger.warning(`HtmlElement: Invalid state: ${HtmlElementDisplayState[state]}`);
    }
  }
  
  public getDisplay(): HtmlElementDisplayState {
    return this.display;
  }
  
  public overwriteInnerHtml(str: string): void {
    this.element.innerHTML = str;
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
