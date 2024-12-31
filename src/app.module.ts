import { Module } from '@nestjs/common';

import { CliModule } from './cli/cli.module';
import { CommandParserModule } from './command-parser/command-parser.module';
import { MemoryModule } from './memory/memory.module';
import { FileManagerModule } from './file-manager/file-manager.module';
import { CommandExecutorModule } from './command-executor/command-executor.module';
import { CodeGeneratorModule } from './code-generator/code-generator.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CliModule,
    CommandParserModule,
    MemoryModule,
    FileManagerModule,
    CommandExecutorModule,
    CodeGeneratorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
