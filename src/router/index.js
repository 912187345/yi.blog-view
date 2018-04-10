import * as path from './path';
import Vue from 'vue';
import Router from 'vue-router';

const logon = r => require.ensure([], () => r(require('../page/logon/logon')), 'logon');
const register = r => require.ensure([], () => r(require('../page/logon/register')), 'register');
const setting = r => require.ensure([], () => r(require('../page/myself/setting')), 'setting');
const myBlog = r => require.ensure([], () => r(require('../page/myself/myBlog')), 'myBlog');

const msgBoard = r => require.ensure([], () => r(require('../page/messageBoard/messageBoard')), 'msgBoard');

const blogDetail = r => require.ensure([], () => r(require('../page/blog/detail')), 'blogDetail');
const blogList = r => require.ensure([], () => r(require('../page/blog/list')), 'blogList');
const editorBlog = r => require.ensure([], () => r(require('../page/blog/editorBlog')), 'editorBlog');

const page404 = r => require.ensure([], () => r(require('../page/404')), 'page404');

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
    },
    {
      path: '*', 
      name:'page404',
      component: page404 
    }
  ]
})
route.beforeEach((to, from, next)=>{
  let url = ['logon','register','blogDetail']; //不需要token也可以通行的page;
  let token = localStorage.getItem('token') || store.state.userToken;
  if( !token && url.indexOf(to.name) < 0 ){

    next({name:'blogList'});
  }else{

    next();
  }
})
export default route;