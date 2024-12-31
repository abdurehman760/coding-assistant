import { Module } from '@nestjs/common';
import { MemoryService } from './memory.service';

@Module({
  providers: [MemoryService]
})
export class MemoryModule {}
