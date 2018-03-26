import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

import * as types from './blogType';
import commom from '../common';
let getApi = commom.getApi;
const token = localStorage.getItem('token');
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
let default_bg = '/bg/DEFAULT_BG.jpg';
export default new Vuex.Store({
    state:{
        userInfo:userInfo,
        userToken:token,
        blogList:[]
    },
    mutations:{
        setUserInfo(state, data){
            if( !data.background ){
                data.background = default_bg;
            }
            state.userInfo = data;
            state.userToken = data.token;
            localStorage.setItem('token',state.userToken);
            localStorage.setItem('userInfo',JSON.stringify(data));
        },
        setBlogList(state, data){
            state.blogList = data;
        },
        setBlog(state, data){
            state.blog = data;
        },
        setUserHead(state, data){
            state.userInfo.headImg = data;
            localStorage.setItem('userInfo',JSON.stringify(state.userInfo));
        },
        setBackground(state, data){
            state.userInfo.background = data;
            localStorage.setItem('userInfo',JSON.stringify(state.userInfo));
        }
    },
    actions:{

    },
    getters:{
        userInfo(state){
            return localStorage.setItem('userInfo',JSON.stringify(state.userInfo));
        }
    }
})