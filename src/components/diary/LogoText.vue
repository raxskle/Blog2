<template>
  <div class="top-left-nav" @click="onClick">游牧人的文字</div>
</template>

<script setup lang="ts">
const emit = defineEmits(["onClickIcon"]);
const onClick = () => {
  emit("onClickIcon");
};
</script>

<style scoped lang="scss">
@media screen and (max-width: 500px) {
  .top-left-nav {
    display: none;
  }
}

.top-left-nav {
  z-index: 100;
  color: rgb(0, 0, 0);
  writing-mode: vertical-lr;
  cursor: pointer;
  font-size: 16px;
  background-color: rgba(230, 230, 230, 0.5);
  // background-color: rgba(212, 187, 87, 0.3);
  // box-sizing: border-box;
  padding: 2px;
  padding-top: 10px;
  padding-bottom: 10px;

  transition: color 0.2s ease;
  &:hover {
    color: rgb(88, 88, 88);
  }
}

@media screen and (max-width: 1000px) {
  .top-left-nav {
    position: fixed;
    top: 50px;
    left: 25px;
  }
}

@media screen and (min-width: 1000px) {
  .top-left-nav {
    position: fixed;
    top: 50px;
    left: 25px;
  }
}
</style>
