<template>
  <div>
    <el-container>
      <el-header class="herder">Header</el-header>
      <el-container class="main">
        <el-aside width="180px">
          <el-menu default-active="user" router class="el-menu-vertical-demo">
            <el-menu-item :index="item.path" v-for="(item,index) in menus" :key="index">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menus: [
        {
          name: "用户管理",
          path: "user",
          icon: "el-icon-user"
        },
        {
          name: "商户管理",
          path: "merchant",
          icon: "el-icon-connection"
        },
        {
          name: "终端管理",
          path: "terminal",
          icon: "el-icon-monitor"
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.herder {
  background: #303133;
  color: #fff;
}
.main {
  height: calc(100vh - 60px);
  .el-menu {
    box-sizing: border-box;
    border: none;
    height: 100%;
    .el-menu-item {
      cursor: pointer;
      width: 100%;
      height: 40px;
      line-height: 40px;
    }
  }
  .el-main {
    background: #f2f6fc;
  }
}
.router-link-active {
  color: #409eff;
}
</style>