<template>
  <div>
    <header-bar :has-background="true"></header-bar>
    <div  class="page">
      <h1>Presenters </h1>
      <p>Request password to get access. Send mail to test@mail.no for more info</p>
      <div class="form">
        <p class="input-description">Skriv inn passord for å få tilgang</p>
        <input v-model="input" type="password" placeholder="password">
        <button @click="access">Login</button>
      </div>

      <div v-if="hasAccess" class="content">
        <p>Welcome to the content</p>

      </div>


    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import HeaderBar from "@/components/HeaderBar.vue";
import Loader from "@/components/loader.vue";
import FooterBar from "@/components/FooterBar.vue";
import FooterMain from "@/components/FooterMain.vue";


@Component({
  components: {FooterMain, FooterBar, Loader, HeaderBar},
})

export default class Presenters extends Vue {

  password:string = "randomAccess";
  input:string = "";
  hasAccess:boolean = false;

  access():void{
    if(this.input === this.password){
      this.hasAccess = true;
    }
  }

  created(): void {

  }
}

</script>

<style lang="scss" scoped>
h1{
  text-align: center;
  margin: 69px 30px 12px 0px;
}

.form{
  width:50%;
  margin: 100px auto 0;

  .input-description{
    text-align: left;
    font-weight: bold;
    margin-bottom: 5px;
  }
  input[type="password"]{
    width: 400px;
    display: block;
    height: 50px;
    font-size: 18px;
    border: 2px solid #dedbdb;
    text-indent: 5px;
    color: #d98484;
    &::placeholder{
      color:slategray;
    }
  }
  button{
    background: white;
    border: 2px solid black;
    padding: 10px 16px;
    left: 0;
    display: block;
    margin-top: 10px;
    text-transform: uppercase;
    font-weight: bold;
  }
}





</style>
