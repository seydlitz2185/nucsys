<script setup>
import { defineComponent, ref ,watch, onMounted, onUpdated, onUnmounted,inject} from "vue";
import{useMessage}from 'naive-ui';
import axios from 'axios';
import { useRouter, useRoute ,onBeforeRouteUpdate} from 'vue-router';
    const message = useMessage();
    const checkStrategyIsChild = ref(true);
    const  showPath = ref(false);
    const  hoverTrigger=ref(true);
    const filterable= ref(true);
    const formRef = ref(null);
    const renovate = inject("reload");
    const userinfo = JSON.parse(localStorage.login);
    const cookie = localStorage.getItem('marketpost');
    const marketValue=ref({
         market: {
          userName : userinfo.name,
          userId : userinfo.id,
          time:(cookie==null || cookie ==='') ? Date.parse(new Date()): JSON.parse(cookie).time,
          cost:(cookie==null || cookie ==='') ?10: JSON.parse(cookie).cost,
          contact:(cookie==null || cookie ==='') ?"": JSON.parse(cookie).contact,
          tags:(cookie==null || cookie ==='') ?[]: JSON.parse(cookie).tags,
          info:(cookie==null || cookie ==='') ?'': JSON.parse(cookie).info,
          },
         },
    );
    function setPhoneNum(){
      const userinfo = JSON.parse(localStorage.login);
      marketValue.value.market.contact=userinfo.phoneNum;
    }
    const submit=()=>{
      formRef.value?.validate((errors) => {
          if (!errors) {
            let params = new URLSearchParams();
        params.append("json",JSON.stringify(marketValue.value));
        
        axios.post(
         "http://localhost:8082/MarketServlet", params)
         .then(function(resp){
          let res =  resp.data;
	      message.info(
          res.msg,
          {
            keepAliveOnHover: true
          }
        );
	      })
          } 
          else {
            console.log(errors);
            message.error("请检查输入内容");
          }});};
    
    const save=()=>{
      localStorage.setItem('marketpost',JSON.stringify(marketValue.value.market));
      message.success(
          "暂存成功"+localStorage.getItem('marketpost'),
          {
            keepAliveOnHover: true
          }
        );
    };

    const clear=()=>{
      localStorage.removeItem('marketpost');
      message.info(
          "清除成功",
          {
            keepAliveOnHover: true
          }
        );
        //location.reload();
      
        renovate();
    };
    
    const rules =ref( {
        market: {
          contact: {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          info: {
            required: true,
            message: '请输入详细信息',
            trigger: 'blur'
          }
        },
    },);

    onMounted(() => {
       
    })
    
</script>

<template>
<n-message-provider>
    <n-form 
        ref="formRef" :model="marketValue" :rules="rules" label-placement="left" label-width="auto"
        >
        <n-grid :cols="2" :x-gap="24">
        <n-form-item-gi
      >

        <!--
        <pre>{{ JSON.stringify(marketValue, null, 2) }}</pre>
        -->
      </n-form-item-gi>
      </n-grid>        
          <n-form-item-row label="时间" path = "market.time">
            <n-date-picker type="datetime" v-model:value="marketValue.market.time" clearable name="time"/>
          </n-form-item-row>
          <n-form-item-row label="金额" path = "market.cost">
            <n-input-number  v-model:value="marketValue.market.cost" clearable :precision="2" ><template #prefix>￥</template></n-input-number>
          </n-form-item-row>
          <n-grid :cols="2" :x-gap="24">
            <n-gi>
          <n-form-item-row label="手机号" path = "market.contact">
            <n-input type="input" v-model:value="marketValue.market.contact" @update:value="marketValue.market.contact" name="contact"/>
          </n-form-item-row>
        </n-gi>
        <n-gi><n-button  type="primary" @click="setPhoneNum" tertiary blocked >
          使用注册手机号
        </n-button></n-gi>
          </n-grid>
          <n-form-item-row label="标签" path = "market.tags">
            <n-dynamic-tags v-model:value="marketValue.market.tags" name='info'/>
          </n-form-item-row>
          <n-form-item-row label="地址:" path = "market.info">
              <n-input
              v-model:value="marketValue.market.info"
              type="textarea"
              placeholder="地址"
              />
          </n-form-item-row>
        </n-form>
        <n-grid :cols="3" :x-gap="24" item-responsive="true">
        <n-form-item-gi>
          <n-button  type="primary" @click="submit"  block secondary strong>
          提交
        </n-button>
      </n-form-item-gi>
    <n-form-item-gi>
        <n-button type="primary" @click="save"  block secondary strong>
          暂存
        </n-button>   
        </n-form-item-gi>
        <n-form-item-gi>
        <n-button type="primary" @click="clear"  block secondary strong>
          清除
        </n-button>   
        </n-form-item-gi>
      </n-grid>

</n-message-provider>     
</template>