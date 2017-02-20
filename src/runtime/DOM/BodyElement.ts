import { HtmlElement, HtmlElementDisplayState } from './HtmlElement';
import { HtmlDocument } from './HtmlDocument';

export class BodyElement extends HtmlElement {
  
  constructor(id: string, htmlDocument: HtmlDocument, state: HtmlElementDisplayState = HtmlElementDisplayState.Box) {
    super(id, htmlDocument, state);
    super.setElement(id, true);
  }
  
  addCanvas(canvas: HTMLCanvasElement): void {
    super.getElement().appendChild(canvas);
  }
  
}
