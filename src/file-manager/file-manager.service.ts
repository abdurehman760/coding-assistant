import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileManagerService {
  generate(command: any) {
    const { filePath, content } = command;
    try {
      this.writeFile(filePath, content);
      console.log(`File generated at: ${filePath}`);
    } catch (error) {
      console.error(`Error generating file: ${error.message}`);
    }
  }

  delete(command: any) {
    const { filePath } = command;
    try {
      if (this.fileExists(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`File deleted: ${filePath}`);
      } else {
        console.log(`File not found: ${filePath}`);
      }
    } catch (error) {
      console.error(`Error deleting file: ${error.message}`);
    }
  }

  fileExists(filePath: string): boolean {
    try {
      return fs.existsSync(filePath);
    } catch (error) {
      console.error(`Error checking if file exists: ${error.message}`);
      return false;
    }
  }

  readFile(filePath: string): string {
    try {
      if (!this.fileExists(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }
      return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
      console.error(`Error reading file: ${error.message}`);
      throw error;
    }
  }

  writeFile(filePath: string, content: string): void {
    try {
      fs.writeFileSync(filePath, content, 'utf-8');
    } catch (error) {
      console.error(`Error writing file: ${error.message}`);
      throw error;
    }
  }
}
