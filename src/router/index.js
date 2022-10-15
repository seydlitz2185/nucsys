import {createRouter,createWebHistory} from 'vue-router';
import HomePage from "../components/HomePage.vue";
import Welcome from "../components/Welcome.vue";
import Regist from '../components/Regist.vue';
import Search from '../components/Search.vue';
import Login from '../components/Login.vue';
import AboutUs from '../components/AboutUs.vue';
import HelloThere from '../components/HelloThere.vue';
import dinning from '../components/workplace/dinning.vue';
import mystate from '../components/workplace/mystate.vue';
import market from '../components/workplace/market.vue';
import settings from '../components/workplace/settings.vue';
import proxypick from '../components/workplace/proxypick.vue';
import express from '../components/workplace/express.vue';
import takeaway from '../components/workplace/takeaway.vue';
import dinningpost from '../components/workplace/geng/dinning.vue';
import admin from "../components/AdminPage/admin.vue";
import { useMessage } from 'naive-ui';
const message = useMessage();
const routes=[
  {
    path:"/HelloThere",
    name:"HelloThere",
    component: HelloThere,
  },
  {
    path:"/HomePage",
    name:"HomePage",
    props: true,
    component:HomePage,
    meta:{
      requireAuth:true,
    },
    //redirect:'/HomePage/mystate',
    children:[
      {path:'/HomePage/dinning',name:"dinning",component:dinning,props: true,
      children:[{path:'/HomePage/dinning/dinningpost',name:"dinningpost",component:dinningpost, props: true,},],},
      {path:'/HomePage/mystate',name:"mystate",component:mystate,props: true},
      {path:'/HomePage/settings',name:"settings",component:settings,props: true},
      {path:'/HomePage/admin',name:"admin",component:admin,props: true},
      {path:'/HomePage/express',name:"express",component:express,props: true},
      {path:'/HomePage/takeaway',name:"takeaway",component:takeaway,props: true},
      {path:'/HomePage/proxypick',name:"proxypick",component:proxypick,props: true},
      {path:'/HomePage/market',name:"market",component:market,props: true},],},
  {
    path:"/",
    name:"Welcome",
    component: Welcome,
  },{
    path:'/Regist',
    name:"Regist",
    component: Regist,
  },{
    path:'/Login',
    name:"Login",
    component: Login,
  },{
    path:"/Search",
    name:"Search",
    component:Search,
  },{
    path:"/AboutUs",
    name:"AboutUs",
    component:AboutUs,
  },
];

const router = createRouter({history:createWebHistory(),routes,});
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { //判断是否需要登录验证

      var num = sessionStorage.getItem("accessToken"); //这里是登录页面缓存的token
      if (num == 12321) { //判断token等于时候就跳转路由
          next();//这个跳转是上面路由跳转
      }
      else { //token不一样时候就返回登录页面
          next({
              path: '/Regist',//返回登录界面
              // query: {redirect: to.fullPath}  
          })
          
      }
  }
  else {
      //如果不需要登录权限就直接跳转到该路由
      next();
  }
});


export default router;