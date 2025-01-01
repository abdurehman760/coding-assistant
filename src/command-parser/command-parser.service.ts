import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { FileManagerService } from '../file-manager/file-manager.service';
import { CommandExecutorService } from '../command-executor/command-executor.service';
import { CodeGeneratorService } from '../code-generator/code-generator.service';
import { MemoryService } from '../memory/memory.service';

@Injectable()
export class CommandParserService {
  private openai: OpenAI;

  constructor(
    private fileManager: FileManagerService,
    private commandExecutor: CommandExecutorService,
    private codeGenerator: CodeGeneratorService,
    private memoryService: MemoryService // Inject MemoryService
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async parseCommand(command: string) {
    const context = this.memoryService.get('sessionContext') || {};
    const systemMessage = {
      role: 'system' as const,
      content: `You are a coding assistant that generates JSON responses. Always respond with valid JSON objects containing 'intent' and other necessary fields. For components, include 'componentName', 'folderPath', 'framework', and 'fileExtension' fields if applicable. For file generation, include 'filePath' and 'content' fields if applicable. Provide detailed content for text files and other file types based on the user's specific request.`
    };
    
    const userMessage = {
      role: 'user' as const,
      content: `Based on this request: "${command}", generate a JSON response with the appropriate intent and details. The following are just examples, and the content or instructions should be generated based on the user's specific request, not just the given hardcoded examples. For example:
      {
        "intent": "generateComponent",
        "componentName": "Header",
        "folderPath": "src/components",
        "framework": "React",
        "fileExtension": "tsx",
        "content": "import React from 'react';\n\nconst Header = () => {\n  return (\n    <header>\n      <h1>Header Component</h1>\n      <nav>\n        <ul>\n          <li><a href=\"#home\">Home</a></li>\n          <li><a href=\"#about\">About</a></li>\n          <li><a href=\"#contact\">Contact</a></li>\n        </ul>\n      </nav>\n    </header>\n  );\n};\n\nexport default Header;"
      },
      {
        "intent": "generateTextFile",
        "fileName": "instruction",
        "folderPath": "src/components",
        "content": "Detailed instructions based on the user's request."
      },
      {
        "intent": "generateFileWithExtension",
        "fileName": "config",
        "fileExtension": "yml",
        "folderPath": "src/config",
        "content": "Generate a YAML configuration for GitHub workflow based on the user's request."
      },
      {
        "intent": "editFile",
        "filePath": "src/api/userService.ts",
        "instructions": "Fix the backend API for user authentication."
      },
      {
        "intent": "setupNestProject",
        "directory": "my-nest-app"
      },
      {
        "intent": "reviewCode",
        "directory": "src/components"
      },
      {
        "intent": "delete",
        "filePath": "src/components/OldComponent.tsx"
      }`
    };

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini-2024-07-18',
      messages: [systemMessage, userMessage],
      temperature: 0.7,
      max_tokens: 500,
    });

    const messageContent = response.choices[0]?.message?.content?.trim();
    if (!messageContent) {
      throw new Error('Invalid response from OpenAI');
    }

    try {
      // Remove any markdown formatting if present
      const jsonString = messageContent.replace(/```json\n?|\n?```/g, '').trim();
      const parsedCommand = JSON.parse(jsonString);
      return this.validateAndForwardCommand(parsedCommand);
    } catch (error) {
      console.error('Raw OpenAI response:', messageContent);
      throw new Error(`Error parsing JSON response from OpenAI: ${error.message}`);
    }
  }

  private async validateAndForwardCommand(parsedCommand: any) {
    if (!parsedCommand || !parsedCommand.intent) {
      throw new Error('Invalid command format');
    }

    switch (parsedCommand.intent) {
      case 'generate':
        this.fileManager.generate(parsedCommand);
        break;
      case 'generateTextFile':
        await this.generateDynamicTextFile(parsedCommand);
        break;
      case 'generateFileWithExtension':
        this.fileManager.generateFileWithExtension(parsedCommand);
        break;
      case 'delete':
        this.fileManager.delete(parsedCommand);
        break;
      case 'rename':
        this.fileManager.rename(parsedCommand);
        break;
      case 'copy':
        this.fileManager.copy(parsedCommand);
        break;
      case 'execute':
        const { command, args } = parsedCommand;
        const result = await this.commandExecutor.execute(command, args);
        console.log('Command output:', result.stdout);
        console.error('Command error:', result.stderr);
        break;
      case 'generateComponent':
        await this.codeGenerator.generateComponent(parsedCommand);
        break;
      case 'editFile':
        await this.codeGenerator.editFile(parsedCommand);
        break;
      case 'setupNestProject':
        await this.commandExecutor.setupNestProject(parsedCommand);
        break;
      case 'reviewCode':
        await this.codeGenerator.reviewCode(parsedCommand);
        break;
      // Add more cases as needed
      default:
        throw new Error('Unknown command intent');
    }

    return parsedCommand;
  }

  private async generateDynamicTextFile(command: any) {
    const { fileName, folderPath, content } = command;
    const prompt = `Generate detailed content for a text file based on the following request: "${content}"`;
    const detailedContent = await this.codeGenerator.generateCode(prompt);
    this.fileManager.generateTextFile({ fileName, folderPath, content: detailedContent });
  }
}
