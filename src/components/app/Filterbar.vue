<template>
  <div>
    <ul class="sidenav" id="filter-out" ref="filterbar">
      <router-link v-for="link in links" :key="link.url" tag="li" :to="link.url" active-class="active" exact>
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
    filterbar: null,
  }),
  mounted() {
    this.filterbar = M.Sidenav.init(this.$refs.filterbar, {
      edge: 'right',
    })
  },
  beforeDestroy() {
    if (this.filterbar && this.filterbar.destroy) {
      this.filterbar.destroy()
    }
  },
}
</script>

<style></style>
