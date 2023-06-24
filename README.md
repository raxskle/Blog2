# blog v2 开发文档

重写一版 UI

硬性需求：技术博客与日常博客分开，UI 需要不一样的，但是上传接口和后台管理又是同一个，接口进行分类即可。

## 技术博客

上方导航栏： 0.icon 1.日常博客 2.关于我 3.搜索框

下方直接放文章列表，右边放 tags 列表

---

之前的页面路由做得不够优雅，改成 url 决定页数，由页数来请求得到哪些文章（这一页对应的文章），并决定翻页按钮显示的当前页，翻页按钮做成组件，翻页按钮组件点击时跳到对应路由

---

todos:

[ ] 文章页图片查看大图，所有图片加载中 放 加载效果

---

## 日常文章

一文一图流

左上角悬浮 0.技术博客 1.关于我

---

做成滚动式页面

监听屏幕滚动事件，当 post 第一次进入视口时加类名 滚动效果

做好样式适配，应该效果就差不多了

---

todos:

[ ] 做一下 github actions，练一下 git 规范

---

[ ] music player，pc 端和移动端两个 UI，复用一下之前的原生 js 代码

需要 UI 元素
上一首按钮，播放/暂停，下一首按钮
进度条：可拖动
封面图，歌曲名，歌手名
音量，模式，显示/隐藏播放列表
播放列表

---

## 解决问题 1：vue router 改变路由但是复用同一个页面组件，导致页面不刷新

尝试 1：router.push()后加 router.go(0)，但是无效，反而退回了 push 之前的路由

解决：在<RouterView/>中加一个 key，使得对应组件无法被复用
<RouterView :key="key" />
const key = computed(() => route.path + Math.random());

## 解决问题 2：悬念组件<Suspense>

组件需要等待请求的数据进行渲染，返回的结果包装成 reactive，在未返回结果之前变量为 undefined。

将组件写成异步组件，方法：

1. 使用异步 setup()钩子

```
export default {
  async setup() {
    return {
      ...
    }
  }
}
```

2. 使用<script setup>语法糖时，顶层作用域的 await 可直接将组件变为异步组件。

```
<script setup>
const res = await fetch(...)
</script>
```

使用悬念组件：在异步组件加载完之前会显示 #fallback 里的内容，加载完之后渲染异步组件

```
<Suspense>
  <AsyncComponent />

  <template #fallback>
    Loading...
  </template>
</Suspense>
```

## 解决问题 3：复用底部侧边按钮 bar

外部调用者传入参数进行样式调整

文章页使用：
利用 slot 插槽扩展特有的目录显示隐藏按钮

## 解决问题 4：tags 从一条 string 变为 string[]

## 解决问题 5：scss 实现主题颜色更换

一个比较简单的做法，使用@mixin 解决

```
两个主题有两个不同变量
$w-bg-color: rgb(255, 255, 255);
$b-bg-color: rgb(15, 15, 15);

@mixin可以通过传参设置一个无主题时的默认值
判断条件变量data-theme，设置不同颜色变量

@mixin bg-color($color) {
  background-color: $color;
  [data-theme="white"] & {
    background-color: $w-bg-color;
  }
  [data-theme="black"] & {
    background-color: $b-bg-color;
  }
}

实际使用 scss 文件中：
  @include bg-color($w-bg-color);

修改主题 js 代码：
const onClickChangeTheme = () => {
  // theme 作为主题的标识 ref 变量
  theme.value = theme.value === "white" ? "black" : "white";
  // 通过setAttribute设置data-theme主题进行切换
  document.documentElement.setAttribute("data-theme", theme.value);
};

可以配合localStorage实现本地保存主题
```

## 解决 highlight.js 控制台警告未转义的 html

直接禁止警告，main.ts 配置里加一项 ignoreUnescapedHTML: true

hljs.configure({ languages: ["javascript"], ignoreUnescapedHTML: true });

## feat:搜索栏扩展搜索功能

支持搜索文章标题和 tags，支持正则表达式搜索

## feat:diary 页 header 无限翻页效果

一个宽度 100vw 的框，内部放多页内容，不要使用 css 默认的 overflow: scroll，自己定义 mouse 事件和 touch 事件来控制内部多页内容的跟随事件滚动

