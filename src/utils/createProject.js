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

  const gitignoreSamplePath = path.join(targetDir, "gitignore.sample");
  const gitignorePath = path.join(targetDir, ".gitignore");

  if (await fs.pathExists(gitignoreSamplePath)) {
    await fs.copy(gitignoreSamplePath, gitignorePath);
    console.log(chalk.green(".gitignore created from sample file"));

    // Optionally, remove the sample file
    await fs.remove(gitignoreSamplePath);
  } else {
    console.warn(chalk.yellow("gitignore.sample not found in template"));
  }

  // Update package.json
  const packageJsonPath = path.join(targetDir, "package.json");
  const packageJson = await fs.readJson(packageJsonPath);
  packageJson.name = projectName;
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

  console.log(chalk.green("Project structure created."));
}

module.exports = { createProject };
