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
          <label for="cover-input" id="cover-input-label" v-if="renderLabel">
            <i v-if="coverImage === null" class="fa-solid fa-plus"></i>
            <img v-else :src="coverImage" alt="your image" id="cover-image" style="width: 100%;"/>
          </label>
          <input 
            id="cover-input" 
            type="file" 
            accept="image/png, image/jpeg" 
            name="cover-input" 
            style="display:none" 
            v-on:change="onAddAlbumCover"
          >
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

          <label :for="'mp3-input' + i" class="mp3-input-label default-hover" :style="music.file === null ? '' : 'background-color:#30087b7a;'">
            <i class="fa-solid fa-arrow-up"></i>
          </label>
          <input :id="'mp3-input' + i" type="file" accept="audio/*" name="mp3-input" style="display:none" v-on:change="onChangeMusicFile(music, $event)">
        </div>

        <div id="array-controller">
          <button class="btn btn-transparent default-border default-hover" type="button" @click="removeMusic">
            <i class="fa-solid fa-minus"></i>
          </button>
          <button class="btn btn-transparent default-border default-hover" type="button" @click="addMusic">
            <i class="fa-solid fa-plus"></i>
          </button>
          <button class="btn btn-transparent default-border default-hover" type="button" @click="onCreate">
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
    file: null,
    artist: '',
  },
  musics: [
    {
      name: '',
      file: null,
      key: '1',
      album: null,
    },
  ]
}

export default {
  data() {
    return {
      data: {
        album: {
          name: '',
          file: null,
          artist: '',
        },
        musics: [
          {
            name: '',
            file: null,
            key: '1',
            album: null,
          },
        ]
      },
      coverImage: null,
      renderLabel: true,
    }
  },

  watch:{
    coverImage(){
      this.reRender()
    }
  },

  mounted(){
  },

  methods: {
    onChangeMusicFile(music, e){
      music.file = e.target.files[0]
    },

    reRender() {
      this.renderLabel = false
       this.$nextTick(() => {
        this.renderLabel = true
      })
    },

    onAddAlbumCover(e) {
      console.log(e)
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.data.album.file = files[0]
      this.coverImage = URL.createObjectURL(files[0])
    },

    logForm() {
      console.log(this.data)
    },

    addMusic() {
      this.data.musics.push({
        name: '',
        file: null,
        key: this.generateKey(),
        album: null,
      })
    },

    removeMusic() {
      if(this.data.musics.length > 1){
        this.data.musics.pop()
      }
    },

    generateKey() {
      return Math.floor(Math.random() * 1000000)
    },

    createFormData(obj){
      const formData = new FormData();
      // formData.append('file', obj.file)
      for (var key in obj) {
        formData.append(key, obj[key]);
      }
      return formData;
    },

    async onCreate(){
      await this.onCreateAlbum()
    },

    async onCreateAlbum() {
      const formData = this.createFormData(this.data.album)
      try {
        await this.$axios.$post('/api/albums', formData)
          .then(async (res) => {
            if (res) {
              this.$bvToast.toast(`Album '${this.data.album.name}' created.`, {
                title: 'Success',
                autoHideDelay: 2000,
                appendToast: true,
                toaster: 'b-toaster-bottom-right',
                variant: "success",
              });

              let count = 0
              this.data.musics.forEach(async (music, i) => {
                music.album = res.id;
                await this.onCreateMusic(music)
                count++
                if(count === this.data.musics.length){
                  this.data = INITIAL_DATA;
                  setTimeout(() => {
                    this.reRender();
                    this.$emit('closeTag')
                  }, 3000);
                } 
              })
            }
          })  
      } catch (error) {
        console.log(error)
      }
    },

    async onCreateMusic(music) {
      const formData = this.createFormData(music)
      try {
        await this.$axios.$post('/api/musics', formData)
        .then(res => {
          if (res.status === 201) {
            this.$bvToast.toast(`Music '${music.name}' uploaded.`, {
              title: 'Success',
              autoHideDelay: 2000,
              appendToast: true,
              toaster: 'b-toaster-bottom-right',
              variant: "success",
            });
          }
        })
      } catch (error) {
        console.log(error)
      }
      
    },
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