import {SidebarConfig4Multiple} from "vuepress/config";

import roadmapSideBar from "./sidebars/roadmapSideBar";
// @ts-ignore
export default {
    "/Lib_mdItems/": roadmapSideBar,
    "/": "auto",
} as SidebarConfig4Multiple;
