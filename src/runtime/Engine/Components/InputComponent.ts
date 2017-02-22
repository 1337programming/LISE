import { ActorComponent } from './ActorComponent';
import { InputKeyBinding } from './Bindings/InputKeyBinding';
import { InputActionBinding } from './Bindings/InputActionBinding';
import { ActionDelegate } from './Bindings/ActionDelegate';

/**
 * Implement an Actor component for input bindings.
 *
 * An Input Component is a transient component that is to an Actor to bind various forms of input events to delegate
 * functions. Input components are processed from a stack managed by the PlayerController and processed by the
 * PlayerInput. Each binding can consume the input event preventing other components on the input stack from processing
 * the input.
 */
export class InputComponent extends ActorComponent {
  
  public active: boolean;
  private inputKeyBinding: InputKeyBinding;
  private inputActionBinding: InputActionBinding;
  
  constructor(key: string, action: ActionDelegate) {
    super();
    this.bindKey(key, action);
  }
  
  private bindKey(key: string, action: ActionDelegate): void {
    this.inputKeyBinding = new InputKeyBinding(key);
    this.inputActionBinding = new InputActionBinding(action);
  }
  
}
