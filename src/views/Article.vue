<template>
    <div>
        <header-bar :hasBackground="true"></header-bar>
        <div class="content">
            <loader v-if="article == null"></loader>
            <article v-if="article != null">
                <h1>{{article.title}}</h1>
                <div v-html="article.content"></div>
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

    @Component({
        components: {Loader, HeaderBar},
    })

    export default class Article extends Vue {
        @Action(actionStringWork.GET_WORK_BY_ID) getWorkById: ((workId: string) => Promise<IWork>) | undefined;

        $route: any;
        article:IWork | null = null;



        async created(): Promise<void> {
            let articleId = this.$route.params.id;
            let prettyRoute = articleId.replace(/-/g," ");

            console.log(prettyRoute);

            if(this.getWorkById){
                this.article = await this.getWorkById(prettyRoute);
            }
        }
    }

</script>
<style lang="scss" scoped>
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
