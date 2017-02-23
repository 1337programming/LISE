import { CoreObjectBase } from '@Engine/CoreObject';

/**
 * Utility Base class for CoreObject
 * @namespace CoreObject
 * @module CoreObject
 */
export class CoreObjectBaseUtility extends CoreObjectBase {
  
  constructor() {
    super();
  }
  
  public getId(): ArrayBufferView {
    return super.getId();
  }
  
}
