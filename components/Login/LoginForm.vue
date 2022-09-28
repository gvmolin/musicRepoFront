<template>
  <div class="login-container default-border ">
    <div class="title">
      <h1>musicRepo</h1>
    </div>

    <div class="login-info-container">
      <label for="username">Username:</label>
      <input type="text" class="default-input default-radius" v-model="form.username">
    </div>
    <div class="login-info-container">
      <label for="username">Password:</label>
      <input type="password" class="default-input default-radius" v-model="form.password">
    </div>
    <div class="login-button-container">
      <button @click="onLogin" class="btn btn-transparent default-border default-hover">Login</button>
      <div class="forgot-password-link">
        <a href="">
          <h6>forgotPassword?</h6>
        </a>
      </div>
    </div>
    <hr style="margin:2vh 0;">
    <button 
      class="btn btn-transparent default-border default-hover"
      @click="$emit('onClickCreateAccount')"
    >
      newAccount
    </button>
  </div>

</template>

<script>

const INITIAL_FORM = {
  username: '',
  password: '',
}

export default {
  components: {},
  data() {
    return {
      form: INITIAL_FORM,
    }
  },

  methods: {
    onLogin() {
      // console.log(this.form)
      this.$emit('onLogin', this.form)
    },
  },

}
</script>

<style scoped>
.login-container {
  background: rgb(15, 15, 15);
  width: fit-content;
  padding: 3vw;
  height: fit-content;
}

.login-info-container {
  display: flex;
  flex-direction: column;
  margin: 2vh 0;
}

.login-container button {
  width: 100%;
  color: #31087B;
  margin: 0;
}

.forgot-password-link {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5vh;

}

.forgot-password-link a h6 {
  letter-spacing: 0;
  text-align: end;
}
</style>