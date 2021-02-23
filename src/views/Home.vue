<template>
  <div class="home">
    <div class="home--main">
      <header-bar></header-bar>

    </div>

    <div class="home--content">

      <article v-for="(work, i) in workList" :key="i + 'name'">
        <div>
          <img :src="work.imageUrl" alt="image">
        </div>
        <p>{{work.title}}</p>
      </article>


      <button @click="navigate('work')">All work</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderBar from "@/components/HeaderBar.vue";

interface IArticle{
  imageUrl:string,
  title:string,
}

@Component({
  components: {
    HeaderBar
  },
})

export default class Home extends Vue {
  workList:IArticle[] = [
     {imageUrl:"https://scx2.b-cdn.net/gfx/news/2019/2-nature.jpg", title:"Some title"},
     {imageUrl:"https://scx2.b-cdn.net/gfx/news/2019/2-nature.jpg", title:"Some title"},
     {imageUrl:"https://scx2.b-cdn.net/gfx/news/2019/2-nature.jpg", title:"Some title"},
     {imageUrl:"https://scx2.b-cdn.net/gfx/news/2019/2-nature.jpg", title:"Some title"},
     {imageUrl:"https://scx2.b-cdn.net/gfx/news/2019/2-nature.jpg", title:"Some title"},
     {imageUrl:"https://scx2.b-cdn.net/gfx/news/2019/2-nature.jpg", title:"Some title"},
  ];

  navigate(route:string):void{
    this.$router.push(route);
  }

}
</script>

<style lang="scss" scoped>
  .home{
    width:100%;
    height: auto;
    &--main{
        width:100%;
        height: 100vh;
        background-blend-mode: multiply;
        background-size: cover;
        background: #05050669 url("../assets/mia-habib.jpeg") no-repeat center;
    }

    &--content{
      width: 100%;
      padding: 30px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      box-sizing: border-box;
      justify-content: center;
      margin-top: 40px;
      @media screen and (max-width: 800px) {
        padding: 10px;
      }
      article{
        width: 31%;
        justify-content: space-between;
        height: 250px;
        margin: 5px 1%;
        text-align: left;
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
          height: 200px;
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
