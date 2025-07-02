<template>
    <footer>
        <div class="content">
          <div class="left">
            <h2>Mia Habib Productions</h2>
              <h3>Contact info</h3>
<!--            <p>Mia Haugland Habib | Artistic Director & choreographer</p>-->
<!--            <div class="line"></div>-->
            <br>
<!--            <img src="about-mia.jpg" alt="mia" >-->

          </div>

          <div class="right">

<!--            <facebook-icon></facebook-icon>-->
<!--            <instagram-icon></instagram-icon>-->
          </div>

        </div>
      <div class="contact">
        <p>
            <p>Mia Haugland Habib | Artistic Director & choreographer<br>
                <div class="line"></div>

            mia@miahabibproductions.com<br>
          +47 90 16 88 82
        </p>

        <br>
        <p>
          Frida Skinner | Managing Director and producer <br>
            <div class="line"></div>
          frida@miahabibproductions.com<br>
          +47 48 28 97 88
        </p>
      </div>
<!--      <div class="copyright">-->
<!--        <p> <i>&#xa9;miahabib 2021 - <span @click="contact" class="contact">contact</span></i></p>-->
<!--      </div>-->
    </footer>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import FacebookIcon from "@/components/facebookIcon.vue";
    import InstagramIcon from "@/components/instagramIcon.vue";

    @Component({
        components: {InstagramIcon, FacebookIcon},
    })

    export default class FooterMain extends Vue {
        created(): void {

        }
      contact():void{
          this.$router.push("/contact");
      }
    }

</script>

<style lang="scss" scoped>
    footer{

      .line{
        width: 40px;
        height: 3px;
        border-radius: 2px;
        background: #eeb1a6;
        margin-top: -11px;
      }

        //background: #fafafa;
        color:#333;
        width: 100%;
        //height: 400px;
        .content{
            display: flex;
            max-width: 1100px;
            justify-content: center;
            padding: 20px 0;


            @media only screen and (max-width: 800px) {
              width:95%;
              margin:0 2.5%;
              display: block;
            }

            .left{
              text-align: left;
              width:50%;

              @media only screen and (max-width: 800px) {
                width: 100%;
                display: block;
              }
              h2{
                font-size: 40px;
              }
              p{
                font-size: 20px;
                margin: -27px 0 0 0;
              }
              .line{
                width:40px;
                height: 3px;
                border-radius: 2px;
                background:#eeb1a6;
              }
            }
            .right{
              width:50%;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              @media only screen and (max-width: 800px) {
                width: 100%;
                display: flex;
                justify-content: start;
                margin-top: 17px;
              }
            }
        }
        .contact{
          text-align: left;
          display: block;
          max-width: 1100px;
          justify-content: center;
          padding: 20px 0;
          margin: 0 auto;
          margin-top: -80px;
          @media only screen and (max-width: 800px) {
            width:95%;
            margin:0 2.5%;
            display: block;
            margin-top: -90px;
          }
          //border-top: 2px solid #f0f0f0;
        }
        .copyright{
          width: 100%;
          text-align: center;
          background: #efefef;
          height: 44px;
          //display: block;
          position: relative;
          display: inline-block;
          color: #333;
          font-weight: bold;
          bottom: 0;
          p{
            padding: 0px 0;
          }
          span{
            text-decoration: underline;
            display: contents;
            cursor: pointer;
          }
        }
    }
</style>
