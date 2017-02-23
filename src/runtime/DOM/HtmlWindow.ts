import { Html } from './Html';

/**
 * Static class to Handle all Window events & Data
 * Wraps around Window for the purposes for logging
 * @module DOM
 * @author Patrick Opie
 * @singleton
 */
export class HtmlWindow extends Html {
  
  public static getPixelRation(): number {
    return window.devicePixelRatio;
  }
  
  public static getScreenWidth(): number {
    return window.innerWidth;
  }
  
  public static getScreenHeight(): number {
    return window.innerHeight;
  }
  
  public static getScreenAspect(): number {
    return window.innerWidth / window.innerHeight;
  }
  
  constructor() {
    super();
  }
  
}
