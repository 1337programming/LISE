import { Actor } from './Actor';
import { Camera } from 'three';

/**
 * A CameraActor is a camera viewpoint that can be placed in a level.
 *
 * @example usage: the Character would either be using a Perspective or Orthagonal Camera
 * The methods the Character has access to is from this class
 * @module LifeCoreObject
 */
export class CameraActor extends Actor {
  
  private cameraDelegate: Camera;
  
  constructor(private near: number, private far: number) {
    super();
    this.cameraDelegate = new Camera;
  }
  
}

