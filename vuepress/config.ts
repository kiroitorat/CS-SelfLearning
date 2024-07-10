import { defineConfig } from "vuepress/config";
import navbar from "./navbar";
import sidebar from "./sidebar";
import footer from "./footer";
import extraSideBar from "./extraSideBar";

const author = "Rat";
const domain = "";
const tags = ["程序员", "编程", "计算机"];

export default defineConfig({
  title: "Self Learning Map",
  description: "个人的主观推荐, 帮助你突破一点点小的信息壁垒",
  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    // SEO
    [
      "meta",
      {
        name: "keywords",
        content:
          "自学编程, 课程推荐, 路线概述, 工具",
      },
    ],
    // 统计脚本1
    [
      "script",
      {},
      `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?2675818a983a3131404cee835018f016";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
      `,
    ],
  ],
  permalink: "/:slug",

  extraWatchFiles: [".vuepress/*.ts", ".vuepress/sidebars/*.ts"],
  markdown: {
    lineNumbers: true,
    extractHeaders: ["h2", "h3", "h4", "h5", "h6"],
  },

  // @ts-ignore
  plugins: [
    ["@vuepress/back-to-top"],
    [
      "@vuepress/google-analytics",
      {
        ga: "GTM-WVS9HM6W", 
      },
      // InputEvent: "InputEvent", will be removed in the future version of VuePress
    ],
    ["@vuepress/medium-zoom"],

    [
      "seo",
      {
        siteTitle: (_, $site) => $site.title,
        title: ($page) => $page.title,
        description: ($page) =>
          $page.frontmatter.description || $page.description,
        author: (_, $site) => $site.themeConfig.author || author,
        tags: ($page) => $page.frontmatter.tags || tags,
        type: ($page) => "article",
        url: (_, $site, path) =>
          ($site.themeConfig.domain || domain || "") + path,
        image: ($page, $site) =>
          $page.frontmatter.image &&
          (($site.themeConfig.domain &&
            !$page.frontmatter.image.startsWith("http")) ||
            "") + $page.frontmatter.image,
        publishedAt: ($page) =>
          $page.frontmatter.date && new Date($page.frontmatter.date),
        modifiedAt: ($page) => $page.lastUpdated && new Date($page.lastUpdated),
      },
    ],
    // https://github.com/ekoeryanto/vuepress-plugin-sitemap
    [
      "sitemap",
      {
        hostname: domain,
      },
    ],
    // https://github.com/IOriens/vuepress-plugin-baidu-autopush
    ["vuepress-plugin-baidu-autopush"],
    // https://github.com/zq99299/vuepress-plugin/tree/master/vuepress-plugin-tags
    ["vuepress-plugin-tags"],
    // https://github.com/znicholasbrown/vuepress-plugin-code-copy
    [
      "vuepress-plugin-code-copy",
      {
        successText: "代码已复制",
      },
    ],
    // https://github.com/webmasterish/vuepress-plugin-feed
    [
      "feed",
      {
        canonical_base: domain,
        count: 10000,
        posts_directories: [],
      },
    ],
    // https://github.com/tolking/vuepress-plugin-img-lazy
    ["img-lazy"],
  ],
  themeConfig: {
    logo: "/logo.png",
    nav: navbar,
    sidebar,
    lastUpdated: "最近更新",
    repo: "/kiroitorat/CS-SelfLearning",
    docsBranch: "master",
    editLinks: true,
    editLinkText: "完善页面",
    // @ts-ignore
    footer,
    extraSideBar,
  },
});