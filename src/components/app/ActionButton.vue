<template>
  <div class="fixed-action-btn">
    <a class="btn-floating btn-large waves-effect" :class="action.class" @click.prevent="$emit('click', action.result)" v-tooltip-left="action.tooltip">
      <i class="large material-icons">{{ action.icon }}</i>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    action: Object,
  },
}
</script>

<style></style>
