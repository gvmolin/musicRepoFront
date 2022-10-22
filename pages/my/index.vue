<template>
  <div>
    <!-- FORM FORM FORM FORM FORM -->
    
    <add-music
      v-if="isAdding"
      @closeTag="isAdding = false"
    />

    <!-- BODY BODY BODY BODY BODY -->
    <div>
      <div class="title-slot">
        <h1>my Musics</h1>
        <button class="btn btn-transparent" type="button" @click="isAdding = true" v-if="isAdding === false">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>

      <div style="width:100%">
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

        <div style="width:100%;">
          <table class="table table-borderless">
            <thead>
              <tr>
                <th class="table-title" scope="col">#</th>
                <th class="table-title" scope="col" style="display:flex; align-items:flex-end;">Music<button class="th-button" @click="onChangeSort('name')"><i class="fa-solid fa-sort"></i></button></th>
                <th class="table-title" scope="col">Artist</th>
                <th class="table-title" scope="col">Album</th>
                <th class="table-title" scope="col">Duration</th>
                <th class="table-title" scope="col" style="display:flex; align-items:flex-end;">Created<button class="th-button" @click="onChangeSort('created')"><i class="fa-solid fa-sort"></i></button></th>
                <th class="table-title" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(music, i) in musics" 
                :key="music.id" 
                :class="(music.id === currentMusic.id ? 'table-line activeMusic' : 'table-line')"
              >
                <th 
                  scope="row" 
                  @click="onSelectMusic(music)"
                >
                  {{ `${(pagination.page - 1)}` + `${(i)}` }}
                </th>

                <td 
                  @click="onSelectMusic(music)"
                >
                  {{ music.name }}
                </td>

                <td 
                  @click="onSelectMusic(music)"
                  :class="(music.id === currentMusic.id ? 'activeMusic' : '')"
                >
                  {{ music.album.artist }}
                </td>

                <td @click="onSelectMusic(music)">{{ music.album.name }}</td>
                <td @click="onSelectMusic(music)">{{ secondsToMinutes(music.duration) }}</td>
                <td @click="onSelectMusic(music)">{{ music.formatedCreated }}</td>
                <td class="center">
                  <button class="btn btn-transparent center">
                    <i class="fa-solid fa-pen"></i>
                  </button>
                </td>
              </tr>
  
            </tbody>
          </table>
        </div>
        <pagination-component
          :pagination="pagination"
          @onPaginationChange="paginationChanged"
        />
      </div>
    </div>
  </div>


</template>

<script>
import AddMusic from '~/components/Forms/AddMusic.vue'
import PaginationComponent from '~/components/Pagination/Pagination.vue'

const INITIAL_PAGINATION = {
  page:1,
  limit:10,
  totalItems:0,
  totalPages:0,
};

const INITIAL_SORT = {
  field:'name',
  order:'ASC',
};

export default {
  components: { AddMusic, PaginationComponent },
  data() {
    return {
      isAdding: false,
      pagination: {...INITIAL_PAGINATION},
      sort: {...INITIAL_SORT},
      currentMusic:{},
      musics:[],

    }
  },

  created() {
    this.$nuxt.$on('selectMusic', (obj) => {
      this.currentMusic = obj.music;
      this.musics = [...obj.list];
    })

    this.$nuxt.$on('nextPage', async () => {
      if (this.pagination.page < this.pagination.totalPages) {
        this.pagination.page++
        await this.getMusicsList();
        this.onSelectMusic(this.musics[0]);
      }
    })

    this.$nuxt.$on('prevPage', async () => {
      if (this.pagination.page > 1) {
        this.pagination.page = this.pagination.page - 1;
        await this.getMusicsList();
        this.onSelectMusic(this.musics[this.pagination.limit - 1]);
      }
    })
  },

  beforeMount(){
    this.getMusicsList();
  },

  methods: {
    // ---------- USER INTERACTION
    onChangeSort(str){
      if (this.sort.field === str){
        this.sort.order = this.sort.order === 'ASC' ? 'DESC' : 'ASC'
      }
      this.sort.field = str
      this.getMusicsList();
    },

    paginationChanged(){
      this.getMusicsList();
    },

    onSelectMusic(music){
      this.currentMusic = music;
      this.$nuxt.$emit('selectMusic', {
        music: {...this.currentMusic},
        list: [...this.musics],
      })
    },
    
    // ---------- CRUD
    async getMusicsList(){
      try {
        const url = this.mountUrl('/api/musics')
        const { result, pagination } = await this.$axios.$get(url);
        this.formatAllDates(result);
        this.musics = result;
        this.pagination = pagination;
      } catch (error) {
        console.log(error)
      }
    },

    // ---------- UTILS
    formatAllDates(arr){
      arr.map(element => {
        const date = new Date(element.created) 
        const formated = date.toLocaleDateString('en-US');
        element.formatedCreated = formated
      })
    },

    mountUrl(str){
      let baseUrl = str;
      baseUrl = baseUrl + `?page=${this.pagination.page}&limit=${this.pagination.limit}`
      baseUrl = baseUrl + `&sortBy=${this.sort.field}:${this.sort.order}`
      return baseUrl;
    },

    secondsToMinutes(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
    },

  },

}
</script>

<style>
.title-slot {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-slot button {
  border: #31087B 1px solid;
}

.title-slot button:hover {
  transition: 0.5s;
  background-color: #30087b7a;
  color: black;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

#cover-input-label {
  border: #31087B solid 1px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  position: relative;
}

#cover-input-label:before {
  content: "";
  display: flex;
  padding-top: 100%;
  /* initial ratio of 1:1*/
}

#cover-input-label:hover {
  cursor: pointer;
  background-color: #30087b7a
}

.form-item {
  margin: 2vh auto;
}

.form{
  display: flex;
  justify-content: space-between;
}

body .pagination .page-item a{
  border: none;
  background-color: transparent;
  color: #31087B;
  font-size: 2vw;
}

body .pagination .current-page a{
  border: none;
  background-color: transparent;
  color: #5121ac;
  font-size: 2vw;
}

.th-button{
  height: 2vw;
  border: none;
  background-color: transparent;
  text-align: left;
  padding-left: 0.5vw;
  display:flex;
}

.table-title{
  align-items: baseline;
}

.activeMusic th{
  color: #5121ac;
}

.activeMusic td{
  color: #5121ac;
}
</style>