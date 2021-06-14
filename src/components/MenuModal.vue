<template>
    <div  class="extended-menu" v-if="isShowingMenuModal" @click.self="hideMenu">
      <div class="extended-menu--wrap">
        <div class="extended-menu--wrap__content">
            <div class="extended-menu--wrap__content--header" @click="hideMenu">
                <close-icon></close-icon>
            </div>
            <p class="top-text">Menu</p>


          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
               viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
          <g>
            <g>
              <path d="M507.521,427.394L282.655,52.617c-12.074-20.122-41.237-20.122-53.311,0L4.479,427.394
                c-12.433,20.72,2.493,47.08,26.655,47.08h449.732C505.029,474.474,519.955,448.114,507.521,427.394z"/>
            </g>
          </g>
            <g>
            </g>
          </svg>


          <div class="line"></div>

            <nav>
                <p>Performances</p>
                <p>Projects</p>
                <p>Publications</p>
                <p>Films</p>
                <p @click="navigate('press')">Press</p>
                <p @click="navigate('calendar')">Calendar</p>
                <p @click="navigate('people')">People</p>
                <p @click="navigate('presenters')">Presenters</p>

            </nav>
        </div>
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

        navigate(route:string):void{
          this.$router.push(route);
          this.hideMenu();
        }

        created(): void {

            console.log("?", this.isShowingMenuModal);

        }


    }

</script>

<style lang="scss" scoped>

        svg{
          height: 20px;
          fill: white;
          position: relative;
          top: -94px;
          right: -74px;
        }

        .extended-menu{
            width: 100%;
            height: 100vh;
            position: fixed;
            background: #37373794;
            transition: 0.3s;
            z-index: 9999;
          &--wrap{
            max-width: 1072px;
            padding: 2px;
            margin: 0 auto;
            &__content{
                width: 300px;
                margin-top: 58px;
                height: 430px;
                background: white;
                box-shadow: 1px 1px 16px 8px #2323233d;
                padding: 11px 0px;
                border-radius: 5px;
                float:right;
                p{
                    margin: 21px 10%;
                    font-weight: bold;
                    text-align: left;
                    cursor: pointer;
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
        }

</style>
