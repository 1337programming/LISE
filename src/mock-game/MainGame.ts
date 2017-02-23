import { GameInstance } from '@core/LifeCoreObject/GameInstance';

export class MainGame {
  
  private screenWidth: number;
  private screenHeight: number;
  private gameInstance: GameInstance;
  
  constructor() {
    
    this.gameInstance = new GameInstance();
  }
  
  public run(): void {
    this.gameInstance.init();
    this.gameInstance.animate();
  }
  
}
