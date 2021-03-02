<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    // if (icon) {
    //   if (icon.includes('el-icon')) {
    //     vnodes.push(<i class={[icon, 'sub-el-icon']} />)
    //   } else {
    //     vnodes.push(<svg-icon class="el-svg" icon-class={icon} />)
    //   }
    // }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>)
    }
    return vnodes
  }
}
</script>

<style lang="scss" scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
  position: relative;
  top: -2px;
  margin-right: 0 !important;
}
.el-svg {
  width: 24px !important;
  height: 1.5em !important;
  vertical-align: middle !important;
  display: inline-block;
}
</style>
