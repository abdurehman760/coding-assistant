import { Module } from '@nestjs/common';
import { CommandParserService } from './command-parser.service';
import { CommandExecutorModule } from '../command-executor/command-executor.module';
import { CodeGeneratorModule } from '../code-generator/code-generator.module';

@Module({
  imports: [CommandExecutorModule, CodeGeneratorModule],
  providers: [CommandParserService]
})
export class CommandParserModule {}
