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
          <Player  
            v-if="playerActive"
            @hidePlayer="onHidePlayer"
            :music="selectedMusic"
            :musics="musicsList"
          />
        </div>
      </div>
    </div>
    <div id="login-page" v-else>
      <div>
        <Login @onLogin="onLogin" />
      </div>
    </div>
  </div>


</template>



<script>
import { nextTick } from 'process'
import Header from '~/components/Header/Header.vue'
import Player from '~/components/Player.vue'
import Login from '~/components/Login/LoginPage.vue'

const INITIAL_MUSIC = {
  album:'',
  created:'',
  deleted:'',
  file:'',
  formatedCreated:'',
  id:'',
  name:'',
  updated:'',
  updatedBy:'',
}

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
      isLogged: true,
      token: localStorage.getItem("token"),
      selectedMusic:INITIAL_MUSIC,
      musicsList:[],

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
    isLogged() {
      this.changeCols()
      this.reRender()
    },
  },

  created() {
    this.$nuxt.$on('selectMusic', (obj) => {
      this.playerActive = true;
      this.selectedMusic = obj.music;
      this.musicsList = [...obj.list];
    })
  },

  async mounted() {
    if (!localStorage.getItem("token")) {
      this.isLogged = false
    }

    if (this.isLogged === false) {
      this.$router.push('/home')
    }
  },

  methods: {
    onLogin(e) {
      try {
        this.$axios.$post('/api/auth', e)
          .then(res => {
            if (res != '' && res != null && res) {
              localStorage.setItem("token", res.accessToken);
              this.bodyActive = false
              this.playerActive = false
              this.isLogged = true
              this.reRender()
            } else {
              this.$bvToast.toast(`Incorrect password, try again.`, {
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
          .catch(err => {
            this.$bvToast.toast(`Incorrect username, try again.`, {
              title: 'Failed',
              autoHideDelay: 3000,
              appendToast: true,
              toaster: 'b-toaster-bottom-right',
              variant: "danger",
              noCloseButton: true,
              bodyClass: 'toast-body-class-fail',
              headClass: 'example'
            })
          })
      } catch (error) {
        console.log(error)
      }
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
  overflow-x: hidden;
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