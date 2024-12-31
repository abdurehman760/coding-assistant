import { Module } from '@nestjs/common';
import { CliService } from './cli.service';
import { CommandParserModule } from '../command-parser/command-parser.module';

@Module({
  imports: [CommandParserModule],
  providers: [CliService],
})
export class CliModule {}
