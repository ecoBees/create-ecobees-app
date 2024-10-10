const { execSync } = require("child_process");
const chalk = require("chalk");

function checkCommandAvailability(command) {
  try {
    execSync(`${command} --version`, { stdio: "ignore" });
    return true;
  } catch (error) {
    console.error(chalk.red(`Please install ${command} before proceeding.`));
    return false;
  }
}

module.exports = { checkCommandAvailability };
