<template>
    <div>
        <header-bar :has-background="true"></header-bar>
        <div  class="page">

            <div class="content">
                <h1 class="main-header">Work</h1>
                <div class="filter">
                    <div :class="{ 'active' : selectedCategory === cate }"  @click="setCategory(cate)" class="category" v-for="(cate, i) in localCategory" :key="i">
                        <div>
                            {{cate}}
                        </div>
                    </div>
                </div>

              <div class="filter-mobile">
                <div :class="{ 'active' : selectedCategory === cate }"  @click="setCategory(cate)" class="category" v-for="(cate, i) in localCategory" :key="i">
                  <div>
                    {{cate}}
                  </div>
                </div>
              </div>

                <br>

                <loader v-if="loading"></loader>
                <div class="article-wrapper">
                    <article v-for="(item, i) in work"
                             v-if="item.category === selectedFilter || selectedFilter === ''"
                             @click="navigate(item.title, item.category)">
                        <span v-if="item.markedForPreview">Forhåndsvisning 🔒</span>
                        <img v-if="item.category !== 'films'" loading=lazy :src="item.imageIngressUrl" alt="ingress">
                        <video v-else :src="item.imageIngressUrl" controls></video>
                      <h4> {{item.title}}</h4>
                    </article>
                </div>
            </div>

        </div>
      <footer-bar></footer-bar>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import HeaderBar from "@/components/HeaderBar.vue";
import {actionStringWork, Category, IWork} from "@/store/work";
import {Action} from "vuex-class";
import {workCategory} from "@/Types/Types";
import Loader from "@/components/loader.vue";
import FooterBar from "@/components/FooterBar.vue";
import firebase from "firebase";


@Component({
        components: {FooterBar, Loader, HeaderBar},
    })

    export default class Work extends Vue {
        @Action(actionStringWork.GET_WORK) getWork: (() => Promise<IWork[]>) | undefined;

        work:IWork[] = [];
        selectedCategory:Category = Category.all;
        localCategory:Category[] = workCategory;
        selectedCategoryFilter:Category = Category.blank;
        loading:boolean = false;


        setCategory(category:Category):void{
            this.selectedCategory = category;
            this.selectedCategoryFilter = category;
        }

        navigate(route:string, category:Category):void{
          if(category === Category.films){
            return;
          }



            // let prettyRoute = route.replace(/ /g,"-");
            this.$router.push('article/' + route);
        }

        get selectedFilter():string{
            if(this.selectedCategory === Category.all){
                this.selectedCategoryFilter = Category.blank
            } else{
                this.selectedCategoryFilter = this.selectedCategory;
            }

            return this.selectedCategoryFilter;
        }





      @Watch('$route')
      runThis(old:any, tes:any):void{
          // if(this.$route.query.filter){
            this.setCategory(this.$route.query.filter as Category)
            console.log("RAAAAAN")
      }


      updated():void{
          console.log("UPDATED");
        console.log("ROUTE", this.$route.query.filter)


      }

        created(): void {

            if(this.getWork){
                this.loading = true;
                this.getWork().then(res => {
                    console.log("work res", res);



                    const workWithoutPreviewArticles = res.filter(work =>  !work.markedForPreview);


                  firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                      this.work = res;
                    } else {
                      this.work = workWithoutPreviewArticles;

                    }
                  });




                    this.loading = false;
                    if(this.$route.query.filter){
                      this.setCategory(this.$route.query.filter as Category)
                    }
                }).catch(err => {
                    console.log(err);
                    this.loading = false;
                })
            }




        }
    }

</script>

<style lang="scss" >

    .content{
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 10px;
    }
    .filter-mobile{
      display: none;
      .category{
        margin: 5px;
      }
      @media only screen and (max-width: 800px) {
        display: block;
      }
    }

    .filter{
        display: flex;
        padding: 0 0px;
        width:530px;
        justify-content: space-between;
      @media only screen and (max-width: 800px) {
        display: none;
      }
    }

    .active{
        background: #333333 !important;
        color: white !important;
        border-color: #333 !important;
    }

    .page{
        width:100%;
        max-width: 1500px;
        margin: 0 auto;
        .main-header{
            text-align: left;
            margin: 28px 30px 12px 0px;
            @media only screen and (max-width: 800px) {
              text-align: center;
            }
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
          span{
            position: absolute;
            width: auto;
            border-radius: 10px;
            background: #ffd4b7;
            color: black;
            margin: 10px;
            color: black;
            padding: 3px 17px;
          }
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
          video{
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
    /*#app > div > article:nth-child(5) > div > p:nth-child(3) > img{*/
    /*    width: 50px;*/
    /*}*/


    .category{
        background: #f2f2f2;
        padding: 13px 10px;
        font-weight: bold;

        color: #333333;
        display: inline-flex;
        /*margin: 0 10px;*/
        box-shadow: 0px 0px 4px 0px #acacac;
        border-radius: 2px;
        cursor: pointer;
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
        div{
        }
    }
</style>
