import { Injectable } from '@nestjs/common';
import * as readlineSync from 'readline-sync';
import chalk from 'chalk';
import { CommandParserService } from '../command-parser/command-parser.service';

@Injectable()
export class CliService {
  constructor(private readonly commandParserService: CommandParserService) {}

  start() {
    console.log(chalk.green('Hello! How can I assist you?'));
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
