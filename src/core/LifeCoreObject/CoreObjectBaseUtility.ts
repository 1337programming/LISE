import { CoreObjectBase } from './CoreObjectBase';

/**
 * Utility Base class for CoreObject
 * @namespace LifeCoreObject
 * @module LifeCoreObject
 */
export class CoreObjectBaseUtility extends CoreObjectBase {
  
  constructor() {
    super();
  }
  
  public getId(): ArrayBufferView {
    return super.getId();
  }
  
}
