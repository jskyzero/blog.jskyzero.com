import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Central site metadata. Change these values first when cloning this project
// into a new personal blog.
const siteUrl = 'https://blog.jskyzero.com';
const siteTitle = "jskyzero's blog";
const repositoryUrl = 'https://github.com/jskyzero/blog.jskyzero.com';

export default defineConfig({
  site: siteUrl,
  integrations: [
    starlight({
      title: siteTitle,
      defaultLocale: 'root',
      locales: {
        root: {
          label: '简体中文',
          lang: 'zh-CN',
          dir: 'ltr',
        },
      },
      favicon: '/favicon.ico',
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            href: '/favicon.ico',
            sizes: '32x32',
          },
        },
      ],
      expressiveCode: {
        themes: ['github-light', 'github-dark'],
        styleOverrides: {
          borderRadius: '6px',
          frames: {
            frameBoxShadowCssValue: 'none',
          },
        },
      },
      social: [
        { icon: 'github', label: 'GitHub', href: repositoryUrl },
      ],
      customCss: ['./src/styles/custom.css'],
      components: {
        Header: './src/components/Header.astro',
        Footer: './src/components/Footer.astro',
      },
      // Keep sidebar links explicit so the blog can control categories and
      // ordering independently from file names.
      sidebar: [
        { label: '站点介绍', link: '' },
        { label: 'About', link: '/posts/自我介绍' },
        {
          label: '编程语言',
          items: [
            { label: 'C++ 模板元編程', link: '/posts/c-模板元編程' },
            { label: 'HTML 编写静态网页工具', link: '/posts/html-编写静态网页工具' },
            { label: 'GridWorld实训', link: '/posts/java-gridworld实训总结' },
            { label: 'Python 富文本转CSV', link: '/posts/python-富文本转csv' },
            { label: 'Python 配置数据表', link: '/posts/python-配置数据表' },
            { label: '编程语言学习路径', link: '/posts/编程语言学习路径' },
          ],
        },
        {
          label: '计算机科学',
          items: [
            { label: '人工智能-搜索算法', link: '/posts/人工智能-搜索算法' },
            { label: '字符编码', link: '/posts/字符编码' },
            { label: '字节顺序', link: '/posts/字节顺序' },
            { label: '深度&广度优先搜索', link: '/posts/深度广度优先搜索' },
          ],
        },
        {
          label: '软件工具',
          items: [
            { label: 'Hexo 搭建个人博客', link: '/posts/hexo-搭建个人博客' },
            { label: 'OpenRefine 数据处理', link: '/posts/openrefine-数据处理' },
            { label: 'SVN 版本管理工具', link: '/posts/svn-版本管理工具' },
            { label: 'Shell 常用脚本和指令', link: '/posts/shell-常用脚本和指令' },
            { label: 'VsDevCmd 快捷启动', link: '/posts/vsdevcmd-在shell中的打开姿势' },
            { label: 'gitmoji 让你的提交日志更可读', link: '/posts/gitmoji-让你的提交日志更可读' },
          ],
        },
        {
          label: '专题 UNITY',
          items: [
            { label: '擴展編輯器', link: '/posts/extend_editorbasic' },
            { label: 'MVC架構', link: '/posts/mvc-in-unity' },
            { label: 'Unity3D 速览', link: '/posts/unity' },
            { label: '游戏策划公开课', link: '/posts/扩展-游戏设计' },
          ],
        },
        {
          label: '专题 UWP',
          items: [
            { label: '多线程问题', link: '/posts/async' },
            { label: 'MVVM Light', link: '/posts/mvvm_light' },
          ],
        },
      ],
      editLink: {
        baseUrl: `${repositoryUrl}/edit/blog/`,
      },
      lastUpdated: true,
    }),
  ],
});
