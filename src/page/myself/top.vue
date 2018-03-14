<template>
    <div>
        <router-link to="/editorBlog">
            写博客
        </router-link>
        <div>
            name:{{ userInfo.username }}
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState({
            userInfo:'userInfo'
        })
    },
    mounted(){
        // console.log( this.$store.state.userInfo )
    }
}
</script>

<style>

</style>
