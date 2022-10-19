<script setup>
import axios from 'axios';
import {defineEmits,computed,ref, toRefs, toRef ,inject} from "vue";
import{useMessage,useDialog }from 'naive-ui';
const renovate = inject("reload");
const dialog = useDialog();
const message=useMessage();

const emit = defineEmits(["getInitParam"]);
const props =defineProps({
      msg: {
        type: String,
        required: true
      },
    });
    const page= ref((localStorage.getItem('diningPage')==null || localStorage.getItem('diningPage')==='') ? 1:parseInt(localStorage.getItem('diningPage')));
function handleClose () {
        message.warning('你尝试关闭，但并没有这个功能');
      };

const data = toRef(props, 'msg'); 
const loading = (data.value===''||data.value==null||data.value==undefined)?ref(true):ref(false);
const gridVal = computed(()=>{ return {
  diningContact: (data.value===''||data.value==null||data.value==undefined)?"18842892905":JSON.parse(localStorage.getItem('diningValue'))[parseInt(data.value)].diningContact,
  diningId: (data.value===''||data.value==null||data.value==undefined)?1:JSON.parse(localStorage.getItem('diningValue'))[data.value].diningId,
  diningInfo: (data.value===''||data.value==null||data.value==undefined)?"多加米饭":JSON.parse(localStorage.getItem('diningValue'))[data.value].diningInfo,
  diningName:(data.value===''||data.value==null||data.value==undefined)? "🍱南苑一食堂":"🍱"+JSON.parse(localStorage.getItem('diningValue'))[data.value].diningName,
  diningPrice: (data.value===''||data.value==null||data.value==undefined)?"15.00":JSON.parse(localStorage.getItem('diningValue'))[data.value].diningPrice,
  diningTags:(data.value===''||data.value==null||data.value==undefined)? ["黄焖鸡米饭","微辣"]:eval('(' + JSON.parse(localStorage.getItem('diningValue'))[data.value].diningTags + ')'),
  diningTime:(data.value===''||data.value==null||data.value==undefined)? "1665924437000":JSON.parse(localStorage.getItem('diningValue'))[data.value].diningTime,
  diningUser:(data.value===''||data.value==null||data.value==undefined)? "Steven":JSON.parse(localStorage.getItem('diningValue'))[data.value].diningUser,
  diningUserId:(data.value===''||data.value==null||data.value==undefined)?"14119401":JSON.parse(localStorage.getItem('diningValue'))[data.value].diningUserId,

}});
const detail=()=>{
  dialog.info({
          title: '详细信息',
          content: JSON.stringify({"订单号":gridVal.value.diningId,"用户名":gridVal.value.diningUser,
      "联系方式":gridVal.value.diningContact,"备注":gridVal.value.diningInfo}),
          positiveText: '好',

        })
};

const order=()=>{
  const userinfo = JSON.parse(localStorage.login);
  let data={
    diningId: gridVal.value.diningId,
    hostUserId: gridVal.value.diningUserId,
    deliverUserId:userinfo.id,
  };
  let params = new URLSearchParams();
        params.append("json",JSON.stringify(data));
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
      }else{ message.error(
            res.msg,
          {
            keepAliveOnHover: true
          });
          
        }
        
        gridVal =ref({
  diningContact: (data.value===''||data.value==null||data.value==undefined)?"18842892905":JSON.parse(localStorage.getItem('diningValue'))[parseInt(data.value)].diningContact,
  diningId: (data.value===''||data.value==null||data.value==undefined)?1:JSON.parse(localStorage.getItem('diningValue'))[data.value].diningId,
  diningInfo: (data.value===''||data.value==null||data.value==undefined)?"多加米饭":JSON.parse(localStorage.getItem('diningValue'))[data.value].diningInfo,
  diningName:(data.value===''||data.value==null||data.value==undefined)? "🍱南苑一食堂":"🍱"+JSON.parse(localStorage.getItem('diningValue'))[data.value].diningName,
  diningPrice: (data.value===''||data.value==null||data.value==undefined)?"15.00":JSON.parse(localStorage.getItem('diningValue'))[data.value].diningPrice,
  diningTags:(data.value===''||data.value==null||data.value==undefined)? ["黄焖鸡米饭","微辣"]:eval('(' + JSON.parse(localStorage.getItem('diningValue'))[data.value].diningTags + ')'),
  diningTime:(data.value===''||data.value==null||data.value==undefined)? "1665924437000":JSON.parse(localStorage.getItem('diningValue'))[data.value].diningTime,
  diningUser:(data.value===''||data.value==null||data.value==undefined)? "Steven":JSON.parse(localStorage.getItem('diningValue'))[data.value].diningUser,
  diningUserId:(data.value===''||data.value==null||data.value==undefined)?"14119401":JSON.parse(localStorage.getItem('diningValue'))[data.value].diningUserId,

});
        
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
    <n-card
    v-model:title= gridVal.diningName
    embedded
    closable
    @close="handleClose"
    :bordered="false"
    :segmented="{
      content: true,
    }"
  >
    <n-skeleton v-if="loading" />
    <div  v-else>
      <div>{{timestampToTime(gridVal.diningTime)}}</div>
    <n-dynamic-tags :closable="false" v-model:value="gridVal.diningTags" :max="0" :type="primary"/>
    </div>
  <template #action >
    <n-skeleton v-if="loading" />
    <n-grid  v-else :cols="2" :x-gap="24" item-responsive="true">
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