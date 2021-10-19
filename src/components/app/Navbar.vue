<template>
  <nav>
    <div class="nav-wrapper blue darken-3">
      <a href="#" class="brand-logo">
        <img
          src="../../assets/logo/kasco_logo.svg"
          style="padding-left: 1rem; padding-top: .5rem; padding-bottom: .25rem; height: 56px;"
          alt="kasco_logo"
          srcset=""
        />
      </a>
      <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <a href="#modal1" class="sidenav-trigger modal-trigger right"><i class="fas fa-filter"></i></a>
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
            <span>{{ this.USER.name }} {{ this.USER.secondname }}</span>
            <i class="material-icons right">person</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <!-- <a href="#" class="black-text"><i class="material-icons">supervisor_account</i>Пользователи </a> -->
              <router-link tag="a" class="black-text" to="/users"><i class="material-icons">supervisor_account</i>Пользователи</router-link>
            </li>
            <li>
              <!-- <a href="#" class="black-text"><i class="material-icons">build</i>Настройки </a> -->
              <router-link tag="a" class="black-text" to="/settings"><i class="material-icons">build</i>Настройки</router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <router-link tag="a" class="black-text" to="/login"><i class="material-icons">logout</i>Выйти</router-link>
              <!-- <a href="#" class="black-text" @click.prevent="logout"><i class="material-icons">logout</i>Выйти </a> -->
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import menu from '@/data/menu.json'
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    links: menu,
    dropdown: null,
  }),
  computed: mapGetters(['USER']),
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false,
    })
  },
  beforeDestroy() {
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  },
  methods: {
    logout() {
      this.$router.push('/login')
    },
  },
}
</script>

<style>
#nav-mobile {
  margin-left: 72px;
}
/* #nav-mobile li.active a {
  font-weight: bold;
  border-bottom: 3px solid #fff;
} */
nav li.active a {
  box-shadow: inset 0 -3px 0 white;
}
</style>
