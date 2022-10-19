<script setup>
import axios from 'axios';
import{useMessage}from 'naive-ui';
import diningGrid from "../ResultPage/diningGrid.vue"
import { inject,ref,toRef } from "vue";
const renovate = inject("reload");
const message = useMessage();
const page= ref((localStorage.getItem('diningPage')==null || localStorage.getItem('diningPage')==='') ? 1:parseInt(localStorage.getItem('diningPage')));

function handleClose () {
        message.warning('你尝试关闭，但并没有这个功能')
      }

const getOneParam =()=>{
  const data =[{"diningContact":"18842892905","diningId":1,"diningInfo":"多加米饭","diningName":"南苑一食堂","diningPrice":"15.00","diningTags":"[\"黄焖鸡米饭\",\"微辣\"]","diningTime":"1665924437000","diningUser":"Steven","diningUserId":"14119401"},{"diningContact":"18842892905","diningId":19,"diningInfo":"多加米饭","diningName":"南苑一食堂","diningPrice":"15","diningTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","diningTime":"1672542000000","diningUser":"Steven","diningUserId":"14119401"},{"diningContact":"18842892905","diningId":20,"diningInfo":"多加米饭","diningName":"南苑一食堂","diningPrice":"15","diningTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","diningTime":"1672542000000","diningUser":"Steven","diningUserId":"14119401"},{"diningContact":"18842892905","diningId":21,"diningInfo":"多加米饭","diningName":"南苑一食堂","diningPrice":"15","diningTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","diningTime":"1672542000000","diningUser":"Steven","diningUserId":"14119401"},{"diningContact":"18842892905","diningId":22,"diningInfo":"多加米饭","diningName":"南苑一食堂","diningPrice":"15","diningTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","diningTime":"1672542000000","diningUser":"Steven","diningUserId":"14119401"},{"diningContact":"18842892905","diningId":23,"diningInfo":"多加米饭","diningName":"南苑一食堂","diningPrice":"15","diningTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","diningTime":"1672542000000","diningUser":"Steven","diningUserId":"14119401"},{"diningContact":"18842892905","diningId":24,"diningInfo":"多加米饭","diningName":"南苑一食堂","diningPrice":"15","diningTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","diningTime":"1672542000000","diningUser":"Steven","diningUserId":"14119401"},{"diningContact":"18842892905","diningId":25,"diningInfo":"多加米饭","diningName":"南苑一食堂","diningPrice":"15","diningTags":"[\"黄焖鸡米饭\",\"微辣\",\"打包\"]","diningTime":"1672542000000","diningUser":"Steven","diningUserId":"14119401"}]
  localStorage.setItem('diningValue',JSON.stringify(data));
};

const getInitParam =()=>{
  let data={offset: page.value};
  let params = new URLSearchParams();
        params.append("json",JSON.stringify(data));
  axios.post(
         "http://localhost:8082/DiningFetchPageServlet",params)
         .then(function(resp){
          let res =  resp.data;
          message.info(
            JSON.stringify(res[7]),
          {
            keepAliveOnHover: true
          }
          
        );
        localStorage.setItem('diningValue',JSON.stringify(res));
       
        });

        renovate();
};

const getPageParam =()=>{
  localStorage.setItem('diningPage',page.value);
  let data={offset: page.value};
  let params = new URLSearchParams();
        params.append("json",JSON.stringify(data));
  axios.post(
         "http://localhost:8082/DiningFetchPageServlet",params)
         .then(function(resp){
          let res =  resp.data;
          message.info(
            JSON.stringify(res[7]),
          {
            keepAliveOnHover: true
          }
          
        );
        localStorage.setItem('diningValue',JSON.stringify(res));
       
        });
      
        renovate();
};



/*
 const props= {
    grid0:(localStorage.getItem('diningValue')==null || localStorage.getItem('diningValue')==='') ? "": JSON.stringify(JSON.parse(localStorage.getItem('diningValue'))[0]),
    grid1:(localStorage.getItem('diningValue')==null || localStorage.getItem('diningValue')==='') ? "": JSON.stringify(JSON.parse(localStorage.getItem('diningValue'))[1]),
    grid2:(localStorage.getItem('diningValue')==null || localStorage.getItem('diningValue')==='') ? "": JSON.stringify(JSON.parse(localStorage.getItem('diningValue'))[2]),
    grid3:(localStorage.getItem('diningValue')==null || localStorage.getItem('diningValue')==='') ? "": JSON.stringify(JSON.parse(localStorage.getItem('diningValue'))[3]),
    grid4:(localStorage.getItem('diningValue')==null || localStorage.getItem('diningValue')==='') ? "": JSON.stringify(JSON.parse(localStorage.getItem('diningValue'))[4]),
    grid5:(localStorage.getItem('diningValue')==null || localStorage.getItem('diningValue')==='') ? "": JSON.stringify(JSON.parse(localStorage.getItem('diningValue'))[5]),
    grid6:(localStorage.getItem('diningValue')==null || localStorage.getItem('diningValue')==='') ? "": JSON.stringify(JSON.parse(localStorage.getItem('diningValue'))[6]),
    grid7:(localStorage.getItem('diningValue')==null || localStorage.getItem('diningValue')==='') ? "": JSON.stringify(JSON.parse(localStorage.getItem('diningValue'))[7]),
}*/

</script>

<template>
   
  <n-message-provider>
    <n-grid :cols="2" >
        <n-form-item-gi>
          <n-button  secondary type="primary">
        <router-link to="/HomePage/diningpost">下单</router-link>
    </n-button>
      </n-form-item-gi>
        <n-form-item-gi >
        <n-button  secondary type="primary" @click="getInitParam"  >
         刷新
        </n-button>   
        </n-form-item-gi>
      </n-grid>


    <n-divider />
    <routerView v-if="isRouterAlive" ></routerView>
    <n-grid cols="1 400:4 400:4" :x-gap="24" :y-gap="24" item-responsive="true" >
      <n-gi>
        <diningGrid :msg=0 @getInitParam="getInitParam" />
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
  </style>