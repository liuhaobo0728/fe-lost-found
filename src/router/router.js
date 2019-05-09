import Vue from 'vue'
import Router from 'vue-router'

import UserLayout from "../layout/userLayout.vue";
import homeLayout from "../layout/homeLayout.vue";
import Login from "../views/user/Login.vue";
import Register from "../views/user/Register.vue";
import userinfo from "../views/user/userinfo.vue";
import activate from "../views/user/activate.vue";
import forgetpass from "../views/user/forgetpass.vue";

import home from "../views/home/Home.vue";
import send from "../views/home/send.vue";
import contain from "../views/home/content.vue";
import usercenter from "../views/user/usercenter.vue";
import phone from "../views/home/phone.vue";



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/touser",
      component: UserLayout,
      children: [
        {
          path: "/touser/login",
          name: "login",
          component: Login
        },
        {
          path: "/touser/register",
          name: "register",
          component: Register
        },
        {
          path: "/touser/info",
          name: "userinfo",
          component: userinfo
        },
        {
          path: "/touser/forgetpass",
          name: "forgetpass",
          component: forgetpass
        }
      ]
    },
    {
      path: "/activate",
      name: "activate",
      component: activate
    },
    {
      path: "/phone",
      name: "phone",
      component: phone
    },
    {
      path: "/",
      component: homeLayout,
      children: [
        {
          path: "/",
          redirect: "/home/main"
        },
        {
          path: "/home/main",
          name: "main",
          component: home
        },
        {
          path: "/home/send",
          name: "send",
          component: send
        },
        {
          path: "/home/contain",
          name: "contain",
          component: contain
        },
        {
          path: "/home/center",
          name: "usercenter",
          component: usercenter
        }
      ]
    }
  ]
})
