<template>

  <div class="container-fluid">
    <div class="row">
      <div class="col" id="menu-config">
        <Header />
      </div>
      <div class="col-6" id="body-config">
        <nuxt />
      </div>
      <div class="col" id="player-config">
        <Player />
      </div>
    
    </div>

  </div>

</template>



<script>
import Header from '~/components/Header/Header.vue'
import Player from '~/components/Player.vue'

export default{
    components: {Header, Player}
}
</script>

<style>
  #menu-config{
    padding: 1vw;
    height: 100vh;
    background: rgb(4, 4, 4);
  }
  #body-config{
    padding: 1vw;
    height: 100vh;
    background: rgb(6, 6, 6);
  }
  #player-config{
    padding: 1vw;
    height: 100vh;
    background: rgb(8, 8, 8);
  }
</style>