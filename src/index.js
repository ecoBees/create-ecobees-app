const path = require("path");
const chalk = require("chalk");
const inquirer = require("inquirer");
const { createProject } = require("./utils/createProject");
const { installDependencies } = require("./utils/installDependencies");
const { initializeGit } = require("./utils/initializeGit");

async function init() {
  // Prompt for project name if not provided
  let projectName = process.argv[2];
  if (!projectName) {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "What is the name of your project?",
        validate: (input) => input.trim() !== "" || "Project name is required",
      },
    ]);
    projectName = answer.projectName;
  }

  // Prompt for template selection
  const { template } = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "Which template would you like to use?",
      choices: ["react", "next"],
    },
  ]);

  // Prompt for package manager selection
  const { packageManager } = await inquirer.prompt([
    {
      type: "list",
      name: "packageManager",
      message: "Which package manager would you like to use?",
      choices: ["npm", "pnpm", "yarn", "bun"],
    },
  ]);

  const targetDir = path.resolve(process.cwd(), projectName);
  const templateDir = path.resolve(__dirname, `../templates/${template}`);

  try {
    await createProject(templateDir, targetDir, projectName, template);
    await initializeGit(targetDir);
    await installDependencies(targetDir, packageManager);
    console.log(
      chalk.green(
        `✅ ${
          template.charAt(0).toUpperCase() + template.slice(1)
        } project ${projectName} created successfully!`
      )
    );
  } catch (error) {
    console.error(chalk.red("Error:"), error);
    process.exit(1);
  }
}

init();
