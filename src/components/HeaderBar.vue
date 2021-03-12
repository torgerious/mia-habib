<template>
    <header :class="{'dark' : hasBackground}">
        <div class="wrapper">
            <div>Mia habib productions</div>
            <nav>
                <p>About</p>
                <p>Works</p>
                <p>Contact</p>
                <p @click="openMenu">More</p>
            </nav>
        </div>

    </header>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {Getter, Mutation} from "vuex-class";
    import {getterStringMenuModal, mutationStringMenuModal} from "@/store/menuModal";

    @Component({
        components: {

        },
    })

    export default class HeaderBar extends Vue {
        @Prop({default:false}) hasBackground: boolean | undefined;
        @Mutation(mutationStringMenuModal.SET_IS_SHOWING_MENU_MODAL) setIsShowingMenuModal: ((payload: boolean) => void) | undefined;
        @Getter(getterStringMenuModal.IS_SHOWING_MENU_MODAL) isShowingMenuModal: boolean | undefined;




        openMenu():void{

            if(this.setIsShowingMenuModal){
                this.setIsShowingMenuModal(true);
            }
        }

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
