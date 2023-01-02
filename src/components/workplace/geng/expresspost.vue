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
    const expressOptions=[ 
    {
      label: '南苑',
      value: '南苑',
      children:[ 
      {
        label: '顺丰',
        value: '南苑顺丰'
      },{
        label: '中通',
        value: '南苑中通'
      },
      {
        label: '申通',
        value: '南苑申通'
      },{
        label: '圆通',
        value: '南苑圆通'
      },{
        label: '韵达',
        value: '南苑韵达'
      },{
        label: '邮政',
        value: '南苑邮政'
      },{
        label: '京东',
        value: '南苑京东'
      },{
        label: '快递柜',
        value: '南苑快递柜'
      },
      ],
    },
    {
      label: '北苑',
      value: '北苑',
      children:[ 
      {
        label: '快递柜',
        value: '北苑快递柜'
      },
      ],
    },];
    const userinfo = JSON.parse(localStorage.login);
    const cookie = localStorage.getItem('expresspost');
    const expressValue=ref({
         express: {
          userName : userinfo.name,
          userId : userinfo.id,
          name:(cookie==null || cookie ==='') ? "" : JSON.parse(cookie).name,
          code:(cookie==null || cookie ==='') ?"": JSON.parse(cookie).code,
          time:(cookie==null || cookie ==='') ? Date.parse(new Date()): JSON.parse(cookie).time,
          cost:(cookie==null || cookie ==='') ?10: JSON.parse(cookie).cost,
          contact:(cookie==null || cookie ==='') ?"": JSON.parse(cookie).contact,
          info:(cookie==null || cookie ==='') ?'': JSON.parse(cookie).info,
          },
         },
    );
    function setPhoneNum(){
      const userinfo = JSON.parse(localStorage.login);
      expressValue.value.express.contact=userinfo.phoneNum;
    }
    const submit=()=>{
      formRef.value?.validate((errors) => {
          if (!errors) {
            let params = new URLSearchParams();
        params.append("json",JSON.stringify(expressValue.value));
        
        axios.post(
         "http://localhost:8082/ExpressServlet", params)
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
      localStorage.setItem('expresspost',JSON.stringify(expressValue.value.express));
      message.success(
          "暂存成功"+localStorage.getItem('expresspost'),
          {
            keepAliveOnHover: true
          }
        );
    };

    const clear=()=>{
      localStorage.removeItem('expresspost');
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
        express: {
          name: {
            required: true,
            message: '请输入快递点',
            trigger: 'blur'
          },
          code: {
            required: true,
            message: '请输入取件码',
            trigger: 'blur'
          },
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
        ref="formRef" :model="expressValue" :rules="rules" label-placement="left" label-width="auto"
        >
        <n-grid :cols="2" :x-gap="24">
        <n-form-item-gi
        label="快递点名称"
        path="express.name"
      >

        <n-cascader
          v-model:value="expressValue.express.name"
          placeholder=""
          :expand-trigger="hoverTrigger ? 'hover' : 'click'"
          :check-strategy="checkStrategyIsChild ? 'child' : 'all'"
          :show-path="showPath"
          :filterable="filterable"
          :options="expressOptions"
          @update:value="expressValue.express.name"
        />
        <!--
        <pre>{{ JSON.stringify(expressValue, null, 2) }}</pre>
        -->
      </n-form-item-gi>
      </n-grid>
          <n-form-item-row label="取件码" path = "express.code">
            <n-input type="input" v-model:value="expressValue.express.code" name="code"/>
          </n-form-item-row>        
          <n-form-item-row label="时间" path = "express.time">
            <n-date-picker type="datetime" v-model:value="expressValue.express.time" clearable name="time"/>
          </n-form-item-row>
          <n-form-item-row label="金额" path = "express.cost">
            <n-input-number  v-model:value="expressValue.express.cost" clearable :precision="2" ><template #prefix>￥</template></n-input-number>
          </n-form-item-row>
          <n-grid :cols="2" :x-gap="24">
            <n-gi>
          <n-form-item-row label="手机号" path = "express.contact">
            <n-input type="input" v-model:value="expressValue.express.contact" @update:value="expressValue.express.contact" name="contact"/>
          </n-form-item-row>
        </n-gi>
        <n-gi><n-button  type="primary" @click="setPhoneNum" tertiary blocked >
          使用注册手机号
        </n-button></n-gi>
          </n-grid>
          <n-form-item-row label="地址:" path = "express.info">
              <n-input
              v-model:value="expressValue.express.info"
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