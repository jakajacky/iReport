<!--region 图片组件-->
<template>
  <div class="c-image">
    <img style="width:100%;height: 100%;" :src="compObj.props.url"/>
  </div>
</template>
<!--endregion-->
<script>
export default {
  name: 'BaseImage',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    // 取对应ID的组件
    compObj () {
      return this.$store.getters.getCompConfigByCompId(this.id)
    },
    //  图片css
    imagesStyle () {
      return this.compObj.css
    }
  }
}
</script>
