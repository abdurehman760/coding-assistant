import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CliModule } from './cli/cli.module';
import { CommandParserModule } from './command-parser/command-parser.module';
import { MemoryModule } from './memory/memory.module';
import { FileManagerModule } from './file-manager/file-manager.module';
import { CommandExecutorModule } from './command-executor/command-executor.module';
import { CodeGeneratorModule } from './code-generator/code-generator.module';

@Module({
  imports: [CliModule, CommandParserModule, MemoryModule, FileManagerModule, CommandExecutorModule, CodeGeneratorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
