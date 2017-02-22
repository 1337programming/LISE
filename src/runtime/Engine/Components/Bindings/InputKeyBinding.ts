import { InputBinding } from './InputBinding';
import { KeyBinding } from './KeyBinding';
import { KEY_MAP } from '@core/Constants/KeyMap';
import { DebugLogger } from '@core/Logging/DebugLogger';
/**
 * Binds a delegate to a key chord.
 */
export class InputKeyBinding extends InputBinding {
  
  public key: KeyBinding;
  
  constructor(key: string) {
    super();
    this.insertKey(key);
  }
  
  private insertKey(key: string): void {
    if (KEY_MAP[key]) {
      this.key = new KeyBinding(key, KEY_MAP[key])
    } else {
      DebugLogger.errorThrow(`Invalid Key: ${key}, not found on map`);
    }
  }
  
}
