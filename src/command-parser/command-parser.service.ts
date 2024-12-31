import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { FileManagerService } from '../file-manager/file-manager.service';
import { CommandExecutorService } from '../command-executor/command-executor.service';
import { CodeGeneratorService } from '../code-generator/code-generator.service';

@Injectable()
export class CommandParserService {
  private openai: OpenAI;

  constructor(
    private fileManager: FileManagerService,
    private commandExecutor: CommandExecutorService,
    private codeGenerator: CodeGeneratorService
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async parseCommand(command: string) {
    const prompt = `Instruction: ${command}\nOutput:`;
    const response = await this.openai.completions.create({
      model: 'use gpt-4o-mini-2024-07-18',
      prompt: prompt,
      max_tokens: 500,
    });

    const parsedCommand = JSON.parse(response.choices[0].text.trim());
    return this.validateAndForwardCommand(parsedCommand);
  }

  private async validateAndForwardCommand(parsedCommand: any) {
    if (!parsedCommand || !parsedCommand.intent) {
      throw new Error('Invalid command format');
    }

    switch (parsedCommand.intent) {
      case 'generate':
        this.fileManager.generate(parsedCommand);
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
      // Add more cases as needed
      default:
        throw new Error('Unknown command intent');
    }

    return parsedCommand;
  }
}
