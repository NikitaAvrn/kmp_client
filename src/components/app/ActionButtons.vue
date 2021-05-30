<template>
  <div class="fixed-action-btn" ref="btns">
    <a class="btn-floating btn-large waves-effect" :class="action.class">
      <i class="large material-icons">{{ action.icon }}</i>
    </a>
    <ul>
      <li v-for="(button, index) in action.buttons" :key="index">
        <a class="btn-floating waves-effect" :class="button.class" v-tooltip-left="button.tooltip" @click.prevent="$emit('click', button.result)"
          ><i class="material-icons">{{ button.icon }}</i></a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    action: Object,
  },
  data: () => ({
    actionButton: null,
  }),
  mounted() {
    this.actionButton = M.FloatingActionButton.init(this.$refs.btns, {
      hoverEnabled: false,
    })
    this.actionButton.open()
  },
  destroyed() {
    if (this.actionButton && this.actionButton.destroy) {
      this.actionButton.destroy()
    }
  },
}
</script>

<style></style>
