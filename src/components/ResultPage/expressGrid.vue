<script setup>
import axios from 'axios';
import {defineEmits,computed,ref, toRefs, toRef ,inject,onBeforeMount} from "vue";
import{useMessage,useDialog,useLoadingBar }from 'naive-ui';
import {storeToRefs} from 'pinia';
import {useExpressStore} from "../../stores/expresspinia";
import {useDummyFlagStore} from "../../stores/dummyflag";
const renovate = inject("reload");
const dialog = useDialog();
const message=useMessage();
const store = useExpressStore();
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

const page= ref((localStorage.getItem('expressPage')==null || localStorage.getItem('expressPage')==='') ? 1:parseInt(localStorage.getItem('expressPage')));
function handleClose () {
        message.warning('你尝试关闭，但并没有这个功能');
      };

function pushResParam (res){
  var i = 0;
  for (i = 0; i < 8; i++) { 
          let resElem = res[i];
       
          if(resElem == null){
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

const detail=()=>{
  dialog.info({
          title: '详细信息',
          content: JSON.stringify({"订单号":store.grids[pageId].expressId,"用户名":store.grids[pageId].expressUser,
      "联系方式":store.grids[pageId].expressContact,"地址":store.grids[pageId].expressInfo}),
          positiveText: '好',

        })
};

const order=()=>{
  loadingBar.start();
  const userinfo = JSON.parse(localStorage.login);
  let order={
    expressId: store.grids[pageId].expressId,
    hostUserId: store.grids[pageId].expressUserId,
    deliverUserId:userinfo.id,
  };
  let params = new URLSearchParams();
        params.append("json",JSON.stringify(order));
  axios.post(
         "http://localhost:8082/expressOrderServlet",params)
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
         "http://localhost:8082/expressFetchPageServlet",params)
         .then(function(resp){
          let res =  resp.data;
          /*
          message.info(
            JSON.stringify(res[7]),
          {
            keepAliveOnHover: true
          }
          
        );*/
        //localStorage.setItem('expressValue',JSON.stringify(res));
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
    v-model:title= store.grids[pageId].expressName
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
      <div>{{timestampToTime(store.grids[pageId].expressTime)}}</div>
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