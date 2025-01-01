import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { CommandParserService } from '../command-parser/command-parser.service';
import * as readline from 'readline';
import { red, yellow, magenta, blue, cyan } from 'colorette';

@Injectable()
export class CliService implements OnModuleInit, OnModuleDestroy {
  private rl: readline.Interface;
  private readonly logger = new Logger(CliService.name);

  constructor(private readonly commandParser: CommandParserService) {}

  onModuleInit() {
    this.startCli();
  }

  onModuleDestroy() {
    if (this.rl) {
      this.rl.close();
    }
  }

  private startCli() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.rl.on('line', async (input) => {
      if (input.trim() === '@stop') {
        console.log(red('Shutting down the application...'));
        this.rl.close();
        process.exit(0);
      } else {
        console.log(yellow('Your response is generating...'));
        try {
          const result = await this.commandParser.parseCommand(input);
          console.log('Command result:', result);
          console.log(magenta('Response generation completed.'));
        } catch (error) {
          console.error('Error processing command:', error.message);
        }
        console.log(blue('Please enter your next command:'));
      }
    });

    // Delay the initial message to ensure it appears after Nest application startup logs
    setTimeout(() => {
      console.log(cyan('CLI is ready. Type your commands below:'));
    }, 100);
  }
}
