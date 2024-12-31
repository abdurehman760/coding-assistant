import { Module } from '@nestjs/common';
import { CliService } from './cli.service';
import { CommandParserModule } from '../command-parser/command-parser.module';
import { CodeGeneratorModule } from '../code-generator/code-generator.module';
import { MemoryModule } from '../memory/memory.module';

@Module({
  imports: [CommandParserModule, CodeGeneratorModule, MemoryModule],
  providers: [CliService],
})
export class CliModule {}
