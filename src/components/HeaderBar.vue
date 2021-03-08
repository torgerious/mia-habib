<template>
    <header :class="{'dark' : hasBackground}">
        <div class="wrapper">
            <div>Mia habib productions</div>
            <nav>
                <p>Project</p>
                <p>Books</p>
                <p>About</p>
                <p>Contact</p>
            </nav>
        </div>
    </header>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component({
        components: {

        },
    })

    export default class HeaderBar extends Vue {
        @Prop({default:false}) hasBackground: boolean | undefined;


        created():void{
            console.log("header")
        }
    }

</script>

<style lang="scss" scoped>

    .dark{
        background:#333;

    }

    .wrapper{
        width: 1100px;
        margin: 0 auto;
        height: 30px;
        font-size: 20px;
    }

    header{
        width: 100%;
        color: white;
        height: 60px;
        /*padding: 20px 115px;*/
        box-sizing: border-box;
        font-size: 19px;
        padding: 20px 30px;
        display: flex;
        div{
            float:left;
            text-transform: uppercase;
        }
        nav{
            float:right;
            margin-top: -5px;
            p{
                float: left;
                margin:5px 10px;
            }
        }
    }
</style>
