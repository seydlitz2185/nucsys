<script setup>
import axios from 'axios';
import{useMessage}from 'naive-ui';
import diningGrid from "../ResultPage/diningGrid.vue"
import { inject,ref,toRef ,onMounted} from "vue";
import {useDiningStore} from "../../stores/diningpinia";
import {useDummyFlagStore} from "../../stores/dummyflag";
const dummyFlag = useDummyFlagStore();
const store = useDiningStore();
const renovate = inject("reload");
const message = useMessage();
const page= ref((localStorage.getItem('diningPage')==null || localStorage.getItem('diningPage')==='') ? 1:parseInt(localStorage.getItem('diningPage')));


const getOneParam =()=>{
  const data =[{"diningContact":"18842892905","diningId":1,"diningInfo":"多加米饭","diningName":"南苑一食堂","diningPrice":"15.00","diningTags":"[\"黄焖鸡米饭\",\"微辣\"]","diningTime":"1665924437000","diningUser":"Steven","diningUserId":"14119401"},{"diningContact":"18842892905","diningId":19,"diningInfo":"多加米饭","diningName":"南苑一食堂","diningPrice":"15","diningTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","diningTime":"1672542000000","diningUser":"Steven","diningUserId":"14119401"},{"diningContact":"18842892905","diningId":20,"diningInfo":"多加米饭","diningName":"南苑一食堂","diningPrice":"15","diningTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","diningTime":"1672542000000","diningUser":"Steven","diningUserId":"14119401"},{"diningContact":"18842892905","diningId":21,"diningInfo":"多加米饭","diningName":"南苑一食堂","diningPrice":"15","diningTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","diningTime":"1672542000000","diningUser":"Steven","diningUserId":"14119401"},{"diningContact":"18842892905","diningId":22,"diningInfo":"多加米饭","diningName":"南苑一食堂","diningPrice":"15","diningTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","diningTime":"1672542000000","diningUser":"Steven","diningUserId":"14119401"},{"diningContact":"18842892905","diningId":23,"diningInfo":"多加米饭","diningName":"南苑一食堂","diningPrice":"15","diningTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","diningTime":"1672542000000","diningUser":"Steven","diningUserId":"14119401"},{"diningContact":"18842892905","diningId":24,"diningInfo":"多加米饭","diningName":"南苑一食堂","diningPrice":"15","diningTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","diningTime":"1672542000000","diningUser":"Steven","diningUserId":"14119401"},{"diningContact":"18842892905","diningId":25,"diningInfo":"多加米饭","diningName":"南苑一食堂","diningPrice":"15","diningTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","diningTime":"1672542000000","diningUser":"Steven","diningUserId":"14119401"}]
  localStorage.setItem('diningValue',JSON.stringify(data));
};

onMounted(() => {
  let fetch={offset: page.value};
      let params = new URLSearchParams();
      params.append("json",JSON.stringify(fetch));
      axios.post(
         "http://localhost:8082/DiningFetchPageServlet",params)
         .then(function(resp){
          let res =  resp.data;
          message.info(
            JSON.stringify(res[0]),
            {
              keepAliveOnHover: true
            },
          {
            keepAliveOnHover: true
          }
        );
        //localStorage.setItem('diningValue',JSON.stringify(res));
        pushResParam(res);
        
        });
        
    })


function pushResParam (res){
  var i = 0;
  for (i = 0; i < 8; i++) { 
        let resElem = res[i];
          if(resElem == null){
            dummyFlag.flags[i]=true;
          store.grids[i].diningContact = "dummy";
          store.grids[i].diningId = parseInt(-1);
          store.grids[i].diningInfo = "dummy";
          store.grids[i].diningName = "dummy";
          store.grids[i].diningPrice ="dummy";
          store.grids[i].diningTags =["dummy"] ;
          store.grids[i].diningTime = "dummy";
          store.grids[i].diningUser = "dummy";
          store.grids[i].diningUserId = "dummy";
          }else{
            dummyFlag.flags[i]=false;
          store.grids[i].diningContact = resElem.diningContact;
          store.grids[i].diningId = parseInt(resElem.diningId);
          store.grids[i].diningInfo = resElem.diningInfo;
          store.grids[i].diningName = resElem.diningName;
          store.grids[i].diningPrice = resElem.diningPrice;
          store.grids[i].diningTags =eval('(' +resElem.diningTags + ')') ;
          store.grids[i].diningTime = resElem.diningTime;
          store.grids[i].diningUser = resElem.diningUser;
          store.grids[i].diningUserId = resElem.diningUserId;
          }

        }
};

const getInitParam =()=>{
  let data={offset: page.value};
  let params = new URLSearchParams();
        params.append("json",JSON.stringify(data));
  axios.post(
         "http://localhost:8082/DiningFetchPageServlet",params)
         .then(function(resp){
          let res =  resp.data;
          if(res != null){
            message.info(
            JSON.stringify(res[7]),
          {
            keepAliveOnHover: true
          }
          
        );
        //localStorage.setItem('diningValue',JSON.stringify(res));
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
  localStorage.setItem('diningPage',page.value);

      
        renovate();
};
</script>

<template>
   
  <n-message-provider>
    <n-button-group>
          <n-button  secondary  type="primary">
        <router-link to="/HomePage/diningpost">下单</router-link>
          </n-button>
        <n-button  secondary type="primary" @click="getInitParam"  >
         刷新
        </n-button>   
    </n-button-group>


    <n-divider />
    <routerView v-if="isRouterAlive" ></routerView>
    <n-grid  cols="4 400:4 400:4"  :x-gap="24" :y-gap="24" item-responsive="true" v-cloak >
      <n-gi>
        <diningGrid :msg=0  />
      </n-gi>
      <n-gi>
        <diningGrid :msg=1 />
      </n-gi>
      <n-gi>
        <diningGrid :msg=2 />
      </n-gi>
      <n-gi>
        <diningGrid :msg=3 />
      </n-gi>
      <n-gi>
        <diningGrid :msg=4 />
      </n-gi>
      <n-gi>
        <diningGrid :msg=5 />
      </n-gi>
      <n-gi>
        <diningGrid :msg=6 />
      </n-gi>
      <n-gi>
        <diningGrid :msg=7 />
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
  </style>