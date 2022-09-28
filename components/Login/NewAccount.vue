<template>
  <div class="create-container default-border ">
    <div class="title">
      <h1>newAccount</h1>
    </div>

    <div class="create-info-container">
      <label for="username">Username:</label>
      <input type="text" class="default-input default-radius" v-model="form.username">

    </div>
    <div class="create-info-container">
      <label for="username">Password:</label>
      <div class="input-group">
        <input :type="passwordInputType" class="form-control default-input default-radius" style="color: #31087B"
          v-model="form.password">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" style="border:none; background-color: rgba(255, 255, 255, 0.05);"
            type="button" @click="passwordInputType = (passwordInputType === 'password' ? 'text' : 'password')">
            <i class="fa-solid fa-eye"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="create-info-container">
      <label for="username">Confirm Password:</label>
      <input type="password" class="default-input default-radius" v-model="form.password_confirm">
    </div>
    <div class="create-button-container">
      <button @click="onCreate" class="btn btn-transparent default-border default-hover">create</button>
    </div>
    <hr style="margin:2vh 0;">
    <button class="btn btn-transparent default-border default-hover" @click="$emit('onClickBackButton')">
      <i class="fa-solid fa-arrow-left"></i> goBack
    </button>
  </div>

</template>

<script>
const INITIAL_FORM = {
  username: '',
  password: '',
  password_confirm: '',
}

export default {
  components: {},
  data() {
    return {
      passwordInputType: 'password',
      form: INITIAL_FORM
    }
  },

  methods: {
    async onCreate() {
      if (this.form.password === this.form.password_confirm) {
        await this.$axios.post('/api/users', this.form)
          .then((res) => {
            if (res.status === 201) {
              this.form = INITIAL_FORM;
              this.$emit('accountCreated');
            }
          })
        .catch((err)=>{
          if (err) {
            this.$bvToast.toast(`Username already in use, try again.`, {
              title: 'Failed',
              autoHideDelay: 3000,
              appendToast: true,
              toaster: 'b-toaster-bottom-right',
              variant: "danger",
              noCloseButton: true,
              bodyClass: 'toast-body-class-fail',
              headClass: 'example'
            })
          }
        })
      } else {
        if (err) {
            this.$bvToast.toast(`The password confirmation doesn't match.`, {
              title: 'Failed',
              autoHideDelay: 3000,
              appendToast: true,
              toaster: 'b-toaster-bottom-right',
              variant: "danger",
              noCloseButton: true,
              bodyClass: 'toast-body-class-fail',
              headClass: 'example'
            })
          }
      }

    },
  },

}
</script>

<style scoped>
.create-container {
  background: rgb(15, 15, 15);
  width: fit-content;
  padding: 3vw;
  height: fit-content;
}

.create-info-container {
  display: flex;
  flex-direction: column;
  margin: 2vh 0;
}

.create-container button {
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

.example{
  background-color: blue;
  width: 100vw;
}

.forgot-password-link a h6 {
  letter-spacing: 0;
  text-align: end;
}
</style>