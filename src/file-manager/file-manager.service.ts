import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileManagerService {
  ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  generate(command: any) {
    const { filePath, content } = command;
    try {
      // Ensure the directory exists
      const directory = path.dirname(filePath);
      this.ensureDirectoryExists(directory);
      
      this.writeFile(filePath, content);
      console.log(`File generated at: ${filePath}`);
    } catch (error) {
      console.error(`Error generating file: ${error.message}`);
    }
  }

  generateTextFile(command: any) {
    const { fileName, folderPath, content } = command;
    try {
      // Ensure the directory exists
      this.ensureDirectoryExists(folderPath);
      const filePath = path.join(folderPath, `${fileName}.txt`);
      this.writeFile(filePath, content);
      console.log(`Text file generated at: ${filePath}`);
    } catch (error) {
      console.error(`Error generating text file: ${error.message}`);
    }
  }

  generateFileWithExtension(command: any) {
    const { fileName, fileExtension, folderPath, content } = command;
    try {
      // Ensure the directory exists
      this.ensureDirectoryExists(folderPath);
      const filePath = path.join(folderPath, `${fileName}.${fileExtension}`);
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
      // Ensure the directory exists
      const directory = path.dirname(filePath);
      this.ensureDirectoryExists(directory);
      
      fs.writeFileSync(filePath, content, 'utf-8');
    } catch (error) {
      console.error(`Error writing file: ${error.message}`);
      throw error;
    }
  }

  rename(command: any) {
    const { oldPath, newPath } = command;
    try {
      if (!this.fileExists(oldPath)) {
        console.error(`File not found: ${oldPath}`);
        return;
      }
      if (this.fileExists(newPath)) {
        console.error(`File already exists at new path: ${newPath}`);
        return;
      }
      fs.renameSync(oldPath, newPath);
      console.log(`File renamed from ${oldPath} to ${newPath}`);
    } catch (error) {
      console.error(`Error renaming file: ${error.message}`);
    }
  }

  copy(command: any) {
    const { sourcePath, destinationPath } = command;
    try {
      if (this.fileExists(sourcePath)) {
        fs.copyFileSync(sourcePath, destinationPath);
        console.log(`File copied from ${sourcePath} to ${destinationPath}`);
      } else {
        console.log(`File not found: ${sourcePath}`);
      }
    } catch (error) {
      console.error(`Error copying file: ${error.message}`);
    }
  }

  move(command: any) {
    const { sourcePath, destinationPath } = command;
    try {
      if (this.fileExists(sourcePath)) {
        fs.renameSync(sourcePath, destinationPath);
        console.log(`File moved from ${sourcePath} to ${destinationPath}`);
      } else {
        console.log(`File not found: ${sourcePath}`);
      }
    } catch (error) {
      console.error(`Error moving file: ${error.message}`);
    }
  }
}
