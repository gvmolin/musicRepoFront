<template>

  <div class="container-fluid" v-if="isLogged">
    <div class="row" v-if="render">
      <div :class="col1" id="menu-config">
        <Header @bodyOn="onBodyOn" />
      </div>
      <div :class="col2" id="body-config">
        <nuxt />
      </div>
      <div :class="col3" id="player-config">
        <Player @hidePlayer="onHidePlayer" />
      </div>
    </div>
  </div>

</template>



<script>
import { nextTick } from 'process'
import Header from '~/components/Header/Header.vue'
import Player from '~/components/Player.vue'

export default {
  components: { Header, Player },
  data() {
    return {
      step: '1',
      playerActive: false,
      bodyActive: false,
      col1: 'col',
      col2: 'none',
      col3: 'none',
      render: true,
      isLogged: true,
    }
  },

  watch: {
    bodyActive() {
      console.log('aaaaaaaaa')
      this.changeCols()
      this.reRender()
    },
    playerActive() {
      this.changeCols()
      //this.reRender()
    },
  },

  created() {
    this.$nuxt.$on('selectMusic', (obj) => {
      this.onSelectMusic(obj)
    })
  },

  methods: {
    onSelectMusic(obj) {
      this.playerActive = true,
      console.log(obj)
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
  background: rgb(6, 6, 6);
  overflow-y: auto;
}

#player-config {
  padding: 1vw;
  height: 100vh;
  background: rgb(8, 8, 8);
}

.none {
  display: none;
}

</style>