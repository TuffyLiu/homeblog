<template>
  <header class="header">
      <router-link  :to="{name: 'Home'}">
           <img class="logo" alt="tuffy logo" src="../../assets/logo.png">
      </router-link>

      <div class="nav" >
          <ul class="menu" :class="[menuOpen ? 'oppen' : 'close' ]">
              <router-link tag="li" :to="{name: 'Home'}" >Home</router-link>
              <router-link tag="li" :to="{name: 'Blog'}" >Blog</router-link>
              <router-link tag="li" :to="{name: 'Photo'}" >Photo</router-link>
              <router-link tag="li" :to="{name: 'Cook'}" >Cook</router-link>
              <router-link tag="li" :to="{name: 'About'}" >About</router-link>
          </ul>
          <button type="button" name="button" class="btn-menu" @click="clickMenu">
              <span class="btn-svg">
                  <svg viewBox="0 0 18 17" class="svg-menu" v-if="menuOpen"><path d="M5.968 8.271L1.03 3.333c-.716-.716-.663-1.93.118-2.71.78-.782 1.994-.835 2.71-.119L9.044 5.69 14.663.976c.775-.65 1.98-.493 2.69.354.71.846.656 2.06-.12 2.71l-5.35 4.49 4.94 4.938c.715.716.662 1.93-.119 2.71-.78.782-1.994.834-2.71.118L8.808 11.11 3.19 15.825c-.776.65-1.98.492-2.69-.354s-.657-2.06.118-2.71l5.35-4.49z" fill="#FFF"></path></svg>
                  <svg viewBox="0 0 20 17" class="svg-menu" v-else  ><path d="M18.15 6.3c.911 0 1.65.806 1.65 1.8s-.739 1.8-1.65 1.8H1.65C.739 9.9 0 9.094 0 8.1s.739-1.8 1.65-1.8h16.5zM1.65 3.6C.739 3.6 0 2.794 0 1.8S.739 0 1.65 0h16.5c.911 0 1.65.806 1.65 1.8s-.739 1.8-1.65 1.8H1.65zm16.5 9c.911 0 1.65.806 1.65 1.8s-.739 1.8-1.65 1.8H1.65C.739 16.2 0 15.394 0 14.4s.739-1.8 1.65-1.8h16.5z" fill="#FFF"></path></svg>
              </span>
          </button>
      </div>
  </header>
</template>
<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';

@Component
export default class Header extends Vue {
    private menuOpen = true;
    private clickMenu(): void {
        this.menuOpen = !this.menuOpen;
    }
}
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