实现无限翻动的效果：类似于轮播图，在序列的两端加两页另一端的页面，在翻动到边缘页之后再静默跳转到另一端内容相同的页面，这样子可以是实现无限滚动。

需要注意如果用户翻动过快，在翻到尽头还没来得及静默跳转页面时，用户再次翻动，依然可能回超出，需要在 mousedown 事件就进行判断是否在序列末尾，如果是的话此时及时跳转，移动端的话就是 touchstart 事件。

## css transition 分别控制多个属性不同的过度

transiton 一项，多个不同属性之间分别写完整，再用 , 分隔

transition: transform 0.8s ease, color 0.2s ease, border 0.2s ease;

## 字体分包

字体文件过大，加载速度慢，导致页面体验不佳

使用字体分包，利用 unicode-range 属性，将一个几 m 的字体文件划分为比如 100 多个文件，先加载完的部分字体先显示对应字体，一般不需要加载完原本的整个字体包就能显示完一篇文章的所有文字，速度将会提升非常多。

翻了别人的博客的源代码，恍然大悟，其实直接调用第三方字体托管的 css 文件就行了，比如 fonts.googleapis.com，字体问题就完美解决了，不需要自己考虑操作分割和托管字体文件。

## 抽离组件：拖动框

在播放进度条和音量条都需要复用这个百分比拖动框组件

组件内搞定所有样式和交互效果，
父组件与其通过 progress 百分比数据通信，
父组件通过 watch progress 来控制 player 的进度
子组件通过 watch progress 来显示样式，同时拖动时 emit 修改 progress

搞了两三个小时，拖动框组件的每个函数逻辑都要判断横向还是竖向分两种情况写，竖向的样式也完全重写，代码基本没得复用，代码量乘 2 ，感觉复用这个组件代价有点大。。。

### 解决移动端拖动框的适配， touch 事件模拟 offset

pc 端的 mouse 事件对象 e 可以通过属性 e.clientX/Y 得到点击位置相对于视口的坐标， 属性 e.offsetX/Y 能得到点击位置相对于该元素左上角的偏移距离坐标。

但是在移动端 touch 事件中，事件对象并没有提供 offsetX/Y 属性。

首先，移动端事件对象 e 有几个属性能得到触摸 touch 信息，分别是：

1. e.touches : 在手机上的所有触点信息

2. e.changeTouches: 跟当前事件相关的所有触点信息

3. e.targetTouches：作用在当前元素上的所有触点信息

简单起见，这里直接使用 touches[0] 得到触摸信息 touch。

触摸信息 touch 有以下几个关于位置坐标的属性：

1. clientX Y 相对于视口的坐标

2. pageX Y 相对于页面左上角原点的坐标

3. screenX Y 相对于屏幕的坐标标

这几个元素都并不能直接得到触摸位置相对于当前元素的偏移距离。

想法是获得当前元素相对视口的距离，再与触摸位置相对视口的坐标相减。

那么可以通过 e.target 或者直接获取当前 DOM 元素，通过 getBoundingClientRect() 得到相对视口的距离。

如果一开始没想起 getBoundingClientRect() 这个方法也不要紧，e.target 存在 offsetTop 和 offsetLeft 属性。这两个属性可以得到当前元素的位置偏移，但是这个偏移并不是它相对于视口的偏移，而是相对于该子元素最近的进行过定位的父元素的偏移。而这个父元素可以通过 offsetParent 得到。

而这个父元素也存在 offsetTop 和 offsetLeft 属性，递归下去最终的根元素的 offsetParent 属性为 null。

那么我们只需要一路追踪所有的相对定位父元素，得到所有的 offset 偏移并相加，最终得到的就是当前元素相对根元素（也就等于相对视口 client）的偏移，记作 myOffset。

那么将触摸位置相对于视口的坐标 clientX 与 myOffset 相减就能得到触摸位置相对于当前元素的偏移 offsetX。

```
  // const _clientY = progressBar.value.getBoundingClientRect().top;
  let _clientY = 0;
  let node = e.target;
  while (node) {
    _clientY += node.offsetTop;
    node = node.offsetParent;
  }
  const offsetY = e.touches[0].clientY - _clientY;
  console.log(offsetY);

```
