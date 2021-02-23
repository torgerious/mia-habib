<template>
    <header :class="{'dark' : hasBackground}">
        <div>Mia habib productions</div>
        <nav>
            <p>Project</p>
            <p>Books</p>
            <p>About</p>
            <p>Contact</p>
        </nav>
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

    header{
        width: 100%;
        color: white;
        height: 60px;
        padding: 20px 115px;
        box-sizing: border-box;
        font-size: 19px;
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
