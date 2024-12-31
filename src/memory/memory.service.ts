import { Injectable } from '@nestjs/common';

@Injectable()
export class MemoryService {
  private memoryStore: Map<string, any> = new Map();

  set(key: string, value: any): void {
    this.memoryStore.set(key, value);
  }

  get(key: string): any {
    return this.memoryStore.get(key);
  }

  delete(key: string): void {
    this.memoryStore.delete(key);
  }

  clear(): void {
    this.memoryStore.clear();
  }
}
