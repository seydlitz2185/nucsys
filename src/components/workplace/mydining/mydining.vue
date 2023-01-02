<script setup>
import axios from 'axios';
import{useMessage}from 'naive-ui';
import myDiningGrid from "./myDiningGrid.vue"
import { inject,ref,toRef ,onMounted} from "vue";
import {useDiningStore} from "../../../stores/diningpinia";
import {useDummyFlagStore} from "../../../stores/dummyflag";
const dummyFlag = useDummyFlagStore();
const store = useDiningStore();
const renovate = inject("reload");
const message = useMessage();
const page= ref((localStorage.getItem('myDiningPage')==null || localStorage.getItem('myDiningPage')==='') ? 1:parseInt(localStorage.getItem('myDiningPage')));
onMounted(() => {
      let fetch={userId: JSON.parse(localStorage.getItem("login")).id,offset: page.value};
      let params = new URLSearchParams();
      params.append("json",JSON.stringify(fetch));
      axios.post(
         "http://localhost:8082/DiningFetchUserServlet",params)
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
            /*
            message.info(
            JSON.stringify(res[7]),
          {
            keepAliveOnHover: true
          }
          
        );*/
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
  localStorage.setItem('myDiningPage',page.value);
        renovate();
};
</script>

<template>
      <n-message-provider>
     <n-grid class="grids" cols="4 300:4 300:4" :x-gap="24" :y-gap="24" item-responsive="true" >
      <n-gi>
        <myDiningGrid :msg=0  />
      </n-gi>
      <n-gi>
        <myDiningGrid :msg=1 />
      </n-gi>
      <n-gi>
        <myDiningGrid :msg=2 />
      </n-gi>
      <n-gi>
        <myDiningGrid :msg=3 />
      </n-gi>
      <n-gi>
        <myDiningGrid :msg=4 />
      </n-gi>
      <n-gi>
        <myDiningGrid :msg=5 />
      </n-gi>
      <n-gi>
        <myDiningGrid :msg=6 />
      </n-gi>
      <n-gi>
        <myDiningGrid :msg=7 />
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