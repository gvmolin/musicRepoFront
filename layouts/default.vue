<template>
  <div>
    

    <div class="container-fluid" v-if="isLogged">
      <div class="row">
        <div :class="col1" id="menu-config">
          <Header @bodyOn="onBodyOn" />
        </div>
        <div :class="col2 || 'none'" id="body-config" v-if="render">
          <nuxt/>
        </div>
        <div :class="col3 || 'none'" id="player-config">
          <Player @hidePlayer="onHidePlayer" />
        </div>
      </div>
    </div>
    <div id="login-page" v-else>
      <div>
        <Login @onLogin="onLogin"/>
      </div>

    </div>


  </div>
  

</template>



<script>
import { nextTick } from 'process'
import Header from '~/components/Header/Header.vue'
import Player from '~/components/Player.vue'
import Login from '~/components/Login/LoginPage.vue'

export default {
  components: { Header, Player, Login },
  data() {
    return {
      playerActive: false,
      bodyActive: false,
      col1: 'col',
      col2: 'none',
      col3: 'none',
      render: true,
      isLogged: false,
    }
  },

  watch: {
    bodyActive() {
      this.changeCols()
      this.reRender()
    },
    playerActive() {
      this.changeCols()
      //this.reRender()
    },
    isLogged(){
      this.changeCols()
      this.reRender()
    }
  },

  created() {
    this.$nuxt.$on('selectMusic', (obj) => {
      this.onSelectMusic(obj)
    })
  },

  mounted(){
    if(this.isLogged === false){
      this.$router.push('/home')
    }
  },

  methods: {
    onSelectMusic(obj) {
      this.playerActive = true,
      console.log(obj)
    },

    onLogin(){
      this.bodyActive = false
      this.playerActive = false
      this.isLogged = true
      this.reRender()
    },

    changeCols() {
      if (this.bodyActive && this.playerActive) {
        this.col1 = 'col'
        this.col2 = 'col-6'
        this.col3 = 'col'
      } else if (this.bodyActive && !this.playerActive) {
        this.col1 = 'col-3'
        this.col2 = 'col-9'
        this.col3 = 'none'
      } else if (!this.bodyActive && !this.playerActive) {
        this.col1 = 'col'
        this.col2 = 'none'
        this.col3 = 'none'
      }
    },

    onBodyOn() {
      this.bodyActive = true
    },

    onHidePlayer() {
      this.playerActive = false
    },

    reRender() {
      this.render = false
      nextTick(() => {
        this.render = true
      })
    },
  },
}
</script>

<style scoped>
#menu-config {
  padding: 1vw;
  height: 100vh;
  background: rgb(4, 4, 4);
}

#body-config {
  padding: 1vw;
  height: 100vh;
  background: rgb(8, 8, 8);
  overflow-y: auto;
}

#player-config {
  padding: 1vw;
  height: 100vh;
  background: rgb(16, 16, 16);
}

#login-page {
  padding: 1vw;
  height: 100vh;
  background: rgb(8, 8, 8);
  display: flex;
  justify-content: center;
  align-items: center;
}



</style>