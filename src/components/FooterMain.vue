<template>
    <footer>
        <div class="content">
            <h2>Mia habib productions</h2>
            <hr>

        </div>
    </footer>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components: {},
    })

    export default class FooterMain extends Vue {
        created(): void {

        }
    }

</script>

<style lang="scss" scoped>
    footer{
        background: #fafafa;
        color:#333;
        width: 100%;
        height: 400px;
        .content{
            display: flex;
            max-width: 1100px;
            justify-content: center;
        }
    }
</style>
