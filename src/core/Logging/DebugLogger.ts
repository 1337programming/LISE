/**
 * @module Logger
 * @description Debug logger
 */
export class DebugLogger {
  
  public static log(message: string): void {
    console.log(new Date(), message);
  }
  
  public static info(message: string): void {
    console.info(new Date(), message);
  }
  
  public static warning(message: string): void {
    console.warn(new Date(), message);
  }
  
  public static error(message: string): void {
    console.error(new Date(), message);
  }
  
  public static errorThrow(message: string): void {
    console.error(new Date(), message);
    throw new Error(message);
  }
  
}
