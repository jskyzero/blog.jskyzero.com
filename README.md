# Astro Starlight Blog

这是一个基于 [Astro](https://astro.build/) 和 [Starlight](https://starlight.astro.build/) 的静态博客工程。当前站点是 `jskyzero's blog`，用于整理编程、软件工具、计算机科学、Unity/UWP 等主题文章。

这个仓库也可以作为个人博客模板：替换站点信息、图片资源和文章内容后，即可快速克隆为新的静态博客。

## 技术栈

- Astro 5：静态站点生成。
- Starlight：文档/博客式导航、搜索、侧边栏、文章页基础布局。
- MDX/Markdown：正文内容格式。
- Expressive Code：代码块高亮与明暗主题。
- GitHub Pages：通过 GitHub Actions 构建并发布 `dist/`。

## 快速开始

```bash
npm install
npm run dev
npm run build
npm run preview
```

- `npm run dev`：启动本地开发服务器，默认地址通常为 `http://localhost:4321`。
- `npm run build`：生成静态文件到 `dist/`。
- `npm run preview`：本地预览构建产物。

## 项目结构

```text
.
├── .github/workflows/deploy.yml     # GitHub Pages 自动构建与部署流程
├── astro.config.mjs                 # Astro 与 Starlight 主配置，站点信息和侧边栏入口
├── package.json                     # 依赖与 npm 脚本
├── package-lock.json                # npm 锁定文件，保证安装结果可复现
├── public/                          # 静态资源，构建时原样复制到站点根路径
│   ├── CNAME                        # 自定义域名配置
│   ├── favicon.ico                  # 站点图标
│   └── images/                      # 站点背景、文章配图等图片资源
├── src/
│   ├── components/                  # 覆盖 Starlight 默认组件
│   │   ├── Header.astro             # 自定义头部：站点标题、搜索、社交链接
│   │   └── Footer.astro             # 自定义底部：编辑链接、最近更新时间、版权信息
│   ├── content.config.ts            # 内容集合 schema，扩展 date/tags/category/image 等字段
│   ├── content/docs/                # Starlight 文档内容，也是博客正文所在目录
│   │   ├── index.mdx                # 站点首页内容
│   │   └── posts/                   # 博客文章，文件名会影响文章 URL slug
│   ├── pages/                       # 自定义路由页面
│   │   ├── posts/index.astro        # 旧文章归档路由，当前跳转到首页
│   │   └── tags/                    # 标签列表与标签详情页
│   └── styles/custom.css            # 全站主题变量、Starlight 结构覆盖和文章样式
├── tsconfig.json                    # TypeScript 配置
└── README.md                        # 当前工程说明
```

## 核心文件说明

- `astro.config.mjs`：替换站点时最先修改这里，包括 `siteUrl`、`siteTitle`、`repositoryUrl`、社交链接、侧边栏分类、编辑链接。
- `src/content.config.ts`：定义文章 frontmatter 可用字段。当前支持 `date`、`tags`、`category`、`image`、`description`。
- `src/content/docs/index.mdx`：首页正文，适合放博客定位、分类介绍、更新日志。
- `src/content/docs/posts/*.mdx`：文章内容。每篇文章建议保留 frontmatter，并用 `tags` 和 `category` 组织导航。
- `src/pages/tags/index.astro`：根据带日期的文章统计标签，生成标签云。
- `src/pages/tags/[tag].astro`：按标签生成静态详情页。
- `src/components/Header.astro` 和 `src/components/Footer.astro`：自定义 Starlight 页头页脚。
- `src/styles/custom.css`：主题主要维护点，包含明暗主题色、布局间距、侧边栏/目录/代码块样式。
- `public/CNAME`：如果不使用自定义域名，需要删除或替换。

## 克隆为新博客

1. 替换基础信息。

修改 `astro.config.mjs` 中的：

```js
const siteUrl = 'https://your-domain.example';
const siteTitle = "Your Blog";
const repositoryUrl = 'https://github.com/your-name/your-blog';
```

同时检查 `social`、`editLink.baseUrl`、`locales`、`sidebar`。

2. 替换包信息。

修改 `package.json`：

```json
{
  "name": "your-blog",
  "version": "1.0.0"
}
```

3. 替换域名与静态资源。

- 修改或删除 `public/CNAME`。
- 替换 `public/favicon.ico`。
- 替换 `public/images/site/` 中的站点背景图和个人图片。
- 替换 `public/images/posts/` 中的文章配图。

4. 替换首页与个人介绍。

- 修改 `src/content/docs/index.mdx`。
- 修改或删除 `src/content/docs/posts/自我介绍.mdx`。

5. 替换文章内容。

- 删除不需要的 `src/content/docs/posts/*.mdx`。
- 新增自己的文章。
- 更新 `astro.config.mjs` 的 `sidebar`，让侧边栏指向新的文章 URL。

6. 更新部署分支。

当前 `.github/workflows/deploy.yml` 监听 `blog` 分支。如果你的发布分支是 `main`，把：

```yaml
branches: [blog]
```

改为：

```yaml
branches: [main]
```

## 文章写作规范

文章放在 `src/content/docs/posts/`，推荐使用 `.mdx`。最小 frontmatter：

```mdx
---
title: "文章标题"
date: 2026-04-30
category: "分类名称"
tags: ["TagA", "TagB"]
description: "一句话描述，可选"
image: "/images/posts/example.jpg"
---

<!-- 文章维护说明：说明这篇文章的主题、代码块语境或迁移注意事项。 -->

正文内容。
```

- `title`：显示在页面标题、搜索结果和侧边栏中。
- `date`：用于标签页和文章列表排序；没有日期的页面不会进入标签统计。
- `category`：用于人工归类，当前主要在内容管理中使用。
- `tags`：用于 `/tags` 和 `/tags/[tag]` 页面。
- `description`：页面描述，可帮助搜索和分享预览。
- `image`：文章配图路径，建议放在 `public/images/posts/`。

## 代码块规范

给代码块标明语言，便于高亮和后续维护：

````md
```python
def hello(name: str) -> str:
    # 解释关键业务意图，而不是重复语法本身。
    return f"hello, {name}"
```
````

常用语言标识：`bash`、`powershell`、`json`、`text`、`python`、`javascript`、`typescript`、`html`、`css`、`c`、`cpp`、`csharp`、`xml`。

## 侧边栏维护

Starlight 的侧边栏在 `astro.config.mjs` 中显式维护。新增文章后需要：

1. 确认文章文件名生成的 slug。
2. 在 `sidebar` 对应分类下添加 `{ label, link }`。
3. 运行 `npm run build` 验证链接是否有效。

示例：

```js
{
  label: '编程语言',
  items: [
    { label: 'Python 配置数据表', link: '/posts/python-配置数据表' },
  ],
}
```

## 标签页

标签页由 `src/pages/tags/` 生成：

- `/tags`：展示所有标签及文章数量。
- `/tags/<tag>`：展示该标签下的文章。

标签统计只包含带 `date` 字段的文章，避免首页或草稿被统计进去。

## 部署

仓库包含 GitHub Pages workflow：

```text
.github/workflows/deploy.yml
```

流程会执行：

1. `npm ci`
2. `npm run build`
3. 上传 `dist/`
4. 发布到 GitHub Pages

发布前请确认 GitHub 仓库设置中 Pages Source 使用 GitHub Actions，并确认 `public/CNAME` 与仓库 Pages 域名配置一致。

## 日常维护清单

- 修改站点信息：`astro.config.mjs`、`package.json`、`public/CNAME`。
- 修改首页：`src/content/docs/index.mdx`。
- 新增文章：`src/content/docs/posts/`。
- 新增图片：`public/images/posts/` 或 `public/images/site/`。
- 调整分类和顺序：`astro.config.mjs` 的 `sidebar`。
- 调整视觉风格：`src/styles/custom.css`。
- 调整页头页脚：`src/components/Header.astro`、`src/components/Footer.astro`。

## 许可

代码按 `LICENSE` 文件授权。文章和图片如需作为模板复用，建议替换为自己的内容或单独确认授权。
