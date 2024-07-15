const { execSync } = require("child_process");
const chalk = require("chalk");

function installDependencies(targetDir, packageManager) {
  return new Promise((resolve, reject) => {
    try {
      console.log(chalk.blue("Installing dependencies..."));
      execSync(`${packageManager} install`, {
        cwd: targetDir,
        stdio: "inherit",
      });
      execSync("npm run prepare", { cwd: targetDir, stdio: "inherit" });
      console.log(chalk.green("Dependencies installed successfully."));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { installDependencies };
