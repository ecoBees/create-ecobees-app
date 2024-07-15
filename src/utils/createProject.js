const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

async function createProject(templateDir, targetDir, projectName, template) {
  if (await fs.exists(targetDir)) {
    throw new Error(`Folder ${projectName} already exists.`);
  }

  console.log(
    chalk.blue(`Creating a new Ecobees ${template} app in ${targetDir}...`)
  );

  await fs.copy(templateDir, targetDir);

  // Update package.json
  const packageJsonPath = path.join(targetDir, "package.json");
  const packageJson = await fs.readJson(packageJsonPath);
  packageJson.name = projectName;
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

  console.log(chalk.green("Project structure created."));
}

module.exports = { createProject };
