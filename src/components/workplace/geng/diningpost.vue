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
    const diningOptions=[ 
    {
      label: '南苑',
      value: '南苑',
      children:[ 
      {
        label: '一食堂',
        value: '南苑一食堂'
      },{
        label: '二食堂',
        value: '南苑二食堂'
      },
      {
        label: '三食堂',
        value: '南苑三食堂'
      },{
        label: '香樟树',
        value: '南苑香樟树'
      },
      ],
    },
    {
      label: '北苑',
      value: '北苑',
      children:[ 
      {
        label: '四食堂',
        value: '北苑四食堂'
      },{
        label: '五食堂',
        value: '北苑五食堂'
      },
      {
        label: '民族食堂',
        value: '北苑民族食堂'
      },
      ],
    },{
      label: '其他',
      value: '其他',
      children:[ 
      {
        label: '教工食堂',
        value: '教工食堂'
      },
      ],
    },];
    const userinfo = JSON.parse(localStorage.login);
    const cookie = localStorage.getItem('diningpost');
    const DiningValue=ref({
         Dining: {
          userName : userinfo.name,
          userId : userinfo.id,
          name:(cookie==null || cookie ==='') ? "" : JSON.parse(cookie).name,
          time:(cookie==null || cookie ==='') ? Date.parse(new Date()): JSON.parse(cookie).time,
          cost:(cookie==null || cookie ==='') ?10: JSON.parse(cookie).cost,
          contact:(cookie==null || cookie ==='') ?"": JSON.parse(cookie).contact,
          tags:(cookie==null || cookie ==='') ?[]: JSON.parse(cookie).tags,
          info:(cookie==null || cookie ==='') ?'不要辣椒': JSON.parse(cookie).info,
          },
         },
    );
    function setPhoneNum(){
      const userinfo = JSON.parse(localStorage.login);
      DiningValue.value.Dining.contact=userinfo.phoneNum;
    }
    const submit=()=>{
      formRef.value?.validate((errors) => {
          if (!errors) {
            let params = new URLSearchParams();
        params.append("json",JSON.stringify(DiningValue.value));
        
        axios.post(
         "http://localhost:8082/DiningServlet", params)
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
      localStorage.setItem('diningpost',JSON.stringify(DiningValue.value.Dining));
      message.success(
          "暂存成功"+localStorage.getItem('diningpost'),
          {
            keepAliveOnHover: true
          }
        );
    };

    const clear=()=>{
      localStorage.removeItem('diningpost');
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
        Dining: {
          name: {
            required: true,
            message: '请输入食堂名称',
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
        ref="formRef" :model="DiningValue" :rules="rules" label-placement="left" label-width="auto"
        >
        <n-grid :cols="2" :x-gap="24">
        <n-form-item-gi
        label="食堂名称"
        path="Dining.name"
      >

        <n-cascader
          v-model:value="DiningValue.Dining.name"
          placeholder=""
          :expand-trigger="hoverTrigger ? 'hover' : 'click'"
          :check-strategy="checkStrategyIsChild ? 'child' : 'all'"
          :show-path="showPath"
          :filterable="filterable"
          :options="diningOptions"
          @update:value="DiningValue.Dining.name"
        />
        <!--
        <pre>{{ JSON.stringify(DiningValue, null, 2) }}</pre>
        -->
      </n-form-item-gi>
      </n-grid>        
          <n-form-item-row label="时间" path = "Dining.time">
            <n-date-picker type="datetime" v-model:value="DiningValue.Dining.time" clearable name="time"/>
          </n-form-item-row>
          <n-form-item-row label="金额" path = "Dining.cost">
            <n-input-number  v-model:value="DiningValue.Dining.cost" clearable :precision="2" ><template #prefix>￥</template></n-input-number>
          </n-form-item-row>
          <n-grid :cols="2" :x-gap="24">
            <n-gi>
          <n-form-item-row label="手机号" path = "Dining.contact">
            <n-input type="input" v-model:value="DiningValue.Dining.contact" @update:value="DiningValue.Dining.contact" name="contact"/>
          </n-form-item-row>
        </n-gi>
        <n-gi><n-button  type="primary" @click="setPhoneNum" tertiary blocked >
          使用注册手机号
        </n-button></n-gi>
          </n-grid>
          <n-form-item-row label="标签" path = "Dining.tags">
            <n-dynamic-tags v-model:value="DiningValue.Dining.tags" name='info'/>
          </n-form-item-row>
          <n-form-item-row label="备注:" path = "Dining.info">
              <n-input
              v-model:value="DiningValue.Dining.info"
              type="textarea"
              placeholder="备注"
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

