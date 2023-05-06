<template>
<div class="gallery-slider">
  <div class="slider-container">
    <div class="slider" :style="{ transform: 'translateX(' + (-currentIndex * 33.4) + '%)' }">
      <div class="slide" v-for="(image, index) in images" :key="index">
        <img :src="image" alt="">
      </div>
    </div>
  </div>
  <div class="slider-nav">
    <button
            v-for="(image, index) in images"
            :key="index" @click="setCurrentIndex(index)"
            :class="{ active: currentIndex === index }">
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


}

</script>

<style lang="scss" >
.gallery-slider {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.slider {
  display: flex;
  width: calc(100% * 3);
  height: 100%;
  transition: transform 0.3s ease-in-out;
}

.slide {
  width: calc(100% / 3);
  height: 100%;
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
  font-size: 1.5rem;
  margin: 0 5px;
  cursor: pointer;
  outline: none;
}

.slider-nav button.active {
  color: #ff0000;
}

</style>
