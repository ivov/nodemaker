const formatCommand = (command) => command.replace(/\s{2}/g, "").trim();

module.exports = formatCommand;
