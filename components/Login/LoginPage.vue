<template>
  <div>
    <LoginForm 
      v-if="loginPage"
      @onLogin="$emit('onLogin')" 
      @onClickCreateAccount="onClickCreateAccount"
      
    />
    <CreateAccount 
      v-else-if="createAccount"
      @onClickBackButton="backButtonClicked"
    />
    

  </div>
  
  
</template>

<script>
import LoginForm from './LoginForm.vue'
import CreateAccount from './NewAccount.vue'

export default {
  components: { LoginForm, CreateAccount }, 
  data() {
    return {
      loginPage: true,
      createAccount: false,
    }
  },

  watch : {
    // loginPage(){
    //   this.refreshController()
    // },
    // createAccount(){
    //   this.refreshController()
    // }
  },

  methods: {
    onLogin(){
      this.$emit('onLogin')
    }, 

    refreshController(){
      if(this.loginPage === true){
        this.createAccount = false
      }
      if(this.createAccount === true){
        this.loginPage = false
      }
    },

    onClickCreateAccount(){
      this.loginPage = false
      this.createAccount = true
    },

    backButtonClicked(){
      this.loginPage = true
      this.createAccount = false
    }

  },

}
</script>

<style scoped>


</style>