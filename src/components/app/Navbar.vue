<template>
  <nav>
    <div class="nav-wrapper blue darken-3">
      <a href="#" class="brand-logo">
        <img src="../../assets/logo/kasco_logo.svg" style="padding-left: 1rem; padding-top: .5rem; padding-bottom: .25rem; height: 56px;" alt="kasco_logo" srcset="" />
      </a>
      <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <a href="#" data-target="filter-out" class="sidenav-trigger right"><i class="material-icons">landscape</i></a>
      <ul id="nav-mobile" class="hide-on-med-and-down">
        <router-link v-for="link in links" :key="link.url" tag="li" :to="link.url" active-class="active" :exact="link.exact">
          <a href="#">
            <span v-if="!link.hideTitle">{{ link.title }}</span>
          </a>
        </router-link>
      </ul>
      <ul class="right hide-on-small-and-down">
        <li>
          <a class="dropdown-trigger white-text" href="#" data-target="dropdown" ref="dropdown">
            <span>Никита Николаевич</span>
            <i class="material-icons right">person</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <a href="#" class="black-text"><i class="material-icons">supervisor_account</i>Пользователи </a>
            </li>
            <li>
              <a href="#" class="black-text"><i class="material-icons">build</i>Настройки </a>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text"><i class="material-icons">logout</i>Выйти </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import menu from '@/data/menu.json'

export default {
  data: () => ({
    links: menu,
    dropdown: null,
  }),
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {})
  },
  beforeDestroy() {
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  },
}
</script>

<style>
#nav-mobile {
  margin-left: 72px;
}
#nav-mobile li.active a {
  font-weight: bold;
  border-bottom: 3px solid #fff;
}
</style>
