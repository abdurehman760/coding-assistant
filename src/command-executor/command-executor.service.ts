import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

@Injectable()
export class CommandExecutorService {
  private execAsync = promisify(exec);

  /**
   * Executes a shell command and returns the result.
   * @param command The command to execute.
   * @param args The arguments for the command.
   * @returns A promise containing the stdout and stderr of the command.
   */
  async execute(command: string, args: string[]): Promise<{ stdout: string; stderr: string }> {
    const fullCommand = `${command} ${args.join(' ')}`;
    try {
      const { stdout, stderr } = await this.execAsync(fullCommand);
      return { stdout, stderr };
    } catch (error) {
      return { stdout: error.stdout || '', stderr: error.stderr || error.message };
    }
  }
}
