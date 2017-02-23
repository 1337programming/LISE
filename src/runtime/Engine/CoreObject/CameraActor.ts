import { Camera } from 'three';
import { Actor } from '@Engine/CoreObject/Actor';

/**
 * A CameraActor is a camera viewpoint that can be placed in a level.
 *
 * @example usage: the Character would either be using a Perspective or Orthagonal Camera
 * The methods the Character has access to is from this class
 * @module CoreObject
 */
export class CameraActor extends Actor {
  
  private cameraDelegate: Camera;
  
  constructor(private near: number, private far: number) {
    super();
    this.cameraDelegate = new Camera;
  }
  
}

