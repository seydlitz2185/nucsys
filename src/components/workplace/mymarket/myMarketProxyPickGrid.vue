<script setup>
import axios from 'axios';
import {defineEmits,computed,ref, toRefs, toRef ,inject,onBeforeMount} from "vue";
import{useMessage,useDialog,useLoadingBar }from 'naive-ui';
import {storeToRefs} from 'pinia';
import {useMarketStore} from "../../../stores/marketpinia";
import {useDummyFlagStore} from "../../../stores/dummyflag";
const renovate = inject("reload");
const dialog = useDialog();
const message=useMessage();
const store = useMarketStore();
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

const page= ref((localStorage.getItem('marketPage')==null || localStorage.getItem('marketPage')==='') ? 1:parseInt(localStorage.getItem('marketPage')));
function handleClose () {
        message.warning('你尝试关闭，但并没有这个功能');
      };

function pushResParam (res){
  var i = 0;
  for (i = 0; i < 8; i++) { 
          let resElem = res[i];
       
          if(resElem == null){
            store.grids[i].marketContact = "dummy";
          store.grids[i].marketId = parseInt(-1);
          store.grids[i].marketInfo = "dummy";
          store.grids[i].marketPrice ="dummy";
          store.grids[i].marketTags =["dummy"] ;
          store.grids[i].marketTime = "dummy";
          store.grids[i].marketUser = "dummy";
          store.grids[i].marketUserId = "dummy";
          }else{
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

const detail=()=>{
  dialog.info({
          title: '详细信息',
          content: JSON.stringify({"订单号":store.grids[pageId].marketId,"用户名":store.grids[pageId].marketUser,
      "联系方式":store.grids[pageId].marketContact,"地址":store.grids[pageId].marketInfo}),
          positiveText: '好',

        })
};

const cancel=()=>{
  loadingBar.start();
  let order={
    marketId: store.grids[pageId].marketId,
  };
  let params = new URLSearchParams();
        params.append("json",JSON.stringify(order));
  axios.post(
         "http://localhost:8082/MarketProxyPickCancelServlet",params)
         .then(function(resp){
          let res =  resp.data;
          /*
          message.info(
            JSON.stringify(res),
          {
            keepAliveOnHover: true
          }
          
        );*/
          if(res.msg == "代取已取消"){
          message.success(
            res.msg,
          {
            keepAliveOnHover: true
          }
          
        );
          
        loadingBar.finish();
      }else{ message.error(
            res.msg,
          {
            keepAliveOnHover: true
          });
          loadingBar.error()
        }
        renovate();
      })};

function timestampToTime(timestamp) {
    timestamp = timestamp ? parseInt(timestamp) : null;
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  };



</script>

<template>

    <n-message-provider>
      
      <n-skeleton height="100%" width="100%" v-if=dummyFlag.flags[pageId] />
      
    <n-card v-else
    title= '🏬超市'
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
      <div>{{timestampToTime(store.grids[pageId].marketTime)}}</div>
    <n-dynamic-tags :closable="false" v-model:value="store.grids[pageId].marketTags" :max="0" :type="primary"/>
    </div>
  <template #action >
    <n-grid  :cols="2" :x-gap="24" item-responsive="true">
        <n-form-item-gi>
      </n-form-item-gi>
    <n-form-item-gi>
      <n-button  type="primary" quaternary  @click="detail">
      详情
    </n-button>
    <n-button  type="primary" quaternary  @click="cancel">
      取消
    </n-button>
        </n-form-item-gi>
      </n-grid>

    </template>

  </n-card>

</n-message-provider>

</template>

<style scoped>
</style>