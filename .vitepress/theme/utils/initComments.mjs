import { loadScript, loadCSS } from "./commonTools.mjs";
import { themeConfig } from "../assets/themeConfig.mjs";

// 必要数据
const option = themeConfig.comment;
const commentType = option.type;

const initComments = async () => {
  try {
    if (!option.enable) return false;
    const server = option[commentType].server;
    console.log("开始加载", commentType, server);
    switch (commentType) {
      case "artalk":
        // 引入资源
        await loadCSS(`${server}/dist/Artalk.css`);
        return await new Promise((resolve, reject) => {
          loadScript(`${server}/dist/Artalk.js`, {
            callback: () => {
              if (typeof Artalk === "object") {
                resolve(Artalk);
              } else {
                reject(new Error("Artalk 初始化失败"));
              }
            },
          });
        });
      default:
        return false;
    }
  } catch (error) {
    console.error(`${commentType} 初始化失败`, error);
    return false;
  }
};

export default initComments;
