import { Module } from '@nestjs/common';
import { CommandExecutorService } from './command-executor.service';

@Module({
  providers: [CommandExecutorService]
})
export class CommandExecutorModule {}
