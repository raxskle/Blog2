<template>
  <div class="turn-page-bar">
    <div
      v-if="showPagesNumList.length > 0"
      class="turn-page-btn f-c nums"
      @click="onClickFrontPage"
    >
      ←
    </div>
    <div
      class="turn-page-btn f-c"
      v-for="item of showPagesNumList"
      :key="item"
      :class="{
        ellipsis: item === '...',
        nums: item !== '...',
        target: item === current.toString()
      }"
      @click="onClickTurnPage(item)"
    >
      {{ item }}
    </div>
    <div v-if="showPagesNumList.length == 0">暂无文章</div>
    <div v-if="showPagesNumList.length > 0" class="turn-page-btn f-c nums" @click="onClickBackPage">
      →
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps<{
  total: number;
  current: number;
}>();

const { total, current } = toRefs(props);
// console.log("total.value", total.value, "current.value", current.value); // 总页数和当前页数

// 显示的数字和省略号列表
const showPagesNumList = computed((): string[] => {
  let list = [];
  if (total.value <= 5) {
    for (let i = 1; i <= total.value; i++) {
      list.push(i.toString());
    }
  } else if (current.value === 1 || current.value === 2) {
    list.push("1");
    list.push("2");
    list.push("3");
    list.push("...");
    list.push(total.value.toString());
  } else if (current.value === 3) {
    list.push("1");
    list.push("2");
    list.push("3");
    list.push("4");
    list.push("...");
    list.push(total.value.toString());
  } else if (current.value == total.value || current.value == total.value - 1) {
    list.push("1");
    list.push("...");
    list.push((total.value - 2).toString());
    list.push((total.value - 1).toString());
    list.push(total.value.toString());
  } else if (current.value == total.value - 2) {
    list.push("1");
    list.push("...");
    list.push((current.value - 1).toString());
    list.push(current.value.toString());
    list.push((total.value - 1).toString());
    list.push(total.value.toString());
  } else {
    list.push("1");
    list.push("...");
    list.push((current.value - 1).toString());
    list.push(current.value.toString());
    list.push((current.value + 1).toString());
    list.push("...");
    list.push(total.value.toString());
  }
  // console.log(list)
  return list;
});
// console.log(showPagesNumList.value);

// 点击页数翻页
const onClickTurnPage = (item: string) => {
  if (item != "...") {
    router.push(`/tech/${item}` + "?time=" + Date.now());
    // router.go(0);
  }
};

// 向前翻页
const onClickFrontPage = () => {
  if (current.value > 1) {
    router.push(`/tech/${current.value - 1}` + "?time=" + Date.now());
  }
};
// 向后翻页
const onClickBackPage = () => {
  if (current.value < total.value) {
    router.push(`/tech/${current.value + 1}` + "?time=" + Date.now());
  }
};
</script>

<style scoped lang="scss">
.turn-page-bar {
  width: 100%;
  height: 80px;
  @include f-r;
  @include page-bg-color($w-page-bg-color);
}

.turn-page-btn {
  width: 40px;
  height: 40px;
  @include page-bg-color($w-page-bg-color);
  @include font-color($w-font-color);
}

.ellipsis {
  @include page-bg-color($w-page-bg-color);
  @include font-color($w-font-color);
}

.nums {
  @include page-bg-color($w-page-bg-color);
  @include font-color($w-font-color);
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    // @include bg-color-reverse($w-bg-color-reverse);
    @include bg-color-black-white;
    @include font-color-reverse($w-font-color-reverse);
  }
}

.target {
  // @include bg-color-reverse($w-bg-color-reverse);
  @include bg-color-black-white;
  @include font-color-reverse($w-font-color-reverse);
}
</style>
