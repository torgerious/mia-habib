<template>
    <div>
        <header-bar :has-background="true"></header-bar>
        <h1>Work</h1>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import HeaderBar from "@/components/HeaderBar.vue";


    @Component({
        components: {HeaderBar},
    })

    export default class Work extends Vue {
        created(): void {

        }
    }

</script>

<style lang="scss" scoped>
</style>
