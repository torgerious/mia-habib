<template>
  <div id="app">
    <transition name="fade">
    <menu-modal></menu-modal>
    </transition>
    <router-view/>
  </div>
</template>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }


  body{
    margin: 0;
    padding: 0;
  }
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
  import Vue from "vue";
  import Component from "vue-class-component";
  import HeaderBar from "./components/HeaderBar.vue";
  import Home from "@/views/Home";
  import MenuModal from "@/components/MenuModal";


  @Component({
    components: {MenuModal, Home, HeaderBar}
  })

  export default class App extends Vue {
  }
</script>
