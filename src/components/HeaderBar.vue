<template>
    <header :class="{'dark' : hasBackground}">
        <div class="wrapper">
            <div class="logo" @click="navigate('/')">Mia habib productions</div>
            <nav>
<!--                <p class="not-menu" @click="navigate('about')">About</p>-->
                <router-link tag="p" to="/about" exact >About</router-link>
                <router-link tag="p" to="/work" exact >Work</router-link>
                <router-link tag="p" to="/contact" exact >Contact</router-link>

<!--              <p class="not-menu" @click="navigate('work')">Work</p>-->
<!--                <p class="not-menu" @click="navigate('contact')">Contact</p>-->
                <p @click="openMenu"> <HamburgerMenu></HamburgerMenu>More</p>
            </nav>
        </div>

    </header>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {Getter, Mutation} from "vuex-class";
    import {getterStringMenuModal, mutationStringMenuModal} from "@/store/menuModal";
    import HamburgerMenu from "@/components/HamburgerMenu.vue";

    @Component({
        components: {
          HamburgerMenu

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

      navigate(path:string):void{
        this.$router.push(path);
      }

        created():void{

        }
    }

</script>

<style lang="scss" >
.router-link-exact-active  {
  transition: 0.3s;
  display: inline-block;
  border-bottom: 1px solid white;
  padding-bottom: 2px;
}

@media only screen and (max-width: 800px) {


  .not-menu{
    display: none;
    transition: 0.3s;

  }
}

    .dark{
        background:#333;

    }

    .wrapper{
        width: 1100px;
        margin: 0 auto;
        height: 30px;
        font-size: 20px;
      p{
        cursor: pointer;
      }
      .logo{
        cursor: pointer;
      }
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
