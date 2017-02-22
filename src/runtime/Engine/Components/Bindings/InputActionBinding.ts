import { InputBinding } from './InputBinding';
import { ActionDelegate } from './ActionDelegate';

export class InputActionBinding extends InputBinding {
  
  public action: ActionDelegate;
  
  constructor(action: ActionDelegate) {
    super();
    this.action = action;
  }
}
