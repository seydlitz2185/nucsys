<script setup>
import axios from 'axios';
import{useMessage}from 'naive-ui';
import expressGrid from "../ResultPage/expressGrid.vue"
import { inject,ref,toRef ,onMounted} from "vue";
import {useExpressStore} from "../../stores/expresspinia";
import {useDummyFlagStore} from "../../stores/dummyflag";
const dummyFlag = useDummyFlagStore();
const store = useExpressStore();
const renovate = inject("reload");
const message = useMessage();
const page= ref((localStorage.getItem('expressPage')==null || localStorage.getItem('expressPage')==='') ? 1:parseInt(localStorage.getItem('expressPage')));


const getOneParam =()=>{
  const data =[{"expressContact":"18842892905","expressId":1,"expressInfo":"多加米饭","expressName":"南苑一食堂","expressPrice":"15.00","expressTags":"[\"黄焖鸡米饭\",\"微辣\"]","expressTime":"1665924437000","expressUser":"Steven","expressUserId":"14119401"},{"expressContact":"18842892905","expressId":19,"expressInfo":"多加米饭","expressName":"南苑一食堂","expressPrice":"15","expressTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","expressTime":"1672542000000","expressUser":"Steven","expressUserId":"14119401"},{"expressContact":"18842892905","expressId":20,"expressInfo":"多加米饭","expressName":"南苑一食堂","expressPrice":"15","expressTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","expressTime":"1672542000000","expressUser":"Steven","expressUserId":"14119401"},{"expressContact":"18842892905","expressId":21,"expressInfo":"多加米饭","expressName":"南苑一食堂","expressPrice":"15","expressTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","expressTime":"1672542000000","expressUser":"Steven","expressUserId":"14119401"},{"expressContact":"18842892905","expressId":22,"expressInfo":"多加米饭","expressName":"南苑一食堂","expressPrice":"15","expressTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","expressTime":"1672542000000","expressUser":"Steven","expressUserId":"14119401"},{"expressContact":"18842892905","expressId":23,"expressInfo":"多加米饭","expressName":"南苑一食堂","expressPrice":"15","expressTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","expressTime":"1672542000000","expressUser":"Steven","expressUserId":"14119401"},{"expressContact":"18842892905","expressId":24,"expressInfo":"多加米饭","expressName":"南苑一食堂","expressPrice":"15","expressTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","expressTime":"1672542000000","expressUser":"Steven","expressUserId":"14119401"},{"expressContact":"18842892905","expressId":25,"expressInfo":"多加米饭","expressName":"南苑一食堂","expressPrice":"15","expressTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","expressTime":"1672542000000","expressUser":"Steven","expressUserId":"14119401"}]
  localStorage.setItem('expressValue',JSON.stringify(data));
};

onMounted(() => {
  let fetch={offset: page.value};
      let params = new URLSearchParams();
      params.append("json",JSON.stringify(fetch));
      axios.post(
         "http://localhost:8082/ExpressFetchPageServlet",params)
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
        //localStorage.setItem('expressValue',JSON.stringify(res));
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

const getInitParam =()=>{
  let data={offset: page.value};
  let params = new URLSearchParams();
        params.append("json",JSON.stringify(data));
  axios.post(
         "http://localhost:8082/expressFetchPageServlet",params)
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
        //localStorage.setItem('expressValue',JSON.stringify(res));
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
  localStorage.setItem('expressPage',page.value);

      
        renovate();
};
</script>

<template>
   
  <n-message-provider>
    <n-button-group>
          <n-button  secondary  type="primary">
        <router-link to="/HomePage/expresspost">下单</router-link>
          </n-button>
        <n-button  secondary type="primary" @click="getInitParam"  >
         刷新
        </n-button>   
    </n-button-group>


    <n-divider />
    <routerView v-if="isRouterAlive" ></routerView>
    <n-grid  class="grids" cols="4 400:4 400:4"  :x-gap="24" :y-gap="24" item-responsive="true" v-cloak >
      <n-gi>
        <expressGrid :msg=0  />
      </n-gi>
      <n-gi>
        <expressGrid :msg=1 />
      </n-gi>
      <n-gi>
        <expressGrid :msg=2 />
      </n-gi>
      <n-gi>
        <expressGrid :msg=3 />
      </n-gi>
      <n-gi>
        <expressGrid :msg=4 />
      </n-gi>
      <n-gi>
        <expressGrid :msg=5 />
      </n-gi>
      <n-gi>
        <expressGrid :msg=6 />
      </n-gi>
      <n-gi>
        <expressGrid :msg=7 />
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