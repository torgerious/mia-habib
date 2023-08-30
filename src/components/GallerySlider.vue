<template>
    <div class="image-slider">
        <div class="slider">
            <div class="slide" v-for="(image, index) in images" :key="index" :style="{ transform: 'translateX(' + (-currentIndex * 100) + '%)' }">
                <img :src="image" alt="">
            </div>
        </div>
        <div class="slider-nav">
            <button v-for="(image, index) in images" :key="index" @click="setCurrentIndex(index)" :class="{ active: currentIndex === index }">
                {{ index + 1 }}
            </button>
        </div>
    </div>
</template>


<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ICalendarEvent} from "@/store/calendarEvent";

@Component({
  components: {},
})

export default class HeaderBar extends Vue {
  @Prop({default:[]}) images: Array<string> | undefined;

  currentIndex:number = 0;


  setCurrentIndex(index:number) {
    this.currentIndex = index;
  }



    get sliderContainerWidth(): any {
      if(this.images)
        return (this.images.length * 100) + '%';
    }


}

</script>

<style lang="scss" >
.image-slider {
  width: 600px;
  height: 545px;
  overflow: hidden;
  position: relative;
  background: black;
  align-items: center;
  display: flex;
    @media (max-width: 600px) {
        width:400px;
        margin:0 auto;
    }
}

.slider {
  display: flex;
  transition: transform 0.3s ease-in-out;
}

.slide {
  flex: 0 0 100%; /* Each slide takes up the full width of the slider */
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.slider-nav {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}

.slider-nav button {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1rem;
  margin: 0 5px;
  cursor: pointer;
  outline: none;
}

.slider-nav button.active {
  color: #ff0000;
}

</style>
