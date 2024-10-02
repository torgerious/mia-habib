<template>
  <div>
    <header-bar :has-background="true"></header-bar>
    <div  >
      <h1>People </h1>

      <div  v-if="activePeople" class="modal"  @click.self="hideMenu">
        <div class="active-ppl">
          <button @click="hideMenu">exit</button>
          <h3>{{activePeople.name}}</h3>
          <p>{{activePeople.profession}}</p>
          <img :src="activePeople.image" :alt="activePeople.name" >
          <p class="main-text" v-html="activePeople.description"></p>
        </div>
      </div>

      <div class="content">

        <article @click="showModal(people, i)" v-for="(people, i) in people" :key="i + 'name'">
          <div>
            <img :src="people.image" alt="mia" >
            <p>{{people.name}}</p>
            <p><span>{{people.profession}}</span></p>
          </div>
        </article>


      </div>


    </div>
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
interface IPeople{
  image:string,
  name:string,
  profession:string,
  description:string,
}

@Component({
  components: {FooterMain, FooterBar, Loader, HeaderBar},
})

export default class People extends Vue {
  activeIndex:number | null = null;
  activePeople:IPeople | null = null;

  people:Array<IPeople> = [
    {image:"about-mia.jpg", name:"Mia Habib",
        profession:"Artistic director, choreographer and dancer",
        description:"Mia Haugland Habib (b. 1980, Houston) is an Oslo-based dancer, performer and choreographer working at the intersection of performance, exhibitions, publications, lectures, teaching, mentoring and curating. Habib has collaborated internationally with artists such as Jassem Hindi, Guilherme Garrido, Julie Nioche, Rani Nair, Brynjar Bandlien. She danced with Carte Blanche, The Norwegian National Company of Contemporary Dance, from 2017-2018, for whom she also made a commissioned work."},

      {image:"Ida.png",
          name:"Ida Frømyr Borgen",
          profession:"Managing director and producer",
          description:"Ida Frømyr Borgen (1988) is a freelance dance artist, teacher and producer based in Oslo. She has a BA from the Norwegian College of Dance in Oslo, as well as a two year degree from The School for New Dance in Oslo. Ida is a founding member of the dance collectives Ompaniet and Kunstgress. As a producer she has worked with choreographer Ingrid Fiksdal, STICKY Productions and Rom for Dans w/Caroline Wahlström Nesse, Camilla Myhre and Marius Kjos"},
    {image:"frida.jpg", name:"Frida Skinner (on maternity leave)",  profession:"Managing director and producer", description:`Frida has a BA in Performing Arts from London Studio Centre, as well as Arts Management from Oslo Metropolitan University. She has several years of experience both as a dancer and producer. She has previously worked with Ingun Bjørnsgaard Prosjekt, CODA, Goksøyr & Martens and Jo Strømgren Kompani, and now as a full time managing director at Mia Habib Productions.`},
      {image:"jassem.jpg", name:"Jassem Hindi",  profession:"Artistic partner and sound designer",
          description:`Jassem Hindi's work looks at the double bind of haunting and hospitality, in an effort to reveal slow (unseen and quiet) violence and slow revolutions. His work often starts with a poem, and his performance practice is casted between nervousness and necessity, using broken bodies, broken objects, fragments  of texts. His last recent performances make use of the relation between performance and death poems, to create immersive environments and collective political spaces. His work is hybrid, and extends to a variety of forms of expression.
            <br><br>
            With Mia Habib: They have a long term artist research and performance project called Stranger Within. They write a haunted cartography of Norway, performing in people's house against a dinner.  They observe the migrations of past and present living beings on the land.
            <br><br>
            This recent period, he is in collaboration with Barbara Raes, Keith Hennessy, Sina Seifee, Harald Beharie, Charlott Utzig, Chloe Chignell, Lara Kramer, Ofelia Ortega, Clara Furey, Simon Portigal, Justin De Luna and Mia Habib.
            <br><br>
            His work is shown internationally, and his collaborations have won numerous awards nad nominations (Bessie Award, the Dublin Fringe Jury prize and the PICA Portland Jury’s choice...)`},
      {image:"Liam.jpg", name:"Liam Alzafari",  profession:"Scenographer", description:`How to. A Score <br><br>Liam Monzer Alzafari is Norway based scenographer. He is interested in Scenography as an Act Of Remonstration. His works focus on mutating existing space strategies with spatial tactics to reorganize spaces. <br><br> He is interested in the poetics of spaces and Scenographical propositions related to the political, satirical, and associative approaches of popular culture in the Middle East. Examples of these are found in the stories of Nasreddin Hodja. Similarly, seeking to explore how scenography could be used to reveal power relations in theatre and public life. By working with interventions that ask for interaction and tease position-taking, he seeks to develop scenography approaches that engage in public space, social life, and politics. Concretely, through interventions, exploring the staging of performative strategies, and developing tacts of invitations into public conversations.<br><br> His work has been presented in the Levant until 2015 and between Norway, Switzerland, Catalonia, and the Czech Republic.<br><br>He holds an MA in scenography from the Norwegian Theater Academy - Fredrikstad and a BA in set design from the Higher Institution Of Theatrical Art - Damascus.`},
      {image:"ingeborg.jpg", name:"Ingeborg Olerud",  profession:"Light Designer", description:`How to die – Inopiné, We Insist, A song to, A couples dance, ,Schulammite`},
     {image:"filiz.jpg", name:"Filiz Sinzali",  profession:"Choreographer and dancer", description:`How to. A Score <br> <br> FILIZ SIZANLI is a Turkish dance artist and has participated in various projects at the
Theatre Research Laboratory of Istanbul Municipality Theater after graduating from Istanbul Technical University’s Department of Architecture in 1997. She was among the initial co-founders of Çatı Contemporary Dance Artists Association in a collective artists’ group, which has been continuing its activities for over two decades. Between 2001-2005, she worked with Mathilde Monnier at the Centre Chorégraphique National de Montpellier (CCN) along with working on different projects with Emmanuelle Hyunh, Mustafa Kaplan, Yann Marussich and Julie Nioche. In 2002, she founded Taldans Company with Mustafa Kaplan. Between 2013-2015, she taught on body and space relation in movement at Eskişehir Anadolu University State Conservatory Theater Department and Eskişehir City Theater. She has been teaching at Mimar Sinan Fine Arts University State Conservatory Contemporary Dance Department (MSFAU) since 2017. In 2020, she graduated from MFA at the MSFAU Contemporary Dance Department with the thesis “Choreographic Research In The Limited Space,” and in 2021 began her Ph.D studies in the same department.`},
      {image:"julie.jpg", name:"Julie Nioche",  profession:"Choreographer and dancer", description:`
      How to. A Score<br><br>Julie Nioche is a dancer, choreographer and osteopath, graduated from the Conservatoire National Supérieur de Musique et de Danse de Paris in 1995. She performed then with Odile Duboc, Hervé Robbe, Meg Stuart, Alain Michard, Catherine Contour, Emmanuelle Huynh, Alain Buffard, Jennifer Lacey. From 1996 to 2007, she co-directed the association Fin Novembre with Rachid Ouramdane. She participated in joint projects, initiated her own and set up numerous research mechanisms.<br><br>
      In 2007, Julie Nioche initiated the creation of A.I.M.E. - Association of Individuals in Committed Movements, which has accompanied her artistic projects and works on the infusion of knowledge related to dance in society.<br><br>
      Julie Nioche works with dance as a place of research to make sensibilities and imaginations visible. Each creation is an experiment, paying close attention to the process, to the path towards realization. She shares questions, offering a space for debate and exchange. Dance is a meeting place. Far from any narrative exercise, it works with the history of professional bodies and not. The dance exposes itself to living bodies, erasing the ordinary limits of the stage. Her works start from an attention to the imaginary constructing our identity and sensibility, allowing our projections, movements, ideas, acts, or complexifying them. She also gives a radical place to scenography, music and light, which are constructed simultaneously with the dance as many sensitive points of view. Like an ecosystem, all the elements are autonomous and interdependent, opening a particular sensitive listening. She speaks of 'environmental' works, seeking to envelop the spectators in order to awaken their empathy through their own sensations, imagination and memories.<br><br>
      Julie Nioche thus involves the dancers with whom she collaborates in sensorial dances, engaging their intimacy in the movement, which is, in her eyes, the forgotten dimension of the political fabrication of bodies.`},
      {image:"thais-di-marco.jpg", name:"Thais Di Marco",  profession:"Choreographer and dancer", description:`Thais Di Marco is an artist from the City of São Paulo based in Amsterdam since 2016. Thais is a dancer, performing arts director, teacher and project coordinator with 15 years of professional trajectory working in contexts such as artistic residencies, creative platforms and independent spaces focused on social projects and critical thinking. Thais Is a Queer Roma descendent and born in a traditional Candomblé community in Brazil and carry the legacy of their ancestors making art for social change and futurities that we might want to live in.
       <br><br>
        Internationally, worked within social movements such as EZLN in Mexico, Pan-Africanist movement in Benin - West Africa, at the independent space Bon Gah in Iran and at the anarcho-feminist movement Mujeres Creando in Bolívia.
        <br><br>
        In the European context, has a collaboration with De Singel in Antwerp, Centrale Fies in Italy, Het Huis Utrecht and has performed or hosted events and collaborations at Frascati Theater, Theater Rotterdam, Veem House, Stedelijk Museum and others and has been working since 2022 on their on project The Goldfish Bleeding in a Sea of Sharks. Thais has also collaborated with Choreographer Mia Habib as part of the project How To A. Score who was also a mentor and teacher.
        <br><br>
         As teacher, Thais was educated in social projects for art and democratization in São Paulo, and work for 6 years teaching youngsters at Casa de Cultura da Brasilandia, one of the neighbourhoods with the highest rates of state genocide in the Americas as well as at Ocupa Ouvidor, the biggest artists occupation in the Americas. Has also mentored SNDO and Das Theater Students as well as classes at the Master in Dance of the Royal Conservatory of Antwerp in 2023.
         <br><br>
          Thais works with comedy, open mic platforms around power struggle and liberation and believes art making has the power to support the permanence of all the people (s) and the Earth in opposition to cultural homogenization and cosmological domination.
         <br><br>
        To know more: <a href="www.thaisdimarco.com.br">www.thaisdimarco.com.br</a>
        <br><br>
        @gunpoweder.on.fire
        `
      },
      {image:"default.png", name:"Thami Hector Manekehla",  profession:"Choreographer and dancer", description:`is a dancer and choreographer, was born and raised in Soweto, South Africa under the Apartheid regime. He describes his path into dance as a self-practice where he has acquired knowledge through workshops and meetings with various artists, as opposed to traditional formal dance education. Through his work, he has worked all over the world with well-known names such as Kettly Noel, Gilles Jobin, Maria La Ribot. Manekehla’s own work is characterized by a clean-cut perfected simplicity where abstraction allows for associations. Often with a harsh political undertone. His work has touched on cultural ideas about masculinity, taboos around homosexuality and racial issues. Most recently in the acclaimed trio he developed with Ligia Lewis and Jonathan Gonzalez around the theme ‘Blackness’.`},
      {image:"noonan.png", name:"Tommy Noonan",  profession:"Choreographer and dancer", description:`How to. A Score <br><br> Tommy Noonan is a director, choreographer, writer, performer and organizer based in Saxapahaw, NC. His trans-disciplinary performances have been presented extensively throughout the US, Germany, France, Portugal, Poland, Switzerland, Austria, Spain, Norway and Mexico. His work engages rich and complex dynamics of power, belonging and ambivalence that arise in the situation of performance itself. Drawing on a diverse range of practices, such as contemporary dance, theater, sound installation, somatics and community facilitation, Noonan's work always circles around the felt sense of an embodied encounter in a specific place – and the multitude of questions about commonality and difference that result.<br><br>

Noonan has extensively toured smaller creations such as now here (2006) Brother Brother (2009) The Engagement (2011) Wilderness (2013), What Doesn’t Work (2013) John (2016) and Assembly (2022). He was co-commissioned to create Je Suis Belle (2016) at the North Carolina Museum of Art, They Are All (2019) at the American Dance Festival, and Eclipse (2022) at Carolina Performing Arts. His research and work in public space performance has appeared in the Guidebook of Alternative Nows, and his writings on collectivity and organizing have appeared in Fries Theater Journal (Austria) Revisita Obscena (Portugal) and The Performance Journal (NYC).<br><br>

Together with Murielle Elizéon, he co-directs Culture Mill: an award-winning performing arts laboratory in Saxapahaw, North Carolina, USA. Culture Mill serves as a vehicle to support Noonan and Elizéon’s artistic works, as well as a space in which to enrich and develop a creative ecosystem of experimental embodied art in rural North Carolina.`},
      {image:"default.png", name:"Thomas Lønning",  profession:"Light designer and technician", description:`How to. A Score <br><br> `},
      {image:"default.png", name:"Harald Beharie:",  profession:"Dancer", description:`(born in Sandnes) has worked with choreographers as Mia Habib, Ingri Fiksdal, Heidi Jessen and Kristine Gjems. Since 2016 he has also been a part of Carte Blanche, The Norwegian National Company of Contemporary Dance. Together with Julie Moviken and Charlott Utzig, he is a part of the dance/performance collective - De Naive and he also has an ongoing collaboration with Louis Schou Hansen since 2014.<br><br> `},
      {image:"charlotte.heic", name:"Charlott Utzig",  profession:"Dancer", description:`How to die – Inopiné, HOW<br><br> Charlott Utzig is an Oslo-based dancer and performer. She has worked with choreographers and companies such as Kristin Ryg Helgebostad, Mia Habib Productions, Ingun Bjørnsgaard Prosjekt, Agder Nye Teater, Th’Line and Rom For Dans. Together with Julie Moviken and Harald Beharie, she is a part of the performance collective - De Naive. Their work has been presented in museums, galleries, festivals and contexts including Stavanger Kunstmuseum, Dansens Hus Oslo, Oktoberdans BIT-teatergarasjen Bergen, Munch Museum, Vigeland Museum Oslo, UTTRAN Stockholm, RAS Sandnes, Ravnedans Kristiansand, Kunstnerforbundet Oslo, Bodø Biennale among others. `},
      {image:"default.png", name:"Otto Ramstad:",  profession:"Dancer", description:`How to die – Inopiné<br><br> `},
      {image:"default.png", name:"Nina Wollny",  profession:"Dancer", description:`(b. Bremen) is now based in Trondheim. She studied contemporary dance at the Rotterdam Dance Academy/Codarts, in the Netherlands. She has worked for the company anoukvandijk dc as a dancer, rehearsal director and artistic assistant for more than 10 years. Since 2012 Nina is working with several different choreographers in Europe, among others with the German choreographer Jenny Beyer.`},
      {image:"jean.jpg", name:"Jean Baptiste",  profession:"Dancer", description:` How to die – Inopine, Kordan, HOW<br><br>Jean-Baptiste Baele is a freelance Belgian choreographer currently based in Kristiansand, Norway. He discovered his passion for dance at the age of 19 and began his training in Belgium. After three years of dancing in Belgium, he moved to London to pursue a bachelor's degree at Trinity Laban conservatory of Music and Dance. In 2015, he graduated with the Marion North Award Of Outstanding Performance Achievement. <br><br>

Throughout his career, Jean-Baptiste has worked with various choreographers and companies, including Mia Habib, Daniel Mariblanca, Fred Gehrig, and Niki Van Callandt. In 2018, he co-founded Baejjahn Dance company with Julie Amal, serving as co-director and choreographer until 2021. In that year, he created his first autobiographical solo piece titled "Nabinam," which was selected to be part of Aerowaves Spring Forward 2023. In 2022, Jean-Baptiste established his own company, Nabinam Dance Company, where he currently serves as the artistic director.<br><br>

As a choreographer, Jean-Baptiste explores the complexity of social behaviors, the historical context of the body and its memories, and the physicality that unfolds in space. Pieces involved in: -How to die Inopiné -Kordan `},
      {image:"default.png", name:"Asher Lev",  profession:"Dancer", description:`(b. Toronto) is a dancer and choreographer whose works have toured in festivals in Europe, Israel, Canada and the U.S. He danced for Batsheva in Tel-Aviv, Carte Blanche, The Norwegian National Company of Contemporary Dance and in many projects across Europe. He has an M.A. in Choreography from the Amsterdam University of the Arts. Together with his partner, Irina Lavrinovic, Lev is invested in teacher plants, Sufi Spinning Practice, sitting and moving meditation and ecstatic Breathwork`},
      {image:"default.png", name:"Anna Pehrsson",  profession:"Dancer", description:`n (b. Boliden) has danced with Alias compagnie and Cullberg Ballet, with choreographers such as Edouard Lock, Jefta van Dinther, Eszter Salamon, Deborah Hay and Benoît Lachambre. Since 2016 she also creates her own work. She is active as a mentor and rehearsal director in different constel lations and has taught at Balletacademy, DOCH Choreography Department, Dansalliansen, Bronnbacher Stipendium, Germany, and at the Hong Kong Academy for Performing Arts.<br><br> `},
      {image:"cecilio.png", name:"Cecilio Orozco",  profession:"Costume Designer", description:`How to die - Inopiné<br><br> Cecilio Orozco is a costume, light and scenography designer with Ma in Performance.

Their practice is inclined towards a more avant-garde experimental design rather than classical.<br><br>

As a performer Cecilio works with visibility of diversity, indigenous identities, rescuing their Zapoteca heritage, decolonial action and theory, gender politics, the power of erotica and fetish dynamics.<br><br>

Originally from Mexico he has lived in Norway for the last 7 years studying and now living in Oslo, building a home and reaching out to engage creatively with other artists and projects as a designer, performer or outer eye, hopefully finding friends and collaborators on the way.<br><br>

For Mia Habib he continued the costume design started by designer Ali and reconfigured the design for endurance in the outdoors. Rain, gravel, and tough weather were considered to protect the performers from unpredictable exterior conditions. Cecilio also did the costume for Mia Habib’s latest solo.`},
      {image:"default.png", name:"Namik Mackic",  profession:"Concepteur and research curator", description:`(b. Mostar) is an urbanist, designer, educator, curator, and artist. His design and artistic research practice studies vectors of landscape dynamics and migration as sources of alternative patterns of urbanization and futures of collective form. A graduate of the Master in Design Studies program at Harvard University Graduate School of Design, he is currently Assistant Professor at The Oslo School of Architecture and Design, and Research Program Manager at Southern California Institute of Architecture. His writings have appeared in New Geographies, The Metropolitan Laboratory, and Sursock Museum’s publication Elements for a World.<br><br> `},
      {image:"default.png", name:"Steinunn Ketilsdóttir",  profession:"Artistic advisor", description:`<br><br> `},
      {image:"default.png", name:"Ali Hazara",  profession:"Costume Designer", description:`How to die - Inopiné, Kordan<br><br> `},
      {image:"default.png", name:"Ashkan Sepahvand",  profession:"Researcher and editor", description:`(b. Tehran) is a writer and artistic researcher. He has worked as Adjunct Lecturer at the Hochschule für Künste Bremen (2018-19), as Research Fellow at the Schwules Museum (2016- 17), and at Haus der Kulturen der Welt (2012-14), where he co-edited the publication Textures of the Anthropocene: Grain, Vapor, Ray (The MIT Press, 2015). His work and writings have been presented at the 58th Venice Biennale, dOCUMENTA (13), Sharjah Biennials X & 13, Ashkal Alwan, amongst others. Currently, he is pursuing a DPhil in Fine Art at the Ruskin School of Art and St. John’s College, University of Oxford, where he is a Clarendon-AHRC Scholar.`},
      {image:"default.png", name:"Marie Kraft",  profession:"Researcher", description:`How to die - Inopiné<br><br> `},
      {image:"default.png", name:"Trond Solberg",  profession:"Set design consultant", description:`How to die - Inopiné, HOW<br><br> `},






  ];


