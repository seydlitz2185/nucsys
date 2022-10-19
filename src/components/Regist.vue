<script setup>
  import { defineComponent, ref ,watch} from "vue";
  import{useMessage}from 'naive-ui';
  import axios from 'axios';
  import { useRouter, useRoute ,onBeforeRouteUpdate} from 'vue-router';
  import HomePage from "./HomePage.vue";


    defineProps({
      msg: {
        type: String,
        required: true
      }
    });
    const router = useRouter();
    const routes = useRoute();
    const message = useMessage();
    const formRef = ref(null);
    const LoginValue = ref({
         UserLogin: {
          account:"14119401",
          passwd: "123456",
          },
         
        },
        );
    const RegistValue=ref({
      UserRegist:{
            id:"14119402",
            userName:"王佳伟",
            userPhoneNum:"18168051462",
            userPassword:"123",
            duplicatePassword:"123",
          },
    },)
    function validatePasswordStartWith(rule, value) {
      return !!RegistValue.value.UserRegist.duplicatePassword && RegistValue.value.UserRegist.userPassword.startsWith(value) && RegistValue.value.UserRegist.userPassword.length >= value.length;
    }
    function validatePasswordSame(rule, value) {
      return value === RegistValue.value.UserRegist.userPassword;
    }
    function handlePasswordInput() {
        if (RegistValue.UserRegist.value.reenteredPassword) {
          RegistValue.UserRegist.value?.validate({ trigger: "password-input" });
        }
      }
    function validateEmail(rule,value){
      var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      return reg.test(value);
    }
    function validatePhoneNum(rule,value){
      var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/; 
      return reg_tel.test(value);
    }
    function validId(rule,value){
      var reg_id = /^[0-9]{8,11}$/;
      return reg_id.test(value);
    }
    const rules =ref( {
        UserLogin: {
          account: {
            required: true,
            message: '请输入学号',
            trigger: 'blur'
          },
          passwd: {
            required: true,
            message: '请输入密码',
            trigger: ['input', 'blur']
          }
        },
        UserRegist: {
          id: [
          {
            required: true,
            message: '学号不能为空',
            trigger: ['input']
          },
          {
            validator: validId,
            message: '请输入正确的学号',
            trigger: ['input', 'blur']
          }
          ],
          userName: [
          {
            required: true,
            message: '姓名不能为空',
            trigger: 'input'
          }],
          userPhoneNum:[
          {
            required: true,
            message:"手机号不能为空",
            trigger: 'input'
          },
          {
            validator:validatePhoneNum,
            message:"请输入正确的手机号码",
            trigger: ["blur", "input"]

          }],
          userPassword:[
          {
            required:true,
            message:"请输入密码",
          },
      
          ],
          duplicatePassword:[ 
          {
            required:true,
            message:"请再次输入密码",
            trigger:["input","blur"],
          },
          {
            validator:validatePasswordStartWith,
            message:"两次密码输入不一致",
            trigger: "input"
          },
          {
            validator:validatePasswordSame,
            message:"两次密码输入不一致",
            trigger: ["blur", "password-input"]
          },
          ],
        },

      },);

      const loginHomePageTest=()=>{
        sessionStorage.setItem('accessToken', 12321);
        /*router.push({name:"HomePage",params:{
          id:'14119401',
          name:'于世文',
        }});*/
        let params={
          id:'14119401',
          name:'于世文',
          msg:'',
          phoneNum:'12345',
        };
        //$cookies.set("login",params.name),60 * 60 * 24 * 30;
        localStorage.login=JSON.stringify(params);
        router.push({name:"HomePage",});
      };

    const loginAndJump=()=> {
      formRef.value?.validate((errors) => {
          if (!errors) {
          let params = new URLSearchParams();
        params.append("json",JSON.stringify(LoginValue.value));
        axios.post(
         "http://localhost:8082/LoginServlet",  params)
         .then(function(resp){
          let res =  resp.data;
        if(res.msg==="登陆成功"){
	      message.success(
          JSON.stringify(res),
          //res.msg,
          {
            keepAliveOnHover: true
          }
        );
        sessionStorage.setItem('accessToken', 12321);
        let data ={
          id:res.account,
          name:res.name,
          phoneNum:res.phoneNum,
        };
        localStorage.setItem('login',JSON.stringify(data));
       // $cookies.set("login",name,60 * 60 * 24 * 30);
        router.push({name:"HomePage"});
	    }else{
        message.error(
          res.msg,
          {
            keepAliveOnHover: true
          }
        );
        router.push({name:"Regist"});
      }})
          } else {
            console.log(errors);
            message.error("请检查输入内容");

          }
        });
      
      };

    const registAndJump=()=>{
      formRef.value?.validate((errors) => {
          if (!errors) {
            let params = new URLSearchParams();
        params.append("json",JSON.stringify(RegistValue.value));
        axios.post(
         "http://localhost:8082/RegisteServlet", params)
         .then(function(resp){
          let res =  resp.data;
        if(res.msg==="注册成功"){
	      message.success(
          res.msg,
          {
            keepAliveOnHover: true
          }
        );
        sessionStorage.setItem('accessToken', 12321);
        let data ={
          id:res.account,
          name:res.name,
          phoneNum:res.phoneNum,
        };
        //$cookies.set("login",data.name,60 * 60 * 24 * 30);
        localStorage.login=JSON.stringify(data);
        router.push({name:"HomePage"});
	    }else{
        message.errors(
          res.msg,
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


    </script>

    
    <template>
  <n-message-provider>

      <n-button type="primary" @click="loginHomePageTest"  block secondary strong>
          登录
        </n-button>
     
  <n-card class="obiwan" hoverable embedded
    :bordered="false">
    <n-tabs
      class="card-tabs"
      default-value="signin"
      size="large"
      animated
      style="margin: 0 -4px"
      pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
    >
 
      <n-tab-pane  class = "login" name="signin" tab="登录">
        <n-form 
        ref="formRef" :model="LoginValue" :rules="rules"
        >
          <n-form-item-row label="学号" path = "UserLogin.account">
            <n-input type="input"  v-model:value="LoginValue.UserLogin.account" @update:value="LoginValue.UserLogin.account" name="account"/>
          </n-form-item-row>
          <n-form-item-row label="密码" path = "UserLogin.passwd">
            <n-input type="input" v-model:value="LoginValue.UserLogin.passwd" @update:value="LoginValue.UserLogin.passwd" name="passwd"/>
          </n-form-item-row>
        </n-form>
        <n-button type="primary" @tap="loginAndJump" @click="loginAndJump"  block secondary strong>
          登录
        </n-button>
      </n-tab-pane>
      <n-tab-pane name="signup" tab="注册">
        <n-form 
        ref="formRef" :model="RegistValue" :rules="rules" 
        >
          <n-form-item-row label="学号" path = "UserRegist.id">
            <n-input type="input" v-model:value="RegistValue.UserRegist.id" @update:value="RegistValue.UserRegist.id"  name="id"/>
          </n-form-item-row>
          <n-form-item-row label="姓名" path = "UserRegist.userName">
            <n-input type="input" v-model:value="RegistValue.UserRegist.userName" @update:value="RegistValue.UserRegist.userName" name="userName"/>
          </n-form-item-row>
          <n-form-item-row label="手机号" path = "UserRegist.userPhoneNum">
            <n-input type="input" v-model:value="RegistValue.UserRegist.userPhoneNum" @update:value="RegistValue.UserRegist.userPhoneNum" name="userPhoneNum"/>
          </n-form-item-row>
          <n-form-item-row label="密码" path = "UserRegist.userPassword">
            <n-input type="input" v-model:value="RegistValue.UserRegist.userPassword" @update:value="RegistValue.UserRegist.userPassword" @input = handlePasswordInput() @keydown.enter.prevent name="userPasswd"/>
          </n-form-item-row>
          <n-form-item-row label="重复密码" path = "UserRegist.duplicatePassword">
            <n-input type="input" v-model:value="RegistValue.UserRegist.duplicatePassword" @update:value="RegistValue.UserRegist.duplicatePassword" @keydown.enter.prevent  name="passwdAuth"/>
          </n-form-item-row>
        </n-form>
        <n-button type="primary" @tap="registAndJump"  @click="registAndJump" block secondary strong>
          注册
        </n-button>
      </n-tab-pane>
    </n-tabs>
    <div></div>
  </n-card>

</n-message-provider>
    </template>

    <style scoped>
    #simple{
        border: 2px solid;
    }
    .header{
        border: 1px solid;
     
        text-align: center;

    }
    
    .card-tabs .n-tabs-nav--bar-type {
    padding-left: 4px;
    }

    .insert,.search{
        border: 1px solid;
        
        vertical-align: top;
    }
    .obiwan{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5); 
    border-radius: 8px; 
    width: 300rem;
    max-width: 100%;
    margin:auto;
    position:sticky;
    width: 380px;
  }

 
    </style>
    