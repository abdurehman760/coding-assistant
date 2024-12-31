import { Module } from '@nestjs/common';
import { CommandParserService } from './command-parser.service';
import { CommandExecutorModule } from '../command-executor/command-executor.module';

@Module({
  imports: [CommandExecutorModule],
  providers: [CommandParserService]
})
export class CommandParserModule {}
