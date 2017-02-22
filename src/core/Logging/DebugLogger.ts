/**
 * @module Logger
 * Debug logger
 */
export class DebugLogger {
  
  public static log(message: string, args: any[] = []): void {
    console.log(new Date(), message, ...args);
  }
  
  public static info(message: string, args: any[] = []): void {
    console.info(new Date(), message, ...args);
  }
  
  public static warning(message: string, args: any[] = []): void {
    console.warn(new Date(), message, ...args);
  }
  
  public static error(message: string, args: any[] = []): void {
    console.error(new Date(), message, ...args);
  }
  
  public static errorThrow(message: string, args: any[] = []): void {
    console.error(new Date(), message, ...args);
    throw new Error(message);
  }
  
}
