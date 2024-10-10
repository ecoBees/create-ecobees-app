const path = require("path");
const chalk = require("chalk");
const inquirer = require("inquirer");
const { createProject } = require("./utils/createProject");
const { installDependencies } = require("./utils/installDependencies");
const { initializeGit } = require("./utils/initializeGit");
const {
  checkCommandAvailability,
} = require("./utils/checkCommandAvailability");

async function init() {
  // Check if git is available
  if (!checkCommandAvailability("git")) {
    process.exit(1);
  }

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
      choices: ["react", "next", "express"],
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

  // Check if the selected package manager is available
  if (!checkCommandAvailability(packageManager)) {
    process.exit(1);
  }

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
        } project ${projectName} created successfully!`,
      ),
    );
  } catch (error) {
    console.error(chalk.red("Error:"), error);
    process.exit(1);
  }
}

init();
