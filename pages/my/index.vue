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
        <!-- <div id="app">
          <b-table show-empty :items="musics" :fields="fields" :current-page="currentPage" :per-page="0"></b-table>
          <b-pagination size="md" :total-rows="totalItems" v-model="currentPage" :per-page="perPage"></b-pagination>
        </div> -->
        <!-- <b-table id="my-table" :items="musics" :fields="['name','album.artist','album.name']" :per-page="perPage" :current-page="currentPage" hover class="table table-borderless">
          <template #cell(show_details)="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
              dddddddd
            </b-button>
    
            
            
          </template>

        </b-table> -->
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
            <tr v-for="(music, i) in musics" :key="music.id" class="table-line"
              @click="$nuxt.$emit('selectMusic', music)">
              <th scope="row">{{ i + 1 }}</th>
              <td>{{ music.name }}</td>
              <td>{{ music.album.artist}}</td>
              <td>{{ music.album.name }}</td>
              <td> 66:6 </td>
              <td class="center">
                <button class="btn btn-transparent center">
                  <i class="fa-solid fa-trash"></i>
                </button>
                <button class="btn btn-transparent center">
                  <i class="fa-solid fa-pen"></i>
                </button>
              </td>
            </tr>

          </tbody>
        </table>

        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-end">
            <li 
              class="page-item"
              v-if="parseInt(pagination.page) - 1 > 0"
            >
              <a class="page-link" @click="paginationChange(-1)">prev</a>
            </li>

            <li 
              class="page-item" 
              v-if="parseInt(pagination.page) - 2 > 0"
            >
              <a class="page-link" @click="paginationChange(-2)">{{parseInt(pagination.page) - 2}}</a>
            </li>

            <li 
              class="page-item" 
              v-if="parseInt(pagination.page) - 1 > 0"
            >
              <a class="page-link" @click="paginationChange(-1)">{{parseInt(pagination.page) - 1}}</a>
            </li>
            <li class="page-item"><a class="page-link" style="color:red;">{{pagination.page}}</a></li>
            
            <li 
              class="page-item" 
              v-if="parseInt(pagination.page) < pagination.totalPages"
            >
              <a class="page-link" @click="paginationChange(1)">{{parseInt(pagination.page) + 1}}</a>
            </li>

            <li 
              class="page-item" 
              v-if="parseInt(pagination.page) + 1 < pagination.totalPages"
            >
              <a class="page-link" @click="paginationChange(1)">{{parseInt(pagination.page) + 2}}</a>
            </li>

            <li 
              class="page-item" 
              v-if="parseInt(pagination.page) < pagination.totalPages"
            >
              <a class="page-link" @click="paginationChange(1)">next</a>
            </li>
          </ul>
        </nav>

      </div>
    </div>
  </div>


</template>

<script>
import AddMusic from '~/components/Forms/AddMusic.vue'

const INITIAL_PAGINATION = {
  page:1,
  limit:10,
  totalItems:0,
  totalPages:0,
};

export default {
  components: { AddMusic, },
  data() {
    return {
      musics:[],
      isAdding: false,
      pagination: {...INITIAL_PAGINATION},

    }
  },

  mounted(){
    this.getMusicsList();
  },

  watch:{
    pagination(){}
  },

  methods: {
    paginationChange(val){
      console.log(val)
      this.pagination.page = parseInt(this.pagination.page) + val
      this.getMusicsList();
    },
    // ---------- CRUD
    async getMusicsList(){
      const data = await this.$axios.$get(`/api/musics?page=${this.pagination.page}&limit=${this.pagination.limit}&sortBy=name:ASC`);
      console.log(data);
      this.musics = data.result;
      this.pagination = data.pagination;
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
</style>