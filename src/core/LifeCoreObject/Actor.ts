import { CoreObject } from './CoreObject';

/**
 * Actor is the base class for an CoreObject that can be placed or spawned in a level.
 * Actors may contain a collection of ActorComponents, which can be used to control how actors move,
 * how they are rendered, etc. The other main function of an Actor is the replication of properties and
 * function calls across the network during play.
 * @memberOf LifeCoreObject
 * @module LifeCoreObject
 */
export class Actor extends CoreObject {
  
  constructor() {
    super();
  }
  
}

