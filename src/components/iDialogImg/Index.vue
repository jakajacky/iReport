<!--region 封装的图片列表 卡片-->
<template>
  <div class="custom-dialog-wrapper" v-if="dialogVisible">
    <div class="custom-dialog-container" :style="{width: '60%',marginTop: '15vh'}">
      <el-container>
        <el-aside :style="{height: '75vh',width:'200px'}">
          <div class="custom-aside__wrapper">
            <span class="custom-aside__title">图片库</span>
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </el-aside>
        <el-container>
          <el-header>
            <div class="custom-dialog__header">
              <span class="custom-dialog__title">{{title}}</span>
              <a class="custom-dialog__headerbtn" @click="closeDialog">
                <i class="el-dialog__close el-icon el-icon-close"></i>
              </a>
            </div>
          </el-header>
          <el-main>
            <ul v-if="operationFlag==='BackgroundImage'">
              <template v-for="item in backgroundImageList">
                <li :key="item.id" @click="selectImage(item)" style="height: 30vh;">
                  <div class="item-bg-images" :style="{backgroundImage: 'url(' + item.url + ')'}">
                    <div class="item-active"
                         v-if="imageSelectItem && imageSelectItem.id === item.id">
                      <span class="axon-icon" v-html="'&#xe61e;'"></span>
                    </div>
                  </div>
                </li>
              </template>
            </ul>
            <ul v-if="operationFlag==='Image' || operationFlag==='UpdateImages'">
              <template v-for="item in iconList">
                <li :key="item.id" @click="selectImage(item)" style="height: 24vh;border: 1px solid #c8c9ca">
                  <div class="item-bg-images" :style="{backgroundImage: 'url(' + item.url + ')'}">
                    <div class="item-active"
                         v-if="imageSelectItem && imageSelectItem.id === item.id">
                      <span class="axon-icon" v-html="'&#xe61e;'"></span>
                    </div>
                  </div>
                </li>
              </template>
            </ul>
          </el-main>
          <el-footer>
            <el-button @click="cancelSelectImage" round>&nbsp;&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            <el-button type="success" @click="confirmSelectImage" round>&nbsp;&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
          </el-footer>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<!--endregion-->
