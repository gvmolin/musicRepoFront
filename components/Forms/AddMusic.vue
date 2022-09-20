<template>
  <div>
    <div class="title-slot">
      <h1>addMusics</h1>
      <button class="btn btn-transparent" type="button" @click="$emit('closeTag')">
        <i class="fa-solid fa-minus"></i>
      </button>
    </div>


    <div class="form">
      <div style="width:33%;">
        <div class="form-item">
          <h3>add A Cover</h3>
          <label for="cover-input" id="cover-input-label">
            <i class="fa-solid fa-plus"></i>
          </label>
          <input id="cover-input" type="file" accept="image/png, image/jpeg" name="cover-input" style="display:none">
        </div>

        <div class="form-item">
          <h3>album Name:</h3>
          <input type="text" class="form-control default-input" placeholder="name" aria-label="Albums name"
            aria-describedby="basic-addon2" v-model="data.album.name">
        </div>

        <div class="form-item">
          <h3>artist Name:</h3>
          <input type="text" class="form-control default-input" placeholder="name" aria-label="Albums name"
            aria-describedby="basic-addon2" v-model="data.album.artist">
        </div>


      </div>

      <div style="width:64%;">

        <div class="form-item" v-for="(music, i) in data.musics" :id="_uid" :key="music.key">
          <h3>music Name:</h3>
          <input type="text" class="form-control default-input" placeholder="name" aria-label="Albums name"
            aria-describedby="basic-addon2" v-model="music.name">

          <label for="mp3-input" class="mp3-input-label default-hover">
            <i class="fa-solid fa-arrow-up"></i>
          </label>
          <input id="mp3-input" type="file" accept="image/png, image/jpeg" name="mp3-input" style="display:none">
        </div>

        <div id="array-controller">
          <button class="btn btn-transparent default-border default-hover" type="button" @click="removeMusic">
            <i class="fa-solid fa-minus"></i>
          </button>
          <button class="btn btn-transparent default-border default-hover" type="button" @click="addMusic">
            <i class="fa-solid fa-plus"></i>
          </button>
          <button class="btn btn-transparent default-border default-hover" type="button" @click="logForm">
            <i class="fa-solid fa-check"></i>
          </button>

        </div>

      </div>
    </div>
    <hr />
  </div>
</template>

<script>

const INITIAL_DATA = {
  album: {
    name: '',
    cover: '',
    artist: '',
  },
  musics: [
    {
      name: '',
      file: '',
      key: '1'
    },
  ]
}

export default {
  data() {
    return {
      data: INITIAL_DATA,


    }
  },

  methods: {
    logForm() {
      console.log(this.data)
    },

    addMusic() {
      this.data.musics.push({
        name: '',
        file: '',
        key: this.generateKey()
      })
    },

    removeMusic() {
      if(this.data.musics.length > 1){
        this.data.musics.pop()
      }
    },

    generateKey() {
      return Math.floor(Math.random() * 1000000)
    }
  },
}

</script>

<style scoped>
.mp3-input-label {
  border: #31087B solid 1px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 5vh;
  position: relative;
  margin-top: 1vh;
}

#array-controller{
  display: flex;
  justify-content: space-between;
}

#array-controller button{
  color:#31087B;
  width:32%;
}
</style>