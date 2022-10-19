import { defineStore } from "pinia";

export const useDummyFlagStore = defineStore("dummgflag", {
  // state定义状态
  state: () => ({
    flags: [false,false,false,false,false,false,false,false,]
}),
actions: {
    update(res,offset) {
        if(res==null || res===''){
            this.flags[offset] = true; 
        }else{
            this.flags[offset] = false;
        }
      },
},
});
