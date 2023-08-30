<template>
    <div>
        <header-bar :hasBackground="true"></header-bar>
        <div class="content">
            <loader v-if="article == null"></loader>
            <article v-if="article != null">
                <h1>{{article.title}}</h1>
                <div v-html="article.content"></div>

              <GallerySlider :images="images"></GallerySlider>

                <a :href="article.rider"  v-if="article.rider">Teknisk rider 📃</a>
            </article>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Action} from "vuex-class";
    import {actionStringWork, IWork} from "@/store/work";
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



        async created(): Promise<void> {
            this.loading = true;
          console.log("YAKL")
            let articleId = this.$route.params.id;
            // console.log("original route", articleId);
            //
            // let prettyRoute = articleId.replace(/-/g," ");
            //
            // console.log("prettyRoute route", prettyRoute);


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


        mounted(): void {



        }
    }

</script>
<style lang="scss" scoped>


/deep/ .ql-video{
  width:100% !important;
  min-height: 460px !important;
    @media screen and (max-width: 800px) {
        min-height: 260px !important;
    }
}

a{
  font-weight: bold;
  color:#333;
}

.content{
    padding: 30px;
    max-width: 1000px;
    margin: 0 auto;
    article{
        text-align: left;
        width:100%;
        /deep/ img{
            max-width: 100%;
        }
    }
}
</style>
