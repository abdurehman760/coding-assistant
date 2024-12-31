import { Module } from '@nestjs/common';
import { CliService } from './cli.service';

@Module({
  providers: [CliService]
})
export class CliModule {}
