<template>
  <div>
    <header-bar :has-background="true"></header-bar>
    <footer-main></footer-main>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import HeaderBar from "@/components/HeaderBar.vue";
import FooterMain from "@/components/FooterMain.vue";
import FooterBar from "@/components/FooterBar.vue";

@Component({
  components: {FooterBar, FooterMain, HeaderBar},
})

export default class Contact extends Vue {
  created(): void {

  }
}

</script>

<style lang="scss" scoped>
</style>