  hideMenu():void{
    this.activeIndex = null;
    this.activePeople = null;
  }

  showModal(people:IPeople, index:number):void{
    this.activeIndex = index;
    this.activePeople = people;
  }


  created(): void {

  }
}

</script>

<style lang="scss" scoped>
h1{
  text-align: center;
  margin: 69px 30px 12px 0px;
}
.modal{

  width: 100%;
  height: 100vh;
  position: fixed;
  background: #37373794;
  transition: 0.3s;
  z-index: 9999;
  top:0;
  overflow: scroll;
  .active-ppl{
    position: absolute;
    width: 90%;
    min-height: 500px;
    border-radius: 10px;
    background: white;
    margin: 100px 5%;
    img{
      height: 250px;
      filter: grayscale(1);
    }
    h3{
      line-height: 0px;
    }
    button{
      margin: 20px 0;
      background: #333;
      padding: 5px 14px;
      color: white;
      border: none;
      border-radius: 2px;
      font-size: 15px;
      cursor: pointer;
    }
    .main-text{
      margin-bottom: 40px;
      padding: 20px 77px;
      line-height: 26px;
      max-width: 600px;
      margin:0 auto;
      text-align: left;
    }
  }
}
.content{
  width: 100%;
  /*padding: 30px;*/
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  box-sizing: border-box;
  justify-content: center;
  max-width: 1100px;
  margin: 40px auto;

  article{
    width: 24%;
    justify-content: space-between;
    height: auto;
    margin: 25px 3%;
    text-align: left;
    cursor: pointer;
    @media screen and (max-width: 800px) {
      width: 100%;
      margin: 0;
    }
    p{
      margin: 5px 0;
      color: black;
      font-weight: bold;
    }
    img{
      width:100%;
      height: 250px;
      object-fit: cover;
      background: #ebebeb;
      filter: grayscale(1);
    }
    span{
      font-size: 14px;
      color: #6f6f6f;
    }
  }
}






</style>
