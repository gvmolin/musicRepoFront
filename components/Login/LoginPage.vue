<template>
  <div>
    <LoginForm v-if="loginPage" @onLogin="onLogin" @onClickCreateAccount="onClickCreateAccount" />
    <CreateAccount v-else-if="createAccount" @onClickBackButton="backButtonClicked"
      @accountCreated="()=>{loginPage = true; createAccount = false; onNotify()}" />

  </div>


</template>

<script>
import LoginForm from './LoginForm.vue'
import CreateAccount from './NewAccount.vue'
import NotificationVue from '../Notifications/Notification.vue'

export default {
  components: { LoginForm, CreateAccount, NotificationVue },
  data() {
    return {
      loginPage: true,
      createAccount: false,
    }
  },

  methods: {
    onLogin(e) {
      this.$emit('onLogin', e)
    },

    refreshController() {
      if (this.loginPage === true) {
        this.createAccount = false
      }
      if (this.createAccount === true) {
        this.loginPage = false
      }
    },

    onClickCreateAccount() {
      this.loginPage = false
      this.createAccount = true
    },

    backButtonClicked() {
      this.loginPage = true
      this.createAccount = false
    },

    onNotify() {
      this.$bvToast.toast(`Now please login to your new account.`, {
        title: 'Success',
        autoHideDelay: 3000,
        appendToast: true,
        toaster: 'b-toaster-bottom-right',
        variant:"success",
      })
    }

  },

}
</script>

<style scoped>

</style>