import { Module } from '@nestjs/common';
import { CodeGeneratorService } from './code-generator.service';
import { FileManagerModule } from '../file-manager/file-manager.module';

@Module({
  imports: [FileManagerModule],
  providers: [CodeGeneratorService],
  exports: [CodeGeneratorService],
})
export class CodeGeneratorModule {}
