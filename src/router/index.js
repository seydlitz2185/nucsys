import {createRouter,createWebHistory} from 'vue-router';
import HomePage from "../components/HomePage.vue";
import Welcome from "../components/Welcome.vue";
import Regist from '../components/Regist.vue';
import Search from '../components/Search.vue';
import Login from '../components/Login.vue';
import AboutUs from '../components/AboutUs.vue';
import HelloThere from '../components/HelloThere.vue';
import dining from '../components/workplace/dining.vue';
import mystate from '../components/workplace/mystate.vue';
import market from '../components/workplace/market.vue';
import settings from '../components/workplace/settings.vue';
import proxypick from '../components/workplace/proxypick.vue';
import express from '../components/workplace/express.vue';
import takeaway from '../components/workplace/takeaway.vue';
import diningpost from '../components/workplace/geng/diningpost.vue';
import expresspost from '../components/workplace/geng/expresspost.vue';
import marketpost from '../components/workplace/geng/marketpost.vue';
import admin from "../components/AdminPage/admin.vue";
import errorpage from "../components/ResultPage/error-page.vue";
import page403  from "../components/ResultPage/403.vue";
import page404  from "../components/ResultPage/404.vue";
import page500  from "../components/ResultPage/500.vue";
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
    redirect:'/HomePage/mystate',
    children:[
      {path:'/HomePage/dining',name:"dining",component:dining,props: true,
      children:[],},
      {path:'/HomePage/diningpost',name:"diningpost",component:diningpost, props: true,},
      {path:'/HomePage/expresspost',name:"expresspost",component:expresspost, props: true,},
      {path:'/HomePage/marketpost',name:"marketpost",component:marketpost, props: true,},
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
  {
    path:"/error-pages",
    name:"error-pages",
    component:errorpage,
    children:[
      {path:'/error-pages/403',name:"403",component:page403,props: true,},
      {path:'/error-pages/404',name:"404",component:page404,props: true,},
      {path:'/error-pages/500',name:"500",component:page500,props: true,},],
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