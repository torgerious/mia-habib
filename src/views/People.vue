<template>
  <div>
    <header-bar :has-background="true"></header-bar>
    <div  class="page">
      <h1>People </h1>

      <div  v-if="activePeople" class="modal"  @click.self="hideMenu">
        <div class="active-ppl">
          <button @click="hideMenu">exit</button>
          <p>{{activePeople.name}}</p>
          <p>{{activePeople.profession}}</p>
          <img :src="activePeople.image" alt="mia" >
          <p class="main-text">{{activePeople.description}}</p>
        </div>
      </div>

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

  people:Array<IPeople> = [
    {image:"about-mia.jpg", name:"mia habib",  profession:"Scenekunster", description:"Mia Haugland Habib (b. 1980, Houston) is an Oslo-based dancer, performer and choreographer working at the intersection of performance, exhibitions, publications, lectures, teaching, mentoring and curating. Habib has collaborated internationally with artists such as Jassem Hindi, Guilherme Garrido, Julie Nioche, Rani Nair, Brynjar Bandlien. She danced with Carte Blanche, The Norwegian National Company of Contemporary Dance, from 2017-2018, for whom she also made a commissioned work."},
    {image:"nico.jpg", name:"Nicolai lopez",  profession:"Project manager", description:"This is Nicolai, long text to follow"},
    {image:"about-mia.jpg", name:"mia habib",  profession:"Scenekunster", description:"This is mia habib, long text to follow"},
    {image:"about-mia.jpg", name:"mia habib",  profession:"Scenekunster", description:"This is mia habib, long text to follow"},
    {image:"about-mia.jpg", name:"mia habib",  profession:"Scenekunster", description:"This is mia habib, long text to follow"},
    {image:"about-mia.jpg", name:"mia habib",  profession:"Scenekunster", description:"This is mia habib, long text to follow"},
  ];

  hideMenu():void{
    this.activeIndex = null;
    this.activePeople = null;
  }

  showModal(people:IPeople, index:number):void{
    this.activeIndex = index;
    this.activePeople = people;
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
.modal{

  width: 100%;
  height: 100vh;
  position: fixed;
  background: #37373794;
  transition: 0.3s;
  z-index: 9999;
  top:0;
  .active-ppl{
    position: absolute;
    width: 90%;
    min-height: 500px;
    border-radius: 10px;
    background: white;
    margin: 100px 5%;
    img{
      height: 250px;
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
      padding: 0px 77px;
      line-height: 26px;
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
    }
    span{
      font-size: 14px;
      color: #6f6f6f;
    }
  }
}






</style>
