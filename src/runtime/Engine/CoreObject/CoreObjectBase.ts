/**
 * Base class for CoreObject
 * @module CoreObject
 */

export class CoreObjectBase {
  
  private id: ArrayBufferView;
  
  constructor() {
    this.id = crypto.getRandomValues(new Uint32Array(10))
  }
  
  public getId(): ArrayBufferView {
    return this.id;
  }
}
