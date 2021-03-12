<template>
    <div  class="extended-menu" v-if="isShowingMenuModal" @click.self="hideMenu">
        <div class="extended-menu__content">
            <div class="extended-menu__content--header" @click="hideMenu">
                <close-icon></close-icon>
            </div>
            <p class="top-text">Menu</p>

            <div class="line"></div>

            <nav>
                <p>Performances</p>
                <p>Projects</p>
                <p>Publications</p>
                <p>Films</p>
            </nav>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Getter, Mutation} from "vuex-class";
    import {getterStringMenuModal, mutationStringMenuModal} from "@/store/menuModal";
    import CloseIcon from "@/components/CloseIcon.vue";

    @Component({
        components: {CloseIcon},
    })

    export default class MenuModal extends Vue {
        @Getter(getterStringMenuModal.IS_SHOWING_MENU_MODAL) isShowingMenuModal: boolean | undefined;
        @Mutation(mutationStringMenuModal.SET_IS_SHOWING_MENU_MODAL) setIsShowingMenuModal: ((payload: boolean) => void) | undefined;


        hideMenu():void{
            console.log("HIDE");

            if(this.setIsShowingMenuModal)
            this.setIsShowingMenuModal(false);
        }

        created(): void {

            console.log("?", this.isShowingMenuModal);

        }


    }

</script>

<style lang="scss" scoped>
        .extended-menu{
            width: 100%;
            height: 100vh;
            position: fixed;
            background: #37373794;
            transition: 0.3s;
            z-index: 9999;
            &__content{
                width: 300px;
                margin: 20vh auto;
                height: 400px;
                background: white;
                box-shadow: 1px 1px 16px 8px #232323;
                padding: 11px 0px;
                border-radius: 5px;
                p{
                    margin: 21px 10%;
                    font-weight: bold;
                    text-align: left;
                }
                &--header{
                    display: flex;
                    justify-content: flex-end;
                    padding: 2px 13px 20px 0px;
                    width: 100%;
                    box-sizing: border-box;
                }
                .line{
                    background: #f1f1f1;
                    width: 80%;
                    margin: 5px 10%;
                    height: 3px;
                    border-radius: 25px;
                }
                .top-text{
                    margin-top: -12px;
                }
            }
        }

</style>
