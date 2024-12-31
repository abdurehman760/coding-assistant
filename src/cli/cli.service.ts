import { Injectable } from '@nestjs/common';
import * as readlineSync from 'readline-sync';
import { CommandParserService } from '../command-parser/command-parser.service';

@Injectable()
export class CliService {
  private chalk: any;

  constructor(private readonly commandParserService: CommandParserService) {
    // Removed this.loadChalk() from constructor
  }

  private async loadChalk() {
    const chalkModule = await import('chalk');
    this.chalk = chalkModule.default;
  }

  async start() {
    await this.loadChalk(); // Ensure chalk is loaded before use
    console.log(this.chalk.green('Hello! How can I assist you?'));
    while (true) {
      const input = readlineSync.question('> ');
      if (input.trim() === 'stop') {
        console.log('Session ended. Goodbye!');
        break;
      }
      // Pass input to the Command Parser
      this.commandParserService.parseCommand(input);
    }
  }
}
