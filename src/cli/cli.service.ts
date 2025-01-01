import { Injectable, OnModuleInit } from '@nestjs/common';
import { CommandParserService } from '../command-parser/command-parser.service';
import * as readline from 'readline';

@Injectable()
export class CliService implements OnModuleInit {
  constructor(private readonly commandParser: CommandParserService) {}

  onModuleInit() {
    this.startCli();
  }

  private startCli() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on('line', async (input) => {
      try {
        const result = await this.commandParser.parseCommand(input);
        console.log('Command result:', result);
      } catch (error) {
        console.error('Error processing command:', error.message);
      }
    });

    console.log('CLI is ready. Type your commands below:');
  }
}
