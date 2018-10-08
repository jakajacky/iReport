<template>
  <!--region 页面列表-->
  <div class="the-page-list">
    <div class="title">页面管理</div>
    <div class="action-group">
      <div class="item" @click="handleAddPage">
        <span class="axon-icon" v-html="'&#xe635;'"></span>添加
      </div>
      <div class="item" @click="handleCopyPage">
        <span class="axon-icon" v-html="'&#xe62f;'"></span>复制
      </div>
      <div class="item" @click="handleRemovePage">
        <span class="axon-icon" v-html="'&#xe63d;'"></span>删除
      </div>
    </div>
    <ul class="list">
      <template v-for="(page, key) in pages">
        <li :key="key"
            :id="page.id"
            :class="curPageId === page.id ? 'page active' : 'page'" @click="handleTogglePage(page.id)">
          <span class="key">
            <em>{{ key + 1 }}</em>
          </span>
          <p class="name">第 {{ key + 1 }} 页</p>
          <span class="more-action axon-icon" v-html="'&#xe61c;'">
          </span>
        </li>
      </template>
    </ul>
  </div>
  <!--endregion-->
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  created () {
  },
  mounted () {
  },
  computed: {
    // 取页面列表
    pages () {
      try {
        return this.$store.getters.pages
      } catch (e) {
        this.$notify.error({
          title: '错误',
          message: '初始化页面失败,请刷新后重试！'
        })
      }
    },
    // 当前页面ID
    curPageId () {
      try {
        return this.$store.getters.curPageId
      } catch (e) {
        this.$notify.error({
          title: '错误',
          message: '初始化页面失败,请刷新后重试！'
        })
      }
    }
  },
  methods: {
    /**
     * 创建新页面
     */
    handleAddPage () {
      this.$store.dispatch('insertPage', this.curPageId)
    },
    /**
     * 拷贝当前页面
     */
    handleCopyPage () {
      this.$store.dispatch('copyPage', this.curPageId)
    },
    /**
     * 删除当前页面
     */
    handleRemovePage () {
      this.$store.dispatch('removePage', this.curPageId)
    },
    /**
     * 切换页面
     * @param pageId
     */
    handleTogglePage (pageId) {
      this.$store.dispatch('togglePage', pageId)
    }
  }
}
</script>

<style lang="scss">
@import "../../../styles/variables";

.the-page-list {
  background-color: #fafafa;
  border-left: 1px solid $border-color-1;
  box-sizing: border-box;
  flex: 0 0 $setting-width;
  // 页头
  .title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #e0e0e0;
    font-weight: 600;
  }
  // 列表
  .list {
    .page {
      border-top: 1px solid #e6ebed;
      height: 70px;
      line-height: 70px;
      color: #666;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      border-bottom: 1px solid #e6ebed;
      display: flex;
      .key, .more-action {
        flex: 0 0 44px;
        text-align: center;
        display: block;
        em {
          display: inline-block;
          width: 24px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          border-radius: 12px;
          background-color: #ccc;
          color: #fff;
          font-weight: 400;
          font-style: normal;
        }
      }
      .more-action {
        font-size: 13px;
      }
      .name {
        font-size: 14px;
        flex: 100%;
      }
      &.active {
        background-color: #eee;
        .key {
          em {
            background-color: #1593ff;
          }
        }
        .name {
          color: #000;
        }
      }
    }
  }
  .action-group {
    display: flex;
    height: 36px;
    line-height: 36px;
    .item {
      flex: 0 0 33.33%;
      text-align: center;
      font-size: 12px;
      &:not(:last-child) {
        border-right: 1px solid #eee;
      }
      span {
        font-size: 14px;
        padding-right: 4px;
      }
    }
  }
}
</style>
