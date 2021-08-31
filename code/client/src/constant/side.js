// 侧边栏文章类别
const BROWSE_STATUS = 1; // 点击排行
const RECOMMEND_STATUS = 2; // 站长推荐
const sideType = {
  [BROWSE_STATUS]: "点击排行",
  [RECOMMEND_STATUS]: "站长推荐",
};
const sortType = {
  [BROWSE_STATUS]: "pv",
  [RECOMMEND_STATUS]: "level",
};

export { BROWSE_STATUS, RECOMMEND_STATUS, sideType, sortType };
