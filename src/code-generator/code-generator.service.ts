import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { FileManagerService } from '../file-manager/file-manager.service';

@Injectable()
export class CodeGeneratorService {
  private openai: OpenAI;

  constructor(private fileManager: FileManagerService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateCode(prompt: string): Promise<string> {
    const response = await this.openai.completions.create({
      model: 'use gpt-4o-mini-2024-07-18',
      prompt: prompt,
      max_tokens: 500,
    });

    const generatedCode = response.choices[0].text.trim();
    return this.validateCode(generatedCode);
  }

  private validateCode(code: string): string {
    // Add validation logic here (e.g., syntax checking, formatting)
    return code;
  }

  async generateComponent(command: any) {
    const { componentName, template } = command;
    const prompt = `Generate a ${componentName} component using the following template:\n${template}`;
    const generatedCode = await this.generateCode(prompt);
    const filePath = `./components/${componentName}.ts`;
    this.fileManager.writeFile(filePath, generatedCode);
    console.log(`Component generated at: ${filePath}`);
  }

  async editFile(command: any) {
    const { filePath, instructions } = command;
    const existingContent = this.fileManager.readFile(filePath);
    const prompt = `Edit the following file based on these instructions:\n${instructions}\n\nFile content:\n${existingContent}`;
    const editedCode = await this.generateCode(prompt);
    this.fileManager.writeFile(filePath, editedCode);
    console.log(`File edited at: ${filePath}`);
  }
}
