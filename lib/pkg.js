import path from "path";
import fs from "fs-extra";

/**
 * 获取package.json信息
 * @returns {object}
 */
const getPkgInfo = () => {
  // package.json无法import，借用fs模块导入
  const fileURL = new URL("../package.json", import.meta.url);
  const pkgJsonStr = fs.readFileSync(fileURL, "utf-8");
  return JSON.parse(pkgJsonStr);
};

export default getPkgInfo;
