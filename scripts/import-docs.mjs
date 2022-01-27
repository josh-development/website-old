import { existsSync } from 'node:fs';
import { copyFile, mkdir, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import ora from 'ora';

const projects = await readdir(resolve(process.cwd(), 'projects'));

for (const project of projects) {
  const spinner = ora(`Importing ${project}`).start();

  if (!existsSync(resolve(process.cwd(), 'static', 'docs'))) await mkdir(resolve(process.cwd(), 'static', 'docs'), { recursive: true });

  await copyFile(resolve(process.cwd(), 'projects', project, 'docs', 'api.json'), resolve(process.cwd(), 'static', 'docs', `${project}.json`)).catch(
    (error) => {
      spinner.fail(error.message);
      console.log(error);
      process.exit(1);
    }
  );

  spinner.succeed(`Imported ${project}`);
}
