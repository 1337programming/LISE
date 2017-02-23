/**
 * Binds a delegate to an action.
 */
export class ActionDelegate {
  
  public actionState: CharacterAction;
  public active: boolean;
  
  constructor(state: CharacterAction) {
    this.actionState = state;
  }
  
}

// @TODO move this
export enum CharacterAction {
  MoveForward,
  MoveLeft,
  MoveBackward,
  MoveRight,
  Jump
}
