import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { FileManagerService } from '../file-manager/file-manager.service';
import * as path from 'path';

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
    const prompt = `Review the code in the following directory: ${directory}`;
    const review = await this.generateCode(prompt);
    console.log(`Code review for ${directory}:\n${review}`);
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
