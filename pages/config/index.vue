<template>
  <div>
    <div>
      <h1>configAccount</h1>
    </div>
    <ul>
      <li><a href=""><h2> editAccount </h2></a></li>
      <li><a href=""><h2> deleteAllUploadedFiles </h2></a></li>
      <li><a href=""><h2> deleteAccount </h2></a></li>
      <li><a @click="onLogout"><h2> exit </h2></a></li>
    </ul>
    

  </div>

</template>

<script>
export default {
  methods:{
    async onLogout(){
      const obj = {
        refreshToken: localStorage.token
      };
      console.log(obj)
      await this.$axios.$post('api/auth/logout', obj)
        .then(() => {
          localStorage.removeItem('token')
          this.$router.go(0)
        })
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
}

h2:hover{
  font-size: 2.1vw;
}

a:hover {
  text-decoration: none;
  
}
</style>