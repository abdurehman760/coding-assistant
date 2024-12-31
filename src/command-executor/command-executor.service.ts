import { Injectable } from '@nestjs/common';
import { execa } from 'execa';

@Injectable()
export class CommandExecutorService {
  async execute(command: string, args: string[]): Promise<{ stdout: string; stderr: string }> {
    try {
      const { stdout, stderr } = await execa(command, args);
      return { stdout, stderr };
    } catch (error) {
      return { stdout: error.stdout, stderr: error.stderr };
    }
  }
}
