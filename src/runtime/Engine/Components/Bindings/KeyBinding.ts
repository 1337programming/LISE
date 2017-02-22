/**
 * Key Binding Struct
 */
export class KeyBinding {
  
  public key: string;
  public address: number;
  
  constructor(key, address) {
    this.key = key;
    this.address = address;
  }
}
