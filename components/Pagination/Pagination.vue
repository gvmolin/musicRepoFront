<template>
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
      <li class="page-item current-page"><a class="page-link">{{pagination.page}}</a></li>
      
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
        <a class="page-link" @click="paginationChange(2)">{{parseInt(pagination.page) + 2}}</a>
      </li>

      <li 
        class="page-item" 
        v-if="parseInt(pagination.page) < pagination.totalPages"
      >
        <a class="page-link" @click="paginationChange(1)">next</a>
      </li>
    </ul>
  </nav>


</template>

<script>
export default {
  props: ['pagination'],

  data(){
    return {

    }
  },

  mounted(){
  },

  methods:{
    // ---------- USER INTERACTION
    paginationChange(val){
      this.pagination.page = parseInt(this.pagination.page) + val
      this.$emit('onPaginationChange', this.pagination);
    },
  }
}
</script>