import { Module } from '@nestjs/common';
import { CommandExecutorService } from './command-executor.service';

@Module({
  providers: [CommandExecutorService],
  exports: [CommandExecutorService],
})
export class CommandExecutorModule {}
