<template>
  <div>
    <header-bar :hasBackground="true"></header-bar>
    <div  class="page">

      <div class="content">
        <div class="bread-crumbs">
          <router-link tag="span" to="/"> Home</router-link> /
          <router-link tag="span" to="/press" class="active-link"> Press</router-link>
        </div>
      <h1 class="main-header">Press</h1>


      <div class="filter">
        <div :class="{ 'active' : selectedCategory === cate }"  @click="setCategory(cate)" class="category" v-for="(cate, i) in localCategory" :key="i">
          <div>
            {{cate}}
          </div>
        </div>
    </div>

        <br>

        <loader v-if="loading"></loader>
        <div class="article-wrapper">
          <article v-for="(item, i) in work" v-if="item.category === selectedFilter || selectedFilter === ''" @click="navigate(item.title)">
            <img loading=lazy :src="item.imageIngressUrl" alt="ingress">
            <h4> {{item.title}}</h4>
          </article>
        </div>

  </div>

    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Action, Getter, Mutation} from "vuex-class";
import {getterStringMenuModal, mutationStringMenuModal} from "@/store/menuModal";
import CloseIcon from "@/components/CloseIcon.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import {actionStringWork, Category, IWork} from "@/store/work";
import {category, pressCategory, workCategory} from "@/Types/Types";
import Loader from "@/components/loader.vue";

@Component({
  components: {Loader, HeaderBar},
})



export default class Press extends Vue {
  localCategory:Category[] = pressCategory;
  selectedCategoryFilter:Category = Category.blank;
  loading:boolean = false;
  selectedCategory:Category = Category.media;
  work:IWork[] = [];

  @Action(actionStringWork.GET_WORK) getWork: (() => Promise<IWork[]>) | undefined;



  setCategory(category:Category):void{
    this.selectedCategory = category;
    this.selectedCategoryFilter = category;
  }

  navigate(route:string):void{
    let prettyRoute = route.replace(/ /g,"-");
    this.$router.push('article/' + prettyRoute);
  }

  get selectedFilter():string{
    if(this.selectedCategory === Category.media){
      this.selectedCategoryFilter = Category.media
    } else{
      this.selectedCategoryFilter = this.selectedCategory;
    }

    return this.selectedCategoryFilter;
  }

  created(): void {
    if(this.getWork){
      this.loading = true;
      this.getWork().then(res => {
        console.log(res);
        this.work = res;
        this.loading = false;
      }).catch(err => {
        console.log(err);
        this.loading = false;
      })
    }
  }


}

</script>

<style lang="scss" scoped>

.bread-crumbs{
  left: 0;
  width: 109px;
  display: flex;
  margin: 20px 0px;
  justify-content: space-between;
  span{
    cursor: pointer;
    font-weight: bold;

    &:hover{
      text-decoration: underline;
    }
  }
}

.content{
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 10px;
}

.filter{
  display: flex;
  padding: 0 0px;
  width:270px;
  justify-content: space-between;
}

.active{
  background: #333333 !important;
  color: white !important;
  border-color: #333 !important;
}

.active-link{
  text-decoration: underline;
}

.page{
  width:100%;
  max-width: 1500px;
  margin: 0 auto;
  .main-header{
    text-align: left;
    margin: 28px 30px 12px 0px;
  }
}

.page{
  width:100%;
  max-width: 1500px;
  margin: 0 auto;
  .main-header{
    text-align: left;
    margin: 28px 30px 12px 0px;
  }
  .article-wrapper{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    box-sizing: border-box;
    /*justify-content: center;*/
    justify-content: space-between;
    margin-top: 10px;
    article{
      width: 31%;
      justify-content: space-between;
      height: auto;
      margin: 5px 0%;
      text-align: left;
      cursor: pointer;
      @media only screen and (max-width: 800px) {
        width:100%;
      }
      img{
        width: 100%;
        height: 240px;
        object-fit: cover;
      }
      h4{
        margin-top: 9px;
      }

      div{
        width:100%;
        p{
          max-width: 100%;
        }
      }
    }
  }

}

</style>
