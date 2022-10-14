<template>
  <div>
    <div class="title-slot">
      <h1>player</h1>
      <button @click="$emit('hidePlayer')" class="btn btn-transparent" type="button">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
    </div>

    <div class="container content">
      <div class="row player-body">
        <div class="album-cover">
          <h2 class="music-icon"><i class="fa-solid fa-music"></i></h2>
        </div>
        <div class="center" style="flex-direction:column; ">
          <h2>{{currentMusic.name}}</h2>
          <h3>{{currentMusic.album.artist}}</h3>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0"
              aria-valuemax="100"></div>
          </div>
        </div>

      </div>
      <div class="progress-range">
        <input type="range">
        <div class="number-range">
          <h4>{{this.currentTime + ''}}</h4>
          <h4>/</h4>
          <h4>3:33</h4>
        </div>
        <div class="control-buttons center">
          <button class="btn btn-transparent" type="button" @click="onPrev"><i class="fa-solid fa-backward-step"></i></button>
          <button class="btn btn-transparent" type="button" id="play-button" @click="togglePlayPause"><i class="fa-solid fa-play"></i></button>
          <button class="btn btn-transparent" type="button" @click="onNext"><i class="fa-solid fa-forward-step"></i></button>
        </div>
        <div class="like-button">
          <button class="btn btn-transparent" type="button"><i class="fa-solid fa-heart"></i></button>
        </div>
      </div>

      <audio v-if="audioRender" autoplay controls @timeupdate="updateTime" id="virtual-player" style="display:none;">
        <source :src="`api/musics/file/${currentMusic.id}`" type="audio/mp3">
      </audio>
    </div>
  </div>
</template>

<script>
export default {
  props:['music', 'musics'],

  data(){
    return{
      audioRender: true,
      isPlaying: false,
      audioTag: null,
      currentTime: '00:00',
      loaded: false,
      currentMusic: this.music,
      currentList: this.musics,
    }
  },

  beforeMount(){
    this.audioTag = document.querySelector('#virtual-player');
  },

  watch:{
    async currentMusic(){
      this.reload();
    },
  },

  methods: {
    // ------USER INTERACTION
    onPrev(){
      const index = this.currentList.findIndex(element => element.id === this.currentMusic.id);
      if(index > 0){
        this.currentMusic = this.musics[index - 1]
      }
    },

    onNext(){
      const index = this.currentList.findIndex(element => element.id === this.currentMusic.id);
      console.log(this.currentList.length)
      if(index  + 1 < this.currentList.length){
        this.currentMusic = this.currentList[index + 1]
      }
    },

    togglePlayPause(){
      const audio = document.querySelector('#virtual-player');
      this.isPlaying = (this.isPlaying ? false : true);
      this.isPlaying ? audio.pause() : audio.play();
    },

    // ------UTILS

    secondsToMinutes(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
    },

    // PLAYER PROGRAM

    updateTime(){
      const audio = document.querySelector('#virtual-player');
      if(this.audioRender === true){
        audio.addEventListener('timeupdate', ()=>{
          const num = audio.currentTime;
          this.currentTime = this.secondsToMinutes(num);
        })
      }
    },

    reload(){
      const audio = document.querySelector('#virtual-player');
      this.audioRender = false;
      this.loaded = false;
      if(this.isPlaying) audio.pause();
       this.$nextTick(() => {
        this.audioRender = true;
        this.loaded = true;
      })
    },


  },
}
</script>

<style>
input[type=range] {
  height: 3vh;
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
  background-color: transparent;
  display: flex;
  align-items: center;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 1vw;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.037);
  border-radius: 5px;
  border: none;
}

input[type=range]::-webkit-slider-thumb {
  border: none;
  height: 3vh;
  width: 1vw;
  border-radius: 5px;
  background: #31087B;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -0.25vw;
}

.content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 85vh;
}

.album-cover {
  width: 30vh;
  height: 30vh;
  background-color: rgba(255, 255, 255, 0.037);
  border-radius: 5px;
  margin-bottom: 2vh;
}

.album-cover .music-icon {
  width: 100%;
  height: 30vh;
  font-size: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;

}

.player-body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.number-range {
  display: flex;
  justify-content: center;
}

.number-range h4 {
  width: 2vw;
  text-align: center;
}

.like-button {
  display: flex;
  justify-content: center;
}

.like-button button {
  font-size: 3vh;
}

.control-buttons {
  align-items: center;
}

.control-buttons button{
  font-size: 4vh;
  margin: 2vh;
  display: flex;
  align-items: center;
  justify-content: center;
}


</style>