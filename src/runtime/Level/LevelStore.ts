import { Mesh } from 'three';

export class LevelStore {
  
  private meshes: Mesh[];
  
  constructor() {
    this.meshes = [];
  }
  
  public addMesh(mesh: Mesh): void {
    this.meshes.push(mesh);
  }
  
}
