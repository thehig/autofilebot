import chalk from "chalk";

const preamble = () =>
  new Promise((resolve) => {
    console.log(
      chalk.magenta(`=====Autofilebot=====`)
    );
    resolve(null);
  });
/**
 * Wrap a promise-generating function in some CLI-behavior
 */
export const ConsoleWrapper = (func: (...params: any[]) => Promise<any>) => (
  ...args: any[]
) =>
  preamble()
    .then(() => func(...args))
    .then(
      // Output any trailing responses
      (msg) =>
        msg &&
        console.log(
          chalk.redBright(`Trailing response: ${JSON.stringify(msg, null, 4)}`)
        )
    )
    .catch((err) => console.error(chalk.red(err)))
    .finally(() => {
      console.log("Press any key to exit");

      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.on("data", process.exit.bind(process, 0));
    });

export default ConsoleWrapper;
