<template>
  <div id="tags-view-container" class="tags-view-container">
    <panel-scroll ref="panelScroll" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <i v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </panel-scroll>

    <!-- <el-dropdown type="primary" @click="() => {}" class="contextmenu">
      <div class="nav-hanldle"><i class="el-icon-setting"></i>操作</div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="refreshSelectedTag(selectedTag)"
          ><i class="el-icon-refresh-right"></i>刷新</el-dropdown-item
        >
        <el-dropdown-item v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)"
          ><i class="el-icon-close"></i>关闭当前</el-dropdown-item
        >
        <el-dropdown-item @click="closeOthersTags"><i class="el-icon-circle-close"></i>关闭其他</el-dropdown-item>
        <el-dropdown-item @click="closeAllTags(selectedTag)"><i class="el-icon-error"></i>关闭所有</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)"><i class="el-icon-refresh-right"></i>刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)"><i class="el-icon-close"></i>关闭当前</li>
      <li @click="closeOthersTags"><i class="el-icon-circle-close"></i>关闭其他</li>
      <li @click="closeAllTags(selectedTag)"><i class="el-icon-error"></i>关闭所有</li>
    </ul>
  </div>
</template>

<script>
import PanelScroll from './PanelScroll'
import path from 'path'
import _ from 'lodash'
export default {
  components: { PanelScroll },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.navView.visitedViews
    },
    routes() {
      return this.$router.options.routes
    }
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes))
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('navView/addVisitedView', tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('navView/addView', this.$route)
      }
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.panelScroll.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('navView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('navView/delCachedView', view).then(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('navView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('navView/delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags(view) {
      this.$store.dispatch('navView/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        // this.left = maxLeft
        this.left = '-100%'
      } else {
        // this.left = left
        this.left = 240 + left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    handleScroll() {
      this.closeMenu()
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  line-height: $headerHeight;
  height: 45px;
  width: 100%;
  border-bottom: 1px solid $borderGrey;
  display: flex;
  .tags-view-wrapper {
    width: calc(100vw - 480px);
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      color: #acb0b9;
      padding: 0 15px;
      font-size: 14px;
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #464d6e;
        color: #fff;
        border-color: #323856;
        font-weight: 500;
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 0 10px;
      line-height: 26px;
      height: 26px;
      cursor: pointer;
      i {
        margin-right: 3px;
      }
      &:hover {
        background: #eee;
      }
    }
  }

  // .nav-hanldle {
  //   width: 60px;
  //   background: #fff;
  //   text-align: center;
  // }
}
</style>

<style lang="scss">
.tags-view-wrapper {
  .tags-view-item {
    border-left: 1px solid #2a304b;
    .el-icon-close {
      width: 16px;
      height: 16px;
      position: relative;
      top: -10px;
      right: -2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.8);
        position: relative;
        display: block;
        top: 1px;
      }
      &:hover {
        color: #fff;
        background: #72799d;
        &:before {
          transform: scale(1);
          font-weight: 500;
          display: block;
          position: relative;
          top: 2px;
        }
      }
    }
  }
}
</style>
