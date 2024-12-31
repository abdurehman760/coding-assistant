import { Module } from '@nestjs/common';
import { CommandParserService } from './command-parser.service';
import { CommandExecutorModule } from '../command-executor/command-executor.module';
import { CodeGeneratorModule } from '../code-generator/code-generator.module';
import { MemoryModule } from '../memory/memory.module';
import { FileManagerModule } from '../file-manager/file-manager.module';

@Module({
  imports: [CommandExecutorModule, CodeGeneratorModule, MemoryModule, FileManagerModule],
  providers: [CommandParserService],
  exports: [CommandParserService],
})
export class CommandParserModule {}
