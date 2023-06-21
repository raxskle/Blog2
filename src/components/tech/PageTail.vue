<template>
  <div class="pagetail">
    <p>Raxskle © 2022</p>
    <p><a href="https://beian.miit.gov.cn" target="_blank"> 粤 ICP 备 2022123403 号 </a></p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.pagetail {
  width: auto;
  height: 120px;
  margin-top: 80px;
  @include f-c;
  // padding-bottom: 10px;
  > p {
    margin: 5px;
    font-size: 14px;
    @include font-color-light($w-font-color-light);
    > a {
      color: black;
      @include font-color-light($w-font-color-light);
      text-decoration: none;
    }
  }
}
</style>
