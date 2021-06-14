<template>
  <div class="home">
    <div class="home--main" :style="{ 'background-image': 'url(' + backgroundImages[backgroundImageIndex] + ')' }">
      <header-bar></header-bar>
<!--      <div class="prev"  @click="prevImage">&#10094;</div>-->
<!--      <div class="next"  @click="nextImage">&#10095;</div>-->

<!--      <div class="image-indicator">-->
<!--        <div v-for="(item, i) in backgroundImages" :key="i">-->
<!--          <span v-if="i === backgroundImageIndex"></span>-->
<!--        </div>-->
<!--      </div>-->
      <p class="project-link" @click="navigateProject">{{currentProjectLink}}</p>
    </div>
    <br>
    <div class="work-header">
      <h2>My work</h2>
      <div class="line"></div>
    </div>
    <loader v-if="loading"></loader>
    <div  v-else class="home--content">

      <article v-for="(work, i) in workList" :key="i + 'name'">
        <div>
          <img :src="work.imageIngressUrl" alt="image">
        </div>
        <p @click="navigate">{{work.title}}</p>
      </article>

    <div class="btn-wrapper">
      <button @click="navigate('work')">All work</button>
    </div>
    </div>
    <div>
<!--    <footer-main></footer-main>-->
      <footer-bar></footer-bar>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderBar from "@/components/HeaderBar.vue";
import {Action} from "vuex-class";
import {actionStringWork, IWork} from "@/store/work";
import Loader from "@/components/loader.vue";
import FooterMain from "@/components/FooterMain.vue";
import FooterBar from "@/components/FooterBar.vue";

interface IArticle{
  imageUrl:string,
  title:string,
}

@Component({
  components: {
    FooterBar,
    FooterMain,
    Loader,
    HeaderBar
  },
})

export default class Home extends Vue {
  workList:IWork[] = [];
  projectLinks:Array<string> = ["How to die", "Stranger within", "Another random"];
  projectLinksURL:Array<string> = ["/article/How-to-die", "/article/Stranger-within", "Another random"];
  currentProjectLink:string = this.projectLinks[0];
  currentProjectLinkURL:string = this.projectLinksURL[0];

  backgroundImages:Array<string> = ["mia-habib.jpeg", "mia-4.jpg", "mia-6.jpg"];
  backgroundImageIndex:number = 0;
  loading:boolean = false;

  @Action(actionStringWork.GET_WORK) getWork: (() => Promise<IWork[]>) | undefined;


  nextImage():void{
    setInterval(() => {
      if(this.backgroundImageIndex === this.backgroundImages.length-1){
        this.backgroundImageIndex = 0;
        this.currentProjectLink = this.projectLinks[this.backgroundImageIndex];
        this.currentProjectLinkURL = this.projectLinksURL[this.backgroundImageIndex];

      }else {
      this.backgroundImageIndex = this.backgroundImageIndex +1;
      this.currentProjectLink = this.projectLinks[this.backgroundImageIndex]
      this.currentProjectLinkURL = this.projectLinksURL[this.backgroundImageIndex];

      }
    }, 5000);
  }
  navigateProject():void{
    this.$router.push(this.currentProjectLinkURL);
  }

  prevImage():void{
    if(this.backgroundImageIndex === 0){
      this.backgroundImageIndex = this.backgroundImages.length -1;
    } else{
      this.backgroundImageIndex = this.backgroundImageIndex -1;
    }
  }

  navigate(route:string):void{
    this.$router.push(route);
  }


  created():void{
    if(this.getWork){
      this.loading = true;
      this.getWork().then(res => {
        console.log(res);
        this.workList = res;
        this.loading = false;
      }).catch(err => {
        console.log(err);
        this.loading = false;
      })
    }

    this.nextImage();
  }

}
</script>

<style lang="scss" scoped>

.project-link{
  bottom: 6px;
  position: absolute;
  color: white;
  text-decoration: underline;
  right: 33px;
  font-size: 19px;
  font-style: oblique;
  text-shadow: 15px 6px 20px #000000fc;
  cursor: pointer;
}

.btn-wrapper{
  width: 100%;
}

.work-header{
  margin-top: 68px;
  display: block;
  font-weight: bold;
  font-size: 31px;
  .line{
    height: 4px;
    width: 65px;
    background: #373b44;
    text-align: center;
    margin: -23px auto 20px auto;
    border-radius: 13px;
  }
}

  .home{
    width:100%;
    height: auto;
    &--main{
        width:100%;
        height: 100vh;
        background-blend-mode: multiply;
        /*background: #05050669 url("../assets/mia-habib.jpeg") no-repeat center;*/
        background-size: cover;
      -webkit-transition: background 1s;
      -moz-transition: background 1s;
      -o-transition: background 1s;
      transition: background 1s;
      background-color: #5e5b5b9c;
      &:hover .prev{
        opacity: 1;
        transition: 0.3s;
        margin-left: 10px;
      }
      &:hover .next{
        opacity: 1;
        transition: 0.3s;
        margin-right: 10px;

      }
      .prev{
        position: absolute;
        margin-top: 45vh;
        left: 10px;
        font-size: 35px;
        /*padding: 0 12px;*/
        color: white;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background: hsla(0,0%,100%,.25);
        border-radius: 50%;
        padding: 5px 21px;
        /*border: 2px solid #ffffff36;*/
        line-height: 50px;
        transition: 0.3s;
        opacity: 0;

      }
      .next{
        position: absolute;
        margin-top: 45vh;
        /* background: white; */
        right: 10px;
        font-size: 35px;
        /*padding: 0 12px;*/
        color: white;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background: hsla(0,0%,100%,.25);
        border-radius: 50%;
        padding: 5px 21px;
        /*border: 2px solid #ffffff36;*/
        line-height: 50px;
        transition: 0.3s;
        opacity: 0;

      }
      .image-indicator{
        width: 10%;
        position: absolute;
        bottom: 6px;
        height: 30px;
        display: block;
        margin: 0 45%;
        div{
          display: inline-block;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: #fffbfb;
          justify-content: space-between;
          margin: 0 5px;
          span{
            background: #202020;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            display: block;
            margin: -2px -2px;
            transition: 0.2s;
          }
        }
      }
    }

    &--content{
      width: 100%;
      /*padding: 30px;*/
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      box-sizing: border-box;
      justify-content: center;
      max-width: 1100px;
      margin: 40px auto;
      @media screen and (max-width: 800px) {
        padding: 10px;
      }
      article{
        width: 31%;
        justify-content: space-between;
        height: auto;
        margin: 5px 1%;
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
      }
      button{
        padding: 8px 31px;
        border-radius: 4px;
        border: 2px solid black;
        transition: 0.2s;
        background: white;
        font-weight: 700;
        text-transform: uppercase;
        margin:70px auto;
        &:hover{
          background: black;
          color:white;
          transition: 0.2s;
          cursor: pointer;
        }
      }
    }
  }

</style>
