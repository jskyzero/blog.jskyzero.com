import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://blog.jskyzero.com',
  integrations: [
    starlight({
      title: "jskyzero's blog",
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
        { icon: 'github', label: 'GitHub', href: 'https://github.com/jskyzero/blog.jskyzero.com' },
      ],
      customCss: ['./src/styles/custom.css'],
      components: {
        Header: './src/components/Header.astro',
        Footer: './src/components/Footer.astro',
      },
      sidebar: [
        { label: '站点介绍', link: '' },
        { label: 'About', link: '/posts/自我介绍' },
        {
          label: '编程语言',
          items: [
            { label: '课程总结：C++中的模板元編程', link: '/posts/c-模板元編程' },
            { label: '效率提升：使用HTML编写静态网页工具', link: '/posts/html-编写静态网页工具' },
            { label: '课程总结：GridWorld实训', link: '/posts/java-gridworld实训总结' },
            { label: '效率提升：使用Python将富文本转CSV格式', link: '/posts/python-富文本转csv' },
            { label: '效率提升：使用Python配置数据表', link: '/posts/python-配置数据表' },
            { label: '计算机科学：編程語言學習路徑', link: '/posts/编程语言学习路径' },
          ],
        },
        {
          label: '计算机科学',
          items: [
            { label: '人工智能：搜索算法在问题空间的求解示例', link: '/posts/人工智能-搜索算法' },
            { label: '计算机科学：谈谈字符的编码问题', link: '/posts/字符编码' },
            { label: '计算机科学：字节顺序', link: '/posts/字节顺序' },
            { label: '深度&广度优先搜索', link: '/posts/深度广度优先搜索' },
          ],
        },
        {
          label: '软件工具',
          items: [
            { label: '工具速览：使用Hexo搭建个人博客', link: '/posts/hexo-搭建个人博客' },
            { label: '工具速览：使用OpenRefine预处理数据', link: '/posts/openrefine-数据处理' },
            { label: '工具速览：Apache Subversion', link: '/posts/svn-版本管理工具' },
            { label: 'Shell：常用脚本和指令', link: '/posts/shell-常用脚本和指令' },
            { label: '效率提升：VsDevCmd快捷启动', link: '/posts/vsdevcmd-在shell中的打开姿势' },
            { label: '工具速览：gitmoji让你的提交日志更可读', link: '/posts/gitmoji-让你的提交日志更可读' },
          ],
        },
        {
          label: '专题 UNITY',
          items: [
            { label: 'UNITY：擴展編輯器', link: '/posts/extend_editorbasic' },
            { label: 'UNITY：遊戲中開發的MVC架構', link: '/posts/mvc-in-unity' },
            { label: 'Unity3D 速览', link: '/posts/unity' },
            { label: '课程总结：腾讯互动娱乐2017年游策公开课', link: '/posts/扩展-游戏设计' },
          ],
        },
        {
          label: '专题 UWP',
          items: [
            { label: 'UWP：多线程问题及其解决', link: '/posts/async' },
            { label: 'UWP：MVVM Light Toolkit介绍', link: '/posts/mvvm_light' },
          ],
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/jskyzero/blog.jskyzero.com/edit/blog/',
      },
    }),
  ],
});
