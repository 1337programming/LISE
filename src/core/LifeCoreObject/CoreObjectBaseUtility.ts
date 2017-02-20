import { CoreObjectBase } from './CoreObjectBase';

/**
 * @description Utility Base class for CoreObject
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
