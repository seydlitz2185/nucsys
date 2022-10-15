<template>
    <n-message-provider>
        <n-form 
            ref="formRef" :model="expressValue" :rules="rules"
            >
              <n-form-item-row label="快递种类" path = "UserLogin.passwd">
                <n-input type="input" v-model:value="expressValue.express.type" @update:value="expressValue.express.type" name="type"/>
              </n-form-item-row>
              <n-form-item-row label="取件码" path = "UserLogin.passwd">
                <n-input type="input" v-model:value="expressValue.express.code" @update:value="expressValue.express" name="code"/>
              </n-form-item-row>
              <n-form-item-row label="时间" path = "UserLogin.passwd">
                <n-date-picker type="datetime" v-model:value="expressValue.express.time" @update:value="expressValue.express.time" name="time"/>
              </n-form-item-row>
              <n-form-item-row label="金额" path = "UserLogin.passwd">
                <n-input type="input" v-model:value="expressValue.express.cost" @update:value="expressValue.express.cost" name="cost"/>
              </n-form-item-row>
              <n-form-item-row label="联系方式" path = "UserLogin.passwd">
                <n-input type="input" v-model:value="expressValue.express.contact" @update:value="expressValue.express.contact" name="contact"/>
              </n-form-item-row>
              <n-form-item-row label="备注" path = "UserLogin.passwd">
                <n-input type="input" v-model:value="expressValue.express.information" @update:value="expressValue.express.information" name="information"/>
              </n-form-item-row>
            </n-form>
            <n-button type="primary" @click="submit"  block secondary strong>
              提交
            </n-button>
            <n-button type="primary" @click="save"  block secondary strong>
              暂存
            </n-button>   
    </n-message-provider>     
</template>

<script setup>
import { defineComponent, ref ,watch} from "vue";
import{useMessage}from 'naive-ui';
import axios from 'axios';
import { useRouter, useRoute ,onBeforeRouteUpdate} from 'vue-router';

defineProps({
      msg: {
        type: String,
        required: true
      }
    });
    const expressValue=ref({
         express: {
          type:"",
          code:"",
          time: "",
          cost:"",
          contact:"",
          information:"",
          },
         },
    );
    const submit=()=>{
      formRef.value?.validate((errors) => {
          if (!errors) {
            let params = new URLSearchParams();
        params.append("json",JSON.stringify(expressValue.value));
        axios.post(
         "http://localhost:8082/RegisteServlet", params)
         .then(function(resp){
        if(resp.data==="提交成功"){
	      message.info(
          resp.data,
          {
            keepAliveOnHover: true
          }
        );
        sessionStorage.setItem('accessToken', 12321);
        router.push({name:"HomePage"});
	    }else{
        message.info(
          resp.data,
          {
            keepAliveOnHover: true
          }
        );
        router.push({name:"Regist"});
      }})
          } 
          else {
            console.log(errors);
            message.error("请检查输入内容");
          }});};
    
    const save=()=>{
      formRef.value?.validate((errors) => {
          if (!errors) {
            let params = new URLSearchParams();
        params.append("json",JSON.stringifyt(expressValue.value));
        axios.post(
         "http://localhost:8082/RegisteServlet", params)
         .then(function(resp){
        if(resp.data==="保存成功"){
	      message.info(
          resp.data,
          {
            keepAliveOnHover: true
          }
        );
        sessionStorage.setItem('accessToken', 12321);
        router.push({name:"HomePage"});
	    }else{
        message.info(
          resp.data,
          {
            keepAliveOnHover: true
          }
        );
        router.push({name:"Regist"});
      }})
          } 
          else {
            console.log(errors);
            message.error("请检查输入内容");
          }});};
    
    const rules =ref( {
        express: {
          type: {
            required: true,
            message: '请输入快递种类',
            trigger: 'blur'
          },  
          code: {
            required: true,
            message: '请输入取件码',
            trigger: 'blur'
          },
          time: {
            required: true,
            message: '请输入时间',
            trigger: 'blur'
          },
          cost: {
            required: true,
            message: '请输入金额',
            trigger: 'blur'
          },
          contact: {
            required: true,
            message: '请输入联系方式',
            trigger: 'blur'
          },
          information: {
            required: false,
            message: '请输入详细信息',
            trigger: 'blur'
          }
        },
    },);
</script>