const { execSync } = require("child_process");
const chalk = require("chalk");

function initializeGit(targetDir) {
  return new Promise((resolve, reject) => {
    try {
      console.log(chalk.blue("Initializing git repository..."));
      execSync("git init", { cwd: targetDir, stdio: "inherit" });

      // Check if user.name exists
      let hasUserName = false;
      try {
        execSync("git config user.name", { cwd: targetDir, stdio: "ignore" });
        hasUserName = true;
      } catch (error) {
        // user.name is not set
      }

      // Check if user.email exists
      let hasUserEmail = false;
      try {
        execSync("git config user.email", { cwd: targetDir, stdio: "ignore" });
        hasUserEmail = true;
      } catch (error) {
        // user.email is not set
      }

      // Set temporary configurations only if they don't exist
      if (!hasUserName) {
        execSync('git config user.name "Temporary"', {
          cwd: targetDir,
          stdio: "inherit",
        });
        console.log(chalk.yellow("Temporary git user.name set."));
      }

      if (!hasUserEmail) {
        execSync('git config user.email "temporary@example.com"', {
          cwd: targetDir,
          stdio: "inherit",
        });
        console.log(chalk.yellow("Temporary git user.email set."));
      }

      execSync("git add .", { cwd: targetDir, stdio: "inherit" });
      execSync('git commit -m "Initial commit"', {
        cwd: targetDir,
        stdio: "inherit",
      });

      console.log(chalk.green("Git repository initialized."));

      // Remove temporary configurations if they were set
      if (!hasUserName) {
        execSync("git config --unset user.name", {
          cwd: targetDir,
          stdio: "inherit",
        });
      }
      if (!hasUserEmail) {
        execSync("git config --unset user.email", {
          cwd: targetDir,
          stdio: "inherit",
        });
      }
      resolve();
    } catch (error) {
      console.warn(
        chalk.yellow(
          "Failed to initialize git repository. Error: " + error.message
        )
      );
      console.warn(
        chalk.yellow("You can initialize the repository manually later.")
      );
      reject(error);
    }
  });
}

module.exports = { initializeGit };
