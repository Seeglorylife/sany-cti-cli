import chalk from "chalk";
import figlet from "figlet";

/**
 * 命令help帮助补充信息
 * @returns {void}
 */
const helpTxtFn = () => {
  console.log(`  -t, --template <template>   `, "   模版名称");
  console.log(
    "\r\n" +
      chalk.magentaBright.bold(
        figlet.textSync("sany-cli", {
          font: "Standard",
          horizontalLayout: "default",
          verticalLayout: "default",
          width: 100,
          whitespaceBreak: true,
        })
      )
  );
  console.log(
    `\r\nRun ${chalk.cyan(
      "sany-cli <command> --help"
    )} for detailed usage of given command\r\n`
  );
};

export default helpTxtFn;
