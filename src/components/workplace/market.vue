<script setup>
import axios from 'axios';
import{useMessage}from 'naive-ui';
import marketGrid from "../ResultPage/marketGrid.vue"
import { inject,ref,toRef ,onMounted} from "vue";
import {useMarketStore} from "../../stores/marketpinia";
import {useDummyFlagStore} from "../../stores/dummyflag";
const dummyFlag = useDummyFlagStore();
const store = useMarketStore();
const renovate = inject("reload");
const message = useMessage();
const page= ref((localStorage.getItem('marketPage')==null || localStorage.getItem('marketPage')==='') ? 1:parseInt(localStorage.getItem('marketPage')));


const getOneParam =()=>{
  const data =[{"marketContact":"18842892905","marketId":1,"marketInfo":"要冰镇的","marketPrice":"5.00","marketTags":"[\"脉动\"]","marketTime":"1665924437000","marketUser":"Steven","marketUserId":"14119401"},{"marketContact":"18842892905","marketId":19,"marketInfo":"多加米饭","marketPrice":"15","marketTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","marketTime":"1672542000000","marketUser":"Steven","marketUserId":"14119401"},{"marketContact":"18842892905","marketId":20,"marketInfo":"多加米饭","marketPrice":"15","marketTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","marketTime":"1672542000000","marketUser":"Steven","marketUserId":"14119401"},{"marketContact":"18842892905","marketId":21,"marketInfo":"多加米饭","marketPrice":"15","marketTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","marketTime":"1672542000000","marketUser":"Steven","marketUserId":"14119401"},{"marketContact":"18842892905","marketId":22,"marketInfo":"多加米饭","marketPrice":"15","marketTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","marketTime":"1672542000000","marketUser":"Steven","marketUserId":"14119401"},{"marketContact":"18842892905","marketId":23,"marketInfo":"多加米饭","marketPrice":"15","marketTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","marketTime":"1672542000000","marketUser":"Steven","marketUserId":"14119401"},{"marketContact":"18842892905","marketId":24,"marketInfo":"多加米饭","marketPrice":"15","marketTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","marketTime":"1672542000000","marketUser":"Steven","marketUserId":"14119401"},{"marketContact":"18842892905","marketId":25,"marketInfo":"多加米饭","marketPrice":"15","marketTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","marketTime":"1672542000000","marketUser":"Steven","marketUserId":"14119401"}]
  localStorage.setItem('marketValue',JSON.stringify(data));
};

onMounted(() => {
  let fetch={offset: page.value};
      let params = new URLSearchParams();
      params.append("json",JSON.stringify(fetch));
      axios.post(
         "http://localhost:8082/MarketFetchPageServlet",params)
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
        //localStorage.setItem('marketValue',JSON.stringify(res));
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
    <n-button-group>
          <n-button  secondary  type="primary">
        <router-link to="/HomePage/marketpost">下单</router-link>
          </n-button>
        <n-button  secondary type="primary" @click="getInitParam"  >
         刷新
        </n-button>   
    </n-button-group>


    <n-divider />
    <routerView v-if="isRouterAlive" ></routerView>
    <n-grid  class="grids" cols="4 400:4 400:4"  :x-gap="24" :y-gap="24" item-responsive="true" v-cloak >
      <n-gi>
        <marketGrid :msg=0  />
      </n-gi>
      <n-gi>
        <marketGrid :msg=1 />
      </n-gi>
      <n-gi>
        <marketGrid :msg=2 />
      </n-gi>
      <n-gi>
        <marketGrid :msg=3 />
      </n-gi>
      <n-gi>
        <marketGrid :msg=4 />
      </n-gi>
      <n-gi>
        <marketGrid :msg=5 />
      </n-gi>
      <n-gi>
        <marketGrid :msg=6 />
      </n-gi>
      <n-gi>
        <marketGrid :msg=7 />
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
  
  <style scoped>
  .pagination{
    position: absolute;
    left: 20%;
    bottom: 0px;  /* 最底下*/
  width: 100%;
  padding: 0 20px;  /*  上下内边距为0，左右内边距为20 */
  box-sizing: border-box;
  }
   
[v-cloak] {
    display: none;
}

.grids{
  height: 600px;
}
  </style>