<script setup>
import axios from 'axios';
import{useMessage}from 'naive-ui';
import myExpressOrderGrid from "./myExpressOrderGrid.vue"
import { inject,ref,toRef ,onMounted} from "vue";
import {useExpressStore} from "../../../stores/expresspinia";
import {useDummyFlagStore} from "../../../stores/dummyflag";
const dummyFlag = useDummyFlagStore();
const store = useExpressStore();
const renovate = inject("reload");
const message = useMessage();
const page= ref((localStorage.getItem('expressPage')==null || localStorage.getItem('expressPage')==='') ? 1:parseInt(localStorage.getItem('expressPage')));
onMounted(() => {
  let fetch={userId: JSON.parse(localStorage.getItem("login")).id,offset: page.value};
      let params = new URLSearchParams();
      params.append("json",JSON.stringify(fetch));
      axios.post(
         "http://localhost:8082/ExpressFetchUserOrderServlet",params)
         .then(function(resp){
          let res =  resp.data;
          /*
          message.info(
            JSON.stringify(res[0]),
            {
              keepAliveOnHover: true
            },
          {
            keepAliveOnHover: true
          }
        );*/
        pushResParam(res);
        
        });
        
    })

    function pushResParam (res){
  var i = 0;
  for (i = 0; i < 8; i++) { 
        let resElem = res[i];
          if(resElem == null){
            dummyFlag.flags[i]=true;
          store.grids[i].expressCode = "dummy";
          store.grids[i].expressContact = "dummy";
          store.grids[i].expressId = parseInt(-1);
          store.grids[i].expressInfo = "dummy";
          store.grids[i].expressName = "dummy";
          store.grids[i].expressPrice ="dummy";
          store.grids[i].expressTime = "dummy";
          store.grids[i].expressUser = "dummy";
          store.grids[i].expressUserId = "dummy";
          }else{
            dummyFlag.flags[i]=false;
          store.grids[i].expressCode = resElem.expressCode;
          store.grids[i].expressContact = resElem.expressContact;
          store.grids[i].expressId = parseInt(resElem.expressId);
          store.grids[i].expressInfo = resElem.expressInfo;
          store.grids[i].expressName = resElem.expressName;
          store.grids[i].expressPrice = resElem.expressPrice;
          store.grids[i].expressTime = resElem.expressTime;
          store.grids[i].expressUser = resElem.expressUser;
          store.grids[i].expressUserId = resElem.expressUserId;
          }

        }
};


const getPageParam =()=>{
  localStorage.setItem('expressPage',page.value);
        renovate();
};
</script>

<template>
      <n-message-provider>
     <n-grid  class="grids" cols="4 300:4 300:4" :x-gap="24" :y-gap="24" item-responsive="true" >
      <n-gi>
        <myExpressOrderGrid :msg=0  />
      </n-gi>
      <n-gi>
        <myExpressOrderGrid :msg=1 />
      </n-gi>
      <n-gi>
        <myExpressOrderGrid :msg=2 />
      </n-gi>
      <n-gi>
        <myExpressOrderGrid :msg=3 />
      </n-gi>
      <n-gi>
        <myExpressOrderGrid :msg=4 />
      </n-gi>
      <n-gi>
        <myExpressOrderGrid :msg=5 />
      </n-gi>
      <n-gi>
        <myExpressOrderGrid :msg=6 />
      </n-gi>
      <n-gi>
        <myExpressOrderGrid :msg=7 />
      </n-gi>
    </n-grid>
    <n-divider />
    <n-space>
    <n-pagination 
    class="pagination"
    v-model:page="page" 
    :page-count="100" 
    size="large"
    @click="getPageParam"
    show-quick-jumper/>
  </n-space>
  </n-message-provider>
</template>
<style>
.grids{
  height: 600px;
}
</style>