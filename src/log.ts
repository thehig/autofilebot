const chalk = require("chalk");
const config = require("config");
const loglevel = config.get("loglevel");

export enum ELogLevel {
  TRACE = 0,
  DEBUG,
  INFO,
  WARN,
  ERROR,
  FATAL,
}

export const ConsoleColors = {
  [ELogLevel.TRACE]: chalk.white,
  [ELogLevel.DEBUG]: chalk.grey,
  [ELogLevel.INFO]: chalk.grey,
  [ELogLevel.WARN]: chalk.grey,
  [ELogLevel.ERROR]: chalk.grey,
  [ELogLevel.FATAL]: chalk.red,
};

const ColorNames = ["TRACE", "DEBUG", "INFO", "WARN", "ERROR", "FATAL"];

const levelLog = (level: ELogLevel) => (...params: any[]) =>
  new Promise((resolve) => {
    // @ts-ignore
    if (level < loglevel) resolve(...params);

    console.log(ConsoleColors[level](`[${ColorNames[level]}]`, ...params));

    // @ts-ignore
    resolve(...params);
  });

export const Tlog = levelLog(ELogLevel.TRACE);
export const Tracelog = Tlog;
export const Dlog = levelLog(ELogLevel.DEBUG);
export const Debuglog = Dlog;
export const Ilog = levelLog(ELogLevel.INFO);
export const Infolog = Ilog;
export const Wlog = levelLog(ELogLevel.WARN);
export const Warnlog = Wlog;
export const Elog = levelLog(ELogLevel.ERROR);
export const Errorlog = Elog;
export const Flog = levelLog(ELogLevel.FATAL);
export const Fatallog = Flog;
