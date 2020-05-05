<template>
    <div class="container">
        <alert
        v-if = "sharedStated.is_new"
        v-bind:variant="alertVariant"
        v-bind:message="alertMessage">
    </alert>
    <h1>Sign in</h1>
    <div class="row">
        <div class="col-md-4">
            <form @submit.prevent="onSubmit">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" v-model="loginForm.username" class="form-control" v-bind:class="{'is-invalid':loginForm.usernameError}" id="username" placeholder="">
                    <div v-show="loginForm.usernameError" class="invalid-feedback">{{loginForm.usernameError}}</div>
                </div>
                <div class="form-group"></div>
                <label for="password">Password</label>
                <input type="password" v-model="loginForm.password" class="form-control" v-bind:class="{'is-invalid': loginForm.passwordError}" id="password" placeholder="">
                <div v-show="loginForm.passwordError" class="invalid-feedback">{{loginForm.passwordError}}</div>
                <br>
                <button type="submit" class="btn btn-primary btn-block">Sign in</button>
            </form>
        </div>
    </div>
    <br>
    <p>New User?<router-link to="/register">Click to Register</router-link></p>
    <p>
        Forgot Your Password?
        <a href="#">Click to Reset It</a>
    </p>
</div>
</template>
<script>
//import axios from 'axios'
//import Alert from './Alert.vue'
import store from '../store'

export default{
    name:'Login',//this is the name of the component
    data(){
        return {
            sharedStated:store.state,
            //alertVariant:'info',
            //alertMessage:'Congratulations, you are now a registered user !',
            loginForm:{
                username:'',
                password:'',
                submitted: false, 
                errors: 0,
                usernameError:null,
                passwordError:null
            }
        }
    },
    methods:{
        onSubmit(e){ 
            this.loginForm.submitted = true
            this.loginForm.errors=0

            if(!this.loginForm.username){
                this.loginForm.errors++
                this.loginForm.usernameError='Username required'
            }else{
                this.loginForm.usernameError=null
            }
            if(!this.loginForm.password){
                this.loginForm.errors++
                this.loginForm.passwordError='Password required'
            }else{
                this.loginForm.passwordError=null
            }
            if(this.loginForm.errors>0){
                // 表单验证没通过时，不继续往下执行，即不会通过 axios 调用后端API
                return false
            }
            const path = '/tokens'
            //axios 实现Basic Auth需要在config中设置 auth 这个属性即可  验证basic authentic
            this.$axios.post(path,{},{
                auth:{
                    'username': this.loginForm.username,
                    'password': this.loginForm.password
                }
            }).then((response)=>{
                //handle success
                window.localStorage.setItem('blog-token',response.data.token)
                //store.resetNotNewAction()
                store.loginAction()
                const name = JSON.parse(atob(response.data.token.split('.')[1])).name
                this.$toasted.success(`Welcome ${name}!`, { icon: 'fingerprint' })
                if(typeof this.$route.query.redirect=='undefined'){
                    this.$router.push('/')
                }else{
                    this.$router.push(this.$route.query.redirect)
                }
            }).catch((error)=>{
                if (error.response.status == 401) {
            this.loginForm.usernameError = 'Invalid username or password.'
            this.loginForm.passwordError = 'Invalid username or password.'
          } else {
            console.log(error.response)
                }
            })
        }
    }
}
</script>