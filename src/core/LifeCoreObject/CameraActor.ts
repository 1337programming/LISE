import { Actor } from './Actor';

/**
 * A CameraActor is a camera viewpoint that can be placed in a level.
 * @module LifeCoreObject
 */
export class CameraActor extends Actor {
  
  constructor(private near: number, private far: number) {
    super();
  }
  
}

