import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

import * as types from './blogType';
const token = localStorage.getItem('token');
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
export default new Vuex.Store({
    state:{
        userInfo:userInfo,
        userToken:token,
        blogList:[]
    },
    mutations:{
        setUserInfo(state, data){
            state.userInfo = data;
            state.userToken = data.token;
            localStorage.setItem('token',state.userToken);
            localStorage.setItem('userInfo',JSON.stringify(data));
        },
        setBlogList(state, data){
            state.blogList = data;
        }
    },
    actions:{

    },
    getters:{
        token(state){
        }
    }
})