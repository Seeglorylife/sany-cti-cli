import path from "path";
import fs from "fs-extra";
import ora from "ora";
import inquirer from "inquirer";
import getPkgInfo from "./pkg.js";
import chalk from "chalk";
import downloadGitRepo from "download-git-repo";
import { getGitReposList } from "./api.js";

/** 过滤非模版git地址 */
const gitReposFilter = ["react-", "angular-", "vue3-", "sveltekit-"];

/**
 * 获取下载模版
 * @param {string} projectName
 * @param {object} options
 * @returns {{ templates: { name: string; value: string }[], projectTemplate: string }}
 */
const getProjectTemplate = async (projectName, options) => {
  const { author = {} } = getPkgInfo();
  const loading = ora("获取模版列表...");
  loading.start();
  const templates = (await getGitReposList(author.name)).filter(({ name }) =>
    gitReposFilter.some((gitName) => name.startsWith(gitName))
  );
  loading.succeed(chalk.green("获取模版列表成功！"));
  const project = templates.find(
    (template) => template.name === options.template
  );
  const projectTemplate = project ? project.value : undefined;
  return { templates, projectTemplate };
};

/**
 * 项目名输入交互
 * @param {string} projectName
 * @returns {{ projectName: string }}
 */
const showProjectNameInput = async (projectName) => {
  if (!projectName) {
    const { name } = await inquirer
      .prompt({
        type: "input",
        name: "name",
        message: "请输入项目名称: ",
      })
      .catch(() => {
        process.exit(1);
      });
    projectName = name;
  }
  console.log("项目名称: ", projectName);
  return { projectName };
};

/**
 * 模版选择交互
 * @param {string} projectTemplate
 * @param {{ name: string; value: string }[]} templates
 * @returns {{ projectTemplate: string }}
 */
const showTemplateSelect = async (projectTemplate, templates) => {
  if (!projectTemplate) {
    const { template } = await inquirer
      .prompt({
        type: "list",
        name: "template",
        message: "请选择模版: ",
        choices: templates,
      })
      .catch(() => {
        process.exit(1);
      });
    projectTemplate = template;
  }
  console.log("模版: ", projectTemplate);
  return { projectTemplate };
};

/**
 * 重复目录校验交互
 * @param {string} projectName
 * @returns {void}
 */
const verifyProjectIsExist = async (projectName) => {
  const targetDir = path.join(process.cwd(), projectName);
  if (fs.existsSync(targetDir)) {
    const { force } = await inquirer
      .prompt({
        type: "confirm",
        name: "force",
        message: chalk.yellow("目录已存在，是否覆盖？"),
      })
      .catch(() => {
        process.exit(1);
      });
    force ? fs.removeSync(targetDir) : process.exit(1);
  }
};

/**
 * 下载创建模版
 * @param {string} projectName
 * @param {string} projectTemplate
 * @returns {void}
 */
const downloadTemplate = async (projectName, projectTemplate) => {
  const dirPath = path.join(process.cwd(), projectName);
  const loading = ora("正在下载模版...");
  loading.start();
  downloadGitRepo(projectTemplate, dirPath, (err) => {
    if (err) {
      loading.fail(chalk.red("创建模版失败: " + err));
      process.exit(1);
    } else {
      loading.succeed(chalk.green("创建模版成功！"));
      console.log(chalk.blueBright(`\ncd ${projectName}`));
      console.log(chalk.blueBright("pnpm install"));
      console.log(chalk.blueBright("pnpm run dev"));
    }
  });
};

const createTemplete = async (projectName, options) => {
  let { templates, projectTemplate } = await getProjectTemplate(
    projectName,
    options
  );
  projectName = (await showProjectNameInput(projectName)).projectName;
  projectTemplate = (await showTemplateSelect(projectTemplate, templates))
    .projectTemplate;
  await verifyProjectIsExist(projectName);
  downloadTemplate(projectName, projectTemplate);
};

export default createTemplete;
