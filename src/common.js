import axios from 'axios';
import store from '../src/store/index';
var GetApi = {};
var axiosFn = (method, params)=>{
    return new Promise((res, rej)=>{
        let resParam = params.param || {};
        if( !params.url ){
            console.error('pls input url');
            throw err;
        }
        let config = params.param;
        config = {
            method:method,
            url: '/api' + params.url
        }
        if( method === 'GET' ){
    
            config.params = resParam || {};
            config.data = null;
        }else if( method === 'POST' ){
    
            config.params = null;
            config.data = resParam || {};
        }
    
        let token = localStorage.getItem('token') || store.state.userToken;
        if( token ){
            if( method === 'GET' ){
    
                config.params.token = token;
            }else if(method === 'POST'){
    
                config.data.token = token;
            }
        }
        let url = ['/api/register','/api/logon','/api/upload-head-image','/api/get-blog','/api/get-blog-by-id'] //里面的请求不需要带token
        if( url.indexOf(config.url) === -1 ){
            if( !config.data.token || config.data.token === 'undefined' ){
                return alert('请先登录');
            }
        }
        axios(config)
        .then((data)=>{
        if( data.status === 200 ){
            if( data.data.status === 'Re' ){
                return alert('请先登录');
            }
            res(data.data);
        }else{

            rej(data.data);
        }
        },err=>{

            rej(err)
        })
    })
    
}
GetApi.get = (params)=>{
    return axiosFn('GET',params);
}
GetApi.post = (params)=>{
    return axiosFn('POST',params);
}
export default {
    getApi:GetApi
}