<script>
export default {
  name: 'iDialogImg',
  data () {
    return {
      dialogVisible: '',
      title: '',
      operationFlag: '',
      backgroundImageList: [
        { id: 1, url: require('../../assets/images/bgi/1521186133451071.jpg') },
        { id: 2, url: require('../../assets/images/bgi/1522660019106280.png') },
        { id: 3, url: require('../../assets/images/bgi/1521186133451071.jpg') },
        { id: 4, url: require('../../assets/images/bgi/1522660019106280.png') },
        { id: 5, url: require('../../assets/images/bgi/1521186133451071.jpg') },
        { id: 6, url: require('../../assets/images/bgi/1522660019106280.png') },
        { id: 7, url: require('../../assets/images/bgi/1521186133451071.jpg') },
        { id: 8, url: require('../../assets/images/bgi/1522660019106280.png') },
        { id: 9, url: require('../../assets/images/bgi/1521186133451071.jpg') },
        { id: 10, url: require('../../assets/images/bgi/1522660019106280.png') },
        { id: 11, url: require('../../assets/images/bgi/1521186133451071.jpg') },
        { id: 12, url: require('../../assets/images/bgi/1522660019106280.png') },
        { id: 13, url: require('../../assets/images/bgi/1521186133451071.jpg') },
        { id: 14, url: require('../../assets/images/bgi/1522660019106280.png') }
      ],
      iconList: [
        { id: 1, url: require('../../assets/icon/bridge1.png') },
        { id: 2, url: require('../../assets/icon/person.png') },
        { id: 3, url: require('../../assets/icon/ren1.png') },
        { id: 4, url: require('../../assets/icon/bridge1.png') },
        { id: 5, url: require('../../assets/icon/person.png') },
        { id: 6, url: require('../../assets/icon/ren1.png') },
        { id: 7, url: require('../../assets/icon/bridge1.png') },
        { id: 8, url: require('../../assets/icon/person.png') },
        { id: 9, url: require('../../assets/icon/bridge1.png') },
        { id: 10, url: require('../../assets/icon/person.png') },
        { id: 11, url: require('../../assets/icon/person.png') },
        { id: 12, url: require('../../assets/icon/ren1.png') },
        { id: 13, url: require('../../assets/icon/bridge1.png') },
        { id: 14, url: require('../../assets/icon/person.png') }
      ],
      imageSelectItem:
        {
          id: null,
          url:
            ''
        }
    }
  },
  created () { },
  mounted () {
  },
  computed: {
    // 取当前页面
    curPage () {
      return this.$store.getters.curPage
    },
    // 取当前组件
    currComp () {
      return this.$store.getters.curComp
    }
  },
  methods: {
    // 关闭弹出框
    closeDialog () {
      this.dialogVisible = false
    },
    // 新增图片/背景图增弹出框
    showAddDialog (flag) {
      this.operationFlag = flag
      switch (flag) {
        case 'Image':
          this.title = '新增图标'
          break
        case 'BackgroundImage':
          this.title = '设置背景图'
          break
        default:
          break
      }
      this.dialogVisible = true
    },
    // 编辑图片/背景图增弹出框
    showEditDialog () {
      this.title = '修改图标'
      this.operationFlag = 'UpdateImages'
      this.dialogVisible = true
    },
    // 取消图片选中
    cancelSelectImage () {
      this.imageSelectItem.id = null
      this.imageSelectItem.url = ''
    },
    // 确认操作
    confirmSelectImage () {
      this.closeDialog()
      switch (this.operationFlag) {
        case 'Image':
          this.handleAddImageComponent(this.imageSelectItem)
          break
        case 'BackgroundImage':
          this.updateCurPageBackgroundImage(this.imageSelectItem)
          break
        case 'UpdateImages':
          this.updateProps()
          break
        default:
          break
      }
    },
    // 选中事件
    selectImage (item) {
      console.log(item)
      this.imageSelectItem.id = item.id
      this.imageSelectItem.url = item.url
    },
    // 添加图片
    handleAddImageComponent (item) {
      this.$store.dispatch('addNewCompByParams', { name: 'Image', url: item.url })
    },
    // 编辑图片组件
    updateProps () {
      this.$store.dispatch('editComp', {
        type: 'props',
        value: { 'url': this.imageSelectItem.url }
      })
    },
    // 设置当前页面背景
    updateCurPageBackgroundImage (item) {
      this.curPage.css.bgi = item.url
      this.syncCss('css', { 'bgi': this.curPage.css['bgi'] }, this.curPage.id)
    },
    // 同步到持久化
    syncCss (type, val, pageId) {
      this.$store.dispatch('editCurPage', {
        type: type,
        value: val,
        pageId: pageId
      })
    }
  }
}
</script>

<style lang="scss">
.custom-dialog-wrapper {
  z-index: 2025;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  .custom-dialog-container {
    position: relative;
    margin: 0 auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    box-sizing: border-box;
    width: 50%;
  }
}

.el-aside {
  color: #333;
  text-align: center;
  .custom-aside__wrapper {
    width: 100%;
    position: relative;
    background-color: #1f2d3d;
    .custom-aside__title {
      position: absolute;
      top: 0;
      left: 0;
      width: 200px;
      height: 60px;
      line-height: 60px;
      font-size: 18px;
      color: #fff;
      background: #212121;
      font-weight: bolder;
    }
    .upload-demo {
      position: absolute;
      top: 80px;
      left: 0;
      .el-upload-dragger {
        width: 180px;
      }
    }
  }
}

.el-header {
  color: #333;
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, .16);
  .custom-dialog__header {
    padding: 20px 20px 10px 20px;
    .custom-dialog__title {
      line-height: 24px;
      font-size: 18px;
      color: #303133;
    }
    .custom-dialog__headerbtn {
      position: absolute;
      top: 20px;
      right: 20px;
      padding: 0;
      background: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 16px;
    }
  }
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  height: 60vh;
  overflow: scroll;
  ul {
    li {
      float: left;
      width: 24%;
      margin-top: 1.5vh;
      .item-bg-images {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .item-active {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgb(0, 0, 0);
          opacity: 0.7;
          span {
            color: #31b4a7;
            font-size: 52px;
          }
        }
      }
    }
    li:nth-child(4n + 1) {
      margin-left: 0px;
    }
    li:nth-child(4n + 2) {
      margin-left: 1%;
    }
    li:nth-child(4n + 3) {
      margin-left: 1%;
    }
    li:nth-child(4n + 4) {
      margin-left: 1%;
    }
  }
}

.el-footer {
  text-align: center;
  line-height: 60px;
}
</style>
