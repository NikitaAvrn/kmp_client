<template>
  <div>
    <ul class="sidenav" id="slide-out" ref="sidebar">
      <router-link v-for="link in links" :key="link.url" tag="li" :to="link.url" active-class="active" :exact="link.exact">
        <a href="#" class="waves-effect pointer"
          ><i class="material-icons">{{ link.icon }}</i
          >{{ link.title }}</a
        >
      </router-link>
    </ul>
  </div>
</template>

<script>
import menu from '@/data/menu.json'

export default {
  props: ['value'],
  data: () => ({
    links: menu,
    sidebar: null,
  }),
  mounted() {
    this.sidebar = M.Sidenav.init(this.$refs.sidebar, {})
  },
  beforeDestroy() {
    if (this.sidebar && this.sidebar.destroy) {
      this.sidebar.destroy()
    }
  },
}
</script>

<style></style>
