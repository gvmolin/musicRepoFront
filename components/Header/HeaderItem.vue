<template>
    <div>
        <vs-row>
        <a 
          @click="pushRoute(route)"
          @mouseover="hover = true"
          @mouseleave="hover = false"
        >
          <h2 class="link">
            <i :class="icon"></i>{{sufix}}
            <span 
              :style="hover === true ? 
                'opacity:100%; transition:1s; width:0%;' : 
                'opacity:0%; transition:1s; width:1%;'"
              >{{prefix}}</span>
          </h2>
        </a>
      </vs-row>
      
    </div>
</template>

<script>
    export default {
        props:['sufix', 'prefix', 'route', "icon"],
        data(){
            return{
                hover:false
            }
        },
        methods: {
            pushRoute(route) {
                this.$router.push(route);

            }
        }
    }
</script>

<style scoped>


        .link:hover {
            transition: 1s;
            letter-spacing: -0.3vw;
}

</style>