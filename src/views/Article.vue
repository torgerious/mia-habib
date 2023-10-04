<template>
    <div>
        <header-bar :hasBackground="true"></header-bar>
        <div class="content">
            <loader v-if="article == null"></loader>
            <article v-if="article != null">
                <h1>{{article.title}}</h1>
                <div v-html="article.content"></div>

                <GallerySlider v-if="images && images.length > 0" :images="images"></GallerySlider>

                <a :href="article.rider"  v-if="article.rider">Teknisk rider 📃</a>
            </article>


            <div class="related-article-wrapper" v-if="relatedArticles.length > 0">
                <div class="main">
                    <h2>Related pages</h2>
                </div>

                <div class="content">
                    <div class="related-article-box" v-for="article in relatedArticles" @click="navigate(article.title, article.category)" >

                        <img :src="article.imageIngressUrl" alt="bilde">

                        <p>{{article.title}}</p>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Action} from "vuex-class";
    import {actionStringWork, Category, IWork} from "@/store/work";
    import HeaderBar from "@/components/HeaderBar.vue";
    import Loader from "@/components/loader.vue";
    import GallerySlider from "@/components/GallerySlider.vue";
    import {actionStringImageGallery, IimageGallery} from "@/store/imageGallery";

    @Component({
        components: {GallerySlider, Loader, HeaderBar},
    })

    export default class Article extends Vue {
        @Action(actionStringWork.GET_WORK_BY_ID) getWorkById: ((workId: string) => Promise<IWork>) | undefined;
        @Action(actionStringImageGallery.GET_GALLERY_BY_ID) getGalleryById: ((galleryId: string) => Promise<IimageGallery>) | undefined;



        images:Array<string> | null = null
        loading:boolean = false;
        $route: any;
        article:IWork | null = null;
        relatedArticles:any = [];


        navigate(route:string, category:Category):void{
            if(category === Category.films){
                return;
            }

            console.log("route", route)

            this.$router.push('/article/' + route);
            window.location.reload();
        }

        async  fetchDataForIds(Ids:Array<string>) {
            const responseArray = [];

            for (const id of Ids) {
                console.log("IDS", id)

                try {
                    // const response = await fetch(`https://api.example.com/data/${id}`);
                    if(this.getWorkById){
                        const res = await this.getWorkById(id)
                        console.log("RES", res)
                        responseArray.push(res);
                    }
                } catch (error) {
                    console.error(`Error fetching data for ID ${id}:`, error);
                }
            }

            return responseArray;
        }


        async created(): Promise<void> {
            this.loading = true;
          console.log("YAKL")
            let articleId = this.$route.params.id;


            if(this.getWorkById){
                this.article = await this.getWorkById(articleId);
            }

            if(this.getGalleryById){
                console.log("ARTICLE?", this.article)
                let imageGallery = await this.getGalleryById(this.article?.imageGallerySlider as string)
                console.log(imageGallery)
                    this.images = imageGallery.images as Array<string>;
                console.log("images", this.images)
            } else {
                this.images = null;
            }



            this.loading = false;

            if(this.article?.relatedArticles.length > 0){
            this.relatedArticles = await this.fetchDataForIds(this.article?.relatedArticles)
            }
            console.log("the fuck res", this.relatedArticles)

            if(!this.loading){
                const qlSyntaxElement = document.querySelector(".ql-syntax");
                const imageSliderElement = this.$el.querySelector(".image-slider");

                console.log("QL", qlSyntaxElement)
                console.log("IMS", imageSliderElement)


                if (qlSyntaxElement && imageSliderElement) {
                    qlSyntaxElement.appendChild(imageSliderElement);
                }
            }


        }



    }

</script>
<style lang="scss" scoped>

.related-article-wrapper{
    width: 100%;
    display: block;
    margin: 100px 0;
    font-family: 'Noto Sans', sans-serif;

    .main{
        width: 100%;
    }
    .content{
        display: flex;
        @media (max-width: 600px) {
            display: block;
        }
    }
    .related-article-box{
        cursor: pointer;
        width: 25%;
        margin: 10px;
        box-shadow: 0px 0px 8px 3px #e5e5e5;
        border-radius: 10px;
        p{
            text-overflow: ellipsis;
            overflow: hidden;
            width: 152px;
            white-space: nowrap;
            padding: 0 8px;
            margin-top: 5px;
        }
        @media (max-width: 600px) {
            width: 100%;
        }
        &:hover{
            font-weight: bold;
        }
        img{
            width: 100%;
            height: 80%;
            object-fit: cover;
            border-radius: 10px;

        }
    }
}


/deep/ .ql-video{
  width:100% !important;
  min-height: 460px !important;
    @media screen and (max-width: 800px) {
        min-height: 260px !important;
    }
}

/deep/ .ql-align-right{
    text-align: right !important;
}
/deep/ .ql-align-center{
    text-align: center !important;
}

a{
  font-weight: bold;
  color:#333;
}

.content{
    padding: 30px;
    max-width: 800px;
    margin: 0 auto;
    font-family: 'Noto Sans', sans-serif;
    line-height: 28px;
    font-size: 18px;
    article{
        text-align: left;
        width:100%;
        /deep/ img{
            max-width: 100%;
        }
    }
}
</style>
