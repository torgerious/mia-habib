<template>
  <div>
    <header-bar :has-background="true"></header-bar>
    <div  >
      <h1>People </h1>

      <!-- ACTIVE PERSON -->
      <div  v-if="activePeople" class="modal"  @click.self="hideMenu">
        <div class="active-ppl">
          <button @click="hideMenu">exit</button>
          <h3>{{activePeople.name}}</h3>
          <p>{{activePeople.profession}}</p>
          <img :src="activePeople.image" :alt="activePeople.name" >
          <p class="main-text" v-html="activePeople.description"></p>
        </div>
      </div>

      <!-- PEOPLE LIST -->
      <div class="content">
        <article @click="showModal(people, i)" v-for="(people, i) in people" :key="i + 'name'">
          <div>
            <img :src="people.image" alt="mia" >
            <p>{{people.name}}</p>
            <p><span>{{people.profession}}</span></p>
          </div>
        </article>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import HeaderBar from "@/components/HeaderBar.vue";
import {actionStringWork, Category, IWork} from "@/store/work";
import {Action} from "vuex-class";
import {category} from "@/Types/Types";
import Loader from "@/components/loader.vue";
import FooterBar from "@/components/FooterBar.vue";
import FooterMain from "@/components/FooterMain.vue";
import { actionStringPeople, IPeople } from "@/store/people";

interface IPeople{
  image:string,
  name:string,
  profession:string,
  description:string,
}

@Component({
  components: {FooterMain, FooterBar, Loader, HeaderBar},
})

export default class People extends Vue {
  activeIndex:number | null = null;
  activePeople:IPeople | null = null;
  people: Array<IPeople> | null = null;
  
  @Action(actionStringPeople.GET_PEOPLE) getPeople: (() => Promise<any[]>) | undefined;

  hideMenu(): void {
    this.activeIndex = null;
    this.activePeople = null;
  }

  showModal(people:IPeople, index:number):void{
    this.activeIndex = index;
    this.activePeople = people;
  }

  created(): void {
    // fetch people list
    this.getPeople().then(people => {
        this.people = people
      }).catch(err => {
        alert('Error fetching people', err )
      })
  }
}

</script>

<style lang="scss" scoped>
h1{
  text-align: center;
  margin: 69px 30px 12px 0px;
}
.modal{

  width: 100%;
  height: 100vh;
  position: fixed;
  background: #37373794;
  transition: 0.3s;
  z-index: 9999;
  top:0;
  overflow: scroll;
  .active-ppl{
    position: absolute;
    width: 90%;
    min-height: 500px;
    border-radius: 10px;
    background: white;
    margin: 100px 5%;
    img{
      height: 250px;
      filter: grayscale(1);
    }
    h3{
      line-height: 0px;
    }
    button{
      margin: 20px 0;
      background: #333;
      padding: 5px 14px;
      color: white;
      border: none;
      border-radius: 2px;
      font-size: 15px;
      cursor: pointer;
    }
    .main-text{
      margin-bottom: 40px;
      padding: 20px 77px;
      line-height: 26px;
      max-width: 600px;
      margin:0 auto;
      text-align: left;
    }
  }
}
.content{
  width: 100%;
  /*padding: 30px;*/
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  box-sizing: border-box;
  justify-content: center;
  max-width: 1100px;
  margin: 40px auto;

  article{
    width: 24%;
    justify-content: space-between;
    height: auto;
    margin: 25px 3%;
    text-align: left;
    cursor: pointer;
    @media screen and (max-width: 800px) {
      width: 100%;
      margin: 0;
    }
    p{
      margin: 5px 0;
      color: black;
      font-weight: bold;
    }
    img{
      width:100%;
      height: 250px;
      object-fit: cover;
      background: #ebebeb;
      filter: grayscale(1);
    }
    span{
      font-size: 14px;
      color: #6f6f6f;
    }
  }
}
</style>
