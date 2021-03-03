import {Category} from "@/store/work";
import {Category} from "@/store/work";
<template>
    <div class="page">
        <header-bar :has-background="true"></header-bar>
        <h1>Work</h1>
        <div class="filter">
            <div :class="{ 'active' : selectedCategory === cate }"  @click="setCategory(cate)" class="category" v-for="(cate, i) in localCategory" :key="i">
                <div>
                    {{cate}}
                </div>
            </div>
        </div>
        <br>


<!--        <div class="wrapper">-->

            <article v-for="(item, i) in work" v-if="item.category === selectedFilter || selectedFilter === ''">
                <div>
                    <h1> {{item.title}}</h1>
                </div>
                <div>
                    <p>{{item.category}}</p>
                </div>
                <img :src="item.imageIngressUrl" alt="ingress">
<!--                <div v-html="item.content"></div>-->
            </article>
<!--        </div>-->

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import HeaderBar from "@/components/HeaderBar.vue";
    import {actionStringWork, Category, IWork} from "@/store/work";
    import {Action} from "vuex-class";
    import {category} from "@/Types/Types";


    @Component({
        components: {HeaderBar},
    })

    export default class Work extends Vue {
        @Action(actionStringWork.GET_WORK) getWork: (() => Promise<IWork[]>) | undefined;

        work:IWork[] = [];
        selectedCategory:Category = Category.all;
        localCategory:Category[] = category;
        selectedCategoryFilter:Category = Category.blank;


        setCategory(category:Category):void{
            this.selectedCategory = category;
            this.selectedCategoryFilter = category;

        }

        get selectedFilter():string{
            if(this.selectedCategory === Category.all){
                this.selectedCategoryFilter = Category.blank
            } else{
                this.selectedCategoryFilter = this.selectedCategory;
            }

            return this.selectedCategoryFilter;
        }



        created(): void {
            if(this.getWork){
                this.getWork().then(res => {
                    console.log(res);
                    this.work = res;
                })
            }
        }
    }

</script>

<style lang="scss" >


    .filter{
        display: flex;
        padding: 0 30px;
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
        h1{
            text-align: left;
            margin: 28px 30px 12px 38px;
        }
    }
    /*#app > div > article:nth-child(5) > div > p:nth-child(3) > img{*/
    /*    width: 50px;*/
    /*}*/
    article{
        width: 30%;
        padding: 0 30px;
        box-sizing: border-box;
        background: orange;
        margin:5px 10px;
        display: inline-flex;
        flex-wrap: wrap;
        img{
            width: 100%
        }

        div{
            width:100%;
            p{
                max-width: 100%;
            }
        }
    }

    .category{
        background: #ffffff;
        padding: 5px 10px;
        color: #333333;
        display: inline-flex;
        margin: 0 10px;
        border: 2px solid black;
        border-radius: 2px;
        cursor: pointer;
        div{
        }
    }
</style>
