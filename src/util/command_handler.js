const path = require("node:path");
const fs = require("node:fs");

function load_commands() {
  const commands = [];

  const commands_path = path.join(__dirname, "../commands");
  const commands_files = fs
    .readdirSync(commands_path)
    .filter((file) => file.endsWith(".js"));

  for (const file of commands_files) {
    const file_path = path.join(commands_path, file);

    const command = require(file_path);
    commands.push(command);
  }
  return commands;
}

module.exports = {
  load_commands,
};
