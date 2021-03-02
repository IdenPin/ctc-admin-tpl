<template>
  <div class="flex">
    <!-- <div class="collapse" @click="$store.commit('app/TOGGLE_COLLAPSE', !isCollapse)">
      <i :class="`el-icon-s-${isCollapse ? 'fold' : 'unfold'}`" style="font-size: 16px;color:#7b7c7d"></i>
    </div> -->
    <div class="parent-menu">
      <div class="menu-title flex-center" style="border-bottom: 1px solid #DBDFE7">
        <!-- <i class="el-icon-s-unfold"></i> -->
        <i class="el-icon-menu"></i>
        <div class="label">系统列表</div>
      </div>
      <div
        v-waves
        :class="['item', 'flex-center', activeIndex === index ? 'active' : '']"
        v-for="(item, index) in ['自动监控系统', '动态管控系统', '系统管理', '垃圾焚烧管理端', '电子督办系统']"
        :key="item"
        @click="activeIndex = index"
      >
        <i class="el-icon-food"></i>
        <span class="label">{{ item }}</span>
      </div>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="title">自动监控系统</div>
      <el-menu
        class="mt-10"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
      >
        <sub-menu v-for="route in $router.options.routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import variables from '@/assets/styles/_variables.scss'
import SubMenu from '@/components/layouts/menu/SubMenu.vue'

export default {
  data() {
    return {
      activeIndex: 0
    }
  },
  components: {
    SubMenu
  },
  computed: {
    ...mapGetters({
      isCollapse: 'app/isCollapse'
    }),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.collapse {
  background-color: #fff;
  cursor: pointer;
  padding: 8px 12px;
  text-align: right;
}

.parent-menu {
  background-color: #fff;
  border-right: 1px solid #dfe1e6;
  color: #242b3b;
  transition: all 0.3s ease-in-out;
  width: 46px;

  .item {
    cursor: pointer;
  }
  .menu-title {
    margin-bottom: 10px;
  }

  .item,
  .menu-title {
    width: 46px;
    height: 45px;
    border-left: 2px solid transparent;
    i {
      font-size: 22px;
      transition: all 0.3s ease-in-out;
    }
    .label {
      display: none;
      margin-left: 15px;
      transition: all 0.3s ease-in-out;
      font-size: 14px;
      white-space: nowrap;
    }
  }

  &:hover {
    width: $sidebarMaxWidth;
    border: none;
    .item {
      justify-content: flex-start;
      transition: all 0.5s linear;
      padding-left: 11px;
      width: 100%;
      i {
        margin-left: 10px;
      }
      .label {
        display: block;
        margin-left: 15px;
      }
      &:hover {
        color: $mainColor;
        // border-left: 2px solid $mainColor;
        background-image: linear-gradient(270deg, rgba(240, 247, 255, 0) 2%, #f0f7ff 52%, #e9f4ff 99%);
      }
    }
    .menu-title {
      justify-content: flex-start;
      transition: width 0.3s ease-in-out;
      padding-left: 11px;
      width: 100%;
      i {
        margin-left: 10px;
      }
      .label {
        display: block;
        margin-left: 15px;
        font-weight: 500;
        color: #242b3b;
      }
    }
  }

  .active {
    font-weight: 500;
    color: $mainColor;
    border-left: 2px solid $mainColor;
    background-image: linear-gradient(270deg, rgba(240, 247, 255, 0) 2%, #f0f7ff 52%, #e9f4ff 99%);
  }
}
.el-scrollbar {
  flex: 1;
  .title {
    padding: 0;
    margin: 0 20px;
    line-height: 44px;
    font-weight: 500;
    color: #242b3b;
    border-bottom: 1px solid $borderGrey;
  }
}
</style>
