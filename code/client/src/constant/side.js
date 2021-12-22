// 侧边栏文章类别
const BROWSE_STATUS = 1; // 热门点击
const RECOMMEND_STATUS = 2; // 最新推荐
const sideType = {
  [BROWSE_STATUS]: '热门点击',
  [RECOMMEND_STATUS]: '最新推荐',
};
const sortType = {
  [BROWSE_STATUS]: 'pv',
  [RECOMMEND_STATUS]: 'releaseTime',
};

export { BROWSE_STATUS, RECOMMEND_STATUS, sideType, sortType };
