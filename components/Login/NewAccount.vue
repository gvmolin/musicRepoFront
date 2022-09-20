<template>
  <div class="create-container default-border ">
    <div class="title">
      <h1>newAccount</h1>
    </div>

    <div class="create-info-container">
      <label for="username">Username:</label>
      <input type="text" class="default-input default-radius">
    </div>
    <div class="create-info-container">
      <label for="username">Password:</label>
      <div class="input-group">
        <input 
          :type="passwordInputType" 
          class="form-control default-input default-radius" 
          style="color: #31087B"
        >
        <div 
          class="input-group-append"
        >
          <button class="btn btn-outline-secondary" 
            style="border:none; background-color: rgba(255, 255, 255, 0.05);" 
            type="button" 
            @click="passwordInputType = (passwordInputType === 'password' ? 'text' : 'password')"  
          >
            <i class="fa-solid fa-eye"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="create-info-container">
      <label for="username">Confirm Password:</label>
      <input 
        type="password" 
        class="default-input default-radius">
    </div>
    <div class="create-button-container">
      <button @click="$emit('createAccount')" class="btn btn-transparent default-border default-hover">create</button>
    </div>
    <hr style="margin:2vh 0;">
    <button 
      class="btn btn-transparent default-border default-hover"
      @click="$emit('onClickBackButton')"
    >
      <i class="fa-solid fa-arrow-left"></i>  goBack
    </button>
  </div>

</template>

<script>

export default {
  components: {},
  data() {
    return {
      passwordInputType: 'password',
    }
  },

  methods: {
    oncreate() {
      this.$emit('oncreate')
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

.forgot-password-link a h6 {
  letter-spacing: 0;
  text-align: end;
}


</style>