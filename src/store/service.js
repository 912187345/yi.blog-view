import commom from '../common';
let getApi = commom.getApi;
export default {
    actions:{
        logon({},param={}){
            let params = {
                url:'/logon',
                param:param.param || param
            }
            return getApi.post(params)
        },
        register({},param={}){
            let params = {
                url:'/register',
                param:param.param || param
            }
            return getApi.post(params)
        },
        getBlogList({},param={}){
            let params = {
                url:'/blog/get-blog',
                param:param.param || param
            }
            return getApi.post(params)  
        },
        addBlog({},param={}){
            let url = '/blog/add-blog';
            if(param.type && param.type === 'edit'){
                url = '/blog/edit-blog';
            }
            let params = {
                url:url,
                param:param.param || param
            }
            return getApi.post(params)
        },
        deleteBlog({},param={}){
            let url = '/blog/delete-blog';
            let params = {
                url:url,
                param:param.param || param
            }
            return getApi.post(params)
        },
        getBlogById({},param={}){
            let url = '/blog/get-blog-by-id';
            let params = {
                url:url,
                param:param.param || param
            }
            return getApi.post(params)
        },
        blogComments({},param={}){
            let url = '/comments/blog-comments';
            let params = {
                url:url,
                param:param.param || param
            }
            return getApi.post(params)
        },
        deleteComments({},param={}){
            let url = '/comments/delete-comments';
            let params = {
                url:url,
                param:param.param || param
            }
            return getApi.post(params)
        },
        replyComments({},param={}){
            let url = '/comments/reply-comments';
            let params = {
                url:url,
                param:param.param || param
            }
            return getApi.post(params)
        },
        editUser({},param={}){
            let url = '/usersetting/edit-user';
            let params = {
                url:url,
                param:param.param || param
            }
            return getApi.post(params)
        },
        collection({},param={}){
            let url = '/blog/collection';
            let params = {
                url:url,
                param:param.param || param
            }
            return getApi.post(params)
        },
        getCollection({},param={}){
            let url = '/blog/get-collection';
            let params = {
                url:url,
                param:param.param || param
            }
            return getApi.post(params)
        }
    }
}