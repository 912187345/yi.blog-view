import * as path from './path';
import Vue from 'vue';
import Router from 'vue-router';

import logon from '../page/logon/logon'
import register from '../page/logon/register'
import setting from '../page/myself/setting'
import myBlog from '../page/myself/myBlog'

import msgBoard  from '../page/messageBoard/messageBoard'

import blogDetail from '../page/blog/detail'
import blogList from '../page/blog/list'
import editorBlog from '../page/blog/editorBlog'

import store from '../store/index';
Vue.use(Router)

const route =  new Router({
  mode:'hash',
  routes: [
    { path: '/', redirect: '/blogList' },
    {
      path: '/logon',
      name: 'logon',
      component: logon
    },
    {
      path:'/register',
      name:'register',
      component: register
    },
    {
      path:'/msgBoard',
      name:'msgBoard',
      component:msgBoard
    },
    {
      path:'/blogList',
      name:'blogList',
      component:blogList
    },
    {
      path:'/blogDetail',
      name:'blogDetail',
      component:blogDetail
    },
    {
      path:'/editorBlog',
      name:'editorBlog',
      component:editorBlog
    },
    {
      path:'/setting',
      name:'setting',
      component:setting
    },
    {
      path:'/myBlog',
      name:'myBlog',
      component:myBlog
    }
  ]
})
route.beforeEach((to, from, next)=>{
  let url = ['logon','register'] ; //不需要token也可以通行的page;
  let token = localStorage.getItem('token') || store.state.userToken;
  if( !token && url.indexOf(to.name) < 0 ){

    next({name:'logon'});
  }else{

    next();
  }
})
export default route;