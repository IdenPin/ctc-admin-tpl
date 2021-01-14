<template>
  <el-drawer
    size="240px"
    title="我是标题"
    :visible="isDrawerState"
    :with-header="false"
    @close="$store.dispatch('app/toggleDrawerState')"
  >
    <div class="drawer-wrap">
      <div class="item">
        <div class="title">主题色</div>
        <div class="block">
          <el-color-picker v-model="color"></el-color-picker>
        </div>
      </div>
      <div class="item">
        <div class="title">导航模式</div>
        <div class="content">
          <div class="row">
            <div class="label">固定顶部：</div>
            <el-switch v-model="TopMenu" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
          </div>
          <!-- <img src="@/assets/images/rightMenuLayout.svg" alt="" />
          <img src="@/assets/images/topMenuLayout.svg" alt="" /> -->
        </div>
      </div>
      <div class="item">
        <div class="title">布局配置</div>
        <div class="content-item">
          <div class="row">
            <div class="label">固定顶部：</div>
            <el-switch v-model="FixedLayoutHeader" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
          </div>
          <div class="row">
            <div class="label">固定侧边栏：</div>
            <el-switch v-model="FixedLayoutSidebar" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
          </div>
          <div class="row">
            <div class="label">固定内容区域：</div>
            <el-switch v-model="FixedLayoutPage" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      color: '#409EFF'
      // FixedLayoutHeader: ''
    }
  },
  computed: {
    ...mapGetters({
      isDrawerState: 'app/isDrawerState',
      isTopMenu: 'app/isTopMenu',
      isFixedLayoutHeader: 'app/isFixedLayoutHeader',
      isFixedLayoutSidebar: 'app/isFixedLayoutSidebar',
      isFixedLayoutPage: 'app/isFixedLayoutPage'
    }),
    TopMenu: {
      get() {
        return this.isTopMenu
      },
      set(value) {
        this.$store.dispatch('app/toggleTopMenu', value)
      }
    },
    FixedLayoutHeader: {
      get() {
        return this.isFixedLayoutHeader
      },
      set(value) {
        this.$store.dispatch('app/toggleLayoutHeader', value)
      }
    },
    FixedLayoutSidebar: {
      get() {
        return this.isFixedLayoutSidebar
      },
      set(value) {
        this.$store.dispatch('app/toggleLayoutSidebar', value)
      }
    },
    FixedLayoutPage: {
      get() {
        return this.isFixedLayoutPage
      },
      set(value) {
        this.$store.dispatch('app/toggleLayoutPage', value)
      }
    }
  },
  mounted() {
    // this.FixedLayoutHeader = this.isFixedLayoutHeader
  }
}
</script>
<style lang="scss" scoped>
.drawer-wrap {
  padding: 10px 30px;
  .item {
    margin: 20px 0;
    .title {
      font-size: 14px;
      color: #333;
      margin-bottom: 10px;
    }
    .content {
      display: flex;
      justify-content: space-between;
    }
    .row {
      font-size: 12px;
      margin: 10px 0;
      display: flex;
      .label {
        width: 140px;
      }
    }
  }
}
</style>
