<template>
  <div>
    <div class="title-slot">
      <h1>liked Songs</h1>
      <!-- <button class="btn btn-transparent" type="button">
        <i class="fa-solid fa-plus"></i>
      </button> -->
    </div>
    
    <div>
      <div class="input-group mb-3">
        <input type="text" class="form-control default-input" placeholder="Search" aria-describedby="basic-addon3" />
        <div class="input-group-append">
          <span class="input-group-text input-symbol-sufix" id="basic-addon3">
            <button class="btn btn-transparent" type="button">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </span>
        </div>

      </div>

      <table class="table table-borderless">
        <thead>
          <tr>
            <th class="table-title" scope="col">#</th>
            <th class="table-title" scope="col">Music</th>
            <th class="table-title" scope="col">Artist</th>
            <th class="table-title" scope="col">Album</th>
            <th class="table-title" scope="col">Duration</th>
            <th class="table-title" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(music,i) in musics" 
            :key="music.name" 
            class="table-line"
            @click="$nuxt.$emit('selectMusic', music)"
          >
            <th scope="row">{{i + 1}}</th>
            <td>{{music.name}}</td>
            <td>{{ music.artist ?  music.name : '-'}}</td>
            <td>{{music.album}}</td>
            <td>{{music.duration}}</td>
            <td class="center">
                <button class="btn btn-transparent center">
                    <i class="fa-solid fa-heart"></i>
                </button>
            </td>
          </tr>

        </tbody>
      </table>

    </div>
  </div>


</template>

<script>
  export default {
    data(){
      return {
        musics: [
          {
            name:'name',
            album:'example',
            duration:'3:48',

          },
          {
            name:'lorem',
            album:'ipsum',
            duration:'2:22',

          },
          {
            name:'mc zoi de gato',
            album:'hahaha',
            duration:'6:66',

          },
          {
            name:'in_the_end.mp3',
            album:'hybrid theory',
            duration:'3:45',

          },
          {
            name:'lorem22',
            album:'ipsum',
            duration:'2:22',

          }
        ],
      }
      
      
    },

    mounted(){
      this.$emit('render')
    },

    methods: {
      onSelectMusic(){

      }
    },
    
  }
</script>

<style>

.title-slot{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-slot button{
  border: #31087B 1px solid;
}

.title-slot button:hover{
  transition: 0.5s;
  background-color: #30087b7a;
  color: black;
}

.center{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>