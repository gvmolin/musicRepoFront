<template>
    <b-toast id="example-toast" :title="title" static no-auto-hide>
      {{message}}
    </b-toast>
</template>

<script>
export default {
  props:['title', 'text'],
  data(){
    return {
      visible: false,
    }
  }


}
</script>