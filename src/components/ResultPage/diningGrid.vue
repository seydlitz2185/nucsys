<script setup>
import axios from 'axios';
import {defineEmits,computed,ref, toRefs, toRef ,inject,onBeforeMount} from "vue";
import{useMessage,useDialog,useLoadingBar }from 'naive-ui';
import {storeToRefs} from 'pinia';
import {useDiningStore} from "../../stores/diningpinia";
import {useDummyFlagStore} from "../../stores/dummyflag";
const renovate = inject("reload");
const dialog = useDialog();
const message=useMessage();
const store = useDiningStore();
const dummyFlag = useDummyFlagStore();
const loadingBar = useLoadingBar();
const emit = defineEmits(["getInitParam"]);
const props =defineProps({
      msg: {
        type: String,
        required: true
      },
    });

const data = toRef(props, 'msg'); 
const pageId = parseInt(data.value);

const page= ref((localStorage.getItem('diningPage')==null || localStorage.getItem('diningPage')==='') ? 1:parseInt(localStorage.getItem('diningPage')));
function handleClose () {
        message.warning('你尝试关闭，但并没有这个功能');
      };

function pushResParam (res){
  var i = 0;
  for (i = 0; i < 8; i++) { 
          let resElem = res[i];
          if(resElem == null){
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

const detail=()=>{
  dialog.info({
          title: '详细信息',
          content: JSON.stringify({"订单号":store.grids[pageId].diningId,"用户名":store.grids[pageId].diningUser,
      "联系方式":store.grids[pageId].diningContact,"地址":store.grids[pageId].diningInfo}),
          positiveText: '好',

        })
};

const order=()=>{
  loadingBar.start();
  const userinfo = JSON.parse(localStorage.login);
  let order={
    diningId: store.grids[pageId].diningId,
    hostUserId: store.grids[pageId].diningUserId,
    deliverUserId:userinfo.id,
  };
  let params = new URLSearchParams();
        params.append("json",JSON.stringify(order));
  axios.post(
         "http://localhost:8082/DiningOrderServlet",params)
         .then(function(resp){
          let res =  resp.data;
          if(res.msg == "接单成功"){
          message.success(
            res.msg,
          {
            keepAliveOnHover: true
          }
          
        );
        let fetch={offset: page.value};
      let params = new URLSearchParams();
      params.append("json",JSON.stringify(fetch));
      axios.post(
         "http://localhost:8082/DiningFetchPageServlet",params)
         .then(function(resp){
          let res =  resp.data;
          /*
          message.info(
            JSON.stringify(res[7]),
          {
            keepAliveOnHover: true
          }
          
        );*/
        //localStorage.setItem('diningValue',JSON.stringify(res));
        pushResParam(res);
        });
        loadingBar.finish();
      }else{ message.error(
            res.msg,
          {
            keepAliveOnHover: true
          });
          loadingBar.error()
        }
        
      })};
      
function timestampToTime(timestamp) {
    timestamp = timestamp ? parseInt(timestamp) : null;
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());

    return Y + M + D + h + m ;
  };



</script>

<template>

    <n-message-provider>
      
      <n-skeleton height="100%" width="100%" v-if=dummyFlag.flags[pageId] />
      
    <n-card v-else
    v-model:title= store.grids[pageId].diningName
    embedded
    closable
    hoverable
    @close="handleClose"
    :bordered="false"
    :segmented="{
      content: true,
    }"
  >
    <div >
      <div>{{timestampToTime(store.grids[pageId].diningTime)}}</div>
    <n-dynamic-tags :closable="false" v-model:value="store.grids[pageId].diningTags" :max="0" :type="primary"/>
    </div>
  <template #action >
    <n-grid  :cols="2" :x-gap="24" item-responsive="true">
        <n-form-item-gi>
      </n-form-item-gi>
    <n-form-item-gi>
      <n-button  type="primary" quaternary  @click="detail">
      详情
    </n-button>
    <n-button  type="primary" quaternary  @click="order">
      接单
    </n-button>
        </n-form-item-gi>
      </n-grid>

    </template>

  </n-card>

</n-message-provider>

</template>

<style scoped>
</style>