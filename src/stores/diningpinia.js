import { defineStore } from "pinia"

const useDiningStore = defineStore("dining", {
  // state定义状态
  state: () => ({
  diningContact: "18842892905",
  diningId: 101,
  diningInfo: "不要方便面",
  diningName: "南苑三食堂",
  diningPrice: "15",
  diningTags: ["烤盘饭","鸡丝"],
  diningTime: "1666060762000",
  diningUser: "Steven",
  diningUserId: "14119401",
  })
})

export default useDiningStore;
