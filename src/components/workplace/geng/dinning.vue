<template>
<n-message-provider>
    <n-form 
        ref="formRef" :model="DiningValue" :rules="rules"
        >
          <n-form-item-row label="食堂名称" path = "UserLogin.account">
            <n-input type="input"  v-model:value="DiningValue.Dining.name" @update:value="DiningValue.Dining.name" name="name"/>
          </n-form-item-row>
          <n-form-item-row label="时间" path = "UserLogin.passwd">
            <n-date-picker type="datetime" v-model:value="DiningValue.Dining.time" @update:value="DiningValue.Dining.time" name="time"/>
          </n-form-item-row>
          <n-form-item-row label="金额" path = "UserLogin.passwd">
            <n-input type="input" v-model:value="DiningValue.Dining.cost" @update:value="DiningValue.Dining.cost" name="cost"/>
          </n-form-item-row>
          <n-form-item-row label="联系方式" path = "UserLogin.passwd">
            <n-input type="input" v-model:value="DiningValue.Dining.contact" @update:value="DiningValue.Dining.contact" name="contact"/>
          </n-form-item-row>
          <n-form-item-row label="详细信息" path = "UserLogin.passwd">
            <n-input type="input" v-model:value="DiningValue.Dining.information" @update:value="DiningValue.Dining.information" name="information"/>
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
    const DiningValue=ref({
         Dining: {
          name:"一",
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
        params.append("json",JSON.stringify(DiningValue.value));
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
        params.append("json",JSON.stringify(DiningValue.value));
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
        Dining: {
          name: {
            required: true,
            message: '请输入食堂名称',
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
            required: true,
            message: '请输入详细信息',
            trigger: 'blur'
          }
        },
    },);
</script>