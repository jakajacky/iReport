<!--region 封装的图片列表 卡片-->
<template>
  <div class="custom-dialog-wrapper" v-if="dialogVisible">
    <div class="custom-dialog-container" :style="{width: '50%',marginTop: '15vh'}">
      <el-container>
        <el-aside :style="{height: '60vh',width:'200px'}">
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
              <span class="custom-dialog__title">全部|背景|图标|文字|边框</span>
              <a class="custom-dialog__headerbtn" @click="closeDialog">
                <i class="el-dialog__close el-icon el-icon-close"></i>
              </a>
            </div>
          </el-header>
          <el-main>图片列表区域</el-main>
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
      dialogVisible: ''
    }
  },
  created () { },
  mounted () {
  },
  methods: {
    // 关闭弹出框
    closeDialog () {
      this.dialogVisible = false
    },
    // 打开弹出框
    showDialog () {
      this.dialogVisible = true
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
  line-height: 160px;
}
</style>
