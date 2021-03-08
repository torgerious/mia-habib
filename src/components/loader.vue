<template>
    <div>
    <div class="loader"></div>
    <p>Loading..</p>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components: {},
    })

    export default class loader extends Vue {

        created(): void {

        }
    }

</script>

<style lang="scss" scoped>
    .loader {
        border: 16px solid #f3f3f3; /* Light grey */
        border-top: 16px solid #333333; /* Blue */
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 2s linear infinite;
        margin: 0 auto;
    }
    p{
        color: #727272;
        font-weight: bold;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
