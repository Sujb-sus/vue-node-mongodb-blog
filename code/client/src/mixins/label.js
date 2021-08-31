// 获取标签的背景色
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      labelList: "label/labelList",
    }),
    getLabelColor({ labelList }) {
      return (labelName) => {
        if (labelList && labelList.length) {
          let labelIndex = 0;
          labelList.forEach((item, index) => {
            if (labelName === item.label) {
              labelIndex = index;
            }
          });
          return labelList[labelIndex].bgColor;
        }
        return "";
      };
    },
  },
};
