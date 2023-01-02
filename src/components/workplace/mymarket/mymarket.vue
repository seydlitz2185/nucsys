<script setup>
import axios from 'axios';
import{useMessage}from 'naive-ui';
import myMarketGrid from "./myMarketGrid.vue"
import { inject,ref,toRef ,onMounted} from "vue";
import {useMarketStore} from "../../../stores/marketpinia";
import {useDummyFlagStore} from "../../../stores/dummyflag";
const dummyFlag = useDummyFlagStore();
const store = useMarketStore();
const renovate = inject("reload");
const message = useMessage();
const page= ref((localStorage.getItem('marketPage')==null || localStorage.getItem('marketPage')==='') ? 1:parseInt(localStorage.getItem('marketPage')));
onMounted(() => {
      let fetch={userId: JSON.parse(localStorage.getItem("login")).id,offset: page.value};
      let params = new URLSearchParams();
      params.append("json",JSON.stringify(fetch));
      axios.post(
         "http://localhost:8082/MarketFetchUserServlet",params)
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
          store.grids[i].marketContact = "dummy";
          store.grids[i].marketId = parseInt(-1);
          store.grids[i].marketInfo = "dummy";
          store.grids[i].marketPrice ="dummy";
          store.grids[i].marketTags =["dummy"] ;
          store.grids[i].marketTime = "dummy";
          store.grids[i].marketUser = "dummy";
          store.grids[i].marketUserId = "dummy";
          }else{
            dummyFlag.flags[i]=false;
          store.grids[i].marketContact = resElem.marketContact;
          store.grids[i].marketId = parseInt(resElem.marketId);
          store.grids[i].marketInfo = resElem.marketInfo;
          store.grids[i].marketPrice = resElem.marketPrice;
          store.grids[i].marketTags =eval('(' +resElem.marketTags + ')') ;
          store.grids[i].marketTime = resElem.marketTime;
          store.grids[i].marketUser = resElem.marketUser;
          store.grids[i].marketUserId = resElem.marketUserId;
          }

        }
};

const getInitParam =()=>{
  let data={offset: page.value};
  let params = new URLSearchParams();
        params.append("json",JSON.stringify(data));
  axios.post(
         "http://localhost:8082/MarketFetchPageServlet",params)
         .then(function(resp){
          let res =  resp.data;
          if(res != null){
            /*
            message.info(
            JSON.stringify(res[7]),
          {
            keepAliveOnHover: true
          }
          
        );*/
        //localStorage.setItem('marketValue',JSON.stringify(res));
        pushResParam(res);
          
        }else{
            message.error(
            "获取数据失败",
          {
            keepAliveOnHover: true
          });
          }
        });
        renovate();
};

const getPageParam =()=>{
  localStorage.setItem('marketPage',page.value);
        renovate();
};
</script>

<template>
      <n-message-provider>
     <n-grid class="grids" cols="4 300:4 300:4" :x-gap="24" :y-gap="24" item-responsive="true" >
      <n-gi>
        <myMarketGrid :msg=0  />
      </n-gi>
      <n-gi>
        <myMarketGrid :msg=1 />
      </n-gi>
      <n-gi>
        <myMarketGrid :msg=2 />
      </n-gi>
      <n-gi>
        <myMarketGrid :msg=3 />
      </n-gi>
      <n-gi>
        <myMarketGrid :msg=4 />
      </n-gi>
      <n-gi>
        <myMarketGrid :msg=5 />
      </n-gi>
      <n-gi>
        <myMarketGrid :msg=6 />
      </n-gi>
      <n-gi>
        <myMarketGrid :msg=7 />
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