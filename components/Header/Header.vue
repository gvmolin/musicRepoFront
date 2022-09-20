<template>
  <div>
    <div class="col">
      <div class="title">
        <h1>musicRepo</h1>
      </div>
      <header-item-vue
       :sufix="'go'"
       :prefix="'Home'"
       :route="'/home'"
       :icon="'fa-solid fa-house'"
       @bodyOn="$emit('bodyOn')"
      />

      <header-item-vue
       :sufix="'my'"
       :prefix="'Musics'"
       :route="'/my'"
       :icon="'fa-solid fa-user'"
       @bodyOn="$emit('bodyOn')"
      />
     
      <header-item-vue
       :sufix="'all'"
       :prefix="'Musics'"
       :route="'/all'"
       :icon="'fa-solid fa-earth-americas'"
       @bodyOn="$emit('bodyOn')"
      />

      <header-item-vue
       :sufix="'liked'"
       :prefix="'Songs'"
       :route="'/liked'"
       :icon="'fa fa-heart'"
       @bodyOn="$emit('bodyOn')"
      />

      <header-item-vue
       :sufix="'play'"
       :prefix="'Lists'"
       :route="'/playlists'"
       :icon="'fa fa-list'"
       @bodyOn="$emit('bodyOn')"
      />

      <header-item-vue
       :sufix="'config'"
       :prefix="'Account'"
       :route="'/config'"
       :icon="'fa fa-cog'"
       @bodyOn="$emit('bodyOn')"
      />
    </div>
  </div>

</template>

<script>
import HeaderItemVue from './HeaderItem.vue';


export default {
  components:{HeaderItemVue},
  data(){
    return {
      
    }
  },

  mounted(){},

  methods: {
    consolelog(){
      console.log( 'clicado')
    },
  },
  
}
</script>

<style scoped>


</style>