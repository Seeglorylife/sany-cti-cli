#!/usr/bin/env node
import { program } from "commander";
import helpTxtFn from "../lib/help.js";
import getPkgInfo from "../lib/pkg.js";
import createTemplete from "../lib/create.js";

const { version } = getPkgInfo();

// 配置create命令
program
  .command("create [projectName]")
  .description("创建前端SPA开发模版")
  .option("-t, --template <template>", "模版名称")
  .action(createTemplete);

program.version(`v${version}`); // 定义当前版本
program.on("--help", helpTxtFn); // 定制help提示
program.parse(process.argv);
