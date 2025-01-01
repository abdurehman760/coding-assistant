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

  async setupNestProject(command: any) {
    const { directory, appName = 'my-nest-app' } = command;
    const fullCommand = `cd "${directory}" && npx @nestjs/cli new ${appName} --package-manager npm`;
    console.log(`Executing command: ${fullCommand}`);
    try {
      const child = exec(fullCommand);

      if (child.stdout) {
        child.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });
      }

      if (child.stderr) {
        child.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
        });
      }

      child.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
      });
    } catch (error) {
      console.error('Error setting up Nest project:', error.message);
    }
  }

  async setupReactProject(command: any) {
    const { directory, appName = 'my-react-app' } = command;
    const fullCommand = `cd "${directory}" && npx create-react-app ${appName}`;
    console.log(`Executing command: ${fullCommand}`);
    try {
      const child = exec(fullCommand);

      if (child.stdout) {
        child.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });
      }

      if (child.stderr) {
        child.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
        });
      }

      child.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
      });
    } catch (error) {
      console.error('Error setting up React project:', error.message);
    }
  }

  async installDependencies(command: any) {
    const { directory, packageManager = 'npm' } = command;
    const fullCommand = `${packageManager} install`;
    try {
      const { stdout, stderr } = await this.execAsync(fullCommand, { cwd: directory });
      console.log('Dependencies installation output:', stdout);
      console.error('Dependencies installation error:', stderr);
    } catch (error) {
      console.error('Error installing dependencies:', error.message);
    }
  }

  async runBuild(command: any) {
    const { directory, buildCommand = 'npm run build' } = command;
    try {
      const { stdout, stderr } = await this.execAsync(buildCommand, { cwd: directory });
      console.log('Build output:', stdout);
      console.error('Build error:', stderr);
    } catch (error) {
      console.error('Error running build:', error.message);
    }
  }
}
