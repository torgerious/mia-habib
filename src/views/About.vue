<template>
  <div>
    <header-bar :has-background="true"></header-bar>
    <div  class="page">
      <h1 class="main-header">About </h1>

      <div class="content">
        <br>
        <div class="img-wrap">
          <img src="about-mia.jpg" alt="mia" >
        </div>
        <div class="text">
          <p><b>Mia Haugland Habib</b> (b. 1980, Houston) is an Oslo-based dancer, performer and choreographer working at the intersection of performance,
            exhibitions, publications, lectures, teaching, mentoring and curating. Habib has collaborated internationally with artists such as Jassem
            Hindi, Guilherme Garrido, Julie Nioche, Rani Nair, Brynjar Bandlien. She danced with Carte Blanche, The Norwegian National Company of Contemporary Dance,
            from 2017-2018, for whom she also made a commissioned work. <br> <br><b>Habib’s work</b> has been presented amongst other places at: LaMaMaMoves!, TBA festival,
            Tanz im August, Dance House Oslo, Aerowaves 2015, Black Box Theatre Oslo, BIT Teatergarasjen, Theatre Freiburg, Tanzhaus nrw Dusseldorf, Spielart
            Festival, Gothenborg Dance and Theatre festival, On Marche Festival Marrakech, I’TRÔTRA Festival Antananariv and CODA Oslo International Dance
            Festival. Habib holds an M.A in conflict resolution and mediation from Tel Aviv University and a choreography education from Oslo National Academy
            of the Arts. Mia Habib established Mia Habib Productions in 2004 and is supported by the Norwegian Arts Council.</p>
        </div>
      </div>

      <div class="text-full">
        <p><b>Habib makes work that speaks to the major concerns of our time.</b> She engages broad audience and local communities across social, political,
          and artistic spheres and in private, domestic, and public spaces. Over the last 15 years, her practice has taken her to dance houses, opera
          stages, galleries, public spaces, private houses, religious buildings, squats, and sites of protest and conflict around the world, including
          an installation on the border fence between the US and Mexico, a solo in the mountains of Iraq, a healing dance in someone’s living room,
          and a large-scale work for 68 people on an opera stage. Habib looks for spaces where her work can interact with different audiences and with
          the realities of local communities. <br> <br> <b>Habib is currently working on</b> her upcoming project “How to Die – Inopiné” premiering at the Norrlandsopera
          (NO) in Umeå, Sweden February 6 in 2020. The project involves artists and researchers across disciplines to interact with local communities and
          seeking a shared mode of articulating an intellectual response to migration, the cultural panic and ecological grief that pervade our world.
          A co-production with Norrlandsoperan, Umeå, Sweden, Dance House, Oslo, Norway among others. During 2020 Habib is touring her piece
          “ALL – a physical poem of protest”, – performing at Burgtheater, Wien and SwitchPoint, North Carolina, USA among other places.</p>
      </div>

      <div class="text-full">
        <h2>ARTIST STATEMENT</h2>
        <p>
          Everyone’s house is the headline of MHP ́s overarching mission for the next four years. <br><br>
          I understand theatre as a social and political space. I look for spaces where my work can interact with different audiences, local communities and realities, and engage in larger conversations beyond the work itself. My practice requires plasticity, mobility, site-sensitivity and soft borders. It is an expanding practice aiming for different people and realities to encounter each other.<br><br>
          The ongoing tension between mass and individual and the power of meeting, are keywords in my artistry. Both looking for the obvious and the impossible encounters in different contexts while holding a culture critical perspective on body, identity, society and dance.<br><br>
          In a publication about my mass-solo HEAD(S) my working partner Jassem Hindi writes: “And yet, a mass solo is also about a body that lets itself be invaded. Mia lets the crowd come to her, almost into her. Politically, socially, intimately. A high risk for a single body: to be given to an unknown crowd. To invert the laws of hospitality and of public theater: her house becomes everyone’s house, a radical operation”. This quote reflects MHP´s  practice: Everyone’s house.</p>
      </div>




    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import HeaderBar from "@/components/HeaderBar.vue";
import {actionStringWork, Category, IWork} from "@/store/work";
import {Action} from "vuex-class";
import {category} from "@/Types/Types";
import Loader from "@/components/loader.vue";
import FooterBar from "@/components/FooterBar.vue";
import FooterMain from "@/components/FooterMain.vue";


@Component({
  components: {FooterMain, FooterBar, Loader, HeaderBar},
})

export default class About extends Vue {
  @Action(actionStringWork.GET_WORK) getWork: (() => Promise<IWork[]>) | undefined;





  created(): void {

  }
}

</script>

<style lang="scss" scoped>

.content{
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 10px;
  display: flex;
  @media only screen and (max-width: 1050px) {
    display:block;
  }
}




.page{
  width:100%;
  max-width: 1500px;
  margin:0 auto 60px auto;
  .main-header{
    text-align: center;
    margin: 108px 30px 52px 0px;
    @media only screen and (max-width: 1050px) {
      margin: 45px 0 10px 0;
    }
  }
  .text{
    width: 80%;
    padding: 0 50px;
    text-align: left;
    line-height: 25px;
    margin-top: -18px;
    @media only screen and (max-width: 1050px) {
      width: 100%;
      padding: 0 50px;
      box-sizing: border-box;
      margin-top: 50px;
    }
  }
  .text-full{
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 10px;
    display: block;
    text-align: left;
    line-height: 27px;
    h2{
      width:100%;
      margin-top: 50px;
    }
    p{
      width: 100%;
    }
    @media only screen and (max-width: 1050px) {
      padding: 0 50px;
    }
    }
  .img-wrap{
    @media only screen and (max-width: 1050px) {
      width: 243px;
    }
    width: 20%;
    margin: 0 auto;
    background: #fff;
    padding: 32px;
    border-bottom-left-radius: 67px;
    border-bottom-right-radius: 182px;
    border-top-left-radius: 102px;
    max-height: 304px;
    //img{
    //  border-bottom-left-radius: 67px;
    //  border-bottom-right-radius: 182px;
    //  border-top-left-radius: 102px;
    //  box-shadow: -12px 11px 20px 20px #000;
    //}
  }
}


</style>
