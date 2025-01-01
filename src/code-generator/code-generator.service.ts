import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { FileManagerService } from '../file-manager/file-manager.service';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class CodeGeneratorService {
  private openai: OpenAI;

  constructor(private fileManager: FileManagerService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateCode(prompt: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini-2024-07-18',
      messages: [
        {
          role: 'system',
          content: 'You are a coding assistant that generates high-quality code.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const generatedCode = response.choices[0].message?.content?.trim() || '';
    return this.validateCode(generatedCode);
  }

  private validateCode(code: string): string {
    // Add validation logic here (e.g., syntax checking, formatting)
    return code;
  }

  async generateComponent(command: any) {
    const { componentName, folderPath, framework, fileExtension, content } = command;

    let prompt = `Generate `;
    if (framework) {
      prompt += `a component for ${framework}`;
    }
    if (componentName) {
      prompt += `a component named ${componentName}`;
    }
    if (content) {
      prompt += ` with the following content: ${content}`;
    }
    prompt += `. Only provide the code without any explanations or markdown formatting such as \`\`\`${fileExtension} and \`\`\`.`;

    const generatedCode = await this.generateCode(prompt);
    const filePath = path.join(folderPath, `${componentName }.${fileExtension}`);
    this.fileManager.writeFile(filePath, generatedCode);
    console.log(`${framework || 'Component'} generated at: ${filePath}`);
  }

  async reviewCode(command: any) {
    const { directory } = command;
    const files = this.getFilesInDirectory(directory);
    let prompt = `Review the code in the following directory: ${directory}. Provide feedback on structure, naming conventions, and any potential improvements. Ensure to cover aspects such as directory organization, modularity, file naming, variable and function names, class names, constants, documentation, error handling, testing, and performance.\n\n`;

    files.forEach(file => {
      const content = this.fileManager.readFile(file);
      prompt += `File: ${file}\n${content}\n\n`;
    });

    const review = await this.generateCode(prompt);
    const reviewFilePath = path.join(directory, 'code-review.txt');
    this.fileManager.writeFile(reviewFilePath, review);
    console.log(`Code review generated at: ${reviewFilePath}`);
  }

  private getFilesInDirectory(directory: string): string[] {
    let files: string[] = [];
    const items = fs.readdirSync(directory);

    items.forEach(item => {
      const fullPath = path.join(directory, item);
      if (fs.statSync(fullPath).isDirectory()) {
        files = files.concat(this.getFilesInDirectory(fullPath));
      } else {
        files.push(fullPath);
      }
    });

    return files;
  }

  async editFile(command: any) {
    const { filePath, instructions } = command;
    const existingContent = this.fileManager.readFile(filePath);
    const prompt = `Edit the following file based on these instructions:\n${instructions}\n\nFile content:\n${existingContent}\n\nEnsure to add comments where the editing happens and do not include explanations or markdown formatting.`;
    const editedCode = await this.generateCode(prompt);
    this.fileManager.writeFile(filePath, editedCode);
    console.log(`File edited at: ${filePath}`);
  }
}
