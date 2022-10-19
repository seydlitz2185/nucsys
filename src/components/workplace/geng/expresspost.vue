
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
    const message = useMessage();
    const formRef = ref(null);
    const ExpressValue=ref({
         express: {
          type:"",
          code:"",
          time: "",
          cost:"",
          contact:"",
          info:"",
          },
         },
    );
    const submit=()=>{
      formRef.value?.validate((errors) => {
          if (!errors) {
            let params = new URLSearchParams();
        params.append("json",JSON.stringify(ExpressValue.value));
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
        params.append("json",JSON.stringifyt(ExpressValue.value));
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
<template>
    <n-message-provider>
        <n-form 
            ref="formRef" :model="ExpressValue" :rules="rules"
            >
              <n-form-item-row label="快递种类" path = "express.type">
                <n-input type="input" v-model:value="ExpressValue.express.type" @update:value="ExpressValue.express.type" name="type"/>
              </n-form-item-row>
              <n-form-item-row label="取件码" path = "express.code">
                <n-input type="input" v-model:value="ExpressValue.express.code" @update:value="ExpressValue.express" name="code"/>
              </n-form-item-row>

              <n-form-item-row label="金额" path = "express.cost">
                <n-input type="input" v-model:value="ExpressValue.express.cost" @update:value="ExpressValue.express.cost" name="cost"/>
              </n-form-item-row>
              <n-form-item-row label="联系方式" path = "express.contact">
                <n-input type="input" v-model:value="ExpressValue.express.contact" @update:value="ExpressValue.express.contact" name="contact"/>
              </n-form-item-row>
              <n-form-item-row label="备注" path = "express.info">
                <n-input type="input" v-model:value="ExpressValue.express.info" @update:value="ExpressValue.express.info" name="information"/>
              </n-form-item-row>
            </n-form>
            <n-grid :cols="2" :x-gap="24" item-responsive="true">
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
      </n-grid>
    </n-message-provider>     
</template>
