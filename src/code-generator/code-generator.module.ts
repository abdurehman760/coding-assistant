import { Module } from '@nestjs/common';
import { CodeGeneratorService } from './code-generator.service';

@Module({
  providers: [CodeGeneratorService]
})
export class CodeGeneratorModule {}
