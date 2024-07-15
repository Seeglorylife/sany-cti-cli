# Sany-Cti 前端脚手架

## 介绍

前端 SPA 项目开发脚手架

## 安装

### 1、全局安装

```bash
#npm安装
npm install -g sany-cti-cli
```

```bash
#yarn安装
yarn global add sany-cti-cli
```

### 2、npx 方式安装

```bash
#创建模版
npx sany-cti-cli create <projectName> [-t|--template]
```

```bash
#示例
npx sany-cti-cli create my-project -t vue3-ts-vite-pina
```

## 使用

### 1、选择模版安装

```bash
# 执行create命令 -> 根据提示选择所需模版
sany-cti-cli create [projectName]
```

### 2、指定模版安装

```bash
# 指定项目名&模版名
sany-cti-cli create [projectName] -t <templateName>
```

```bash
#示例
sany-cti-cli create my-vue3 -t vue3-ts-vite-pina
```

#### 模版介绍

| 名称                     | 介绍                                                                                                                  | 链接                                                                    |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| react-vite-ts            | 基于 vite5 脚手架搭建的 react18 + typeScript 开发模版，集成了 router6、ant5、axios、zustand、unocss 等常用开发选项    | [gitHub 链接](https://github.com/Seeglorylife/react-vite-ts)            |
| vue3-ts-vite-pina        | vue3+ts+vite+pinia 前端开发模版                                                                                       | [github 链接](https://github.com/Seeglorylife/vue3-ts-vite-pina)        |
| vue3-ts-vite-unocss      | 基于 vite5 脚手架搭建等 vue3-ts 前端开发模版，集成了 pinia、vue-router@4.x，以及原子 css 引擎 unocss                  | [gitHub 链接](https://github.com/Seeglorylife/vue3-ts-vite-unocss)      |
| sveltekit-ts-tailwindcss | 基于 sveltekit 搭建的 typeScript 前端开发模版，集成了原子 css 样式工具 tailwindcss，提高 css 开发效率和代码重复利用率 | [gitHub 链接](https://github.com/Seeglorylife/sveltekit-ts-tailwindcss) |
