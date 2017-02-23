import { Actor } from '@Engine/CoreObject/Actor';

/**
 * @module CoreObject
 * A PlayerCameraManager is responsible for managing the camera for a particular player. It defines the
 * final view properties used by other systems (e.g. the renderer), meaning you can think of it as your virtual eyeball
 * in the world. It can compute the final camera properties directly, or it can arbitrate/blend between other objects
 * or actors that influence the camera (e.g. blending from one CameraActor to another).
 *
 * The PlayerCameraManagers primary external responsibility is to reliably respond to various Get*() functions, such as
 * GetCameraViewPoint. Most everything else is implementation detail and overrideable by user projects.
 *
 * By default, a PlayerCameraManager maintains a "view target", which is the primary actor the camera is associated
 * with. It can also apply various "post" effects to the final view state, such as camera animations, shakes,
 * post-process effects or special effects such as dirt on the lens.
 */
export class PlayerCameraManager extends Actor {
  
}
