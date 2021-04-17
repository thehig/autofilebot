const chalk = require("chalk");
const config = require("config");
const loglevel = config.get("loglevel");

enum ELogLevel {
  TRACE = 0,
  DEBUG,
  INFO,
  WARN,
  ERROR,
  FATAL,
}

const ConsoleColors = {
  [ELogLevel.TRACE]: chalk.white,
  [ELogLevel.DEBUG]: chalk.grey,
  [ELogLevel.INFO]: chalk.grey,
  [ELogLevel.WARN]: chalk.grey,
  [ELogLevel.ERROR]: chalk.grey,
  [ELogLevel.FATAL]: chalk.red,
};

const levelLog = (level: ELogLevel) => (...params: any[]) =>
  new Promise((resolve) => {
    // @ts-ignore
    if (level < loglevel) resolve(...params);

    console.log(ConsoleColors[level](`[${level}]`, ...params));

    // @ts-ignore
    resolve(...params);
  });

const Tlog = levelLog(ELogLevel.TRACE);
const Dlog = levelLog(ELogLevel.DEBUG);
const Ilog = levelLog(ELogLevel.INFO);
const Wlog = levelLog(ELogLevel.WARN);
const Elog = levelLog(ELogLevel.ERROR);
const Flog = levelLog(ELogLevel.FATAL);

module.exports = {
  Tlog,
  Tracelog: Tlog,
  Dlog,
  Debuglog: Dlog,
  Ilog,
  Infolog: Ilog,
  Wlog,
  Warnlog: Wlog,
  Elog,
  Errorlog: Elog,
  Flog,
  Fatallog: Flog,
};
